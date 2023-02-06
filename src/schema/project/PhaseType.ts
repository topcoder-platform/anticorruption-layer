import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { PhaseType } from "../../models/domain-layer/legacy/challenge_phase";
import { AuditColumns } from "../common/AuditColumns";

export const PhaseTypeSchema: Schema<PhaseType> = {
  dbSchema: "tcs_catalog",
  tableName: "phase_type_lu",
  columns: {
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    phaseTypeId: { name: "phase_type_id", type: ColumnType.COLUMN_TYPE_INT },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
