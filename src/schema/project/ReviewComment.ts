import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ReviewComment } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const ReviewCommentSchema: Schema<ReviewComment> = {
  dbSchema: "tcs_catalog",
  tableName: "review_comment",
  idColumn: "review_comment_id",
  idSequence: "review_comment_id_seq",
  idTable: "review_comment",
  columns: {
    reviewCommentId: { name: "review_comment_id", type: ColumnType.COLUMN_TYPE_INT },
    reviewId: { name: "review_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    commentTypeId: { name: "comment_type_id", type: ColumnType.COLUMN_TYPE_INT },
    content: { name: "content", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
