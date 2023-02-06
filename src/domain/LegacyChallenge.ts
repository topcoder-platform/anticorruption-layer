import { ColumnType, Operator, QueryRequest } from "@topcoder-framework/client-relational";
import { Value } from "@topcoder-framework/lib-common";
import { QueryRunner } from "../common/QueryRunner";
import { CheckChallengeExistsResponse } from "../models/domain-layer/legacy/challenge";
import { Project } from "../schema/project/Project";

class LegacyChallengeDomain {
  public async checkChallengeExists(
    legacyChallengeId: number
  ): Promise<CheckChallengeExistsResponse> {
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
}

export default new LegacyChallengeDomain();
