import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Component } from "../../models/domain-layer/legacy/Component";

export const ComponentSchema: Schema<Component> = {
  dbSchema: "informixoltp",
  tableName: "component",
  idSequence: "COMPONENT_SEQ",
  idColumn: "component_id",
  idTable: "component",
  columns: {
    componentId: { name: "component_id", type: ColumnType.COLUMN_TYPE_INT },
    problemId: { name: "problem_id", type: ColumnType.COLUMN_TYPE_INT },
    resultTypeId: { name: "result_type_id", type: ColumnType.COLUMN_TYPE_INT },
    methodName: { name: "method_name", type: ColumnType.COLUMN_TYPE_STRING },
    className: { name: "class_name", type: ColumnType.COLUMN_TYPE_STRING },
    defaultSolution: { name: "default_solution", type: ColumnType.COLUMN_TYPE_STRING },
    componentTypeId: { name: "component_type_id", type: ColumnType.COLUMN_TYPE_INT },
    componentText: { name: "component_text", type: ColumnType.COLUMN_TYPE_STRING },
    statusId: { name: "status_id", type: ColumnType.COLUMN_TYPE_INT },
    modifyDate: { name: "modify_date", type: ColumnType.COLUMN_TYPE_DATETIME },
  },
};
