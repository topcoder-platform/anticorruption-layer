import { ColumnType } from "../../../dist/grpc/models/rdb/relational";
import { Schema } from "../../common/QueryRunner";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectPayment: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment",
  columns: {
    place: { name: "place", type: ColumnType.COLUMN_TYPE_INT },
    prizeId: { name: "prize_id", type: ColumnType.COLUMN_TYPE_INT },
    project_id: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeTypeId: { name: "prize_type_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeAmount: { name: "prize_amount", type: ColumnType.COLUMN_TYPE_FLOAT },
    ...AuditColumns,
  },
};
