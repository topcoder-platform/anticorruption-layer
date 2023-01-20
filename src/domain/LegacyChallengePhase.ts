import _ from "lodash";

import {
  LegacyChallengePhase,
  PhaseTypeList,
} from "../models/domain-layer/legacy/legacy_challenge_phase";

import { QueryRunner } from "../common/QueryRunner";
import { Value } from "../grpc/models/rdb/relational";

import { ProjectPhaseSchema } from "../schema/ProjectPhase";
import { PhaseType } from "../schema/PhaseType";
import {
  CreatePhaseInput,
  CreateResult,
} from "../models/domain-layer/legacy/services/legacy_challenge_phase";

class LegacyChallengePhaseDomain {
  public async create(input: CreatePhaseInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };

    const projectPhaseId = (await new QueryRunner<LegacyChallengePhase, CreatePhaseInput>(
      ProjectPhaseSchema
    )
      .insert(createInput)
      .exec()) as number;

    return {
      kind: {
        $case: "integerId",
        integerId: projectPhaseId,
      },
    };
  }

  public async getPhaseTypes(): Promise<PhaseTypeList> {
    const projectPhases = (await new QueryRunner(PhaseType)
      .query(["phase_type_id", "name"])
      .exec()) as [
      {
        values: {
          phase_type_id: Value;
          name: Value;
        };
      }
    ];

    const list: PhaseTypeList = {
      items: projectPhases.map(({ values }) => {
        return {
          phaseTypeId:
            values.phase_type_id.value?.$case === "intValue"
              ? values.phase_type_id.value?.intValue
              : 0,
          name: values.name.value?.$case === "stringValue" ? values.name.value?.stringValue : "",
        };
      }),
    };

    return list;
  }

  // public async listChallengePhases(
  //   legacyChallengeId: LegacyChallengeId
  // ): Promise<LegacyChallengePhaseList> {
  //   const queryRequest: QueryRequest = {
  //     query: {
  //       query: {
  //         $case: "select",
  //         select: {
  //           table: this.tableName,
  //           join: [
  //             {
  //               type: JoinType.INNER,
  //               joinTable: "phase_type_lu",
  //               fromTable: this.tableName,
  //               column: "phase_type_id",
  //             },
  //           ],
  //           column: [
  //             {
  //               name: "project_id",
  //               tableName: this.tableName,
  //               type: ColumnType.INT,
  //             },
  //             {
  //               name: "project_phase_id",
  //               tableName: this.tableName,
  //               type: ColumnType.INT,
  //             },
  //             {
  //               name: "name",
  //               tableName: "phase_type_lu",
  //               type: ColumnType.STRING,
  //             },
  //             {
  //               name: "phase_type_id",
  //               tableName: this.tableName,
  //               type: ColumnType.INT,
  //             },
  //             {
  //               name: "phase_status_id",
  //               tableName: this.tableName,
  //               type: ColumnType.INT,
  //             },
  //             {
  //               name: "scheduled_start_time",
  //               tableName: this.tableName,
  //               type: ColumnType.DATETIME,
  //             },
  //             {
  //               name: "scheduled_end_time",
  //               tableName: this.tableName,
  //               type: ColumnType.DATETIME,
  //             },
  //             {
  //               tableName: this.tableName,
  //               name: "actual_start_time",
  //               type: ColumnType.DATETIME,
  //             },
  //             {
  //               tableName: this.tableName,
  //               name: "actual_end_time",
  //               type: ColumnType.DATETIME,
  //             },
  //             {
  //               name: "fixed_start_time",
  //               tableName: this.tableName,
  //               type: ColumnType.DATETIME,
  //             },
  //             {
  //               name: "duration",
  //               tableName: this.tableName,
  //               type: ColumnType.LONG,
  //             },
  //             {
  //               name: "create_user",
  //               tableName: this.tableName,
  //               type: ColumnType.INT,
  //             },
  //             {
  //               name: "create_date",
  //               tableName: this.tableName,
  //               type: ColumnType.DATETIME,
  //             },
  //             {
  //               name: "modify_user",
  //               tableName: this.tableName,
  //               type: ColumnType.INT,
  //             },
  //             {
  //               name: "modify_date",
  //               tableName: this.tableName,
  //               type: ColumnType.DATETIME,
  //             },
  //           ],
  //           where: [
  //             {
  //               key: "project_id",
  //               operator: Operator.EQUAL,
  //               value: {
  //                 value: {
  //                   $case: "intValue",
  //                   intValue: legacyChallengeId.legacyChallengeId,
  //                 },
  //               },
  //             },
  //           ],
  //           offset: 0,
  //           limit: 0,
  //           groupBy: [],
  //           orderBy: [],
  //         },
  //       },
  //     },
  //   };

  //   const queryResponse: QueryResponse = await relationalClient.query(
  //     queryRequest
  //   );

  //   if (queryResponse.result?.$case == "selectResult") {
  //     const rows = queryResponse.result.selectResult.rows;

  //     return {
  //       legacyChallengePhases: rows.map((row) =>
  //         LegacyChallengePhase.fromJSON(
  //           Object.entries(row.values).reduce<{
  //             [key: string]: number | string | undefined; // TODO: I'm being lazy! This should be in a common library
  //           }>((acc, [key, value]) => {
  //             const unwrapped = Util.unwrap(value); // TODO: lazy again! Badly need to refactor this to a common library
  //             acc[_.camelCase(key)] = unwrapped == "" ? undefined : unwrapped;
  //             return acc;
  //           }, {})
  //         )
  //       ),
  //     };
  //   }

  //   return Promise.resolve({
  //     legacyChallengePhases: [],
  //   });
  // }

  // public async updateChallengePhases(
  //   phaseList: LegacyChallengePhaseList
  // ): Promise<UpdateResponse> {
  //   // TODO: use bulk-query
  //   for (const phase of phaseList.legacyChallengePhases) {
  //     const queryRequest: QueryRequest = {
  //       query: {
  //         query: {
  //           $case: "update",
  //           update: {
  //             table: this.tableName,
  //             columnValue: Object.entries(phase)
  //               .filter(([key, value]) => {
  //                 return (
  //                   key !== "projectPhaseId" && value != null && value != ""
  //                 );
  //               })
  //               .reduce<Array<ColumnValue>>(
  //                 (acc, [key, value]: [string, number | string]) => {
  //                   let updateValue: Partial<Value> = {};

  //                   if (typeof value === "string") {
  //                     if (key.indexOf("Time") != -1) {
  //                       updateValue.value = {
  //                         $case: "datetimeValue",
  //                         datetimeValue: value,
  //                       };
  //                     } else {
  //                       updateValue.value = {
  //                         $case: "stringValue",
  //                         stringValue: value,
  //                       };
  //                     }
  //                   } else {
  //                     updateValue.value = {
  //                       $case: "longValue",
  //                       longValue: value,
  //                     };
  //                   }

  //                   acc.push({
  //                     column: _.snakeCase(key),
  //                     value: Value.fromPartial(updateValue),
  //                   });

  //                   return acc;
  //                 },
  //                 []
  //               ),
  //             where: [
  //               {
  //                 key: "project_phase_id",
  //                 operator: Operator.OPERATOR_EQUAL,
  //                 value: {
  //                   value: {
  //                     $case: "intValue",
  //                     intValue: phase.projectPhaseId,
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     };

  //     console.log("query", JSON.stringify(queryRequest, null, 2));
  //     const queryResponse = await relationalClient.query(queryRequest);
  //     console.log("update-phase result", queryResponse);
  //   }

  //   return {
  //     success: true,
  //   };
  // }
}

export default new LegacyChallengePhaseDomain();
