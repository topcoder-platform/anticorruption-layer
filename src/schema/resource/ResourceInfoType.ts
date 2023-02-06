import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ResourceInfoType } from "../../models/domain-layer/legacy/resource_info_type";
import { AuditColumns } from "../common/AuditColumns";

export const ResourceInfoTypeSchema: Schema<ResourceInfoType> = {
  dbSchema: "tcs_catalog",
  tableName: "resource_info_type_lu",
  columns: {
    resourceInfoTypeId: { name: "resource_info_type_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
