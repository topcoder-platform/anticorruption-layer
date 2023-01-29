import { Schema } from "../../common/QueryRunner.js";
import { ColumnType } from "@topcoder-framework/client-relational";
import { AuditColumns } from "../common/AuditColumns";

export const Resource: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "resource_info_type_lu",
  columns: {
    resourceInfoTypeId: { name: "resource_info_type_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
