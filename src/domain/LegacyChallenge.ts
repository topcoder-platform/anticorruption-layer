import { Metadata } from "@grpc/grpc-js";
import { Operator as RelationalOperator, QueryBuilder, Transaction } from "@topcoder-framework/client-relational";
import {
  CheckExistsResult,
  CreateResult,
  PhaseFact,
  PhaseFactResponse_FactResponse,
  UpdateResult,
} from "@topcoder-framework/lib-common";
import _ from "lodash";
import {
  PhaseStatusIds,
  PhaseTypeIds,
  ProjectPaymentTypeIds,
  ResourceInfoTypeIds,
  ResourceRoleTypeIds,
} from "../config/constants";
import Comparer from "../helper/Comparer";

import { Util } from "../common/Util";
import PaymentCalculator from "../helper/PaymentCalculator";
import PhaseFactHelper from "../helper/PhaseFactHelper";
import ChallengeQueryHelper from "../helper/query-helper/ChallengeQueryHelper";
import MarathonMatchQueryHelper from "../helper/query-helper/MarathonMatchQueryHelper";
import PhaseFactQueryHelper from "../helper/query-helper/PhaseFactQueryHelper";
import ReviewQueryHelper from "../helper/query-helper/ReviewQueryHelper";
import SpecQueryHelper from "../helper/query-helper/SpecQueryHelper";
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

import LegacySyncDomain from "../domain/Sync";

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

    // prettier-ignore
    await this.createSpec(projectId, input.projectCategoryId, input.name, userId, transaction);

    // fine to hardcode since we only have one marathon match category
    if (input.projectCategoryId == 37)
      await this.createMarathonMatch(projectId, input.name, input.phases, userId, transaction);

    await this.createPrizes(projectId, input.winnerPrizes, userId, transaction);
    await this.createProjectInfo(projectId, input.projectInfo, userId, transaction);
    await this.createProjectPhases(projectId, input.phases, userId, transaction);
    // prettier-ignore
    await this.createProjectResources(projectId, input.tcDirectProjectId, input.winnerPrizes, userId, handle, transaction);
    await this.createGroupContestEligibility(projectId, input.groups, userId, transaction);

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
      await this.updatePrizes(projectId, input.prizeUpdate.winnerPrizes, userId, transaction);
      updatedCount++;
    }

    if (input.name != null && input.name.length > 0) {
      await this.createSpecIfNotExists(projectId, input.name, userId, transaction);
    }

    if (input.groupUpdate != null) {
      await this.updateProjectGroups(projectId, input.groupUpdate.groups, userId, transaction);
    }

    transaction.commit();

    // We are only interested in events where the only update is marking project as completed
    // Then we proceed to handle winner and phases sync. In future, this will be done through
    // review API
    if (input.projectStatusId === 7 && updatedCount === 1) {
      const txn = queryRunner.beginTransaction();
      const closePhaseQuery = ChallengeQueryHelper.getClosePhaseQuery(
        projectId,
        Util.dateToInformix(new Date().toISOString())!,
        userId
      );
      await txn.add(closePhaseQuery);
      txn.commit();
      await LegacySyncDomain.syncLegacy(
        {
          projectId: input.projectId,
          updatedTables: [
            { table: "project", primaryKey: "project_id", value: [] },
            {
              table: "project_phase",
              primaryKey: "project_phase_id",
              value: [],
            },
            {
              table: "submission",
              primaryKey: "submission_id",
              value: [],
            },
          ],
        },
        metadata
      );
    }

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
    if (!rows || rows.length === 0) throw new Error(`Cannot find challenge with id: ${input.legacyChallengeId}`);
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

  public async getPhaseFacts(
    legacyChallengeId: number,
    facts: PhaseFact[]
  ): Promise<Array<PhaseFactResponse_FactResponse>> {
    const response: Array<PhaseFactResponse_FactResponse> = [];
    for (const fact of facts) {
      if (fact === PhaseFact.PHASE_FACT_ITERATIVE_REVIEW) {
        const reviewId = await PhaseFactHelper.getReviewIdInCurrentOpenIterativeReviewPhase(legacyChallengeId);

        response.push({
          fact,
          response: {
            submissionCount: await PhaseFactHelper.submissionsCount(legacyChallengeId),
            reviewCount: await PhaseFactHelper.reviewCount(legacyChallengeId),
            wasSubmissionReviewedInCurrentOpenIterativeReviewPhase: reviewId != null,
            // prettier-ignore
            hasWinningSubmission: reviewId != null ? await PhaseFactHelper.reviewHasPassingScore(reviewId) : false,
          },
        });
      }
    }

    return Promise.resolve(response);
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

    if (createQueryResult.lastInsertId == null) throw new Error("Failed to create challenge in legacy database");

    return createQueryResult.lastInsertId;
  }

  private async createProjectInfo(
    projectId: number,
    projectInfo: { [key: number]: string },
    userId: number,
    transaction: Transaction
  ) {
    const createProjectInfoQueries = ChallengeQueryHelper.getChallengeInfoCreateQueries(projectId, projectInfo, userId);

    for (const q of createProjectInfoQueries) {
      await transaction.add(q);
    }
  }

  private async createProjectPhase(
    projectId: number,
    phase: Phase,
    userId: number,
    transaction: Transaction
  ): Promise<number> {
    const createPhaseQuery = ChallengeQueryHelper.getPhaseCreateQuery(projectId, phase, userId);
    const createPhaseResult = await transaction.add(createPhaseQuery);

    const projectPhaseId = createPhaseResult.lastInsertId as number;

    const createPhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaCreateQueries(
      projectPhaseId,
      phase.phaseCriteria,
      userId
    );
    for (const q of createPhaseCriteriaQueries) {
      await transaction.add(q);
    }

    return projectPhaseId;
  }

  private async createProjectPhases(projectId: number, phases: Phase[], userId: number, transaction: Transaction) {
    const phaseWithLegacyPhaseId = [];

    for (const phase of phases) {
      phaseWithLegacyPhaseId.push({
        ...phase,
        projectPhaseId: await this.createProjectPhase(projectId, phase, userId, transaction),
      });
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
    const getObserversToAddQuery = ChallengeQueryHelper.getDirectProjectListUserQuery(directProjectId);

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
        const copilotFee: Prize | undefined = prizes.find((prize) => prize.type?.toLowerCase() === "copilot");

        if (copilotFee != null && copilotFee.amountInCents > 0) {
          await this.createCopilotPayment(copilotFee.amountInCents / 100, resourceId, creatorId, transaction);
        }
      }
    }
  }

  private async createCopilotPayment(fee: number, resourceId: number, userId: number, transaction: Transaction) {
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
    for (const groupId of groupIds) {
      const createCEQuery = ChallengeQueryHelper.getContestEligibilityCreateQuery(projectId);
      await transaction.add(createCEQuery);

      const getCEIDQuery = ChallengeQueryHelper.getContestEligibilityIdQuery(projectId);
      const { rows } = await transaction.add(getCEIDQuery);
      if (rows == null || rows.length === 0) throw new Error("Contest Eligibility ID not found");

      const contestEligibilityId = rows[0].contest_eligibility_id as number;

      // prettier-ignore
      const createGCEQuery = ChallengeQueryHelper.getGroupContestEligibilityCreateQuery(contestEligibilityId, groupId);
      await transaction.add(createGCEQuery);
    }
  }

  private async deleteGroupContestEligibility(
    projectId: number,
    groupIds: number[],
    userId: number,
    transaction: Transaction
  ) {
    for (const groupId of groupIds) {
      const getCEIDDQuery = ChallengeQueryHelper.getContestEligibilityForDeleteQuery(projectId, groupId);
      const { rows } = await transaction.add(getCEIDDQuery);
      if (rows == null || rows.length === 0) throw new Error("Contest Eligibility ID not found");

      const contestEligibilityId = rows[0].contest_eligibility_id as number;

      const createGCEDQuery = ChallengeQueryHelper.getGroupContestEligibilityDeleteQuery(contestEligibilityId);
      await transaction.add(createGCEDQuery);

      const createCEDQuery = ChallengeQueryHelper.getContestEligibilityDeleteQuery(contestEligibilityId);
      await transaction.add(createCEDQuery);
    }
  }

  private async createSpecIfNotExists(projectId: number, title: string, userId: number, transaction: Transaction) {
    const getExternalReferenceIdQuery = ChallengeQueryHelper.getChallengeInfoSelectQuery(projectId, 1);
    const { rows } = await transaction.add(getExternalReferenceIdQuery);
    if (rows == null || rows.length === 0) {
      const projectCategoryQuery = ChallengeQueryHelper.getChallengeCategoryQuery(projectId);
      const { rows } = await transaction.add(projectCategoryQuery);
      if (rows == null || rows.length === 0) throw new Error("Project Category not found");
      const projectCategoryId = rows[0].projectCategoryId as number;

      await this.createSpec(projectId, projectCategoryId, title, userId, transaction);
    }
  }

  /*
  It's okay to hardcode things here a little since we wanna get rid of this code soon :)
  ```csv
    project_category_id,project_type_id,name, category_name
    9,2,Bug Hunt,Bug Hunt, Application
    17,3,Web Design, Not Set
    37,2,Marathon Match, Not Set
    38,2,First2Finish, Application
    39,2,Code, Application
    40,3,Design First2Finish, Not Set
    ```
  */
  private async createSpec(
    projectId: number,
    projectCategoryId: number,
    title: string,
    userId: number,
    transaction: Transaction
  ) {
    const categoryName = _.includes([9, 38, 39], projectCategoryId) ? "Application" : "Not Set";
    const getRootCategoryIdQuery = SpecQueryHelper.getCategoryQuery(categoryName);

    const { rows } = await transaction.add(getRootCategoryIdQuery);
    if (rows == null || rows.length === 0) throw new Error("Root Category ID not found");

    const rootCategoryId = rows[0].categoryId as number;

    const createSpecQuery = SpecQueryHelper.getComponentCatalogCreateQuery({
      currentVersion: 1,
      shortDesc: "NA",
      componentName: title,
      desc: "NA",
      publicInd: 0,
      rootCategoryId,
      statusId: 102, // Status: Approved
    });

    const createSpecResult = await transaction.add(createSpecQuery);
    if (createSpecResult == null || createSpecResult.lastInsertId == null) {
      throw new Error("Unable to create component catalog");
    }
    const componentId: number = createSpecResult.lastInsertId;
    const componentVersion = 1;

    const createComponentVersionQuery = SpecQueryHelper.getComponentVersionCreateQuery({
      componentId,
      phaseId: 112,
      phaseTime: "1976-06-05 19:00:00.000",
      price: 0.0,
      suspendedInd: 0,
      version: componentVersion,
      versionText: "1.0",
    });

    const createComponentVersionResult = await transaction.add(createComponentVersionQuery);
    if (createComponentVersionResult == null || createComponentVersionResult.lastInsertId == null) {
      throw new Error("Unable to create component version");
    }
    const componentVersionId: number = createComponentVersionResult.lastInsertId;

    const projectInfo = {
      1: componentVersionId.toString(), // External Reference ID
      2: componentId.toString(), // Component ID
      // 3: componentVersion.toString(), // Component Version [ not adding this since this is added by domain-challenge during challenge creation! poor design - but we are stuck with it for now]
      5: rootCategoryId.toString(), // Root Category ID
    };

    await this.createProjectInfo(projectId, projectInfo, userId, transaction);
  }

  private async createMarathonMatch(
    projectId: number,
    title: string,
    phases: Phase[],
    userId: number,
    transaction: Transaction
  ) {
    const startDate = _.minBy(phases, (phase: Phase) => phase.scheduledStartTime)?.scheduledStartTime;
    const endDate = _.maxBy(phases, (phase: Phase) => phase.scheduledEndTime)?.scheduledEndTime;

    if (startDate == null || endDate == null) {
      throw new Error(`Start Date or End Date not found for ProjectID: ${projectId}`);
    }

    const createContestQuery = MarathonMatchQueryHelper.getCreateContestQuery({
      name: title,
      startDate: startDate,
      endDate: endDate,
    });

    const createContestResult = await transaction.add(createContestQuery);
    if (createContestResult == null || createContestResult.lastInsertId == null) {
      throw new Error("Unable to create Marathon Match contest");
    }
    const contestId: number = createContestResult.lastInsertId;

    const createRoundQuery = MarathonMatchQueryHelper.getCreateRoundQuery({
      contestId,
      name: title,
      shortName: _.truncate(title, { length: 10 }),
    });
    const createRoundResult = await transaction.add(createRoundQuery);
    if (createRoundResult == null || createRoundResult.lastInsertId == null) {
      throw new Error("Unable to create Marathon Match round");
    }
    const roundId: number = createRoundResult.lastInsertId;

    const createProblemQuery = MarathonMatchQueryHelper.getCreateProblemQuery({
      name: `Match Problem: ${title}`,
      problemText: title,
    });
    const createProblemResult = await transaction.add(createProblemQuery);
    if (createProblemResult == null || createProblemResult.lastInsertId == null) {
      throw new Error("Unable to create Marathon Match problem");
    }
    const problemId: number = createProblemResult.lastInsertId;

    const createComponentQuery = MarathonMatchQueryHelper.getCreateComponentQuery({
      problemId,
    });
    const createComponentResult = await transaction.add(createComponentQuery);
    if (createComponentResult == null || createComponentResult.lastInsertId == null) {
      throw new Error("Unable to create Marathon Match component");
    }
    const componentId: number = createComponentResult.lastInsertId;

    const createRoundComponentQuery = MarathonMatchQueryHelper.getCreateRoundComponentQuery({
      roundId,
      componentId,
    });
    const createRoundComponentResult = await transaction.add(createRoundComponentQuery);
    if (createRoundComponentResult == null) {
      throw new Error("Unable to create Marathon Match round component");
    }

    const projectInfo = {
      56: roundId.toString(), // Marathon Match ID
      86: contestId.toString(), // Marathon Match Contest Id
    };

    await this.createProjectInfo(projectId, projectInfo, userId, transaction);
  }

  private async createPrizes(projectId: number, prizes: Prize[], userId: number, transaction: Transaction) {
    const winnerPrizes = _.filter(prizes, (prize) => _.includes(["placement", "checkpoint"], _.toLower(prize.type)));
    if (!_.isEmpty(winnerPrizes)) {
      await this.createWinnerPrizes(projectId, winnerPrizes, userId, transaction);
    }
    const copilotPrize = _.find(prizes, (prize) => _.toLower(prize.type) === "copilot");
    if (!_.isUndefined(copilotPrize)) {
      await this.createOrUpdateCopilotPrize(projectId, copilotPrize, userId, transaction);
    }
  }

  private async createWinnerPrizes(projectId: number, winnerPrizes: Prize[], userId: number, transaction: Transaction) {
    const createPrizeQueries = ChallengeQueryHelper.getPrizeCreateQueries(projectId, winnerPrizes, userId);

    for (const q of createPrizeQueries) {
      await transaction.add(q);
    }
  }

  private async createOrUpdateCopilotPrize(projectId: number, prize: Prize, userId: number, transaction: Transaction) {
    if (prize.amountInCents === 0) {
      return;
    }
    const getProjectCopilotResourceQuery = ChallengeQueryHelper.getResourceListQuery(
      projectId,
      ResourceRoleTypeIds.Copilot
    );
    const { rows: resourceRows } = await transaction.add(getProjectCopilotResourceQuery);
    if (resourceRows == null || resourceRows.length === 0) {
      return;
    }
    const resourceId = resourceRows[0].resourceId;
    const paymentAmount = prize.amountInCents / 100;

    const getCopilotProjectPaymentQuery = ChallengeQueryHelper.getProjectPaymentSelectQuery(
      resourceId,
      ProjectPaymentTypeIds.CopilotPayment
    );
    const { rows: paymentRows } = await transaction.add(getCopilotProjectPaymentQuery);
    if (paymentRows == null || paymentRows.length === 0) {
      const createCopilotProjectPaymentQuery = ChallengeQueryHelper.getProjectPaymentCreateQuery(
        resourceId,
        paymentAmount,
        ProjectPaymentTypeIds.CopilotPayment,
        userId
      );
      await transaction.add(createCopilotProjectPaymentQuery);
      const getResourceInfoSelectQuery = ChallengeQueryHelper.getResourceInfoSelectQuery(
        resourceId,
        ResourceInfoTypeIds.ManualPayments
      );
      const { rows: resourceInfoRows } = await transaction.add(getResourceInfoSelectQuery);
      if (resourceInfoRows == null || resourceInfoRows.length === 0) {
        const createCopilotResourceInfoQuery = ChallengeQueryHelper.getResourceInfoCreateQuery(
          resourceId,
          ResourceInfoTypeIds.ManualPayments,
          "true",
          userId
        );
        await transaction.add(createCopilotResourceInfoQuery);
      } else if (resourceInfoRows[0].value != "true") {
        const updateCopilotResourceInfoQuery = ChallengeQueryHelper.getResourceInfoUpdateQuery(
          resourceId,
          ResourceInfoTypeIds.ManualPayments,
          "true",
          userId
        );
        await transaction.add(updateCopilotResourceInfoQuery);
      }
    } else if (paymentRows[0].amount != paymentAmount) {
      const updateCopilotPaymentQuery = ChallengeQueryHelper.getProjectPaymentUpdateQuery(
        paymentRows[0].projectPaymentId,
        resourceId,
        paymentAmount,
        userId
      );
      await transaction.add(updateCopilotPaymentQuery);
    }
  }

  private async updatePrizes(projectId: number, prizes: Prize[], userId: number, transaction: Transaction) {
    const winnerPrizes = _.filter(prizes, (prize) => _.includes(["placement", "checkpoint"], _.toLower(prize.type)));
    await this.updateWinnerPrizes(projectId, winnerPrizes, userId, transaction);
    const copilotPrize = _.find(prizes, (prize) => _.toLower(prize.type) === "copilot");
    if (!_.isUndefined(copilotPrize)) {
      await this.createOrUpdateCopilotPrize(projectId, copilotPrize, userId, transaction);
    }
  }

  private async updateWinnerPrizes(projectId: number, prizes: Prize[], userId: number, transaction: Transaction) {
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
          numberOfSubmissions: number;
          prizeTypeId: number;
        }
    );

    const prizesToAdd: Prize[] = [];
    const prizesToUpdate = [];

    const placementPrizes = _.filter(prizes, (prize) => _.toLower(prize.type) === "placement");

    for (const prize of placementPrizes) {
      const existingPrize = _.find(existingPrizes, (p) => p.place === prize.place && p.prizeTypeId === 15);
      if (_.isUndefined(existingPrize)) {
        prizesToAdd.push(prize);
        continue;
      }
      if (existingPrize.prizeAmount !== prize.amountInCents / 100) {
        prizesToUpdate.push({
          prizeId: existingPrize.prizeId,
          prizeAmount: prize.amountInCents / 100,
          numberOfSubmissions: 1,
        });
      }

      _.remove(existingPrizes, (p) => p.place === prize.place && p.prizeTypeId === 15);
    }

    const checkpointPrizes = _.filter(prizes, (prize) => _.toLower(prize.type) === "checkpoint");
    const numOfCheckpointPrizes = checkpointPrizes.length;
    if (numOfCheckpointPrizes > 0) {
      const existingPrize = _.find(existingPrizes, (p) => p.place === 1 && p.prizeTypeId === 14);
      if (_.isUndefined(existingPrize)) {
        prizesToAdd.push(...checkpointPrizes);
      } else {
        prizesToUpdate.push({
          prizeId: existingPrize.prizeId,
          prizeAmount: checkpointPrizes[0].amountInCents / 100,
          numberOfSubmissions: numOfCheckpointPrizes,
        });
      }
      _.remove(existingPrizes, (p) => p.place === 1 && p.prizeTypeId === 14);
    }

    if (prizesToAdd.length) {
      await this.createWinnerPrizes(projectId, prizesToAdd, userId, transaction);
    }

    if (prizesToUpdate.length) {
      for (const { prizeId, prizeAmount, numberOfSubmissions } of prizesToUpdate) {
        const updatePrizeQuery = ChallengeQueryHelper.getPrizeUpdateQuery(
          prizeId,
          prizeAmount,
          numberOfSubmissions,
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

  private async updateProjectPhases(projectId: number, phases: Phase[], userId: number, transaction: Transaction) {
    const phaseSelectQuery = ChallengeQueryHelper.getPhaseSelectQuery(projectId);
    const phaseSelectResult = await transaction.add(phaseSelectQuery);
    const legacyPhases = phaseSelectResult.rows?.map((r) => r as LegacyChallengePhase) ?? [];

    phases.sort((a, b) => new Date(a.scheduledStartTime).getTime() - new Date(b.scheduledStartTime).getTime());
    const legacyPhasesCopy = [...legacyPhases];
    let hasWinningSubmission = false;

    // prettier-ignore
    const phaseCriteriaSelectQuery = ChallengeQueryHelper.getPhaseCriteriasSelectQuery(legacyPhasesCopy.map(p => p.projectPhaseId));
    const phaseCriteriaSelectResult = await transaction.add(phaseCriteriaSelectQuery);
    const allPhaseCriterias = phaseCriteriaSelectResult.rows?.map((r) => {
      return {
        projectPhaseId: r.projectphaseid as number,
        phaseCriteriaTypeId: r.phasecriteriatypeid as number,
        parameter: r.parameter as string,
      } as PhaseCriteria;
    });

    for (const phase of phases) {
      let closestMatch: LegacyChallengePhase | null = null;
      let closestDiff = Infinity;
      legacyPhasesCopy.forEach((legacyPhase) => {
        if (legacyPhase.phaseTypeId === phase.phaseTypeId) {
          const diff = Math.abs(
            Util.dateFromInformix(legacyPhase.scheduledStartTime as string)!.valueOf() -
              new Date(phase.scheduledStartTime).getTime()
          );

          if (diff < closestDiff) {
            closestDiff = diff;
            closestMatch = legacyPhase;
          }
        }
      });

      if (closestMatch == null) {
        console.log("Corresponding Legacy Phase not found", phase, "Create new phase");
        if (hasWinningSubmission) {
          console.log("Challenge already has a winning submission. Skipping phase creation");
          continue;
        }

        const projectPhaseId = await this.createProjectPhase(projectId, phase, userId, transaction);
        console.log(`Created new phase with id ${projectPhaseId}`);
        // create phase dependency
        if (phase.phaseTypeId === PhaseTypeIds.IterativeReview) {
          const lastIterativeReviewPhase = _.findLast(
            legacyPhases,
            (p) => p.phaseTypeId === PhaseTypeIds.IterativeReview
          );
          console.log("Previous Iterative Review Phase", lastIterativeReviewPhase);
          if (lastIterativeReviewPhase != null) {
            const dependencyPhaseId = lastIterativeReviewPhase.projectPhaseId;
            const dependentPhaseId = projectPhaseId;
            await transaction.add(
              ChallengeQueryHelper.getPhaseDependencyCreateQuery(dependencyPhaseId, dependentPhaseId, 0, 1, 0, userId)
            );
          }
        }
        continue;
      } else {
        _.remove(legacyPhasesCopy, (p) => p.projectPhaseId === closestMatch?.projectPhaseId);

        const legacyPhase = closestMatch as LegacyChallengePhase;
        console.log("Corresponding Legacy Phase found", phase, legacyPhase);
        if (phase.phaseTypeId === PhaseTypeIds.IterativeReview && phase.phaseStatusId === PhaseStatusIds.Closed) {
          if (legacyPhase.phaseStatusId != PhaseStatusIds.Closed) {
            hasWinningSubmission = await this.updateSubmissionScore(
              projectId,
              legacyPhase.projectPhaseId,
              userId,
              transaction
            );
          } else continue; // skip if phase is already closed in Informix
        }

        const phaseChanged = Comparer.checkIfPhaseChanged(legacyPhase, phase);

        if (phaseChanged) {
          const { projectPhaseId } = legacyPhase;
          const phaseUpdateQuery = ChallengeQueryHelper.getPhaseUpdateQuery(projectId, projectPhaseId, phase, userId);
          await transaction.add(phaseUpdateQuery);

          // Make necessary phase criteria updates
          const phaseCriterias = _.filter(allPhaseCriterias, (pc) => pc.projectPhaseId === projectPhaseId);
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

          const criteriasToUpdateKey = _.intersectionWith(
            _.keys(phase.phaseCriteria),
            phaseCriterias,
            (a, b) => _.toNumber(a) === b.phaseCriteriaTypeId && phase.phaseCriteria[_.toNumber(a)] !== b.parameter
          );
          const criteriaToUpdate: { [key: number]: string } = {};
          for (const c of criteriasToUpdateKey) {
            if (phase.phaseCriteria[_.toNumber(c)] != null) {
              criteriaToUpdate[_.toNumber(c)] = phase.phaseCriteria[_.toNumber(c)];
            }
          }

          const createPhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaCreateQueries(
            projectPhaseId,
            criteriaToAdd,
            userId
          );
          for (const q of createPhaseCriteriaQueries) {
            await transaction.add(q);
          }

          const updatePhaseCriteriaQueries = ChallengeQueryHelper.getPhaseCriteriaUpdateQueries(
            projectPhaseId,
            criteriaToUpdate,
            userId
          );
          for (const q of updatePhaseCriteriaQueries) {
            await transaction.add(q);
          }
        }
      }
    }
  }

  private async updateSubmissionScore(
    projectId: number,
    projectPhaseId: number,
    userId: number,
    transaction: Transaction
  ): Promise<boolean> {
    const query = PhaseFactQueryHelper.getIterativeReviewScoreByProjectPhaseIdQuery(projectPhaseId);
    const result = await queryRunner.run(query);
    if (result.rows == null) {
      throw new Error("Unable to close Iterative Review Phase. No score found.");
    }

    const { rows } = result as {
      rows: {
        resource_id: number;
        score?: number;
        initial_score?: number;
        min_score?: number;
        submission_id?: number;
      }[];
    };

    if (rows.length === 0) {
      throw new Error("Unable to close Iterative Review Phase. No score found.");
    }

    const {
      resource_id: resourceId,
      score = 0,
      initial_score: initialScore,
      min_score: minScore = 100,
      submission_id: submissionId,
    } = rows[0];

    if (submissionId == null || initialScore == null) {
      throw new Error("Unable to close Iterative Review Phase. No score found.");
    }

    const isPassed = score >= minScore;

    const existingPrizesQuery = ChallengeQueryHelper.getPrizeListQuery(projectId);
    const { rows: prizes } = await transaction.add(existingPrizesQuery);

    const updateSubmissionQuery = ReviewQueryHelper.getSetSubmissionScoreFromReviewQuery(
      {
        submissionId,
        initialScore,
        finalScore: score,
        submissionStatusId: isPassed ? 1 : 3,
        placement: 1,
        userRank: 1,
        prizeId: prizes == null || prizes.length == 0 ? undefined : (prizes[0].prizeId as number),
      },
      userId
    );

    await transaction.add(updateSubmissionQuery);

    await PaymentCalculator.createOrUpdateIterativeReviewerPayment(projectId, resourceId, userId, transaction);
    if (isPassed && prizes != null && prizes.length > 0) {
      const prizeAmount = prizes[0].prizeAmount as number;
      const submitterResourceIdQuery = ReviewQueryHelper.getSubmitterResourceIdQuery(submissionId);
      const { rows } = await transaction.add(submitterResourceIdQuery);
      if (rows != null && rows.length > 0) {
        const submitterResourceId = rows[0].resource_id as number;

        const createProjectPaymentQuery = ChallengeQueryHelper.getProjectPaymentCreateQuery(
          submitterResourceId,
          prizeAmount,
          ProjectPaymentTypeIds.ContestPayment,
          userId
        );
        await transaction.add(createProjectPaymentQuery);
      }
    }

    return isPassed;
  }

  private async updateProjectGroups(
    projectId: number,
    updatedGroups: number[],
    userId: number,
    transaction: Transaction
  ) {
    const getCEIDQuery = ChallengeQueryHelper.getContestEligibilityIdsQuery(projectId);
    const { rows } = await transaction.add(getCEIDQuery);

    const contestEligibilityIds = _.map(rows, "contesteligibilityid");
    const existingGroups: number[] = [];

    for (const cei of contestEligibilityIds) {
      const getProjectGroupsQuery = ChallengeQueryHelper.getGroupContestEligibilitySelectQuery(cei);
      const { rows } = await transaction.add(getProjectGroupsQuery);

      if (rows != null && rows.length !== 0) {
        existingGroups.push(Number(rows[0].group_id));
      }
    }

    const groupsToRemove = _.filter(existingGroups, (e) => !_.includes(updatedGroups, e));
    const groupsToAdd = _.filter(updatedGroups, (e) => !_.includes(existingGroups, e));

    await this.createGroupContestEligibility(projectId, groupsToAdd, userId, transaction);
    await this.deleteGroupContestEligibility(projectId, groupsToRemove, userId, transaction);
  }
}

export default new LegacyChallengeDomain();
