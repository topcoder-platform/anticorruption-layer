import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner.js";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectStatus: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "project_status_lu",
  columns: {
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    projectStatusId: { name: "project_status_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
