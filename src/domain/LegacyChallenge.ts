import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { queryRunner } from "../helper/QueryRunner";
import {
  CheckChallengeExistsResponse,
  CreateChallengeInput
} from "../models/domain-layer/legacy/challenge";
import { ProjectSchema } from "../schema/project/Project";

class LegacyChallengeDomain {
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

  public async createLegacyChallenge(input: CreateChallengeInput): Promise<number> {
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
