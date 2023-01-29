import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { queryRunner } from "../helper/QueryRunner";
import {
  CheckChallengeExistsResponse,
  CreateChallengeInput,
} from "../models/domain-layer/legacy/challenge";
import { ProjectSchema } from "../schema/project/Project";

class LegacyChallengeDomain {
  public async checkChallengeExists(
    legacyChallengeId: number
  ): Promise<CheckChallengeExistsResponse> {
<<<<<<< HEAD
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
    const transaction = queryRunner.beginTransaction();

    const createLegacyChallengeQuery = new QueryBuilder(ProjectSchema)
      .insert({
        projectStatusId: input.projectStatusId,
        projectCategoryId: input.projectCategoryId,
        tcDirectProjectId: input.tcDirectProjectId,
      })
      .build();

    const createLegacyChallengeQueryResult = await transaction.add(createLegacyChallengeQuery);
    if (createLegacyChallengeQueryResult instanceof Error) {
      transaction.rollback();
      return Promise.reject({
        message: "Failed to create legacy challenge",
      });
    }

    const { lastInsertId: legacyChallengeId } = createLegacyChallengeQueryResult;

    return Promise.resolve(legacyChallengeId!);
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
=======
    const challenges = (await new QueryRunner(Project)
      .select([Project.columns.projectId])
      .where({
        key: "project_id",
        operator: Operator.OPERATOR_EQUAL,
        value: {
          value: {
            $case: "intValue",
            intValue: legacyChallengeId,
          },
        },
      })
      .limit(1)
      .offset(0)
      .exec()) as [
      {
        values: {
          projectId: Value;
        };
      }
    ];

    return {
      exists: challenges.length == 1,
    };
  }

  public async listAvailableChallengeInfoTypes(key: string): Promise<number> {
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "select",
          select: {
            table: "project_info_type_lu",
            join: [],
            column: [
              {
                name: "",
                type: ColumnType.COLUMN_TYPE_INT,
              },
            ],
            where: [
              {
                key: "name",
                operator: Operator.OPERATOR_EQUAL,
                value: {
                  value: {
                    $case: "stringValue",
                    stringValue: key,
                  },
                },
              },
            ],
            groupBy: [],
            orderBy: [],
            limit: 1,
            offset: 0,
          },
        },
      },
    };
    return Promise.resolve(10);
  }
>>>>>>> 72cf261 (feat: use @topcoder-framework/lib-client for rdb types)
}

export default new LegacyChallengeDomain();
