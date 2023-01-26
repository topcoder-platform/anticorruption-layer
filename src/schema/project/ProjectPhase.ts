import { Schema } from "../../common/QueryRunner";
import { ColumnType } from "../../../dist/grpc/models/rdb/relational";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectPhaseSchema: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "project_phase",
  idColumn: "project_phase_id",
  idSequence: "project_phase_id_seq",
  columns: {
    duration: { name: "duration", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    phaseTypeId: { name: "phase_type_id", type: ColumnType.COLUMN_TYPE_INT },
    phaseStatusId: { name: "phase_status_id", type: ColumnType.COLUMN_TYPE_INT },
    projectPhaseId: { name: "project_phase_id", type: ColumnType.COLUMN_TYPE_INT },
    fixedStartTime: { name: "fixed_start_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    scheduledStartTime: { name: "scheduled_start_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    scheduledEndTime: { name: "scheduled_end_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    actualStartTime: { name: "actual_start_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    actualEndTime: { name: "actual_end_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    ...AuditColumns,
  },
};
