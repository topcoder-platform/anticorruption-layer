import { Operator, Query, QueryBuilder } from "@topcoder-framework/client-relational";
import { UpdateResult, Value } from "@topcoder-framework/lib-common";
import { Util } from "../common/Util";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateSubmissionInput, UpdateSubmissionInput,
} from "../models/domain-layer/legacy/submission";
import { ProjectSchema } from "../schema/project/Project";
import { LegacySubmissionSchema } from "../schema/submission/Submission";

class LegacySubmissionDomain {
  public async checkSubmissionExists(
    legacySubmissionId: number
  ): Promise<any> {
    const { projectId } = ProjectSchema.columns;

    const query = new QueryBuilder(ProjectSchema)
      .select(projectId)
      .where(projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: legacySubmissionId,
        },
      })
      .limit(1)
      .build();

    const { rows } = await queryRunner.run(query);

    return {
      exists: rows?.length == 1,
    };
  }

  public async createLegacySubmission(input: CreateSubmissionInput): Promise<number> {
    const transaction = queryRunner.beginTransaction();

    const createLegacySubmissionQuery = new QueryBuilder(ProjectSchema)
      .insert({
        submissionStatusId: input.submissionStatusId,
        submissionTypeId: input.submissionTypeId,
        uploadId: input.uploadId,
        createUser: input.createUser,
        modifyUser: input.modifyUser,
        createDate: input.createDate,
        modifyDate: input.modifyDate,
      })
      .build();

    const createLegacySubmissionQueryResult = await transaction.add(createLegacySubmissionQuery);
    if (createLegacySubmissionQueryResult instanceof Error) {
      transaction.rollback();
      return Promise.reject({
        message: "Failed to create legacy submission",
      });
    }

    const { lastInsertId: legacySubmissionId } = createLegacySubmissionQueryResult;

    return Promise.resolve(legacySubmissionId!);
  }

  // public async listAvailableSubmissionInfoTypes(key: string): Promise<number> {
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

  public async update(input: UpdateSubmissionInput): Promise<UpdateResult> {   
    const query: Query = new QueryBuilder(LegacySubmissionSchema)
      .update({ ...input })
      .where(...Util.toScanCriteria({ ...input } as { [key: string]: number|string|undefined }))
      .build();

    const { affectedRows } = await queryRunner.run(query);
    return {
      updatedCount: affectedRows || 0,
    }
  }
}

export default new LegacySubmissionDomain();
