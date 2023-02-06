import { Schema } from "../../common/QueryRunner";
import { ColumnType } from "@topcoder-framework/client-relational";

export const PrizeType: Schema = {
  dbSchema: "tcs_catalog",
  tableName: "prize_type_lu",
  columns: {
    prizeTypeId: { name: "prize_type_id", type: ColumnType.COLUMN_TYPE_INT },
    prizeTypeDesc: { name: "prize_type_desc", type: ColumnType.COLUMN_TYPE_STRING },
  },
};
