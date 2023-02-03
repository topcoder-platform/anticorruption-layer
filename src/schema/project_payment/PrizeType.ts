import { ColumnType } from "@topcoder-framework/client-relational";
import { Schema } from "../../common/QueryRunner";
import { PrizeType } from "../../models/domain-layer/legacy/prize";

export const PrizeTypeSchema: Schema<PrizeType> = {
  dbSchema: "tcs_catalog",
  tableName: "prize_type_lu",
  columns: {
    prizeTypeId: { name: "prize_type_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeTypeDesc: { name: "prize_type_desc", type: ColumnType.COLUMN_TYPE_STRING },
  },
};
