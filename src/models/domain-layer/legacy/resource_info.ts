/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface ResourceInfo {
  resourceId: number;
  resourceInfoTypeId: number;
  value: string;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

function createBaseResourceInfo(): ResourceInfo {
  return {
    resourceId: 0,
    resourceInfoTypeId: 0,
    value: "",
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const ResourceInfo = {
  encode(message: ResourceInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.resourceInfoTypeId !== 0) {
      writer.uint32(16).int32(message.resourceInfoTypeId);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.createUser !== 0) {
      writer.uint32(32).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(40).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(48).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(56).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resourceId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.resourceInfoTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.createDate = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.modifyDate = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResourceInfo {
    return {
      resourceId: isSet(object.resourceId) ? globalThis.Number(object.resourceId) : 0,
      resourceInfoTypeId: isSet(object.resourceInfoTypeId) ? globalThis.Number(object.resourceInfoTypeId) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      createUser: isSet(object.createUser) ? globalThis.Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? globalThis.Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? globalThis.Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? globalThis.Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: ResourceInfo): unknown {
    const obj: any = {};
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.resourceInfoTypeId !== 0) {
      obj.resourceInfoTypeId = Math.round(message.resourceInfoTypeId);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.createUser !== 0) {
      obj.createUser = Math.round(message.createUser);
    }
    if (message.createDate !== 0) {
      obj.createDate = Math.round(message.createDate);
    }
    if (message.modifyUser !== 0) {
      obj.modifyUser = Math.round(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      obj.modifyDate = Math.round(message.modifyDate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResourceInfo>, I>>(base?: I): ResourceInfo {
    return ResourceInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResourceInfo>, I>>(object: I): ResourceInfo {
    const message = createBaseResourceInfo();
    message.resourceId = object.resourceId ?? 0;
    message.resourceInfoTypeId = object.resourceInfoTypeId ?? 0;
    message.value = object.value ?? "";
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
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

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
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
