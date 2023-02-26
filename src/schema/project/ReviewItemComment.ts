import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ReviewItemComment } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const ReviewItemCommentSchema: Schema<ReviewItemComment> = {
  dbSchema: "tcs_catalog",
  tableName: "review_item_comment",
  idColumn: "review_item_comment_id",
  idSequence: "review_item_comment_id_seq",
  idTable: "review_item_comment",
  columns: {
    reviewItemCommentId: { name: "review_item_comment_id", type: ColumnType.COLUMN_TYPE_INT },
    reviewItemId: { name: "review_item_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    commentTypeId: { name: "comment_type_id", type: ColumnType.COLUMN_TYPE_INT },
    content: { name: "content", type: ColumnType.COLUMN_TYPE_STRING },
    sort: { name: "sort", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
