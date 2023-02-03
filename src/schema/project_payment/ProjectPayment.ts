import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner";
import { LegacyChallengePayment } from "../../models/domain-layer/legacy/challenge_payment";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectPaymentSchema: Schema<LegacyChallengePayment> = {
  dbSchema: "tcs_catalog",
  tableName: "project_payment",
  columns: {
    place: { name: "place", type: ColumnType.COLUMN_TYPE_INT },
    prizeId: { name: "prize_id", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeTypeId: { name: "prize_type_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeAmount: { name: "prize_amount", type: ColumnType.COLUMN_TYPE_FLOAT },
    ...AuditColumns,
  },
};
