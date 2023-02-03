import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner";
import { LegacyChallengePaymentType } from "../../models/domain-layer/legacy/challenge_payment_type";

export const ProjectPaymentAdjustment: Schema<LegacyChallengePaymentType> = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment_type_lu",
  columns: {
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    mergeable: { name: "mergeable", type: ColumnType.COLUMN_TYPE_BOOLEAN },
    pactsPaymentTypeId: { name: "pacts_payment_type_id", type: ColumnType.COLUMN_TYPE_INT },
    multiplier: { name: "multiplier", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
  },
};
