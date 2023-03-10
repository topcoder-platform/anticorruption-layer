import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Upload } from "../../models/domain-layer/legacy/upload";
import { AuditColumns } from "../common/AuditColumns";

export const UploadSchema: Schema<Upload> = {
  dbSchema: "tcs_catalog",
  tableName: "upload",
  idColumn: "upload_id",
  idSequence: "upload_id_seq",
  idTable: "upload",
  columns: {
    uploadId: { name: "upload_id", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    projectPhaseId: { name: "project_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    uploadTypeId: { name: "upload_type_id", type: ColumnType.COLUMN_TYPE_INT },
    url: { name: "url", type: ColumnType.COLUMN_TYPE_STRING },
    uploadStatusId: { name: "upload_status_id", type: ColumnType.COLUMN_TYPE_INT },
    parameter: { name: "parameter", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
