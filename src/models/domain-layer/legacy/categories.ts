/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyCategory {
  categoryId: number;
  parentCategoryId: number;
  categoryName: string;
  categoryDescription: string;
  statusId: number;
  viewable: number;
  isCustom: boolean;
}

function createBaseLegacyCategory(): LegacyCategory {
  return {
    categoryId: 0,
    parentCategoryId: 0,
    categoryName: "",
    categoryDescription: "",
    statusId: 0,
    viewable: 0,
    isCustom: false,
  };
}

export const LegacyCategory = {
  encode(message: LegacyCategory, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.categoryId !== 0) {
      writer.uint32(8).int64(message.categoryId);
    }
    if (message.parentCategoryId !== 0) {
      writer.uint32(16).int64(message.parentCategoryId);
    }
    if (message.categoryName !== "") {
      writer.uint32(26).string(message.categoryName);
    }
    if (message.categoryDescription !== "") {
      writer.uint32(34).string(message.categoryDescription);
    }
    if (message.statusId !== 0) {
      writer.uint32(40).int32(message.statusId);
    }
    if (message.viewable !== 0) {
      writer.uint32(48).int32(message.viewable);
    }
    if (message.isCustom === true) {
      writer.uint32(56).bool(message.isCustom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyCategory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.categoryId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.parentCategoryId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.categoryName = reader.string();
          break;
        case 4:
          message.categoryDescription = reader.string();
          break;
        case 5:
          message.statusId = reader.int32();
          break;
        case 6:
          message.viewable = reader.int32();
          break;
        case 7:
          message.isCustom = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacyCategory {
    return {
      categoryId: isSet(object.categoryId) ? Number(object.categoryId) : 0,
      parentCategoryId: isSet(object.parentCategoryId) ? Number(object.parentCategoryId) : 0,
      categoryName: isSet(object.categoryName) ? String(object.categoryName) : "",
      categoryDescription: isSet(object.categoryDescription)
        ? String(object.categoryDescription)
        : "",
      statusId: isSet(object.statusId) ? Number(object.statusId) : 0,
      viewable: isSet(object.viewable) ? Number(object.viewable) : 0,
      isCustom: isSet(object.isCustom) ? Boolean(object.isCustom) : false,
    };
  },

  toJSON(message: LegacyCategory): unknown {
    const obj: any = {};
    message.categoryId !== undefined && (obj.categoryId = Math.round(message.categoryId));
    message.parentCategoryId !== undefined &&
      (obj.parentCategoryId = Math.round(message.parentCategoryId));
    message.categoryName !== undefined && (obj.categoryName = message.categoryName);
    message.categoryDescription !== undefined &&
      (obj.categoryDescription = message.categoryDescription);
    message.statusId !== undefined && (obj.statusId = Math.round(message.statusId));
    message.viewable !== undefined && (obj.viewable = Math.round(message.viewable));
    message.isCustom !== undefined && (obj.isCustom = message.isCustom);
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyCategory>, I>>(base?: I): LegacyCategory {
    return LegacyCategory.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyCategory>, I>>(object: I): LegacyCategory {
    const message = createBaseLegacyCategory();
    message.categoryId = object.categoryId ?? 0;
    message.parentCategoryId = object.parentCategoryId ?? 0;
    message.categoryName = object.categoryName ?? "";
    message.categoryDescription = object.categoryDescription ?? "";
    message.statusId = object.statusId ?? 0;
    message.viewable = object.viewable ?? 0;
    message.isCustom = object.isCustom ?? false;
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
