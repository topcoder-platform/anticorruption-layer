import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { RoundComponent } from "../../models/domain-layer/legacy/round_component";

export const RoundComponentSchema: Schema<RoundComponent> = {
  dbSchema: "informixoltp",
  tableName: "round_component",
  idTable: "round_component",
  columns: {
    roundId: { name: "round_id", type: ColumnType.COLUMN_TYPE_INT },
    componentId: { name: "component_id", type: ColumnType.COLUMN_TYPE_INT },
    submitOrder: { name: "submit_order", type: ColumnType.COLUMN_TYPE_INT },
    divisionId: { name: "division_id", type: ColumnType.COLUMN_TYPE_INT },
    difficultyId: { name: "difficulty_id", type: ColumnType.COLUMN_TYPE_INT },
    points: { name: "points", type: ColumnType.COLUMN_TYPE_FLOAT },
    openOrder: { name: "open_order", type: ColumnType.COLUMN_TYPE_INT },
  },
};
