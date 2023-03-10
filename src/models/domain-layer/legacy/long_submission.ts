/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LongSubmission {
  longComponentStateId: number;
  submissionNumber: number;
  submissionText: string;
  openTime: number;
  submitTime: number;
  submissionPoints: number;
  languageId: number;
  example: boolean;
}

export interface CreateLongSubmissionInput {
  submissionNumber: number;
  submissionText: string;
  openTime: number;
  submitTime: number;
  submissionPoints: number;
  languageId: number;
  example: boolean;
}

function createBaseLongSubmission(): LongSubmission {
  return {
    longComponentStateId: 0,
    submissionNumber: 0,
    submissionText: "",
    openTime: 0,
    submitTime: 0,
    submissionPoints: 0,
    languageId: 0,
    example: false,
  };
}

export const LongSubmission = {
  encode(message: LongSubmission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.longComponentStateId !== 0) {
      writer.uint32(8).int32(message.longComponentStateId);
    }
    if (message.submissionNumber !== 0) {
      writer.uint32(16).int32(message.submissionNumber);
    }
    if (message.submissionText !== "") {
      writer.uint32(26).string(message.submissionText);
    }
    if (message.openTime !== 0) {
      writer.uint32(32).int64(message.openTime);
    }
    if (message.submitTime !== 0) {
      writer.uint32(40).int64(message.submitTime);
    }
    if (message.submissionPoints !== 0) {
      writer.uint32(48).int32(message.submissionPoints);
    }
    if (message.languageId !== 0) {
      writer.uint32(56).int32(message.languageId);
    }
    if (message.example === true) {
      writer.uint32(64).bool(message.example);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LongSubmission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLongSubmission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.longComponentStateId = reader.int32();
          break;
        case 2:
          message.submissionNumber = reader.int32();
          break;
        case 3:
          message.submissionText = reader.string();
          break;
        case 4:
          message.openTime = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.submitTime = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.submissionPoints = reader.int32();
          break;
        case 7:
          message.languageId = reader.int32();
          break;
        case 8:
          message.example = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LongSubmission {
    return {
      longComponentStateId: isSet(object.longComponentStateId) ? Number(object.longComponentStateId) : 0,
      submissionNumber: isSet(object.submissionNumber) ? Number(object.submissionNumber) : 0,
      submissionText: isSet(object.submissionText) ? String(object.submissionText) : "",
      openTime: isSet(object.openTime) ? Number(object.openTime) : 0,
      submitTime: isSet(object.submitTime) ? Number(object.submitTime) : 0,
      submissionPoints: isSet(object.submissionPoints) ? Number(object.submissionPoints) : 0,
      languageId: isSet(object.languageId) ? Number(object.languageId) : 0,
      example: isSet(object.example) ? Boolean(object.example) : false,
    };
  },

  toJSON(message: LongSubmission): unknown {
    const obj: any = {};
    message.longComponentStateId !== undefined && (obj.longComponentStateId = Math.round(message.longComponentStateId));
    message.submissionNumber !== undefined && (obj.submissionNumber = Math.round(message.submissionNumber));
    message.submissionText !== undefined && (obj.submissionText = message.submissionText);
    message.openTime !== undefined && (obj.openTime = Math.round(message.openTime));
    message.submitTime !== undefined && (obj.submitTime = Math.round(message.submitTime));
    message.submissionPoints !== undefined && (obj.submissionPoints = Math.round(message.submissionPoints));
    message.languageId !== undefined && (obj.languageId = Math.round(message.languageId));
    message.example !== undefined && (obj.example = message.example);
    return obj;
  },

  create<I extends Exact<DeepPartial<LongSubmission>, I>>(base?: I): LongSubmission {
    return LongSubmission.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LongSubmission>, I>>(object: I): LongSubmission {
    const message = createBaseLongSubmission();
    message.longComponentStateId = object.longComponentStateId ?? 0;
    message.submissionNumber = object.submissionNumber ?? 0;
    message.submissionText = object.submissionText ?? "";
    message.openTime = object.openTime ?? 0;
    message.submitTime = object.submitTime ?? 0;
    message.submissionPoints = object.submissionPoints ?? 0;
    message.languageId = object.languageId ?? 0;
    message.example = object.example ?? false;
    return message;
  },
};

function createBaseCreateLongSubmissionInput(): CreateLongSubmissionInput {
  return {
    submissionNumber: 0,
    submissionText: "",
    openTime: 0,
    submitTime: 0,
    submissionPoints: 0,
    languageId: 0,
    example: false,
  };
}

export const CreateLongSubmissionInput = {
  encode(message: CreateLongSubmissionInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionNumber !== 0) {
      writer.uint32(8).int32(message.submissionNumber);
    }
    if (message.submissionText !== "") {
      writer.uint32(18).string(message.submissionText);
    }
    if (message.openTime !== 0) {
      writer.uint32(24).int64(message.openTime);
    }
    if (message.submitTime !== 0) {
      writer.uint32(32).int64(message.submitTime);
    }
    if (message.submissionPoints !== 0) {
      writer.uint32(40).int32(message.submissionPoints);
    }
    if (message.languageId !== 0) {
      writer.uint32(48).int32(message.languageId);
    }
    if (message.example === true) {
      writer.uint32(56).bool(message.example);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateLongSubmissionInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateLongSubmissionInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionNumber = reader.int32();
          break;
        case 2:
          message.submissionText = reader.string();
          break;
        case 3:
          message.openTime = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.submitTime = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.submissionPoints = reader.int32();
          break;
        case 6:
          message.languageId = reader.int32();
          break;
        case 7:
          message.example = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateLongSubmissionInput {
    return {
      submissionNumber: isSet(object.submissionNumber) ? Number(object.submissionNumber) : 0,
      submissionText: isSet(object.submissionText) ? String(object.submissionText) : "",
      openTime: isSet(object.openTime) ? Number(object.openTime) : 0,
      submitTime: isSet(object.submitTime) ? Number(object.submitTime) : 0,
      submissionPoints: isSet(object.submissionPoints) ? Number(object.submissionPoints) : 0,
      languageId: isSet(object.languageId) ? Number(object.languageId) : 0,
      example: isSet(object.example) ? Boolean(object.example) : false,
    };
  },

  toJSON(message: CreateLongSubmissionInput): unknown {
    const obj: any = {};
    message.submissionNumber !== undefined && (obj.submissionNumber = Math.round(message.submissionNumber));
    message.submissionText !== undefined && (obj.submissionText = message.submissionText);
    message.openTime !== undefined && (obj.openTime = Math.round(message.openTime));
    message.submitTime !== undefined && (obj.submitTime = Math.round(message.submitTime));
    message.submissionPoints !== undefined && (obj.submissionPoints = Math.round(message.submissionPoints));
    message.languageId !== undefined && (obj.languageId = Math.round(message.languageId));
    message.example !== undefined && (obj.example = message.example);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateLongSubmissionInput>, I>>(base?: I): CreateLongSubmissionInput {
    return CreateLongSubmissionInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateLongSubmissionInput>, I>>(object: I): CreateLongSubmissionInput {
    const message = createBaseCreateLongSubmissionInput();
    message.submissionNumber = object.submissionNumber ?? 0;
    message.submissionText = object.submissionText ?? "";
    message.openTime = object.openTime ?? 0;
    message.submitTime = object.submitTime ?? 0;
    message.submissionPoints = object.submissionPoints ?? 0;
    message.languageId = object.languageId ?? 0;
    message.example = object.example ?? false;
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
