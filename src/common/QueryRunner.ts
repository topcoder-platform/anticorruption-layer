import { ColumnType, Query, QueryRequest, Value } from "../grpc/models/rdb/relational";

import { relationalClient } from "../grpc/client/relational";

export interface TableOptions {
  dbSchema: string;
  tableName: string;
  columns: {
    name: string;
    type: ColumnType;
  }[];
  idColumn?: string;
  idSequence?: string;
  idTable?: string;
}

interface SqlQuery {
  exec(): Promise<unknown>;
}

export interface SelectQuery extends SqlQuery {
  query(columns: string[]): SelectQuery;
  where(): SelectQuery;
  join(): SelectQuery;
}

export interface InsertQuery extends SqlQuery {
  insert(input: unknown): InsertQuery;
}

export interface UpdateQuery extends SqlQuery {
  update(input: Record<string, unknown>): UpdateQuery;
}

export interface DeleteQuery extends SqlQuery {
  delete(): DeleteQuery;
}

export class QueryRunner<T, CreateInput extends object>
  implements SelectQuery, InsertQuery, UpdateQuery, DeleteQuery
{
  #query: Query | null = null;

  // TODO: Optimize this as each instantiation of this class will create a new object with the same keys and values.
  #attributeKeyTypeMap: Record<string, ColumnType> = this.options.columns.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.name.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
      })]: cur.type,
    }),
    {}
  );

  constructor(protected options: TableOptions) {}

  query(columns: string[]): SelectQuery {
    this.#query = {
      query: {
        $case: "select",
        select: {
          schema: this.options.dbSchema,
          table: this.options.tableName,
          column: columns.map((col) => ({
            tableName: this.options.tableName,
            name: col,
            type: this.#attributeKeyTypeMap[col],
          })),
          where: [],
          join: [],
          groupBy: [],
          orderBy: [],
          limit: 100,
          offset: 0,
        },
      },
    };
    return this;
  }

  where(): SelectQuery {
    return this;
  }

  join(): SelectQuery {
    return this;
  }

  insert(input: CreateInput): InsertQuery {
    console.log("Create Input", input);
    this.#query = {
      query: {
        $case: "insert",
        insert: {
          schema: this.options.dbSchema,
          table: this.options.tableName,
          columnValue: [
            {
              column: "create_date",
              value: {
                value: {
                  $case: "datetimeValue",
                  datetimeValue: "CURRENT",
                },
              },
            },
            {
              column: "modify_date",
              value: {
                value: {
                  $case: "datetimeValue",
                  datetimeValue: "CURRENT",
                },
              },
            },
            ...Object.entries(input)
              .filter(([_key, value]) => value !== undefined)
              .map(([key, value]) => ({
                column: key.replace(/([A-Z])/g, "_$1").toLowerCase(),
                value: this.toValue(key, value),
              })),
          ],
          idTable: this.options.tableName,
          idColumn: "project_phase_id",
          idSequence: "project_phase_id_seq",
        },
      },
    };

    return this;
  }

  update(input: Record<string, unknown>): UpdateQuery {
    return this;
  }

  delete(): DeleteQuery {
    return this;
  }

  async exec(): Promise<number | T[]> {
    console.log("Execute query");
    console.log("Insert query", JSON.stringify(this.#query));

    if (!this.#query) {
      throw new Error("No query to execute");
    }

    const queryRequest: QueryRequest = {
      query: this.#query,
    };

    const queryResponse = await relationalClient.query(queryRequest);

    switch (this.#query.query?.$case) {
      case "select":
        if (queryResponse.result?.$case != "selectResult") {
          throw new Error("Unexpected result type");
        }
        return queryResponse.result.selectResult.rows.map((row) => {
          return row as T;
        });
      case "insert":
        if (queryResponse.result?.$case != "insertResult") {
          throw new Error("Unexpected result type");
        }
        console.log("running insert query");
        return queryResponse.result.insertResult.lastInsertId;
      case "update":
        if (queryResponse.result?.$case != "updateResult") {
          throw new Error("Unexpected result type");
        }
        return queryResponse.result.updateResult.affectedRows;
      case "delete":
        if (queryResponse.result?.$case != "deleteResult") {
          throw new Error("Unexpected result type");
        }
        return queryResponse.result.deleteResult.affectedRows;
      default:
        throw new Error("Unexpected query type");
    }
  }

  private toValue(key: string, value: unknown): Value {
    const dataType: ColumnType = this.#attributeKeyTypeMap[key];
    if (dataType == null) {
      throw new Error(`Unknown column ${key}`);
    }

    if (dataType === ColumnType.COLUMN_TYPE_INT) {
      return { value: { $case: "intValue", intValue: value as number } };
    }

    if (dataType === ColumnType.COLUMN_TYPE_FLOAT) {
      return { value: { $case: "floatValue", floatValue: value as number } };
    }

    if (dataType === ColumnType.COLUMN_TYPE_DATE) {
      return { value: { $case: "dateValue", dateValue: value as string } };
    }

    if (dataType == ColumnType.COLUMN_TYPE_DATETIME) {
      return {
        value: { $case: "datetimeValue", datetimeValue: value as string },
      };
    }

    if (dataType == ColumnType.COLUMN_TYPE_STRING) {
      return { value: { $case: "stringValue", stringValue: value as string } };
    }

    if (dataType == ColumnType.COLUMN_TYPE_BOOLEAN) {
      return {
        value: { $case: "booleanValue", booleanValue: value as boolean },
      };
    }

    throw new Error(`Unsupported data type ${dataType}`);
  }
}
