import { Schema } from "../../common/QueryRunner.js";
import { ColumnType } from "@topcoder-framework/client-relational";
import { AuditColumns } from "../common/AuditColumns";

export const Resource: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "resource_info",
  columns: {
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceInfoTypeId: { name: "resource_info_type_id", type: ColumnType.COLUMN_TYPE_INT },
    value: { name: "value", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
