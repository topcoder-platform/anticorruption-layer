import { Schema } from "../common/QueryRunner";
import { ColumnType } from "../../dist/grpc/models/rdb/relational";
import { AuditColumns } from "./common/AuditColumns";

export const PhaseType: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "phase_type_lu",
  columns: {
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    phaseTypeId: { name: "phase_type_id", type: ColumnType.COLUMN_TYPE_INT },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
