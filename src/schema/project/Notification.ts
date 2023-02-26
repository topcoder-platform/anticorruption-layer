import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Notification } from "../../models/domain-layer/legacy/notification";
import { AuditColumns } from "../common/AuditColumns";

export const NotificationSchema: Schema<Notification> = {
  dbSchema: "tcs_catalog",
  tableName: "notification",
  columns: {
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    notificationTypeId: { name: "notification_type_id", type: ColumnType.COLUMN_TYPE_INT },
    externalRefId: { name: "external_ref_id", type: ColumnType.COLUMN_TYPE_INT },
    ...AuditColumns,
  },
};
