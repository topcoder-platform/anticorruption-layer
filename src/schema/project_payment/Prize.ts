import { Schema } from "../../common/QueryRunner";
import { ColumnType } from "../../../dist/grpc/models/rdb/relational";
import { AuditColumns } from "../common/AuditColumns";

export const Prize: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "prize",
  columns: {
    place: { name: "place", type: ColumnType.COLUMN_TYPE_INT },
    prizeId: { name: "prize_id", type: ColumnType.COLUMN_TYPE_INT },
    project_id: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeTypeId: { name: "prize_type_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeAmount: { name: "prize_amount", type: ColumnType.COLUMN_TYPE_FLOAT },
    numberOfSubmissions: { name: "number_of_submissions", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
