import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ResourceRole } from "../../models/domain-layer/legacy/resource_role";
import { AuditColumns } from "../common/AuditColumns";

export const ResourceRoleSchema: Schema<ResourceRole> = {
  dbSchema: "tcs_catalog",
  tableName: "resource_role_lu",
  columns: {
    resourceRoleId: { name: "resource_role_id", type: ColumnType.COLUMN_TYPE_INT },
    phaseTypeId: { name: "phase_type_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
