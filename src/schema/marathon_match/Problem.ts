import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Problem } from "../../models/domain-layer/legacy/problem";

export const ProblemSchema: Schema<Problem> = {
  dbSchema: "informixoltp",
  tableName: "problem",
  idSequence: "PROBLEM_SEQ",
  idColumn: "problem_id",
  idTable: "problem",
  columns: {
    problemId: { name: "problem_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    statusId: { name: "status_id", type: ColumnType.COLUMN_TYPE_INT },
    problemText: { name: "problem_text", type: ColumnType.COLUMN_TYPE_STRING },
    problemTypeId: { name: "problem_type_id", type: ColumnType.COLUMN_TYPE_INT },
    proposedDifficultyId: { name: "proposed_difficulty_id", type: ColumnType.COLUMN_TYPE_INT },
    acceptSubmissions: { name: "accept_submissions", type: ColumnType.COLUMN_TYPE_INT },
    createDate: { name: "create_date", type: ColumnType.COLUMN_TYPE_DATETIME },
    modifyDate: { name: "modify_date", type: ColumnType.COLUMN_TYPE_DATETIME },
    proposedDivisionId: { name: "proposed_division_id", type: ColumnType.COLUMN_TYPE_INT },
  },
};
