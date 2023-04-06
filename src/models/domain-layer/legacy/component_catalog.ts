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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyComponentCatalog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.componentId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.currentVersion = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.shortDesc = reader.string();
          break;
        case 4:
          message.componentName = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.functionDesc = reader.string();
          break;
        case 7:
          message.createTime = reader.string();
          break;
        case 8:
          message.statusId = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.rootCategoryId = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.modifyDate = reader.string();
          break;
        case 11:
          message.publicInd = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacyComponentCatalog {
    return {
      componentId: isSet(object.componentId) ? Number(object.componentId) : 0,
      currentVersion: isSet(object.currentVersion) ? Number(object.currentVersion) : 0,
      shortDesc: isSet(object.shortDesc) ? String(object.shortDesc) : "",
      componentName: isSet(object.componentName) ? String(object.componentName) : "",
      description: isSet(object.description) ? String(object.description) : "",
      functionDesc: isSet(object.functionDesc) ? String(object.functionDesc) : "",
      createTime: isSet(object.createTime) ? String(object.createTime) : "",
      statusId: isSet(object.statusId) ? Number(object.statusId) : 0,
      rootCategoryId: isSet(object.rootCategoryId) ? Number(object.rootCategoryId) : 0,
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : "",
      publicInd: isSet(object.publicInd) ? Number(object.publicInd) : 0,
    };
  },

  toJSON(message: LegacyComponentCatalog): unknown {
    const obj: any = {};
    message.componentId !== undefined && (obj.componentId = Math.round(message.componentId));
    message.currentVersion !== undefined &&
      (obj.currentVersion = Math.round(message.currentVersion));
    message.shortDesc !== undefined && (obj.shortDesc = message.shortDesc);
    message.componentName !== undefined && (obj.componentName = message.componentName);
    message.description !== undefined && (obj.description = message.description);
    message.functionDesc !== undefined && (obj.functionDesc = message.functionDesc);
    message.createTime !== undefined && (obj.createTime = message.createTime);
    message.statusId !== undefined && (obj.statusId = Math.round(message.statusId));
    message.rootCategoryId !== undefined &&
      (obj.rootCategoryId = Math.round(message.rootCategoryId));
    message.modifyDate !== undefined && (obj.modifyDate = message.modifyDate);
    message.publicInd !== undefined && (obj.publicInd = Math.round(message.publicInd));
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyComponentCatalog>, I>>(
    base?: I
  ): LegacyComponentCatalog {
    return LegacyComponentCatalog.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyComponentCatalog>, I>>(
    object: I
  ): LegacyComponentCatalog {
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
