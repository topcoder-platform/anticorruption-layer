import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner";
import { Prize } from "../../models/domain-layer/legacy/prize";
import { AuditColumns } from "../common/AuditColumns";

export const PrizeSchema: Schema<Prize> = {
  dbSchema: "tcs_catalog",
  tableName: "prize",
  columns: {
    place: { name: "place", type: ColumnType.COLUMN_TYPE_INT },
    prizeId: { name: "prize_id", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeTypeId: { name: "prize_type_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeAmount: { name: "prize_amount", type: ColumnType.COLUMN_TYPE_FLOAT },
    numberOfSubmissions: { name: "number_of_submissions", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
  idColumn: "prize_id",
  idSequence: "prize_id_seq",
  idTable: "prize",
};
