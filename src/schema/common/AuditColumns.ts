import { ColumnType } from "@topcoder-framework/client-relational";
import { TableColumns } from "../../common/TableColumn";

export const AuditColumns: TableColumns = {
  createUser: { name: "create_user", type: ColumnType.COLUMN_TYPE_INT },
  createDate: { name: "create_date", type: ColumnType.COLUMN_TYPE_DATETIME },
  modifyUser: { name: "modify_user", type: ColumnType.COLUMN_TYPE_INT },
  modifyDate: { name: "modify_date", type: ColumnType.COLUMN_TYPE_DATETIME },
};
