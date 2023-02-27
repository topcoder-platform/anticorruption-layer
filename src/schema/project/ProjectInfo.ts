import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ProjectInfo } from "../../models/domain-layer/legacy/project_info";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectInfoSchema: Schema<ProjectInfo> = {
  dbSchema: "tcs_catalog",
  tableName: "project_info",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    projectInfoTypeId: { name: "project_info_type_id", type: ColumnType.COLUMN_TYPE_INT },
    value: { name: "value", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
