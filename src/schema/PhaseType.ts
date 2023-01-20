import { TableOptions } from "../common/QueryRunner";
import { ColumnType } from "../grpc/models/rdb/relational";

export const PhaseType: TableOptions = {
  dbSchema: "tcs_catalog",
  tableName: "phase_type_lu",
  columns: [
    {
      name: "phase_type_id",
      type: ColumnType.COLUMN_TYPE_INT,
    },
    {
      name: "name",
      type: ColumnType.COLUMN_TYPE_STRING,
    },
    {
      name: "description",
      type: ColumnType.COLUMN_TYPE_STRING,
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
