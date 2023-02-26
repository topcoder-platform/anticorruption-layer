import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { User } from "../../models/domain-layer/legacy/user";

export const UserSchema: Schema<User> = {
  dbSchema: "tcs_catalog",
  tableName: "notification",
  columns: {
    userId: { name: "user_id", type: ColumnType.COLUMN_TYPE_INT },
    firstName: { name: "first_name", type: ColumnType.COLUMN_TYPE_STRING },
    lastName: { name: "last_name", type: ColumnType.COLUMN_TYPE_STRING },
    handle: { name: "handle", type: ColumnType.COLUMN_TYPE_STRING },
    status: { name: "status", type: ColumnType.COLUMN_TYPE_STRING },
    handleLower: { name: "handle_lower", type: ColumnType.COLUMN_TYPE_STRING },
    createDate: { name: "create_date", type: ColumnType.COLUMN_TYPE_DATETIME },
    modifyDate: { name: "modify_date", type: ColumnType.COLUMN_TYPE_DATETIME },
  },
};
