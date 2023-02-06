import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ResourceInfo } from "../../models/domain-layer/legacy/resource_info";
import { AuditColumns } from "../common/AuditColumns";

export const ResourcInfoSchema: Schema<ResourceInfo> = {
  dbSchema: "tcs_catalog",
  tableName: "resource_info",
  columns: {
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceInfoTypeId: { name: "resource_info_type_id", type: ColumnType.COLUMN_TYPE_INT },
    value: { name: "value", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
