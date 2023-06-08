import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Contest } from "../../models/domain-layer/legacy/contest";

export const ContestSchema: Schema<Contest> = {
  dbSchema: "informixoltp",
  tableName: "contest",
  idSequence: "CONTEST_SEQ",
  idColumn: "contest_id",
  idTable: "contest",
  columns: {
    contestId: { name: "contest_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    startDate: { name: "start_date", type: ColumnType.COLUMN_TYPE_STRING },
    endDate: { name: "end_date", type: ColumnType.COLUMN_TYPE_STRING },
    status: { name: "status", type: ColumnType.COLUMN_TYPE_STRING },
    languageId: { name: "language_id", type: ColumnType.COLUMN_TYPE_INT },
    groupId: { name: "group_id", type: ColumnType.COLUMN_TYPE_INT },
    regionCode: { name: "region_code", type: ColumnType.COLUMN_TYPE_STRING },
    adText: { name: "ad_text", type: ColumnType.COLUMN_TYPE_STRING },
    adStart: { name: "ad_start", type: ColumnType.COLUMN_TYPE_DATETIME },
    adEnd: { name: "ad_end", type: ColumnType.COLUMN_TYPE_DATETIME },
    adTask: { name: "ad_task", type: ColumnType.COLUMN_TYPE_STRING },
    adCommand: { name: "ad_command", type: ColumnType.COLUMN_TYPE_STRING },
    activateMenu: { name: "activate_menu", type: ColumnType.COLUMN_TYPE_INT },
    seasonId: { name: "season_id", type: ColumnType.COLUMN_TYPE_INT },
  },
};
