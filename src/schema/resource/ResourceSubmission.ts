import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner.js";
import { ResourceSubmission } from "../../models/domain-layer/legacy/resource_submission";
import { AuditColumns } from "../common/AuditColumns";

export const ResourceSubmissionSchema: Schema<ResourceSubmission> = {
  dbSchema: "tcs_catalog",
  tableName: "resource_submission",
  columns: {
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
