import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner";

export const ProjectPaymentAdjustment: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment_type_lu",
  columns: {
    projectPaymentTypeId: { name: "project_payment_type_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    mergeable: { name: "mergeable", type: ColumnType.COLUMN_TYPE_BOOLEAN },
    pactsPaymentTypeId: { name: "pacts_payment_type_id", type: ColumnType.COLUMN_TYPE_INT },
  },
};
