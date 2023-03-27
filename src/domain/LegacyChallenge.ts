import { Metadata } from "@grpc/grpc-js";
import {
  Operator as RelationalOperator,
  QueryBuilder,
  Transaction,
} from "@topcoder-framework/client-relational";
import { CheckExistsResult, CreateResult, UpdateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import {
  PhaseTypeIds,
  ProjectPaymentTypeIds,
  ResourceInfoTypeIds,
  ResourceRoleTypeIds,
} from "../config/constants";
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
      userId,
      transaction
    );

    await this.createWinnerPrizes(projectId, input.winnerPrizes, userId, transaction);
    await this.createProjectInfo(projectId, input.projectInfo, userId, transaction);
    await this.createProjectPhases(projectId, input.phases, userId, transaction);
    // prettier-ignore
    await this.createProjectResources(projectId, input.tcDirectProjectId, input.winnerPrizes, userId, handle, transaction);
    await this.createGroupContestEligibility(projectId, [], userId, transaction);

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
        // transaction.rollback();
        throw new Error("Failed to update challenge status in legacy database");
      }
      updatedCount++;
    }

    if (input.phaseUpdate != null) {
      await this.updateProjectPhases(projectId, input.phaseUpdate.phases, userId, transaction);
    }

    if (input.projectInfo != null) {
      const entries = Object.entries(input.projectInfo);
      const projectInfosToInsert: { [key: number]: string } = {};

      for (const [key, value] of entries) {
        const projectInfoTypeId = parseInt(key);
        // prettier-ignore
        const updateProjectInfoQuery = ChallengeQueryHelper.getChallengeInfoUpdateQuery(projectId, projectInfoTypeId, value, userId);
        const result = await transaction.add(updateProjectInfoQuery);
        if (result.affectedRows == 0) {
          projectInfosToInsert[projectInfoTypeId] = value;
        }
      }

      if (Object.keys(projectInfosToInsert).length > 0) {
        await this.createProjectInfo(projectId, projectInfosToInsert, userId, transaction);
      }

      updatedCount++;
    }

    if (input.prizeUpdate != null) {
      await this.updateWinnerPrizes(
        projectId,
        input.prizeUpdate.winnerPrizes.filter((prize) => prize.type === "placement"),
        userId,
        transaction
      );
      updatedCount++;
      await this.updateCopilotFee(
        projectId,
        input.prizeUpdate.winnerPrizes.filter((p) => p.type === "copilot"),
        userId,
        transaction
      );
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
      // TODO: Not adding copilot now since I'm not sure if we should add it as WM lets you set the copilot
      // { userId: creatorId, handle: creatorHandle, role: ResourceRoleTypeIds.Copilot },
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
        const copilotFee: Prize | undefined = prizes.find(
          (prize) => prize.type?.toLowerCase() === "copilot"
        );

        if (copilotFee != null && copilotFee.amountInCents > 0) {
          await this.createCopilotPayment(
            copilotFee.amountInCents / 100,
            resourceId,
            creatorId,
            transaction
          );
        }
      }
    }
  }

  private async createCopilotPayment(
    fee: number,
    resourceId: number,
    userId: number,
    transaction: Transaction
  ) {
    const copilotResourceInfos = [
      {
        resourceInfoTypeId: ResourceInfoTypeIds.Payment,
        value: fee.toString(),
      },
      {
        resourceInfoTypeId: ResourceInfoTypeIds.ManualPayments,
        value: "true",
      },
    ];
    for (const { resourceInfoTypeId, value } of copilotResourceInfos) {
      const createCopilotResourceInfoQuery = ChallengeQueryHelper.getResourceInfoCreateQuery(
        resourceId,
        resourceInfoTypeId,
        value,
        userId
      );
      await transaction.add(createCopilotResourceInfoQuery);
    }

    const createCopilotProjectPaymentQuery = ChallengeQueryHelper.getProjectPaymentCreateQuery(
      resourceId,
      fee,
      ProjectPaymentTypeIds.CopilotPayment,
      userId
    );
    await transaction.add(createCopilotProjectPaymentQuery);
  }

  private async createGroupContestEligibility(
    projectId: number,
    groupIds: number[],
    userId: number,
    transaction: Transaction
  ) {
    const createCEQuery = ChallengeQueryHelper.getContestEligibilityCreateQuery(projectId);
    await transaction.add(createCEQuery);

    const getCEIDQuery = ChallengeQueryHelper.getContestEligibilityIdQuery(projectId);
    const { rows } = await transaction.add(getCEIDQuery);
    if (rows == null || rows.length === 0) throw new Error("Contest Eligibility ID not found");

    const contestEligibilityId = rows[0].contestEligibilityId as number;
    for (const groupId of groupIds) {
      // prettier-ignore
      const createGCEQuery = ChallengeQueryHelper.getGroupContestEligibilityCreateQuery(contestEligibilityId, groupId);
      await transaction.add(createGCEQuery);
    }
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

  private async updateWinnerPrizes(
    projectId: number,
    prizes: Prize[],
    userId: number,
    transaction: Transaction
  ) {
    const existingPrizesQuery = ChallengeQueryHelper.getPrizeListQuery(projectId);
    const { rows } = await transaction.add(existingPrizesQuery);
    if (rows == null) {
      throw new Error("Prizes not found");
    }
    const existingPrizes = rows.map(
      (r) =>
        r as {
          prizeId: number;
          place: number;
          prizeAmount: number;
          numSubmissions: number;
          type: string;
        }
    );

    const prizesToAdd: Prize[] = [];
    const prizesToUpdate = [];

    for (const prize of prizes) {
      const existingPrize = _.find(existingPrizes, (p) => p.place === prize.place);
      if (_.isUndefined(existingPrize)) {
        prizesToAdd.push(prize);
        continue;
      }

      prizesToUpdate.push({
        prizeId: existingPrize.prizeId,
        prizeAmount: prize.amountInCents / 100,
      });

      _.remove(existingPrizes, (p) => p.place === prize.place);
    }

    if (prizesToAdd.length) {
      await this.createWinnerPrizes(projectId, prizesToAdd, userId, transaction);
    }

    if (prizesToUpdate.length) {
      for (const { prizeId, prizeAmount } of prizesToUpdate) {
        const updatePrizeQuery = ChallengeQueryHelper.getPrizeUpdateQuery(
          prizeId,
          prizeAmount,
          userId
        );
        await transaction.add(updatePrizeQuery);
      }
    }

    if (existingPrizes.length) {
      for (const { prizeId } of existingPrizes) {
        const deletePrizeQuery = ChallengeQueryHelper.getPrizeDeleteQuery(prizeId);
        await transaction.add(deletePrizeQuery);
      }
    }
  }

  private async updateCopilotFee(
    projectId: number,
    prizes: Prize[],
    userId: number,
    transaction: Transaction
  ) {
    if (_.isEmpty(prizes)) {
      return;
    }
    const getProjectCopilotResourceQuery = ChallengeQueryHelper.getResourceListQuery(
      projectId,
      ResourceRoleTypeIds.Copilot
    );

    const { rows } = await transaction.add(getProjectCopilotResourceQuery);
    if (rows == null || rows.length === 0) {
      return;
    }
    const copilotFee = prizes[0].amountInCents / 100;
    for (const { resourceId } of rows as { resourceId: number }[]) {
      const updateCopilotPaymentQuery = ChallengeQueryHelper.getProjectPaymentUpdateQuery(
        resourceId,
        copilotFee,
        userId
      );
      await transaction.add(updateCopilotPaymentQuery);
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
        const phaseUpdateQuery = ChallengeQueryHelper.getPhaseUpdateQuery(
          projectId,
          legacyPhase.projectPhaseId,
          phase,
          userId
        );
        await transaction.add(phaseUpdateQuery);
      }
    }

    const projectPhaseIds = _.map(legacyPhases, (p) => p.projectPhaseId);
    if (_.isEmpty(projectPhaseIds)) {
      return;
    }
    // prettier-ignore
    const phaseCriteriaSelectQuery = ChallengeQueryHelper.getPhaseCriteriasSelectQuery(projectPhaseIds);
    const phaseCriteriaSelectResult = await transaction.add(phaseCriteriaSelectQuery);
    const allPhaseCriterias = phaseCriteriaSelectResult.rows!.map((r) => {
      return {
        projectPhaseId: r.projectphaseid,
        phaseCriteriaTypeId: r.phasecriteriatypeid,
        parameter: r.parameter,
      } as PhaseCriteria;
    });
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
      const criteriaToAddKeys = _.differenceWith(
        _.keys(phase.phaseCriteria), // [3]
        phaseCriterias,
        (a, b) => _.toNumber(a) === b.phaseCriteriaTypeId
      );

      const criteriaToAdd: { [key: number]: string } = {};
      for (const c of criteriaToAddKeys) {
        if (phase.phaseCriteria[_.toNumber(c)] != null) {
          criteriaToAdd[_.toNumber(c)] = phase.phaseCriteria[_.toNumber(c)];
        }
      }

      const criteriasToDelete = _.differenceWith(
        phaseCriterias,
        _.keys(phase.phaseCriteria),
        (b, a) => _.toNumber(a) === b.phaseCriteriaTypeId
      );

      const criteriasToUpdateKey = _.intersectionWith(
        _.keys(phase.phaseCriteria),
        phaseCriterias,
        (a, b) =>
          _.toNumber(a) === b.phaseCriteriaTypeId &&
          phase.phaseCriteria[_.toNumber(a)] !== b.parameter
      );
      const criteriaToUpdate: { [key: number]: string } = {};
      for (const c of criteriasToUpdateKey) {
        if (phase.phaseCriteria[_.toNumber(c)] != null) {
          criteriaToUpdate[_.toNumber(c)] = phase.phaseCriteria[_.toNumber(c)];
        }
      }

      const createPhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaCreateQueries(
        legacyPhase.projectPhaseId,
        criteriaToAdd,
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
        criteriaToUpdate,
        userId
      );
      for (const q of updatePhaseCriteriaQueries) {
        await transaction.add(q);
      }
    }
  }
}

export default new LegacyChallengeDomain();
