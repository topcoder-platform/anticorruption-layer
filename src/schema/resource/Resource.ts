import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Resource } from "../../models/domain-layer/legacy/resource";
import { AuditColumns } from "../common/AuditColumns";

export const ResourceSchema: Schema<Resource> = {
  dbSchema: "tcs_catalog",
  tableName: "resource",
  columns: {
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceRoleId: { name: "resource_role_id", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    projectPhaseId: { name: "project_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    userId: { name: "user_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
