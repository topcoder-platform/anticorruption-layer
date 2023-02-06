import { ColumnType } from "@topcoder-framework/client-relational";

export type TableColumn = {
  name: string;
  type: ColumnType;
};

export type TableColumns = {
  [key: string]: TableColumn;
};
