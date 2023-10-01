/* eslint-disable */
import type { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { Empty } from "@topcoder-framework/lib-common";
import { DeleteNotificationsInput, GetNotificationsInput, NotificationList } from "../notification";

export type LegacyNotificationService = typeof LegacyNotificationService;
export const LegacyNotificationService = {
  getNotifications: {
    path: "/topcoder.domain.service.notification.LegacyNotification/GetNotifications",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetNotificationsInput) => Buffer.from(GetNotificationsInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetNotificationsInput.decode(value),
    responseSerialize: (value: NotificationList) => Buffer.from(NotificationList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => NotificationList.decode(value),
  },
  deleteNotifications: {
    path: "/topcoder.domain.service.notification.LegacyNotification/DeleteNotifications",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteNotificationsInput) => Buffer.from(DeleteNotificationsInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteNotificationsInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface LegacyNotificationServer extends UntypedServiceImplementation {
  getNotifications: handleUnaryCall<GetNotificationsInput, NotificationList>;
  deleteNotifications: handleUnaryCall<DeleteNotificationsInput, Empty>;
}
