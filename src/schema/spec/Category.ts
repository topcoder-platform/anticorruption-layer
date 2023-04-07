import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { LegacyCategory } from "../../models/domain-layer/legacy/categories";

export const CategorySchema: Schema<LegacyCategory> = {
  dbSchema: "tcs_catalog",
  tableName: "categories",
  idSequence: "CATEGORY_SEQ",
  idColumn: "category_id",
  idTable: "category",
  columns: {
    categoryId: { name: "category_id", type: ColumnType.COLUMN_TYPE_INT },
    parentCategoryId: { name: "parent_category_id", type: ColumnType.COLUMN_TYPE_INT },
    categoryName: { name: "category_name", type: ColumnType.COLUMN_TYPE_STRING },
    categoryDescription: { name: "category_description", type: ColumnType.COLUMN_TYPE_STRING },
    statusId: { name: "status_id", type: ColumnType.COLUMN_TYPE_INT },
    viewable: { name: "viewable", type: ColumnType.COLUMN_TYPE_INT },
    isCustom: { name: "is_custom", type: ColumnType.COLUMN_TYPE_BOOLEAN },
  },
};
