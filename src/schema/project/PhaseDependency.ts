import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { PhaseDependency } from "../../models/domain-layer/legacy/phase";
import { AuditColumns } from "../common/AuditColumns";

export const PhaseDependencySchema: Schema<PhaseDependency> = {
  dbSchema: "tcs_catalog",
  tableName: "phase_dependency",
  columns: {
    dependentPhaseId: { name: "dependent_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    dependencyPhaseId: { name: "dependency_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    dependencyStart: { name: "dependency_start", type: ColumnType.COLUMN_TYPE_INT },
    dependentStart: { name: "dependent_start", type: ColumnType.COLUMN_TYPE_INT },
    lagTime: { name: "lag_time", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
