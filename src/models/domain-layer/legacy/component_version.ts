/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyComponentVersion {
  compVersId: number;
  componentId: number;
  version: number;
  versionText: string;
  createTime: string;
  phaseId: number;
  phaseTime: string;
  price: number;
  comments: string;
  modifyDate: string;
  suspendedInd: number;
}

function createBaseLegacyComponentVersion(): LegacyComponentVersion {
  return {
    compVersId: 0,
    componentId: 0,
    version: 0,
    versionText: "",
    createTime: "",
    phaseId: 0,
    phaseTime: "",
    price: 0,
    comments: "",
    modifyDate: "",
    suspendedInd: 0,
  };
}

export const LegacyComponentVersion = {
  encode(message: LegacyComponentVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.compVersId !== 0) {
      writer.uint32(8).int64(message.compVersId);
    }
    if (message.componentId !== 0) {
      writer.uint32(16).int64(message.componentId);
    }
    if (message.version !== 0) {
      writer.uint32(24).int64(message.version);
    }
    if (message.versionText !== "") {
      writer.uint32(34).string(message.versionText);
    }
    if (message.createTime !== "") {
      writer.uint32(42).string(message.createTime);
    }
    if (message.phaseId !== 0) {
      writer.uint32(48).int64(message.phaseId);
    }
    if (message.phaseTime !== "") {
      writer.uint32(58).string(message.phaseTime);
    }
    if (message.price !== 0) {
      writer.uint32(65).double(message.price);
    }
    if (message.comments !== "") {
      writer.uint32(74).string(message.comments);
    }
    if (message.modifyDate !== "") {
      writer.uint32(82).string(message.modifyDate);
    }
    if (message.suspendedInd !== 0) {
      writer.uint32(88).int64(message.suspendedInd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyComponentVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyComponentVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.compVersId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.componentId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.version = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.versionText = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createTime = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.phaseId = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.phaseTime = reader.string();
          continue;
        case 8:
          if (tag !== 65) {
            break;
          }

          message.price = reader.double();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.comments = reader.string();
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

          message.suspendedInd = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegacyComponentVersion {
    return {
      compVersId: isSet(object.compVersId) ? Number(object.compVersId) : 0,
      componentId: isSet(object.componentId) ? Number(object.componentId) : 0,
      version: isSet(object.version) ? Number(object.version) : 0,
      versionText: isSet(object.versionText) ? String(object.versionText) : "",
      createTime: isSet(object.createTime) ? String(object.createTime) : "",
      phaseId: isSet(object.phaseId) ? Number(object.phaseId) : 0,
      phaseTime: isSet(object.phaseTime) ? String(object.phaseTime) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      comments: isSet(object.comments) ? String(object.comments) : "",
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : "",
      suspendedInd: isSet(object.suspendedInd) ? Number(object.suspendedInd) : 0,
    };
  },

  toJSON(message: LegacyComponentVersion): unknown {
    const obj: any = {};
    message.compVersId !== undefined && (obj.compVersId = Math.round(message.compVersId));
    message.componentId !== undefined && (obj.componentId = Math.round(message.componentId));
    message.version !== undefined && (obj.version = Math.round(message.version));
    message.versionText !== undefined && (obj.versionText = message.versionText);
    message.createTime !== undefined && (obj.createTime = message.createTime);
    message.phaseId !== undefined && (obj.phaseId = Math.round(message.phaseId));
    message.phaseTime !== undefined && (obj.phaseTime = message.phaseTime);
    message.price !== undefined && (obj.price = message.price);
    message.comments !== undefined && (obj.comments = message.comments);
    message.modifyDate !== undefined && (obj.modifyDate = message.modifyDate);
    message.suspendedInd !== undefined && (obj.suspendedInd = Math.round(message.suspendedInd));
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyComponentVersion>, I>>(base?: I): LegacyComponentVersion {
    return LegacyComponentVersion.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyComponentVersion>, I>>(object: I): LegacyComponentVersion {
    const message = createBaseLegacyComponentVersion();
    message.compVersId = object.compVersId ?? 0;
    message.componentId = object.componentId ?? 0;
    message.version = object.version ?? 0;
    message.versionText = object.versionText ?? "";
    message.createTime = object.createTime ?? "";
    message.phaseId = object.phaseId ?? 0;
    message.phaseTime = object.phaseTime ?? "";
    message.price = object.price ?? 0;
    message.comments = object.comments ?? "";
    message.modifyDate = object.modifyDate ?? "";
    message.suspendedInd = object.suspendedInd ?? 0;
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
