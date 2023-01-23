import { ColumnType } from "../../dist/grpc/models/rdb/relational";

export type TableColumn = {
  name: string;
  type: ColumnType;
};

export type TableColumns = {
  [key: string]: TableColumn;
};
