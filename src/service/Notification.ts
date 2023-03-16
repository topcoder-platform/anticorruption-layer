import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyNotificationServer,
  LegacyNotificationService,
} from "../models/domain-layer/legacy/services/notification";

import { Empty } from "@topcoder-framework/lib-common";
import LegacyNotificationDomain from "../domain/Notification";
import {
  DeleteNotificationsInput,
  GetNotificationsInput,
  NotificationList,
} from "../models/domain-layer/legacy/notification";

class LegacyNotificationServerImpl implements LegacyNotificationServer {
  [name: string]: UntypedHandleCall;

  getNotifications: handleUnaryCall<GetNotificationsInput, NotificationList> = (
    call: ServerUnaryCall<GetNotificationsInput, NotificationList>,
    callback: sendUnaryData<NotificationList>
  ) => {
    LegacyNotificationDomain.getNotifications(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  deleteNotifications: handleUnaryCall<DeleteNotificationsInput, Empty> = (
    call: ServerUnaryCall<DeleteNotificationsInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyNotificationDomain.deleteNotifications(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };
}

export { LegacyNotificationServerImpl as LegacyNotificationServer, LegacyNotificationService };
