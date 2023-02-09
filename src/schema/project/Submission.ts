import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Submission } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const SubmissionSchema: Schema<Submission> = {
  dbSchema: "tcs_catalog",
  tableName: "submission",
  idColumn: "submission_id",
  idSequence: "submission_id_seq",
  idTable: "submission",
  columns: {
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadId: { name: "upload_id", type: ColumnType.COLUMN_TYPE_INT },
    initialScore: { name: "initial_score", type: ColumnType.COLUMN_TYPE_INT },
    finalScore: { name: "final_score", type: ColumnType.COLUMN_TYPE_INT },
    placement: { name: "placement", type: ColumnType.COLUMN_TYPE_INT },
    prizeId: { name: "prize_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionStatusId: { name: "submission_status_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionTypeId: { name: "submission_type_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
