import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ContestEligibility } from "../../models/domain-layer/legacy/group_contest_eligibility";

export const ContestEligibilitySchema: Schema<ContestEligibility> = {
  dbSchema: "tcs_catalog",
  tableName: "contest_eligibility",
  columns: {
    contestEligibilityId: { name: "contest_eligibility_id", type: ColumnType.COLUMN_TYPE_INT },
    contestId: { name: "contest_id", type: ColumnType.COLUMN_TYPE_INT },
    isStudio: { name: "is_studio", type: ColumnType.COLUMN_TYPE_INT },
  },
};
