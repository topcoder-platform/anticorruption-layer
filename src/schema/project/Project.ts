import { Schema } from "../../common/QueryRunner";
import { ColumnType } from "../../../dist/grpc/models/rdb/relational";
import { AuditColumns } from "../common/AuditColumns";

export const Project: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "project",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    projectTypeId: { name: "project_type_id", type: ColumnType.COLUMN_TYPE_INT },
    projectStatusId: { name: "project_status_id", type: ColumnType.COLUMN_TYPE_INT },
    projectCategoryId: { name: "project_category_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
