import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { GroupContestEligibility } from "../../models/domain-layer/legacy/group_contest_eligibility";

export const GroupContestEligibilitySchema: Schema<GroupContestEligibility> = {
  dbSchema: "tcs_catalog",
  tableName: "group_contest_eligibility",
  columns: {
    contestEligibilityId: { name: "contest_eligibility_id", type: ColumnType.COLUMN_TYPE_INT },
    groupId: { name: "group_id", type: ColumnType.COLUMN_TYPE_INT },
  },
};
