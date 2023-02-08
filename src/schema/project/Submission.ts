import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Submission } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const SubmissionSchema: Schema<Submission> = {
  dbSchema: "tcs_catalog",
  tableName: "submission",
  columns: {
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadId: { name: "upload_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
