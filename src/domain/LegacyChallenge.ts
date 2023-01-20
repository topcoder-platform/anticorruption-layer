import _ from "lodash";

import { relationalClient } from "../grpc/client/relational";
import { ColumnType, Operator, QueryRequest, QueryResponse } from "../grpc/models/rdb/relational";

class LegacyChallengeDomain {
  constructor(private tableName: string = "project") {}

  // public async lookup(lookupCriteria: LookupCriteria): Promise<LegacyChallenge[]> {
  //   const queryRequest: QueryRequest = {
  //     query: {
  //       query: {
  //         $case: "select",
  //         select: {
  //           table: this.tableName,
  //           join: [],
  //           column: [
  //             {
  //               name: "project_id",
  //               type: ColumnType.COLUMN_TYPE_INT,
  //             },
  //           ],
  //           where: [
  //             {
  //               key: "project_id",
  //               operator: Operator.OPERATOR_EQUAL,
  //               value: {
  //                 value: {
  //                   $case: "intValue",
  //                   intValue: 123,
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

  //   const queryResponse: QueryResponse = await relationalClient.query(queryRequest);

  //   if (queryResponse.result?.$case == "selectResult") {
  //     const rows = queryResponse.result.selectResult.rows;
  //     return rows.map((row) => LegacyChallenge.fromJSON(row.values));
  //   }

  //   return [];
  // }

  public async checkChallengeExists(legacyChallengeId: number): Promise<boolean> {
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
                type: ColumnType.COLUMN_TYPE_INT,
              },
            ],
            where: [
              {
                key: "project_id",
                operator: Operator.OPERATOR_EQUAL,
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

    const queryResponse: QueryResponse = await relationalClient.query(queryRequest);

    if (queryResponse.result?.$case == "selectResult") {
      const rows = queryResponse.result.selectResult.rows;
      return Promise.resolve(rows.length > 0);
    }

    return Promise.resolve(false);
  }

  // public async addOrUpdateChallengeInfo(
  //   challengeInfo: LegacyChallengeInfoRequest
  // ): Promise<boolean> {
  //   const queryRequest: QueryRequest = {
  //     query: {
  //       query: {
  //         $case: "insert",
  //         insert: {
  //           table: this.tableName,
  //           columnValue: [],
  //         },
  //       },
  //     },
  //   };

  //   const queryResponse: QueryResponse = await relationalClient.query(
  //     queryRequest
  //   );

  //   if (queryResponse.result?.$case == "insertResult") {
  //     return Promise.resolve(true);
  //   }

  //   return Promise.resolve(false);
  // }

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
