import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import { CreateReviewInput, CreateReviewItemInput, GetSubmissionInput, Submission, Upload } from "../models/domain-layer/legacy/review";
import { ReviewSchema } from "../schema/project/Review";
import { ReviewItemSchema } from "../schema/project/ReviewItem";
import { SubmissionSchema } from "../schema/project/Submission";
import { UploadSchema } from "../schema/project/Upload";

class LegacyReviewDomain {

  public async getUploadId(input:GetSubmissionInput): Promise<number> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(UploadSchema)
        .select(..._.map(UploadSchema.columns))
        .where(UploadSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
    if (!rows || rows?.length === 0) throw new Error('Upload not found')
    return Upload.fromPartial(rows[0] as Upload).uploadId;
  }

  public async getSubmission(input:GetSubmissionInput): Promise<Submission|undefined> {
    const uploadId:number = await this.getUploadId(input);
    const { rows } = await queryRunner.run(
      new QueryBuilder(SubmissionSchema)
        .select(..._.map(SubmissionSchema.columns))
        .where(SubmissionSchema.columns.uploadId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: uploadId,
          },
        })
        .limit(1)
        .build()
    );
    if (!rows || rows?.length === 0) throw new Error('Submission not found')
    return Submission.fromPartial(rows[0] as Submission);
  }

  public async createReview(input:CreateReviewInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ReviewSchema)
      .insert(createInput)
      .build()
    )
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async createReviewItem(input:CreateReviewItemInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ReviewItemSchema)
      .insert(createInput)
      .build()
    )
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }
}

export default new LegacyReviewDomain();
