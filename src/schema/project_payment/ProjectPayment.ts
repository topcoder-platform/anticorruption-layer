import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { LegacyChallengePayment } from "../../models/domain-layer/legacy/challenge_payment";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectPaymentSchema: Schema<LegacyChallengePayment> = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment",
  columns: {
    projectPaymentId: { name: "project_payment_id", type: ColumnType.COLUMN_TYPE_INT },
    projectPaymentTypeId: { name: "project_payment_type_id", type: ColumnType.COLUMN_TYPE_INT },
    resourceId: { name: "resource_id", type: ColumnType.COLUMN_TYPE_INT },
    submissionId: { name: "submission_id", type: ColumnType.COLUMN_TYPE_INT },
    pactsPaymentId: { name: "pacts_payment_id", type: ColumnType.COLUMN_TYPE_INT },
    amount: { name: "amount", type: ColumnType.COLUMN_TYPE_DOUBLE },
    ...AuditColumns,
  },
};
