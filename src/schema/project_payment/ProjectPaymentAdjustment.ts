import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner";
import { LegacyChallengePaymentAdjustment } from "../../models/domain-layer/legacy/challenge_payment_adjustment";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectPaymentAdjustment: Schema<LegacyChallengePaymentAdjustment> = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment_adjustment",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceRoleId: { name: "resource_role_id", type: ColumnType.COLUMN_TYPE_INT },
    fixedAmount: { name: "fixed_amount", type: ColumnType.COLUMN_TYPE_FLOAT },
    multiplier: { name: "multiplier", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
