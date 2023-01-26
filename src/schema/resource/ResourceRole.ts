import { Schema } from "../../common/QueryRunner.js";
import { ColumnType } from "../../../dist/grpc/models/rdb/relational.js";
import { AuditColumns } from "../common/AuditColumns";

export const Resource: Schema = {
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
