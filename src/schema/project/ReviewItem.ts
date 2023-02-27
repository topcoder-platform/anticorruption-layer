import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ReviewItem } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const ReviewItemSchema: Schema<ReviewItem> = {
  dbSchema: "tcs_catalog",
  tableName: "review_item",
  idColumn: "review_item_id",
  idSequence: "review_item_id_seq",
  idTable: "review_item",
  columns: {
    reviewItemId: { name: "review_item_id", type: ColumnType.COLUMN_TYPE_INT },
    reviewId: { name: "review_id", type: ColumnType.COLUMN_TYPE_INT },
    scorecardQuestionId: { name: "scorecard_question_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadId: { name: "upload_id", type: ColumnType.COLUMN_TYPE_INT },
    sort: { name: "sort", type: ColumnType.COLUMN_TYPE_INT },
    answer: { name: "committed", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
