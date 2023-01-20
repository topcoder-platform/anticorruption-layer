import { TableOptions } from "../common/QueryRunner";
import { ColumnType } from "../grpc/models/rdb/relational";

export const ProjectPhaseSchema: TableOptions = {
  dbSchema: "tcs_catalog",
  tableName: "project_phase",
  columns: [
    {
      name: "project_phase_id",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "project_id",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "phase_type_id",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "phase_status_id",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "fixed_start_time",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
    {
      name: "scheduled_start_time",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
    {
      name: "scheduled_end_time",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
    {
      name: "actual_start_time",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
    {
      name: "actual_end_time",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
    {
      name: "duration",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "create_user",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "create_date",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
    {
      name: "modify_user",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "modify_date",
      type: ColumnType.COLUMN_TYPE_DATETIME,
    },
  ],
};
