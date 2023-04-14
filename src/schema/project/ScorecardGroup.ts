import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ScorecardGroup } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const ScorecardGroupSchema: Schema<ScorecardGroup> = {
  dbSchema: "tcs_catalog",
  tableName: "scorecard_group",
  columns: {
    scorecardGroupId: { name: "scorecard_group_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    scorecardId: { name: "scorecard_id", type: ColumnType.COLUMN_TYPE_INT },
    weight: { name: "weight", type: ColumnType.COLUMN_TYPE_DOUBLE },
    sort: { name: "sort", type: ColumnType.COLUMN_TYPE_INT },
    version: { name: "version", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
