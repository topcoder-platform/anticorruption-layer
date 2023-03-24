import { Metadata } from "@grpc/grpc-js";
import {
  Operator as RelationalOperator,
  QueryBuilder,
  Transaction,
} from "@topcoder-framework/client-relational";
import { CheckExistsResult, CreateResult, UpdateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { PhaseTypeIds, ResourceInfoTypeIds, ResourceRoleTypeIds } from "../config/constants";
import Comparer from "../helper/Comparer";

import ChallengeQueryHelper from "../helper/query-helper/ChallengeQueryHelper";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateChallengeInput,
  LegacyChallenge,
  LegacyChallengeId,
  Phase,
  Prize,
  UpdateChallengeInput,
} from "../models/domain-layer/legacy/challenge";
import { LegacyChallengePhase } from "../models/domain-layer/legacy/challenge_phase";
import { PhaseCriteria } from "../models/domain-layer/legacy/phase";
import { ProjectSchema } from "../schema/project/Project";

const TCWEBSERVICE = 22838965;

class LegacyChallengeDomain {
  public async create(input: CreateChallengeInput, metadata: Metadata): Promise<CreateResult> {
    const transaction = queryRunner.beginTransaction();

    // prettier-ignore
    const userId: number | null = metadata.get("userId").length > 0 ? parseInt(metadata.get("userId")[0].toString()) : TCWEBSERVICE;
    // prettier-ignore
    const handle: string | null = metadata.get("handle").length > 0 ? metadata.get("handle")[0].toString() : "tcwebservice";

    const projectId = await this.createProject(
      {
        projectCategoryId: input.projectCategoryId,
        projectStatusId: input.projectStatusId,
        tcDirectProjectId: input.tcDirectProjectId,
      },
      TCWEBSERVICE,
      transaction
    );

    await this.createWinnerPrizes(projectId, input.winnerPrizes, userId, transaction);
    await this.createProjectInfo(projectId, input.projectInfo, userId, transaction);
    await this.createProjectPhases(projectId, input.phases, userId, transaction);
    // prettier-ignore
    await this.createProjectResources(projectId, input.tcDirectProjectId, input.winnerPrizes, userId, handle, transaction);

    transaction.commit();

    return {
      kind: {
        $case: "integerId",
        integerId: projectId,
      },
    };
  }

  public async update(input: UpdateChallengeInput, metadata: Metadata): Promise<UpdateResult> {
    const transaction = queryRunner.beginTransaction();

    // prettier-ignore
    const userId: number | null = metadata.get("userId").length > 0 ? parseInt(metadata.get("userId")[0].toString()) : TCWEBSERVICE;
    // prettier-ignore
    // const handle: string | null = metadata.get("handle").length > 0 ? metadata.get("handle")[0].toString() : "tcwebservice";

    const projectId = input.projectId;
    let updatedCount = 0;

    if (input.projectStatusId != null) {
      const updateProjectStatusQuery = ChallengeQueryHelper.getChallengeStatusUpdateQuery(
        projectId,
        input.projectStatusId,
        userId
      );

      const result = await transaction.add(updateProjectStatusQuery);
      if (result.affectedRows == 0) {
        transaction.rollback();
        throw new Error("Failed to update challenge status in legacy database");
      }
      updatedCount++;
    }

    if (input.phaseUpdate != null) {
      await this.updateProjectPhases(projectId, input.phaseUpdate.phases, userId, transaction);
    }

    transaction.commit();
    return {
      updatedCount,
    };
  }

  public async getLegacyChallenge(input: LegacyChallengeId): Promise<LegacyChallenge> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectSchema)
        .select(..._.map(ProjectSchema.columns))
        .where(ProjectSchema.columns.projectId, RelationalOperator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.legacyChallengeId,
          },
        })
        .build()
    );
    if (!rows || rows.length === 0)
      throw new Error(`Cannot find challenge with id: ${input.legacyChallengeId}`);
    return LegacyChallenge.fromPartial(rows[0] as LegacyChallenge);
  }

  public async checkExists(legacyChallengeId: number): Promise<CheckExistsResult> {
    const { projectId } = ProjectSchema.columns;

    const query = new QueryBuilder(ProjectSchema)
      .select(projectId)
      .where(projectId, RelationalOperator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: legacyChallengeId,
        },
      })
      .build();

    const { rows } = await queryRunner.run(query);

    return {
      exists: rows?.length == 1,
    };
  }

  private async createProject(
    {
      projectCategoryId,
      projectStatusId,
      tcDirectProjectId,
    }: { projectCategoryId: number; projectStatusId: number; tcDirectProjectId: number },
    userId: number,
    transaction: Transaction
  ): Promise<number> {
    const createProjectQuery = ChallengeQueryHelper.getChallengeCreateQuery(
      {
        projectCategoryId,
        projectStatusId,
        tcDirectProjectId,
      },
      userId
    );

    const createQueryResult = await transaction.add(createProjectQuery);

    if (createQueryResult.lastInsertId == null)
      throw new Error("Failed to create challenge in legacy database");

    return createQueryResult.lastInsertId;
  }

  private async createWinnerPrizes(
    projectId: number,
    winnerPrizes: Prize[],
    userId: number,
    transaction: Transaction
  ) {
    const createPrizeQueries = ChallengeQueryHelper.getPrizeCreateQueries(
      projectId,
      winnerPrizes,
      userId
    );

    for (const q of createPrizeQueries) {
      await transaction.add(q);
    }
  }

  private async createProjectInfo(
    projectId: number,
    projectInfo: { [key: number]: string },
    userId: number,
    transaction: Transaction
  ) {
    const createProjectInfoQueries = ChallengeQueryHelper.getChallengeInfoCreateQueries(
      projectId,
      projectInfo,
      userId
    );

    for (const q of createProjectInfoQueries) {
      await transaction.add(q);
    }
  }

  private async createProjectPhases(
    projectId: number,
    phases: Phase[],
    userId: number,
    transaction: Transaction
  ) {
    const phaseWithLegacyPhaseId = [];

    for (const phase of phases) {
      const createPhaseQuery = ChallengeQueryHelper.getPhaseCreateQuery(projectId, phase, userId);
      const createPhaseResult = await transaction.add(createPhaseQuery);

      const projectPhaseId = createPhaseResult.lastInsertId as number;

      phaseWithLegacyPhaseId.push({
        ...phase,
        projectPhaseId,
      });

      const createPhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaCreateQueries(
        projectPhaseId,
        phase.phaseCriteria,
        userId
      );
      for (const q of createPhaseCriteriaQueries) {
        await transaction.add(q);
      }
    }

    const nPhases = phaseWithLegacyPhaseId.length;
    for (let i = 1; i < nPhases; i++) {
      if (!_.isUndefined(phaseWithLegacyPhaseId[i].fixedStartTime)) {
        continue;
      }
      let dependencyStart = 0;
      if (phases[i].phaseTypeId == PhaseTypeIds.IterativeReview) {
        dependencyStart = 1;
      }
      const dependentStart = 1;
      const lagTime = 0;
      const dependentPhaseId = phaseWithLegacyPhaseId[i].projectPhaseId;
      const dependencyPhaseId = phaseWithLegacyPhaseId[i - 1].projectPhaseId;

      const createPhaseDependencyQuery = ChallengeQueryHelper.getPhaseDependencyCreateQuery(
        dependencyPhaseId,
        dependentPhaseId,
        dependencyStart,
        dependentStart,
        lagTime,
        userId
      );

      await transaction.add(createPhaseDependencyQuery);
    }
  }

  private async createProjectResources(
    projectId: number,
    directProjectId: number,
    prizes: Prize[],
    creatorId: number,
    creatorHandle: string,
    transaction: Transaction
  ) {
    const getObserversToAddQuery =
      ChallengeQueryHelper.getDirectProjectListUserQuery(directProjectId);

    const getObserversToAddResult = (await transaction.add(getObserversToAddQuery)) as {
      rows: { user_id: number; handle: string }[];
    };

    const adminsToAdd = (
      getObserversToAddResult?.rows?.map((o) => ({
        // Add Observers
        userId: o["user_id"],
        handle: o["handle"],
        role: ResourceRoleTypeIds.Observer,
      })) ?? []
    ).concat([
      // Add Managers
      { userId: 22770213, handle: "Applications", role: ResourceRoleTypeIds.Manager },
      { userId: TCWEBSERVICE, handle: "tcwebservice", role: ResourceRoleTypeIds.Manager },
      { userId: creatorId, handle: creatorHandle, role: ResourceRoleTypeIds.Manager },
      // Add Copilot
      { userId: creatorId, handle: creatorHandle, role: ResourceRoleTypeIds.Copilot },
    ]);

    for (const { userId, handle, role } of adminsToAdd) {
      if (userId == creatorId && role == ResourceRoleTypeIds.Observer) continue;

      const createResourceQuery = ChallengeQueryHelper.getResourceCreateQuery(
        projectId,
        userId,
        role,
        undefined,
        creatorId
      );

      const { lastInsertId } = await transaction.add(createResourceQuery);
      const resourceId = lastInsertId as number;
      const createResourceInfoQueries = ChallengeQueryHelper.getObserverResourceInfoCreateQueries(
        resourceId,
        userId,
        handle,
        creatorId
      );

      for (const q of createResourceInfoQueries) {
        await transaction.add(q);
      }
      if (role === ResourceRoleTypeIds.Copilot) {
        const copilotFee = prizes.find((prize) => prize.type?.toLowerCase() === "copilot")?.amount;
        if (copilotFee != null && copilotFee > 0) {
          console.log("Adding copilot");
          const createCopilotResourceInfoQuery = ChallengeQueryHelper.getResourceInfoCreateQuery(
            resourceId,
            ResourceInfoTypeIds.Payment,
            copilotFee.toString(),
            creatorId
          );
          await transaction.add(createCopilotResourceInfoQuery);
        }
      }
    }
  }

  private async updateProjectPhases(
    projectId: number,
    phases: Phase[],
    userId: number,
    transaction: Transaction
  ) {
    const phaseSelectQuery = ChallengeQueryHelper.getPhaseSelectQuery(projectId);
    const phaseSelectResult = await transaction.add(phaseSelectQuery);
    const legacyPhases = phaseSelectResult.rows!.map((r) => r as LegacyChallengePhase);

    for (const phase of phases) {
      if (phase.phaseTypeId === PhaseTypeIds.IterativeReview) {
        continue;
      }
      const legacyPhase = _.find(legacyPhases, (p) => p.phaseTypeId === phase.phaseTypeId);
      if (_.isUndefined(legacyPhase)) {
        continue;
      }
      if (Comparer.checkIfPhaseChanged(legacyPhase, phase)) {
        const phaseUpdateQuery = ChallengeQueryHelper.getPhaseUpdateQuery(projectId, phase, userId);
        await transaction.add(phaseUpdateQuery);
      }
    }

    const projectPhaseIds = _.map(legacyPhases, (p) => p.projectPhaseId);
    if (_.isEmpty(projectPhaseIds)) {
      return;
    }
    const phaseCriteriaSelectQuery =
      ChallengeQueryHelper.getPhaseCriteriasSelectQuery(projectPhaseIds);
    const phaseCriteriaSelectResult = await transaction.add(phaseCriteriaSelectQuery);
    const allPhaseCriterias = phaseCriteriaSelectResult.rows!.map((r) => r as PhaseCriteria);
    for (const phase of phases) {
      if (phase.phaseTypeId === PhaseTypeIds.IterativeReview) {
        continue;
      }
      const legacyPhase = _.find(legacyPhases, (p) => p.phaseTypeId === phase.phaseTypeId);
      if (_.isUndefined(legacyPhase)) {
        continue;
      }
      const phaseCriterias = _.filter(
        allPhaseCriterias,
        (pc) => pc.projectPhaseId === legacyPhase.projectPhaseId
      );
      const criteriasToAdd = _.differenceWith(
        _.keys(phase.phaseCriteria),
        phaseCriterias,
        (a, b) => _.toNumber(a) === b.phaseCriteriaTypeId
      );
      const criteriasToDelete = _.differenceWith(
        phaseCriterias,
        _.keys(phase.phaseCriteria),
        (b, a) => _.toNumber(a) === b.phaseCriteriaTypeId
      );
      const criteriasToUpdate = _.intersectionWith(
        _.keys(phase.phaseCriteria),
        phaseCriterias,
        (a, b) =>
          _.toNumber(a) === b.phaseCriteriaTypeId &&
          phase.phaseCriteria[_.toNumber(a)] !== b.parameter
      );
      const createPhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaCreateQueries(
        legacyPhase.projectPhaseId,
        criteriasToAdd,
        userId
      );
      for (const q of createPhaseCriteriaQueries) {
        await transaction.add(q);
      }
      const deletePhaseCriteriaQueries =
        ChallengeQueryHelper.getPhaseCriteriaDeleteQueries(criteriasToDelete);
      for (const q of deletePhaseCriteriaQueries) {
        await transaction.add(q);
      }
      const updatePhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaUpdateQueries(
        legacyPhase.projectPhaseId,
        criteriasToUpdate,
        userId
      );
      for (const q of updatePhaseCriteriaQueries) {
        await transaction.add(q);
      }
    }
  }
}

export default new LegacyChallengeDomain();
