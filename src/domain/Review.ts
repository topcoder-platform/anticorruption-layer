import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import { CreateResourceSubmissionInput } from "../models/domain-layer/legacy/resource_submission";
import {
  CreateReviewInput,
  CreateReviewItemCommentInput,
  CreateReviewItemInput,
  CreateSubmissionInput,
  CreateUploadInput,
  GetSubmissionInput,
  Review,
  ReviewList,
  ScorecardGroup,
  ScorecardGroupList,
  ScorecardSection,
  ScorecardSectionList,
  Submission,
  UpdateSubmissionInput,
  Upload,
} from "../models/domain-layer/legacy/review";
import { ReviewSchema } from "../schema/project/Review";
import { ReviewCommentSchema } from "../schema/project/ReviewComment";
import { ReviewItemSchema } from "../schema/project/ReviewItem";
import { ReviewItemCommentSchema } from "../schema/project/ReviewItemComment";
import { ScorecardGroupSchema } from "../schema/project/ScorecardGroup";
import { ScorecardSectionSchema } from "../schema/project/ScorecardSection";
import { SubmissionSchema } from "../schema/project/Submission";
import { UploadSchema } from "../schema/project/Upload";
import { ResourceSubmissionSchema } from "../schema/resource/ResourceSubmission";
import { TCWEBSERVICE } from "../config/constants"

class LegacyReviewDomain {
  public async createUpload(input: CreateUploadInput): Promise<CreateResult> {
    const createInput = {
      createUser: TCWEBSERVICE,
      modifyUser: TCWEBSERVICE,
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(UploadSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async getUploadId(input: GetSubmissionInput): Promise<number | undefined> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(UploadSchema)
        .select(..._.map(UploadSchema.columns))
        .where(UploadSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(UploadSchema.columns.uploadStatusId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: 1, // Active
          },
        })
        .andWhere(UploadSchema.columns.resourceRoleId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: 1, // Submitter
          },
        })
        .andWhere(UploadSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceId,
          },
        })
        .build()
    );
    if (!rows || rows?.length === 0) return undefined;
    return Upload.fromPartial(rows[0] as Upload).uploadId;
  }

  public async getSubmission(input: GetSubmissionInput): Promise<Submission | undefined> {
    const uploadId: number | undefined = await this.getUploadId(input);
    if (!uploadId) return undefined;
    const { rows } = await queryRunner.run(
      new QueryBuilder(SubmissionSchema)
        .select(..._.map(SubmissionSchema.columns))
        .where(SubmissionSchema.columns.uploadId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: uploadId,
          },
        })
        .build()
    );
    if (!rows || rows?.length === 0) return undefined;
    return Submission.fromPartial(rows[0] as Submission);
  }

  public async updateSubmission(input: UpdateSubmissionInput) {
    await queryRunner.run(
      new QueryBuilder(SubmissionSchema)
        .update({
          ...input,
        })
        .where(SubmissionSchema.columns.submissionId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.submissionId,
          },
        })
        .build()
    );
  }

  public async createSubmission(input: CreateSubmissionInput): Promise<CreateResult> {
    const createInput = {
      createUser: TCWEBSERVICE,
      modifyUser: TCWEBSERVICE,
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ReviewSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async createResourceSubmission(
    input: CreateResourceSubmissionInput
  ): Promise<CreateResult> {
    const createInput = {
      createUser: TCWEBSERVICE,
      modifyUser: TCWEBSERVICE,
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ResourceSubmissionSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async createReview(input: CreateReviewInput): Promise<CreateResult> {
    const createInput = {
      createUser: TCWEBSERVICE,
      modifyUser: TCWEBSERVICE,
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ReviewSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async createReviewItem(input: CreateReviewItemInput): Promise<CreateResult> {
    const createInput = {
      createUser: TCWEBSERVICE,
      modifyUser: TCWEBSERVICE,
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ReviewItemSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async createReviewItemComment(input: CreateReviewItemCommentInput): Promise<CreateResult> {
    const createInput = {
      createUser: TCWEBSERVICE,
      modifyUser: TCWEBSERVICE,
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ReviewItemCommentSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async deleteReviewItem(reviewId: number) {
    await queryRunner.run(
      new QueryBuilder(ReviewItemSchema)
        .delete()
        .where(ReviewItemSchema.columns.reviewId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: reviewId,
          },
        })
        .build()
    );
  }

  public async getReviews(resourceId: number): Promise<ReviewList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ReviewSchema)
        .select(..._.map(ReviewSchema.columns))
        .where(ReviewSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: resourceId,
          },
        })
        .build()
    );

    return { items: rows!.map((r) => Review.fromPartial(r as Review)) };
  }

  public async deleteReview(resourceId: number) {
    await queryRunner.run(
      new QueryBuilder(ReviewSchema)
        .delete()
        .where(ReviewSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: resourceId,
          },
        })
        .build()
    );
  }

  public async deleteReviewComment(resourceId: number) {
    await queryRunner.run(
      new QueryBuilder(ReviewCommentSchema)
        .delete()
        .where(ReviewCommentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: resourceId,
          },
        })
        .build()
    );
  }

  public async deleteReviewItemComment(resourceId: number) {
    await queryRunner.run(
      new QueryBuilder(ReviewItemCommentSchema)
        .delete()
        .where(ReviewItemCommentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: resourceId,
          },
        })
        .build()
    );
  }

  public async getScorecardSections(scorecardGroupId: number): Promise<ScorecardSectionList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ScorecardSectionSchema)
        .select(..._.map(ScorecardSectionSchema.columns))
        .where(ScorecardSectionSchema.columns.scorecardGroupId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: scorecardGroupId,
          },
        })
        .build()
    );
    return { items: rows!.map((r) => ScorecardSection.fromPartial(r as ScorecardSection)) };
  }

  public async getScorecardGroups(scorecardId: number): Promise<ScorecardGroupList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ScorecardGroupSchema)
        .select(..._.map(ScorecardGroupSchema.columns))
        .where(ScorecardGroupSchema.columns.scorecardId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: scorecardId,
          },
        })
        .build()
    );
    return { items: rows!.map((r) => ScorecardGroup.fromPartial(r as ScorecardGroup)) };
  }
}

export default new LegacyReviewDomain();
