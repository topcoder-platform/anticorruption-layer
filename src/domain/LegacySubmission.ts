import { QueryBuilder, QueryResult } from "@topcoder-framework/client-relational";
import SubmissionQueryHelper from "../helper/query-helper/SubmissionQueryHelper";
import { queryRunner } from "../helper/QueryRunner";
import { CreateSubmissionInput } from "../models/domain-layer/legacy/submission";
import { SubmissionSchema } from "../schema/project/Submission";

const submissionTypes = {
  'Contest Submission': { id: 1, roleId: 1 },
  'Specification Submission': { id: 2, roleId: 17 },
  'Checkpoint Submission': { id: 3, roleId: 1 },
  'Studio Final Fix Submission': { id: 4, roleId: 1 }
}
class LegacySubmissionDomain {
  public async checkSubmissionExists(legacySubmissionId: number): Promise<any> {
    // const { projectId } = SubmissionSchema.columns;

    // const query = new QueryBuilder(SubmissionSchema)
    //   .select(projectId)
    //   .where(projectId, Operator.OPERATOR_EQUAL, {
    //     value: {
    //       $case: "intValue",
    //       intValue: legacySubmissionId,
    //     },
    //   })
    //   .limit(1)
    //   .build();

    // const { rows } = await queryRunner.run(query);

    // return {
    //   exists: rows?.length == 1,
    // };
  }

  public async createLegacySubmission(input: CreateSubmissionInput): Promise<number> {
    // eslint-disable-next-line
    const subRoleId: string = (submissionTypes as any)[input.type].roleId;
    const challengePropertiesQuery = SubmissionQueryHelper
      .getChallengeProperties(<string>input.challengeId, <number>input.memberId, subRoleId, <string>input.submissionPhaseId);

    const { rows }: QueryResult = await queryRunner.run(challengePropertiesQuery);
    console.log(rows)
    return 0

    // const createLegacySubmissionQuery = new QueryBuilder(SubmissionSchema)
    //   .insert({
    //     submissionStatusId: input.submissionStatusId,
    //     submissionTypeId: input.submissionTypeId,
    //     uploadId: input.uploadId,
    //   })
    //   .build();
    // if (createLegacySubmissionQueryResult instanceof Error) {
    //   transaction.rollback();
    //   return Promise.reject({
    //     message: "Failed to create legacy submission",
    //   });
    // }

    // const { lastInsertId: legacySubmissionId } = createLegacySubmissionQueryResult;

    // return Promise.resolve(legacySubmissionId!);
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
}

export default new LegacySubmissionDomain();
