import _ from "lodash";
import { relationalClient } from "../dal/client/relational";
import {
  QueryRequest,
  JoinType,
  ColumnType,
  QueryResponse,
  Operator,
  ColumnValue,
  Value,
} from "../dal/models/rdb/SQL";
import Util from "../helper/util";
import {
  LegacyChallengeId,
  LegacyChallengePhaseList,
  LegacyChallengePhase,
} from "../models/acl-domain/LegacyChallenge";
import { UpdateResponse } from "../models/acl-service/LegacyChallenge";

class LegacyChallengePhaseDomain {
  constructor(private tableName: string = "project_phase") {}

  public async listChallengePhases(
    legacyChallengeId: LegacyChallengeId
  ): Promise<LegacyChallengePhaseList> {
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "select",
          select: {
            table: this.tableName,
            join: [
              {
                type: JoinType.INNER,
                joinTable: "phase_type_lu",
                fromTable: this.tableName,
                column: "phase_type_id",
              },
            ],
            column: [
              {
                name: "project_id",
                tableName: this.tableName,
                type: ColumnType.INT,
              },
              {
                name: "project_phase_id",
                tableName: this.tableName,
                type: ColumnType.INT,
              },
              {
                name: "name",
                tableName: "phase_type_lu",
                type: ColumnType.STRING,
              },
              {
                name: "phase_type_id",
                tableName: this.tableName,
                type: ColumnType.INT,
              },
              {
                name: "phase_status_id",
                tableName: this.tableName,
                type: ColumnType.INT,
              },
              {
                name: "scheduled_start_time",
                tableName: this.tableName,
                type: ColumnType.DATETIME,
              },
              {
                name: "scheduled_end_time",
                tableName: this.tableName,
                type: ColumnType.DATETIME,
              },
              {
                tableName: this.tableName,
                name: "actual_start_time",
                type: ColumnType.DATETIME,
              },
              {
                tableName: this.tableName,
                name: "actual_end_time",
                type: ColumnType.DATETIME,
              },
              {
                name: "fixed_start_time",
                tableName: this.tableName,
                type: ColumnType.DATETIME,
              },
              {
                name: "duration",
                tableName: this.tableName,
                type: ColumnType.LONG,
              },
              {
                name: "create_user",
                tableName: this.tableName,
                type: ColumnType.INT,
              },
              {
                name: "create_date",
                tableName: this.tableName,
                type: ColumnType.DATETIME,
              },
              {
                name: "modify_user",
                tableName: this.tableName,
                type: ColumnType.INT,
              },
              {
                name: "modify_date",
                tableName: this.tableName,
                type: ColumnType.DATETIME,
              },
            ],
            where: [
              {
                key: "project_id",
                operator: Operator.EQUAL,
                value: {
                  value: {
                    $case: "intValue",
                    intValue: legacyChallengeId.legacyChallengeId,
                  },
                },
              },
            ],
            offset: 0,
            limit: 0,
            groupBy: [],
            orderBy: [],
          },
        },
      },
    };

    const queryResponse: QueryResponse = await relationalClient.query(
      queryRequest
    );

    if (queryResponse.result?.$case == "selectResult") {
      const rows = queryResponse.result.selectResult.rows;

      return {
        legacyChallengePhases: rows.map((row) =>
          LegacyChallengePhase.fromJSON(
            Object.entries(row.values).reduce<{
              [key: string]: number | string | undefined; // TODO: I'm being lazy! This should be in a common library
            }>((acc, [key, value]) => {
              const unwrapped = Util.unwrap(value); // TODO: lazy again! Badly need to refactor this to a common library
              acc[_.camelCase(key)] = unwrapped == "" ? undefined : unwrapped;
              return acc;
            }, {})
          )
        ),
      };
    }

    return Promise.resolve({
      legacyChallengePhases: [],
    });
  }

  public async updateChallengePhases(
    phaseList: LegacyChallengePhaseList
  ): Promise<UpdateResponse> {
    // TODO: use bulk-query
    for (const phase of phaseList.legacyChallengePhases) {
      const queryRequest: QueryRequest = {
        query: {
          query: {
            $case: "update",
            update: {
              table: this.tableName,
              columnValue: Object.entries(phase)
                .filter(([key, value]) => {
                  return (
                    key !== "projectPhaseId" && value != null && value != ""
                  );
                })
                .reduce<Array<ColumnValue>>(
                  (acc, [key, value]: [string, number | string]) => {
                    let updateValue: Partial<Value> = {};

                    if (typeof value === "string") {
                      if (key.indexOf("Time") != -1) {
                        updateValue.value = {
                          $case: "datetimeValue",
                          datetimeValue: value,
                        };
                      } else {
                        updateValue.value = {
                          $case: "stringValue",
                          stringValue: value,
                        };
                      }
                    } else {
                      updateValue.value = {
                        $case: "longValue",
                        longValue: value,
                      };
                    }

                    acc.push({
                      column: _.snakeCase(key),
                      value: Value.fromPartial(updateValue),
                    });

                    return acc;
                  },
                  []
                ),
              where: [
                {
                  key: "project_phase_id",
                  operator: Operator.EQUAL,
                  value: {
                    value: {
                      $case: "intValue",
                      intValue: phase.projectPhaseId,
                    },
                  },
                },
              ],
            },
          },
        },
      };

      console.log("query", JSON.stringify(queryRequest, null, 2));
      const queryResponse = await relationalClient.query(queryRequest);
      console.log("update-phase result", queryResponse);
    }

    return {
      success: true,
    };
  }
}

export default new LegacyChallengePhaseDomain("project_phase");
