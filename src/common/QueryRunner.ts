const { GRPC_RDB_SERVER_HOST, GRPC_RDB_SERVER_PORT } = process.env;

import {
  ColumnType,
  Operator,
  Query,
  QueryRequest,
  RelationalClient,
  Value,
} from "@topcoder-framework/client-relational";
import { TableColumn, TableColumns } from "./TableColumn";

export type Schema = {
  dbSchema: string;
  tableName: string;
  idColumn?: string;
  idSequence?: string;
  idTable?: string;
  columns: TableColumns;
};

interface ExecuteSqlQuery {
  exec(): Promise<unknown>;
}

type JoinAndWhereClause = JoinClause & WhereClause & ExecuteSqlQuery;
type JoinWhereLimitAndOffset = JoinAndWhereClause & LimitClause & OffsetClause;

export interface SelectQuery {
  select(columns: TableColumn[]): JoinWhereLimitAndOffset;
}

export interface JoinClause {
  join(): JoinAndWhereClause;
}

export interface WhereClause {
  where(whereCriteria: { key: string; operator: Operator; value: Value }): JoinWhereLimitAndOffset;
}

export interface LimitClause {
  limit(limit: number): OffsetClause & ExecuteSqlQuery;
}

export interface OffsetClause {
  offset(offset: number): ExecuteSqlQuery;
}

export interface InsertQuery<CreateInput> {
  insert(input: CreateInput): ExecuteSqlQuery;
}

export interface UpdateQuery<UpdateInput> {
  update(lookupCriteria: { [key: string]: unknown }, input: UpdateInput): ExecuteSqlQuery;
}

export interface DeleteQuery {
  delete(): ExecuteSqlQuery;
}

export class QueryRunner<
  T,
  CreateInput extends { [key: string]: unknown },
  UpdateInput extends { [key: string]: unknown }
> implements
    SelectQuery,
    JoinClause,
    WhereClause,
    LimitClause,
    OffsetClause,
    InsertQuery<CreateInput>,
    UpdateQuery<UpdateInput>,
    DeleteQuery,
    ExecuteSqlQuery
{
  #query: Query | null = null;
  #client: RelationalClient;

  constructor(private schema: Schema) {
    console.log("Connecting to GRPC server at", GRPC_RDB_SERVER_HOST, GRPC_RDB_SERVER_PORT, "...");
    this.#client = new RelationalClient(GRPC_RDB_SERVER_HOST!, parseInt(GRPC_RDB_SERVER_PORT!));
  }

  select(columns: TableColumn[]): JoinWhereLimitAndOffset {
    this.#query = {
      query: {
        $case: "select",
        select: {
          schema: this.schema.dbSchema,
          table: this.schema.tableName,
          column: columns.map((col) => ({
            tableName: this.schema.tableName,
            name: col.name,
            type: col.type,
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

    console.log("Query", JSON.stringify(this.#query, null, 2));
    return this;
  }

  // TODO: use "convenience" methods from lib-util to build the clause
  where(whereCriteria: { key: string; operator: Operator; value: Value }): JoinWhereLimitAndOffset {
    if (this.#query?.query?.$case != "select") {
      throw new Error("Cannot set where clause on a non-select query");
    }

    this.#query.query.select.where.push(whereCriteria);
    return this;
  }

  join(): JoinAndWhereClause {
    // TODO: Implement join clause
    return this;
  }

  limit(limit: number): OffsetClause & ExecuteSqlQuery {
    if (this.#query?.query?.$case != "select") {
      throw new Error("Cannot set limit on a non-select query");
    }
    this.#query.query.select.limit = limit;
    return this;
  }

  offset(offset: number): ExecuteSqlQuery {
    if (this.#query?.query?.$case != "select") {
      throw new Error("Cannot set offset on a non-select query");
    }
    this.#query.query.select.offset = offset;
    return this;
  }

  insert(input: CreateInput): ExecuteSqlQuery {
    this.#query = {
      query: {
        $case: "insert",
        insert: {
          schema: this.schema.dbSchema,
          table: this.schema.tableName,
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
                column: this.schema.columns[key].name,
                value: this.toValue(key, value),
              })),
          ],
          idTable: this.schema.tableName,
          idColumn: this.schema.idColumn ?? undefined,
          idSequence: this.schema.idSequence ?? undefined,
        },
      },
    };

    return this;
  }

  update(input: Record<string, unknown>): ExecuteSqlQuery {
    return this;
  }

  delete(): ExecuteSqlQuery {
    return this;
  }

  async exec(): Promise<number | T[]> {
    if (!this.#query) {
      throw new Error("No query to execute");
    }

    const queryRequest: QueryRequest = {
      query: this.#query,
    };

    const queryResponse = await this.#client.query(queryRequest);

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
    const dataType: ColumnType = this.schema.columns[key].type;

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
