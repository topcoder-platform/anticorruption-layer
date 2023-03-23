import { Metadata } from "@grpc/grpc-js";
import {
  Operator as RelationalOperator,
  QueryBuilder,
  Transaction,
} from "@topcoder-framework/client-relational";
import {
  CheckExistsResult,
  CreateResult,
  Operator,
  UpdateResult,
} from "@topcoder-framework/lib-common";
import _ from "lodash";
import moment from "moment";
import {
  PhaseStatusIds,
  PhaseTypeIds,
  ProjectCategories,
  ResourceInfoTypeIds,
  ResourceRoleTypeIds,
} from "../config/constants";
import Comparer from "../helper/Comparer";

import ChallengeQueryHelper from "../helper/query-helper/ChallengeQueryHelper";
import { queryRunner } from "../helper/QueryRunner";
import {
  CloseChallengeInput,
  CreateChallengeInput,
  CreateChallengeInput_Phase,
  CreateChallengeInput_Prize,
  LegacyChallenge,
  LegacyChallengeId,
  UpdateChallengeInput,
} from "../models/domain-layer/legacy/challenge";
import { LegacyChallengePhase } from "../models/domain-layer/legacy/challenge_phase";
import { PhaseCriteria } from "../models/domain-layer/legacy/phase";
import { ProjectSchema } from "../schema/project/Project";
import LegacyPhaseDomain from "./LegacyPhase";
import LegacyPrizeDomain from "./Prize";
import LegacyProjectInfoDomain from "./ProjectInfo";
import LegacyResourceDomain from "./Resource";
import LegacyReviewDomain from "./Review";

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

  public async update(input: UpdateChallengeInput): Promise<UpdateResult> {
    const { affectedRows } = await queryRunner.run(
      new QueryBuilder(ProjectSchema)
        .update({ projectStatusId: input.projectStatusId })
        .where(ProjectSchema.columns.projectId, RelationalOperator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
    return {
      updatedCount: affectedRows!,
    };
  }

  public async activateChallenge(input: LegacyChallengeId) {
    // update challenge status
    await this.update({
      projectId: input.legacyChallengeId,
      projectStatusId: 1,
    });
    await LegacyProjectInfoDomain.create({
      projectInfoTypeId: 62, // Project activate date
      value: moment().format("MM.dd.yyyy hh:mm a"),
      projectId: input.legacyChallengeId,
    });
    const { projectPhases } = await LegacyPhaseDomain.getProjectPhases({
      projectId: input.legacyChallengeId,
    });
    const specificationSubmissionPhase = _.find(
      projectPhases,
      (p) => p.phaseTypeId === PhaseTypeIds.SpecificationSubmission
    );
    if (specificationSubmissionPhase) {
      // Start spec review
      await LegacyPhaseDomain.updateProjectPhase({
        projectPhaseId: specificationSubmissionPhase.projectPhaseId,
        fixedStartTime: "CURRENT",
        scheduledStartTime: "CURRENT",
        // TODO: @ThomasKranitsas please double check this - I added this line since this required field was missing
        phaseStatusId: PhaseStatusIds.Open,
        scheduledEndTime: moment()
          .add(specificationSubmissionPhase.duration, "milliseconds")
          .format("MM-dd-yyyy hh:mm:ss"),
      });
      // Check if specification submitter doesn't exist
      const { resources } = await LegacyResourceDomain.getResources({
        projectId: input.legacyChallengeId,
        resourceRoleId: ResourceRoleTypeIds.SpecificationSubmitter,
      });
      if (resources.length === 0) {
        // Create spec submitter
        const createResourceRes = await LegacyResourceDomain.createResource({
          projectId: input.legacyChallengeId,
          resourceRoleId: ResourceRoleTypeIds.SpecificationSubmitter,
          userId: 22838965, // TODO: extract user from interceptors
        });
        const specSubmitterId = createResourceRes.kind
          ? _.get(createResourceRes.kind, createResourceRes.kind?.$case, undefined)
          : undefined;
        if (!specSubmitterId) throw new Error("Failed to create specification submitter");

        // create resource_info
        await LegacyResourceDomain.createResourceInfos({
          resourceId: specSubmitterId,
          resourceInfoTypeId: 2,
          value: "tcwebservice", // TODO: Extract from RPC interceptor
        });
        await LegacyResourceDomain.createResourceInfos({
          resourceId: specSubmitterId,
          resourceInfoTypeId: 7,
          value: "null",
        });
        await LegacyResourceDomain.createResourceInfos({
          resourceId: specSubmitterId,
          resourceInfoTypeId: 8,
          value: "N/A",
        });
        await LegacyResourceDomain.createResourceInfos({
          resourceId: specSubmitterId,
          resourceInfoTypeId: 1,
          value: "22838965", // TODO: Extract from RPC interceptor
        });
        await LegacyResourceDomain.createResourceInfos({
          resourceId: specSubmitterId,
          resourceInfoTypeId: 6,
          value: moment().add().format("MM-dd-yyyy hh:mm:ss"),
        });

        // create upload
        const upload = await LegacyReviewDomain.createUpload({
          projectId: input.legacyChallengeId,
          uploadStatusId: 1,
          uploadTypeId: 1,
          parameter: "parameter", // dummy upload so there is no actual file uploaded
          resourceId: specSubmitterId,
          projectPhaseId: specificationSubmissionPhase.projectPhaseId,
        });
        // create submission
        const uploadId = upload.kind
          ? _.get(upload.kind, upload.kind?.$case, undefined)
          : undefined;
        if (!uploadId) throw new Error("Failed to create upload");
        const createSubmissionRes = await LegacyReviewDomain.createSubmission({
          uploadId,
          submissionStatusId: 1,
          submissionTypeId: 2,
        });
        // resource_submission
        const submissionId = createSubmissionRes.kind
          ? _.get(createSubmissionRes.kind, createSubmissionRes.kind?.$case, undefined)
          : undefined;
        if (!submissionId) throw new Error("Failed to create submission");
        await LegacyReviewDomain.createResourceSubmission({
          resourceId: specSubmitterId,
          submissionId,
        });
        // update project_info to set autopilot to On
        const { projectInfos } = await LegacyProjectInfoDomain.getProjectInfo({
          projectId: input.legacyChallengeId,
          projectInfoTypeId: 9,
        });
        if (projectInfos.length === 0) {
          await LegacyProjectInfoDomain.create({
            projectId: input.legacyChallengeId,
            projectInfoTypeId: 9,
            value: "On",
          });
        } else {
          await LegacyProjectInfoDomain.update({
            projectId: input.legacyChallengeId,
            projectInfoTypeId: 9,
            value: "On",
          });
        }
      }
    }
  }

  public async closeChallenge(input: CloseChallengeInput) {
    // Get the challenge
    const challenge = await this.getLegacyChallenge({ legacyChallengeId: input.projectId });
    // Get the challenge phases:
    const { projectPhases } = await LegacyPhaseDomain.getProjectPhases({
      projectId: input.projectId,
    });

    // close the submission phase
    const submissionPhase = _.find(projectPhases, (p) => p.phaseTypeId === PhaseTypeIds.Submission);
    if (!submissionPhase) throw new Error("Cannot find submission phase");
    if (submissionPhase) {
      if (submissionPhase.phaseStatusId === PhaseStatusIds.Open) {
        await LegacyPhaseDomain.updateProjectPhase({
          phaseStatusId: PhaseStatusIds.Closed,
          projectPhaseId: submissionPhase.projectPhaseId,
          actualEndTime: "CURRENT",
        });
      } else if (submissionPhase.phaseStatusId === PhaseStatusIds.Scheduled) {
        await LegacyPhaseDomain.updateProjectPhase({
          phaseStatusId: PhaseStatusIds.Closed,
          projectPhaseId: submissionPhase.projectPhaseId,
          actualEndTime: "CURRENT",
          actualStartTime: "CURRENT",
        });
      }
    }

    // Open review phase
    const reviewPhases = _.filter(
      projectPhases,
      (p) =>
        _.includes([PhaseTypeIds.Review, PhaseTypeIds.IterativeReview], p.phaseTypeId) &&
        p.phaseStatusId !== PhaseStatusIds.Closed
    );
    _.each(reviewPhases, async (p) => {
      await LegacyPhaseDomain.updateProjectPhase({
        phaseStatusId: PhaseStatusIds.Open,
        projectPhaseId: p.projectPhaseId,
        actualStartTime: "CURRENT",
      });
    });

    // Get winner resource
    const { resources } = await LegacyResourceDomain.getResources({
      projectId: input.projectId,
    });
    const winner = _.find(resources, (r) => r.userId === input.winnerId && r.resourceRoleId === 1);
    if (!winner) throw new Error("Cannot close challenge without winner");
    // Get winner's submission:
    const submission = await LegacyReviewDomain.getSubmission({
      projectId: input.projectId,
      submissionStatusId: 1,
      uploadStatusId: 1,
      resourceId: winner.resourceId,
    });
    let submissionId = 0;

    const challengePrizes = await LegacyPrizeDomain.scan({
      criteria: [
        {
          key: "projectId",
          value: input.projectId,
          operator: Operator.OPERATOR_EQUAL,
        },
        {
          key: "prizeTypeId",
          value: 15,
          operator: Operator.OPERATOR_EQUAL,
        },
        {
          key: "place",
          value: 1,
          operator: Operator.OPERATOR_EQUAL,
        },
      ],
    });

    if (challengePrizes.prizes.length == 0) throw new Error("cannot close challenge without prize");

    const prize = challengePrizes.prizes[0];
    if (submission) {
      submissionId = submission.submissionId;
      await LegacyReviewDomain.updateSubmission({
        submissionId: submission.submissionId,
        initialScore: 100,
        finalScore: 100,
        placement: 1,
        prizeId: prize.prizeId,
      });
    } else {
      // Create the missing submission in order to close the challenge
      const upload = await LegacyReviewDomain.createUpload({
        projectId: input.projectId,
        projectPhaseId: submissionPhase.projectPhaseId,
        resourceId: winner.resourceId,
        uploadTypeId: 1,
        uploadStatusId: 1,
        parameter: "parameter",
      });
      const uploadId = upload.kind ? _.get(upload.kind, upload.kind?.$case, undefined) : undefined;
      if (uploadId) {
        const createSubmissionRes = await LegacyReviewDomain.createSubmission({
          uploadId,
          submissionStatusId: 1,
          initialScore: 100,
          finalScore: 100,
          placement: 1,
          submissionTypeId: 1,
          prizeId: prize.prizeId,
        });
        if (createSubmissionRes.kind) {
          submissionId = _.get(createSubmissionRes.kind, createSubmissionRes.kind?.$case, 0);
        }
        if (!submissionId) throw new Error("Failed to create submission");
      }
    }

    const reviewers = _.filter(resources, (r) => r.resourceRoleId === 4 || r.resourceRoleId === 21);

    for (const reviewer of reviewers) {
      // Remove all review item comments
      await LegacyReviewDomain.deleteReviewItemComment(reviewer.resourceId);
      // Remove all review items
      const { items: reviewItems } = await LegacyReviewDomain.getReviews(reviewer.resourceId);
      for (const r of reviewItems) {
        await LegacyReviewDomain.deleteReviewItem(r.reviewId);
      }
      // Remove all review comments
      await LegacyReviewDomain.deleteReviewComment(reviewer.resourceId);
      // Remove all reviews
      await LegacyReviewDomain.deleteReview(reviewer.resourceId);
      // Remove all resource_info
      await LegacyResourceDomain.deleteResourceInfos({ resourceId: reviewer.resourceId });

      // Remove all reviewers
      await LegacyResourceDomain.deleteResources({
        projectId: input.projectId,
        resourceRoleId: 4, // Reviewer
      });
      await LegacyResourceDomain.deleteResources({
        projectId: input.projectId,
        resourceRoleId: 21, // Iterative Reviewer
      });
    }

    // Create new reviewer using current user's id (22838965 - tcwebservice)
    const createResourceRes = await LegacyResourceDomain.createResource({
      resourceRoleId:
        challenge.projectCategoryId === ProjectCategories.First2Finish
          ? ResourceRoleTypeIds.IterativeReviewer
          : ResourceRoleTypeIds.Reviewer,
      projectId: input.projectId,
      userId: 22838965, // TODO: get this from interceptors
    });
    const reviewerResourceId = createResourceRes.kind
      ? _.get(createResourceRes.kind, createResourceRes.kind?.$case, undefined)
      : undefined;
    if (!reviewerResourceId) throw new Error("error creating resource");
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 1,
      value: "22838965",
    });
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 2,
      value: "tcwebservice",
    });
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 6,
      value: moment().format("MM.dd.yyyy hh:mm a"),
    });
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 7,
      value: "N/A",
    });
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 8,
      value: "N/A",
    });
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 15,
      value: "true",
    });
    // Get scorecard id
    const { phaseCriteriaList } = await LegacyPhaseDomain.getPhaseCriteria({
      projectPhaseId: reviewPhases[0].projectPhaseId, // Assuming there will only be one (currently open) review phase
      phaseCriteriaTypeId: 1,
    });
    let scorecardId = 0;
    if (phaseCriteriaList[0].parameter) {
      scorecardId = _.toNumber(phaseCriteriaList[0].parameter);
    }
    // Create review
    const createReviewRes = await LegacyReviewDomain.createReview({
      resourceId: reviewerResourceId,
      submissionId,
      projectPhaseId: reviewPhases[0].projectPhaseId,
      scorecardId,
      committed: 1,
      score: 100,
      initialScore: 100,
    });
    const createdReviewId = createReviewRes.kind
      ? _.get(createReviewRes.kind, createReviewRes.kind?.$case, undefined)
      : undefined;
    if (!createdReviewId) throw new Error("cannot create review");
    // Get scorecard questions
    const { items: scorecardGroups } = await LegacyReviewDomain.getScorecardGroups(scorecardId);
    for (const sg of scorecardGroups) {
      const { items: scorecardSections } = await LegacyReviewDomain.getScorecardSections(
        sg.scorecardGroupId
      );
      for (const ss of scorecardSections) {
        const createReviewItemRes = await LegacyReviewDomain.createReviewItem({
          reviewId: createdReviewId,
          scorecardQuestionId: ss.scorecardSectionId,
          answer: "10",
          sort: ss.sort,
        });
        const createdReviewItemId = createReviewItemRes.kind
          ? _.get(createReviewItemRes.kind, createReviewItemRes.kind?.$case, undefined)
          : undefined;
        if (!createdReviewItemId) throw new Error("cannot create review item");
        await LegacyReviewDomain.createReviewItemComment({
          resourceId: reviewerResourceId,
          reviewItemId: createdReviewItemId,
          commentTypeId: 1,
          content: "Ok",
          sort: ss.sort,
        });
      }
    }
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
    winnerPrizes: CreateChallengeInput_Prize[],
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
    phases: CreateChallengeInput_Phase[],
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
    for (let i = 0; i < nPhases; i++) {
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
    prizes: CreateChallengeInput_Prize[],
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
        const copilotFee = prizes.find((prize) => prize.type.toLowerCase() === "copilot")?.amount;
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
    phases: CreateChallengeInput_Phase[],
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
