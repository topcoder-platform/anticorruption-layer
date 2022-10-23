import { OutlierDetectionLoadBalancingConfig } from "@grpc/grpc-js/build/src/load-balancer-outlier-detection";
import _ from "lodash";
import { relationalClient } from "../dal/client/relational";
import {
  ColumnType,
  JoinType,
  Operator,
  QueryRequest,
  QueryResponse,
  Value,
} from "../dal/models/rdb/SQL";
import {
  LegacyChallenge,
  LegacyChallengeId,
  LegacyChallengeInfoRequest,
  LegacyChallengePhase,
  LegacyChallengePhaseList,
} from "../models/acl-domain/LegacyChallenge";
import { LookupCriteria } from "../models/common/Common";

class LegacyChallengeDomain {
  constructor(private tableName: string = "project") {}

  public async lookup(
    lookupCriteria: LookupCriteria
  ): Promise<LegacyChallenge[]> {
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "select",
          select: {
            table: this.tableName,
            join: [],
            column: [
              {
                name: "project_id",
                type: ColumnType.INT,
              },
            ],
            where: [
              {
                key: "project_id",
                operator: Operator.EQUAL,
                value: {
                  value: {
                    $case: "intValue",
                    intValue: 123,
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

    const queryResponse: QueryResponse = await relationalClient.query(
      queryRequest
    );

    if (queryResponse.result?.$case == "selectResult") {
      const rows = queryResponse.result.selectResult.rows;
      return rows.map((row) => LegacyChallenge.fromJSON(row.values));
    }

    return [];
  }

  public async checkChallengeExists(
    legacyChallengeId: number
  ): Promise<boolean> {
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "select",
          select: {
            table: this.tableName,
            join: [],
            column: [
              {
                name: "project_id",
                type: ColumnType.INT,
              },
            ],
            where: [
              {
                key: "project_id",
                operator: Operator.EQUAL,
                value: {
                  value: {
                    $case: "intValue",
                    intValue: legacyChallengeId,
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

    const queryResponse: QueryResponse = await relationalClient.query(
      queryRequest
    );

    if (queryResponse.result?.$case == "selectResult") {
      const rows = queryResponse.result.selectResult.rows;
      return Promise.resolve(rows.length > 0);
    }

    return Promise.resolve(false);
  }

  public async addOrUpdateChallengeInfo(
    challengeInfo: LegacyChallengeInfoRequest
  ): Promise<boolean> {
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "insert",
          insert: {
            table: this.tableName,
            columnValue: [],
          },
        },
      },
    };

    const queryResponse: QueryResponse = await relationalClient.query(
      queryRequest
    );

    if (queryResponse.result?.$case == "insertResult") {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
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
                type: ColumnType.INT,
              },
            ],
            where: [
              {
                key: "name",
                operator: Operator.EQUAL,
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

  public async listChallengePhases(
    legacyChallengeId: LegacyChallengeId
  ): Promise<LegacyChallengePhaseList> {
    console.log("Begin query", legacyChallengeId);
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "select",
          select: {
            table: "project_phase",
            join: [
              {
                type: JoinType.INNER,
                joinTable: "phase_type_lu",
                fromTable: "project_phase",
                column: "phase_type_id",
              },
            ],
            column: [
              {
                name: "project_id",
                tableName: "project_phase",
                type: ColumnType.INT,
              },
              {
                name: "project_phase_id",
                tableName: "project_phase",
                type: ColumnType.INT,
              },
              {
                name: "name",
                tableName: "phase_type_lu",
                type: ColumnType.STRING,
              },
              {
                name: "phase_type_id",
                tableName: "project_phase",
                type: ColumnType.INT,
              },
              {
                name: "phase_status_id",
                tableName: "project_phase",
                type: ColumnType.INT,
              },
              {
                name: "scheduled_start_time",
                tableName: "project_phase",
                type: ColumnType.DATETIME,
              },
              {
                name: "scheduled_end_time",
                tableName: "project_phase",
                type: ColumnType.DATETIME,
              },
              {
                tableName: "project_phase",
                name: "actual_start_time",
                type: ColumnType.DATETIME,
              },
              {
                tableName: "project_phase",
                name: "actual_end_time",
                type: ColumnType.DATETIME,
              },
              {
                name: "fixed_start_time",
                tableName: "project_phase",
                type: ColumnType.DATETIME,
              },
              {
                name: "duration",
                tableName: "project_phase",
                type: ColumnType.LONG,
              },
              {
                name: "create_user",
                tableName: "project_phase",
                type: ColumnType.INT,
              },
              {
                name: "create_date",
                tableName: "project_phase",
                type: ColumnType.DATETIME,
              },
              {
                name: "modify_user",
                tableName: "project_phase",
                type: ColumnType.INT,
              },
              {
                name: "modify_date",
                tableName: "project_phase",
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
              const unwrapped = this.unwrap(value); // TODO: lazy again! Badly need to refactor this to a common library
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

  private unwrap(message: Value): string | number | undefined {
    const { value } = message;

    if (value == null) return undefined;

    if (value.$case === "intValue") {
      return value.intValue;
    } else if (value.$case === "dateValue") {
      return value.dateValue.toString();
    } else if (value.$case === "longValue") {
      return value.longValue;
    } else if (value.$case === "stringValue") {
      return value.stringValue.toString();
    } else {
      return undefined;
    }
  }
}

export default new LegacyChallengeDomain();
