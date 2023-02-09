import _ from 'lodash';
import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { queryRunner } from "../helper/QueryRunner";
import {
  CheckChallengeExistsResponse, CloseChallengeInput, LegacyChallenge, LegacyChallengeId, UpdateChallengeInput,
} from "../models/domain-layer/legacy/challenge";
import { ProjectSchema } from "../schema/project/Project";
import LegacyPhaseDomain from "./Phase";
import LegacyReviewDomain from "./Review";
import LegacyResourceDomain from "./Resource";
import LegacyPrizeDomain from "./Prize";
import { PhaseStatusIds, PhaseTypeIds } from '../config/constants';
import moment from "moment";

class LegacyChallengeDomain {

  public async activateChallenge(input:LegacyChallengeId) {
    // TODO: Activate
  }

  public async closeChallenge(input:CloseChallengeInput) {
    // Get the challenge phases:
    const { projectPhases } = await LegacyPhaseDomain.getProjectPhases({ projectId: input.projectId })

    // close the submission phase
    const submissionPhase = _.find(projectPhases, p => p.phaseTypeId === PhaseTypeIds.Submission)
    if (!submissionPhase) throw new Error("Cannot find submission phase");
    if (submissionPhase) {
      if (submissionPhase.phaseStatusId === PhaseStatusIds.Open) {
        await LegacyPhaseDomain.updateProjectPhase({
          phaseStatusId: PhaseStatusIds.Closed,
          projectPhaseId: submissionPhase.projectPhaseId,
          actualEndTime: "CURRENT"
        });
      } else if (submissionPhase.phaseStatusId === PhaseStatusIds.Scheduled) {
        await LegacyPhaseDomain.updateProjectPhase({
          phaseStatusId: PhaseStatusIds.Closed,
          projectPhaseId: submissionPhase.projectPhaseId,
          actualEndTime: "CURRENT",
          actualStartTime: "CURRENT"
        });
      }
    }

    // Open review phase
    const reviewPhases = _.filter(projectPhases, p => _.includes([PhaseTypeIds.Review, PhaseTypeIds.IterativeReview], p.phaseTypeId) && p.phaseStatusId !== PhaseStatusIds.Closed)
    _.each(reviewPhases, async (p) => {
      await LegacyPhaseDomain.updateProjectPhase({
        phaseStatusId: PhaseStatusIds.Open,
        projectPhaseId: p.projectPhaseId,
        actualStartTime: "CURRENT"
      });
    });

    // Get winner resource
    const { resources } = await LegacyResourceDomain.getResources({
      projectId: input.projectId
    });
    const winner = _.find(resources, r => r.userId === input.winnerId && r.resourceRoleId === 1);
    if (!winner) throw new Error("Cannot close challenge without winner");
    // Get winner's submission:
    const submission = await LegacyReviewDomain.getSubmission({
      projectId: input.projectId,
      submissionStatusId: 1,
      uploadStatusId: 1,
      resourceId: winner.resourceId
    });
    let submissionId = 0;

    const prize = await LegacyPrizeDomain.getSingle({
      projectId: input.projectId,
      prizeTypeId: 15,
      place: 1
    })
    if (!prize) throw new Error("cannot close challenge without prize")

    if (submission) {
      submissionId = submission.submissionId;
      await LegacyReviewDomain.updateSubmission({
        submissionId: submission.submissionId,
        initialScore: 100,
        finalScore: 100,
        placement: 1,
        prizeId: prize.prizeId
      })
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
      const uploadId = upload.kind ? _.get(upload.kind, upload.kind?.$case, undefined) : undefined
      if (uploadId) {
        const createSubmissionRes = await LegacyReviewDomain.createSubmission({
          uploadId,
          submissionStatusId: 1,
          initialScore: 100,
          finalScore: 100,
          placement: 1,
          submissionTypeId: 1,
          prizeId: prize.prizeId
        })
        if (createSubmissionRes.kind) {
          submissionId = _.get(createSubmissionRes.kind, createSubmissionRes.kind?.$case, 0)
        }
        if (!submissionId) throw new Error("Failed to create submission");
      }
    }

    const reviewers = _.filter(resources, r => r.resourceRoleId === 4 || r.resourceRoleId === 21)

    for (const reviewer of reviewers) {
      // Remove all review item comments
      await LegacyReviewDomain.deleteReviewItemComment(reviewer.resourceId)
      // Remove all review items
      const { items: reviewItems } = await LegacyReviewDomain.getReviews(reviewer.resourceId)
      for (const r of reviewItems) {
        await LegacyReviewDomain.deleteReviewItem(r.reviewId)
      }
      // Remove all review comments
      await LegacyReviewDomain.deleteReviewComment(reviewer.resourceId)
      // Remove all reviews
      await LegacyReviewDomain.deleteReview(reviewer.resourceId)
      // Remove all resource_info
      await LegacyResourceDomain.deleteResourceInfos({ resourceId: reviewer.resourceId })

      // Remove all reviewers
      await LegacyResourceDomain.deleteResources({
        projectId: input.projectId,
        resourceRoleId: 4 // Reviewer
      })
      await LegacyResourceDomain.deleteResources({
        projectId: input.projectId,
        resourceRoleId: 21 // Iterative Reviewer
      })
    }

    // Create new reviewer using current user's id (22838965 - tcwebservice)
    const createResourceRes = await LegacyResourceDomain.createResource({
      resourceRoleId: 4,
      projectId: input.projectId,
      userId: 22838965 // TODO: get this from interceptors
    })
    const reviewerResourceId = createResourceRes.kind ? _.get(createResourceRes.kind, createResourceRes.kind?.$case, undefined) : undefined
    if (!reviewerResourceId) throw new Error("error creating resource");
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 1,
      value: "22838965"
    })
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 2,
      value: "tcwebservice"
    })
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 6,
      value: moment().format('MM.dd.yyyy hh:mm a')
    })
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 7,
      value: "N/A"
    })
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 8,
      value: "N/A"
    })
    await LegacyResourceDomain.createResourceInfos({
      resourceId: reviewerResourceId,
      resourceInfoTypeId: 15,
      value: "true"
    })
    // Get scorecard id
    const { phaseCriteriaList } = await LegacyPhaseDomain.getPhaseCriteria({
      projectPhaseId: reviewPhases[0].projectPhaseId, // Assuming there will only be one (currently open) review phase
      phaseCriteriaTypeId: 1
    })
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
      initialScore: 100
    })
    const createdReviewId = createReviewRes.kind ? _.get(createReviewRes.kind, createReviewRes.kind?.$case, undefined) : undefined
    if (!createdReviewId) throw new Error("cannot create review")
    // Get scorecard questions
    const { items: scorecardGroups } = await LegacyReviewDomain.getScorecardGroups(scorecardId);
    for (const sg of scorecardGroups) {
      const { items: scorecardSections } = await LegacyReviewDomain.getScorecardSections(sg.scorecardGroupId)
      for (const ss of scorecardSections) {
        const createReviewItemRes = await LegacyReviewDomain.createReviewItem({
          reviewId: createdReviewId,
          scorecardQuestionId: ss.scorecardSectionId,
          answer: "10",
          sort: ss.sort
        })
        const createdReviewItemId = createReviewItemRes.kind ? _.get(createReviewItemRes.kind, createReviewItemRes.kind?.$case, undefined) : undefined
        if (!createdReviewItemId) throw new Error("cannot create review item")
        await LegacyReviewDomain.createReviewItemComment({
          resourceId: reviewerResourceId,
          reviewItemId: createdReviewItemId,
          commentTypeId: 1,
          content: "Ok",
          sort: ss.sort
        })
      }
    }
  }

  public async update(input:UpdateChallengeInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectSchema)
        .update({ projectStatusId: input.projectStatusId, modifyUser: input.modifyUser })
        .where(ProjectSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
  }

  public async getLegacyChallenge(
    input: LegacyChallengeId
  ): Promise<LegacyChallenge|undefined> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectSchema)
        .select(..._.map(ProjectSchema.columns))
        .where(ProjectSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.legacyChallengeId,
          },
        })
        .limit(1)
        .build()
    );
    return rows?.length ? LegacyChallenge.fromPartial(rows[0] as LegacyChallenge) : undefined;
  }

  public async checkChallengeExists(
    legacyChallengeId: number
  ): Promise<CheckChallengeExistsResponse> {
    const { projectId } = ProjectSchema.columns;

    const query = new QueryBuilder(ProjectSchema)
      .select(projectId)
      .where(projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: legacyChallengeId,
        },
      })
      .limit(1)
      .build();

    const { rows } = await queryRunner.run(query);

    return {
      exists: rows?.length == 1,
    };
  }

  public async createLegacyChallenge(input: any): Promise<number> {
    return Promise.resolve(123);
  }

  // public async listAvailableChallengeInfoTypes(key: string): Promise<number> {
  //   const queryRequest: QueryRequest = {
  //     query: {
  //       query: {
  //         $case: "select",
  //         select: {
  //           table: "project_info_type_lu",
  //           join: [],
  //           column: [
  //             {
  //               name: "",
  //               type: ColumnType.COLUMN_TYPE_INT,
  //             },
  //           ],
  //           where: [
  //             {
  //               key: "name",
  //               operator: Operator.OPERATOR_EQUAL,
  //               value: {
  //                 value: {
  //                   $case: "stringValue",
  //                   stringValue: key,
  //                 },
  //               },
  //             },
  //           ],
  //           groupBy: [],
  //           orderBy: [],
  //           limit: 1,
  //           offset: 0,
  //         },
  //       },
  //     },
  //   };
  //   return Promise.resolve(10);
  // }
}

export default new LegacyChallengeDomain();
