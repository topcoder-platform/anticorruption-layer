import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { LegacyChallenge } from "../../models/domain-layer/legacy/challenge";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectSchema: Schema<LegacyChallenge> = {
  dbSchema: "tcs_catalog",
  tableName: "project",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    projectStatusId: { name: "project_status_id", type: ColumnType.COLUMN_TYPE_INT },
    projectCategoryId: { name: "project_category_id", type: ColumnType.COLUMN_TYPE_INT },
    tcDirectProjectId: { name: "tc_direct_project_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
