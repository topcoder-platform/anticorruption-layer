import { ColumnType } from "../../../dist/grpc/models/rdb/relational";
import { Schema } from "../../common/QueryRunner";

export const ProjectPaymentAdjustment: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment_adjustment",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceRoleId: { name: "resource_role_id", type: ColumnType.COLUMN_TYPE_INT },
    fixedAmount: { name: "fixed_amount", type: ColumnType.COLUMN_TYPE_FLOAT },
    multiplier: { name: "multiplier", type: ColumnType.COLUMN_TYPE_INT },
  },
};
