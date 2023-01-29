import { Schema } from "../../common/QueryRunner.js";
import { ColumnType } from "@topcoder-framework/client-relational";
import { AuditColumns } from "../common/AuditColumns";

export const Resource: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "resource_submission",
  columns: {
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
