import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { LegacySubmission } from "../../models/domain-layer/legacy/submission";
import { AuditColumns } from "../common/AuditColumns";

export const LegacySubmissionSchema: Schema<LegacySubmission> = {
  dbSchema: "tcs_catalog",
  tableName: "submission",
  idColumn: "submission_id",
  idSequence: "submission_id_seq",
  idTable: "submission",
  columns: {
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionStatusId: { name: "submission_status_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionTypeId: { name: "submission_type_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadId: { name: "upload_id", type: ColumnType.COLUMN_TYPE_INT },
    screeningScore: { name: "screening_score", type: ColumnType.COLUMN_TYPE_INT },
    initialScore: { name: "initial_score", type: ColumnType.COLUMN_TYPE_INT },
    finalScore: { name: "final_score", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
