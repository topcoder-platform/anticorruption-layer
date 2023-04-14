import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Review } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const ReviewSchema: Schema<Review> = {
  dbSchema: "tcs_catalog",
  tableName: "review",
  idColumn: "review_id",
  idSequence: "review_id_seq",
  idTable: "review",
  columns: {
    reviewId: { name: "review_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    projectPhaseId: { name: "project_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    scorecardId: { name: "scorecard_id", type: ColumnType.COLUMN_TYPE_INT },
    committed: { name: "committed", type: ColumnType.COLUMN_TYPE_INT },
    score: { name: "score", type: ColumnType.COLUMN_TYPE_DOUBLE },
    initialScore: { name: "initial_score", type: ColumnType.COLUMN_TYPE_DOUBLE },
    ...AuditColumns,
  },
};
