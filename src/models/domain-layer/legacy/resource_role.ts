/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface ResourceRole {
  resourceRoleId: number;
  phaseTypeId: number;
  name: string;
  description: string;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

function createBaseResourceRole(): ResourceRole {
  return {
    resourceRoleId: 0,
    phaseTypeId: 0,
    name: "",
    description: "",
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const ResourceRole = {
  encode(message: ResourceRole, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceRoleId !== 0) {
      writer.uint32(8).int32(message.resourceRoleId);
    }
    if (message.phaseTypeId !== 0) {
      writer.uint32(16).int32(message.phaseTypeId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.createUser !== 0) {
      writer.uint32(40).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(48).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(56).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(64).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceRole {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceRole();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resourceRoleId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.phaseTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.createDate = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
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

  fromJSON(object: any): ResourceRole {
    return {
      resourceRoleId: isSet(object.resourceRoleId) ? Number(object.resourceRoleId) : 0,
      phaseTypeId: isSet(object.phaseTypeId) ? Number(object.phaseTypeId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: ResourceRole): unknown {
    const obj: any = {};
    if (message.resourceRoleId !== 0) {
      obj.resourceRoleId = Math.round(message.resourceRoleId);
    }
    if (message.phaseTypeId !== 0) {
      obj.phaseTypeId = Math.round(message.phaseTypeId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
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

  create<I extends Exact<DeepPartial<ResourceRole>, I>>(base?: I): ResourceRole {
    return ResourceRole.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResourceRole>, I>>(object: I): ResourceRole {
    const message = createBaseResourceRole();
    message.resourceRoleId = object.resourceRoleId ?? 0;
    message.phaseTypeId = object.phaseTypeId ?? 0;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
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
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
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
