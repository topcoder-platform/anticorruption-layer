/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Notification {
  notificationTypeId: number;
  externalRefId: number;
  projectId: number;
}

export interface NotificationList {
  notifications: Notification[];
}

export interface GetNotificationsInput {
  externalRefId: number;
  projectId: number;
}

export interface DeleteNotificationsInput {
  externalRefId: number;
  projectId: number;
}

function createBaseNotification(): Notification {
  return { notificationTypeId: 0, externalRefId: 0, projectId: 0 };
}

export const Notification = {
  encode(message: Notification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.notificationTypeId !== 0) {
      writer.uint32(8).int32(message.notificationTypeId);
    }
    if (message.externalRefId !== 0) {
      writer.uint32(16).int32(message.externalRefId);
    }
    if (message.projectId !== 0) {
      writer.uint32(24).int32(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.notificationTypeId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.externalRefId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.projectId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Notification {
    return {
      notificationTypeId: isSet(object.notificationTypeId) ? globalThis.Number(object.notificationTypeId) : 0,
      externalRefId: isSet(object.externalRefId) ? globalThis.Number(object.externalRefId) : 0,
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
    };
  },

  toJSON(message: Notification): unknown {
    const obj: any = {};
    if (message.notificationTypeId !== 0) {
      obj.notificationTypeId = Math.round(message.notificationTypeId);
    }
    if (message.externalRefId !== 0) {
      obj.externalRefId = Math.round(message.externalRefId);
    }
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Notification>, I>>(base?: I): Notification {
    return Notification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Notification>, I>>(object: I): Notification {
    const message = createBaseNotification();
    message.notificationTypeId = object.notificationTypeId ?? 0;
    message.externalRefId = object.externalRefId ?? 0;
    message.projectId = object.projectId ?? 0;
    return message;
  },
};

function createBaseNotificationList(): NotificationList {
  return { notifications: [] };
}

export const NotificationList = {
  encode(message: NotificationList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotificationList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotificationList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.notifications.push(Notification.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NotificationList {
    return {
      notifications: globalThis.Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) => Notification.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NotificationList): unknown {
    const obj: any = {};
    if (message.notifications?.length) {
      obj.notifications = message.notifications.map((e) => Notification.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NotificationList>, I>>(base?: I): NotificationList {
    return NotificationList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NotificationList>, I>>(object: I): NotificationList {
    const message = createBaseNotificationList();
    message.notifications = object.notifications?.map((e) => Notification.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetNotificationsInput(): GetNotificationsInput {
  return { externalRefId: 0, projectId: 0 };
}

export const GetNotificationsInput = {
  encode(message: GetNotificationsInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.externalRefId !== 0) {
      writer.uint32(8).int32(message.externalRefId);
    }
    if (message.projectId !== 0) {
      writer.uint32(16).int32(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNotificationsInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNotificationsInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.externalRefId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetNotificationsInput {
    return {
      externalRefId: isSet(object.externalRefId) ? globalThis.Number(object.externalRefId) : 0,
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
    };
  },

  toJSON(message: GetNotificationsInput): unknown {
    const obj: any = {};
    if (message.externalRefId !== 0) {
      obj.externalRefId = Math.round(message.externalRefId);
    }
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetNotificationsInput>, I>>(base?: I): GetNotificationsInput {
    return GetNotificationsInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetNotificationsInput>, I>>(object: I): GetNotificationsInput {
    const message = createBaseGetNotificationsInput();
    message.externalRefId = object.externalRefId ?? 0;
    message.projectId = object.projectId ?? 0;
    return message;
  },
};

function createBaseDeleteNotificationsInput(): DeleteNotificationsInput {
  return { externalRefId: 0, projectId: 0 };
}

export const DeleteNotificationsInput = {
  encode(message: DeleteNotificationsInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.externalRefId !== 0) {
      writer.uint32(8).int32(message.externalRefId);
    }
    if (message.projectId !== 0) {
      writer.uint32(16).int32(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNotificationsInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteNotificationsInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.externalRefId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteNotificationsInput {
    return {
      externalRefId: isSet(object.externalRefId) ? globalThis.Number(object.externalRefId) : 0,
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
    };
  },

  toJSON(message: DeleteNotificationsInput): unknown {
    const obj: any = {};
    if (message.externalRefId !== 0) {
      obj.externalRefId = Math.round(message.externalRefId);
    }
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteNotificationsInput>, I>>(base?: I): DeleteNotificationsInput {
    return DeleteNotificationsInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteNotificationsInput>, I>>(object: I): DeleteNotificationsInput {
    const message = createBaseDeleteNotificationsInput();
    message.externalRefId = object.externalRefId ?? 0;
    message.projectId = object.projectId ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
