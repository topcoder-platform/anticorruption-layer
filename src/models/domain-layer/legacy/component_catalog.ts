/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyComponentCatalog {
  componentId: number;
  currentVersion: number;
  shortDesc: string;
  componentName: string;
  description: string;
  functionDesc: string;
  createTime: string;
  statusId: number;
  rootCategoryId: number;
  modifyDate: string;
  publicInd: number;
}

function createBaseLegacyComponentCatalog(): LegacyComponentCatalog {
  return {
    componentId: 0,
    currentVersion: 0,
    shortDesc: "",
    componentName: "",
    description: "",
    functionDesc: "",
    createTime: "",
    statusId: 0,
    rootCategoryId: 0,
    modifyDate: "",
    publicInd: 0,
  };
}

export const LegacyComponentCatalog = {
  encode(message: LegacyComponentCatalog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.componentId !== 0) {
      writer.uint32(8).int64(message.componentId);
    }
    if (message.currentVersion !== 0) {
      writer.uint32(16).int64(message.currentVersion);
    }
    if (message.shortDesc !== "") {
      writer.uint32(26).string(message.shortDesc);
    }
    if (message.componentName !== "") {
      writer.uint32(34).string(message.componentName);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.functionDesc !== "") {
      writer.uint32(50).string(message.functionDesc);
    }
    if (message.createTime !== "") {
      writer.uint32(58).string(message.createTime);
    }
    if (message.statusId !== 0) {
      writer.uint32(64).int64(message.statusId);
    }
    if (message.rootCategoryId !== 0) {
      writer.uint32(72).int64(message.rootCategoryId);
    }
    if (message.modifyDate !== "") {
      writer.uint32(82).string(message.modifyDate);
    }
    if (message.publicInd !== 0) {
      writer.uint32(88).int32(message.publicInd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyComponentCatalog {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyComponentCatalog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.componentId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.currentVersion = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.shortDesc = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.componentName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.functionDesc = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.createTime = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.statusId = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.rootCategoryId = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.modifyDate = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.publicInd = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegacyComponentCatalog {
    return {
      componentId: isSet(object.componentId) ? globalThis.Number(object.componentId) : 0,
      currentVersion: isSet(object.currentVersion) ? globalThis.Number(object.currentVersion) : 0,
      shortDesc: isSet(object.shortDesc) ? globalThis.String(object.shortDesc) : "",
      componentName: isSet(object.componentName) ? globalThis.String(object.componentName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      functionDesc: isSet(object.functionDesc) ? globalThis.String(object.functionDesc) : "",
      createTime: isSet(object.createTime) ? globalThis.String(object.createTime) : "",
      statusId: isSet(object.statusId) ? globalThis.Number(object.statusId) : 0,
      rootCategoryId: isSet(object.rootCategoryId) ? globalThis.Number(object.rootCategoryId) : 0,
      modifyDate: isSet(object.modifyDate) ? globalThis.String(object.modifyDate) : "",
      publicInd: isSet(object.publicInd) ? globalThis.Number(object.publicInd) : 0,
    };
  },

  toJSON(message: LegacyComponentCatalog): unknown {
    const obj: any = {};
    if (message.componentId !== 0) {
      obj.componentId = Math.round(message.componentId);
    }
    if (message.currentVersion !== 0) {
      obj.currentVersion = Math.round(message.currentVersion);
    }
    if (message.shortDesc !== "") {
      obj.shortDesc = message.shortDesc;
    }
    if (message.componentName !== "") {
      obj.componentName = message.componentName;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.functionDesc !== "") {
      obj.functionDesc = message.functionDesc;
    }
    if (message.createTime !== "") {
      obj.createTime = message.createTime;
    }
    if (message.statusId !== 0) {
      obj.statusId = Math.round(message.statusId);
    }
    if (message.rootCategoryId !== 0) {
      obj.rootCategoryId = Math.round(message.rootCategoryId);
    }
    if (message.modifyDate !== "") {
      obj.modifyDate = message.modifyDate;
    }
    if (message.publicInd !== 0) {
      obj.publicInd = Math.round(message.publicInd);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyComponentCatalog>, I>>(base?: I): LegacyComponentCatalog {
    return LegacyComponentCatalog.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegacyComponentCatalog>, I>>(object: I): LegacyComponentCatalog {
    const message = createBaseLegacyComponentCatalog();
    message.componentId = object.componentId ?? 0;
    message.currentVersion = object.currentVersion ?? 0;
    message.shortDesc = object.shortDesc ?? "";
    message.componentName = object.componentName ?? "";
    message.description = object.description ?? "";
    message.functionDesc = object.functionDesc ?? "";
    message.createTime = object.createTime ?? "";
    message.statusId = object.statusId ?? 0;
    message.rootCategoryId = object.rootCategoryId ?? 0;
    message.modifyDate = object.modifyDate ?? "";
    message.publicInd = object.publicInd ?? 0;
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
