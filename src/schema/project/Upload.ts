import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Upload } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const UploadSchema: Schema<Upload> = {
  dbSchema: "tcs_catalog",
  tableName: "upload",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadStatusId: { name: "upload_status_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadId: { name: "upload_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceRoleId: { name: "resource_role_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
