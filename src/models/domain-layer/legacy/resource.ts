/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Resource {
  resourceId: number;
  resourceRoleId: number;
  projectId: number;
  projectPhaseId: number;
  userId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

function createBaseResource(): Resource {
  return {
    resourceId: 0,
    resourceRoleId: 0,
    projectId: 0,
    projectPhaseId: 0,
    userId: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const Resource = {
  encode(message: Resource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.resourceRoleId !== 0) {
      writer.uint32(16).int32(message.resourceRoleId);
    }
    if (message.projectId !== 0) {
      writer.uint32(24).int32(message.projectId);
    }
    if (message.projectPhaseId !== 0) {
      writer.uint32(32).int32(message.projectPhaseId);
    }
    if (message.userId !== 0) {
      writer.uint32(40).int32(message.userId);
    }
    if (message.createUser !== 0) {
      writer.uint32(48).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(56).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(64).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(72).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Resource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resourceId = reader.int32();
          break;
        case 2:
          message.resourceRoleId = reader.int32();
          break;
        case 3:
          message.projectId = reader.int32();
          break;
        case 4:
          message.projectPhaseId = reader.int32();
          break;
        case 5:
          message.userId = reader.int32();
          break;
        case 6:
          message.createUser = reader.int32();
          break;
        case 7:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.modifyUser = reader.int32();
          break;
        case 9:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Resource {
    return {
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      resourceRoleId: isSet(object.resourceRoleId) ? Number(object.resourceRoleId) : 0,
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      projectPhaseId: isSet(object.projectPhaseId) ? Number(object.projectPhaseId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: Resource): unknown {
    const obj: any = {};
    message.resourceId !== undefined && (obj.resourceId = Math.round(message.resourceId));
    message.resourceRoleId !== undefined && (obj.resourceRoleId = Math.round(message.resourceRoleId));
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.projectPhaseId !== undefined && (obj.projectPhaseId = Math.round(message.projectPhaseId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<Resource>, I>>(base?: I): Resource {
    return Resource.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Resource>, I>>(object: I): Resource {
    const message = createBaseResource();
    message.resourceId = object.resourceId ?? 0;
    message.resourceRoleId = object.resourceRoleId ?? 0;
    message.projectId = object.projectId ?? 0;
    message.projectPhaseId = object.projectPhaseId ?? 0;
    message.userId = object.userId ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}