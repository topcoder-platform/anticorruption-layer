import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { PhaseCriteria } from "../../models/domain-layer/legacy/phase";
import { AuditColumns } from "../common/AuditColumns";

export const PhaseCriteriaSchema: Schema<PhaseCriteria> = {
  dbSchema: "tcs_catalog",
  tableName: "phase_criteria",
  columns: {
    projectPhaseId: { name: "project_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    phaseCriteriaTypeId: { name: "phase_criteria_type_id", type: ColumnType.COLUMN_TYPE_INT },
    parameter: { name: "parameter", type: ColumnType.COLUMN_TYPE_STRING },
    ...AuditColumns,
  },
};
