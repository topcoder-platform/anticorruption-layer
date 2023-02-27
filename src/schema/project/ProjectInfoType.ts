import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ProjectInfoType } from "../../models/domain-layer/legacy/project_info";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectInfoTypeSchema: Schema<ProjectInfoType> = {
  dbSchema: "tcs_catalog",
  tableName: "project_info_type_lu",
  columns: {
    projectInfoTypeId: { name: "project_info_type_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
