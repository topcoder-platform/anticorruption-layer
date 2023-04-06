import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { LegacyComponentCatalog } from "../../models/domain-layer/legacy/component_catalog";

export const CategorySchema: Schema<LegacyComponentCatalog> = {
  dbSchema: "tcs_catalog",
  tableName: "comp_catalog",
  idSequence: "component_seq",
  idColumn: "component_id",
  idTable: "comp_catalog",
  columns: {
    componentId: { name: "component_id", type: ColumnType.COLUMN_TYPE_INT },
    currentVersion: { name: "current_version", type: ColumnType.COLUMN_TYPE_INT },
    shortDesc: { name: "short_desc", type: ColumnType.COLUMN_TYPE_STRING },
    componentName: { name: "component_name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    functionDesc: { name: "function_desc", type: ColumnType.COLUMN_TYPE_STRING },
    createTime: { name: "create_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    statusId: { name: "status_id", type: ColumnType.COLUMN_TYPE_INT },
    rootCategoryId: { name: "root_category_id", type: ColumnType.COLUMN_TYPE_BOOLEAN },
    modifyDate: { name: "modify_date", type: ColumnType.COLUMN_TYPE_DATETIME },
    publicInd: { name: "public_ind", type: ColumnType.COLUMN_TYPE_INT },
  },
};
