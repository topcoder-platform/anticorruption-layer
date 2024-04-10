import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";

import { QueryInput, QueryOutput } from "../models/domain-layer/legacy/query";

class QueryDomain {
  public async rawQuery(input: QueryInput): Promise<QueryOutput> {
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      [key: string]: any[];
    }
    if (!_.startsWith(input.sql, "SELECT") && !_.startsWith(input.sql, "UPDATE")) {
      throw new Error("Query must start with 'SELECT' or 'UPDATE'");
    }
    const queryResult = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: input.sql,
        },
      },
    })) as IQueryResult;
    const rows = queryResult.rows;
    const result: QueryOutput = { rows: [] };
    if (_.isUndefined(rows) || rows.length === 0) {
      return result;
    }
    _.forEach(rows, (r) => {
      const fields: { key: string; value: string }[] = [];
      _.forEach(_.keys(r), (k) => {
        fields.push({
          key: k,
          value: _.toString(r[k]),
        });
      });
      result.rows.push({ fields: fields });
    });
    return result;
  }
}

export default new QueryDomain();
