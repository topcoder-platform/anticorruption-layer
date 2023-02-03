import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner.js";
import { LegacyChallengeStatus } from "../../models/domain-layer/legacy/challenge_status";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectStatusSchema: Schema<LegacyChallengeStatus> = {
  dbSchema: "tcs_catalog",
  tableName: "project_status_lu",
  columns: {
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    description: { name: "description", type: ColumnType.COLUMN_TYPE_STRING },
    projectStatusId: { name: "project_status_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
