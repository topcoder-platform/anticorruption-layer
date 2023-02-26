import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ScorecardSection } from "../../models/domain-layer/legacy/review";
import { AuditColumns } from "../common/AuditColumns";

export const ScorecardSectionSchema: Schema<ScorecardSection> = {
  dbSchema: "tcs_catalog",
  tableName: "scorecard_section",
  columns: {
    scorecardSectionId: { name: "scorecard_section_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    scorecardGroupId: { name: "scorecard_id", type: ColumnType.COLUMN_TYPE_INT },
    weight: { name: "weight", type: ColumnType.COLUMN_TYPE_FLOAT },
    sort: { name: "sort", type: ColumnType.COLUMN_TYPE_INT },
    version: { name: "version", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
