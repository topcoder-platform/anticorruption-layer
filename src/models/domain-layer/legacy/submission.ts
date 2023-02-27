/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacySubmission {
  submissionId: number;
  submissionStatusId: number;
  submissionTypeId: number;
  uploadId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface LegacySubmissionId {
  submissionId: number;
}

export interface LegacySubmissionList {
  legacySubmissions: LegacySubmission[];
}

export interface CreateSubmissionInput {
  submissionStatusId: number;
  submissionTypeId: number;
  uploadId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface UpdateSubmissionInput {
  submissionId: number;
  submissionStatusId: number;
  submissionTypeId: number;
  uploadId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

function createBaseLegacySubmission(): LegacySubmission {
  return {
    submissionId: 0,
    submissionStatusId: 0,
    submissionTypeId: 0,
    uploadId: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const LegacySubmission = {
  encode(message: LegacySubmission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionId !== 0) {
      writer.uint32(8).int32(message.submissionId);
    }
    if (message.submissionStatusId !== 0) {
      writer.uint32(16).int32(message.submissionStatusId);
    }
    if (message.submissionTypeId !== 0) {
      writer.uint32(24).int32(message.submissionTypeId);
    }
    if (message.uploadId !== 0) {
      writer.uint32(32).int32(message.uploadId);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacySubmission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacySubmission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionId = reader.int32();
          break;
        case 2:
          message.submissionStatusId = reader.int32();
          break;
        case 3:
          message.submissionTypeId = reader.int32();
          break;
        case 4:
          message.uploadId = reader.int32();
          break;
        case 5:
          message.createUser = reader.int32();
          break;
        case 6:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.modifyUser = reader.int32();
          break;
        case 8:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacySubmission {
    return {
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
      submissionStatusId: isSet(object.submissionStatusId) ? Number(object.submissionStatusId) : 0,
      submissionTypeId: isSet(object.submissionTypeId) ? Number(object.submissionTypeId) : 0,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: LegacySubmission): unknown {
    const obj: any = {};
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    message.submissionStatusId !== undefined && (obj.submissionStatusId = Math.round(message.submissionStatusId));
    message.submissionTypeId !== undefined && (obj.submissionTypeId = Math.round(message.submissionTypeId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacySubmission>, I>>(base?: I): LegacySubmission {
    return LegacySubmission.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacySubmission>, I>>(object: I): LegacySubmission {
    const message = createBaseLegacySubmission();
    message.submissionId = object.submissionId ?? 0;
    message.submissionStatusId = object.submissionStatusId ?? 0;
    message.submissionTypeId = object.submissionTypeId ?? 0;
    message.uploadId = object.uploadId ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseLegacySubmissionId(): LegacySubmissionId {
  return { submissionId: 0 };
}

export const LegacySubmissionId = {
  encode(message: LegacySubmissionId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionId !== 0) {
      writer.uint32(8).int32(message.submissionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacySubmissionId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacySubmissionId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacySubmissionId {
    return { submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0 };
  },

  toJSON(message: LegacySubmissionId): unknown {
    const obj: any = {};
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacySubmissionId>, I>>(base?: I): LegacySubmissionId {
    return LegacySubmissionId.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacySubmissionId>, I>>(object: I): LegacySubmissionId {
    const message = createBaseLegacySubmissionId();
    message.submissionId = object.submissionId ?? 0;
    return message;
  },
};

function createBaseLegacySubmissionList(): LegacySubmissionList {
  return { legacySubmissions: [] };
}

export const LegacySubmissionList = {
  encode(message: LegacySubmissionList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.legacySubmissions) {
      LegacySubmission.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacySubmissionList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacySubmissionList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.legacySubmissions.push(LegacySubmission.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacySubmissionList {
    return {
      legacySubmissions: Array.isArray(object?.legacySubmissions)
        ? object.legacySubmissions.map((e: any) => LegacySubmission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LegacySubmissionList): unknown {
    const obj: any = {};
    if (message.legacySubmissions) {
      obj.legacySubmissions = message.legacySubmissions.map((e) => e ? LegacySubmission.toJSON(e) : undefined);
    } else {
      obj.legacySubmissions = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacySubmissionList>, I>>(base?: I): LegacySubmissionList {
    return LegacySubmissionList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacySubmissionList>, I>>(object: I): LegacySubmissionList {
    const message = createBaseLegacySubmissionList();
    message.legacySubmissions = object.legacySubmissions?.map((e) => LegacySubmission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateSubmissionInput(): CreateSubmissionInput {
  return {
    submissionStatusId: 0,
    submissionTypeId: 0,
    uploadId: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const CreateSubmissionInput = {
  encode(message: CreateSubmissionInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionStatusId !== 0) {
      writer.uint32(8).int32(message.submissionStatusId);
    }
    if (message.submissionTypeId !== 0) {
      writer.uint32(16).int32(message.submissionTypeId);
    }
    if (message.uploadId !== 0) {
      writer.uint32(24).int32(message.uploadId);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSubmissionInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSubmissionInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionStatusId = reader.int32();
          break;
        case 2:
          message.submissionTypeId = reader.int32();
          break;
        case 3:
          message.uploadId = reader.int32();
          break;
        case 4:
          message.createUser = reader.int32();
          break;
        case 5:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.modifyUser = reader.int32();
          break;
        case 7:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateSubmissionInput {
    return {
      submissionStatusId: isSet(object.submissionStatusId) ? Number(object.submissionStatusId) : 0,
      submissionTypeId: isSet(object.submissionTypeId) ? Number(object.submissionTypeId) : 0,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: CreateSubmissionInput): unknown {
    const obj: any = {};
    message.submissionStatusId !== undefined && (obj.submissionStatusId = Math.round(message.submissionStatusId));
    message.submissionTypeId !== undefined && (obj.submissionTypeId = Math.round(message.submissionTypeId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSubmissionInput>, I>>(base?: I): CreateSubmissionInput {
    return CreateSubmissionInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSubmissionInput>, I>>(object: I): CreateSubmissionInput {
    const message = createBaseCreateSubmissionInput();
    message.submissionStatusId = object.submissionStatusId ?? 0;
    message.submissionTypeId = object.submissionTypeId ?? 0;
    message.uploadId = object.uploadId ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseUpdateSubmissionInput(): UpdateSubmissionInput {
  return {
    submissionId: 0,
    submissionStatusId: 0,
    submissionTypeId: 0,
    uploadId: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const UpdateSubmissionInput = {
  encode(message: UpdateSubmissionInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionId !== 0) {
      writer.uint32(8).int32(message.submissionId);
    }
    if (message.submissionStatusId !== 0) {
      writer.uint32(16).int32(message.submissionStatusId);
    }
    if (message.submissionTypeId !== 0) {
      writer.uint32(24).int32(message.submissionTypeId);
    }
    if (message.uploadId !== 0) {
      writer.uint32(32).int32(message.uploadId);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSubmissionInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSubmissionInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionId = reader.int32();
          break;
        case 2:
          message.submissionStatusId = reader.int32();
          break;
        case 3:
          message.submissionTypeId = reader.int32();
          break;
        case 4:
          message.uploadId = reader.int32();
          break;
        case 5:
          message.createUser = reader.int32();
          break;
        case 6:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.modifyUser = reader.int32();
          break;
        case 8:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateSubmissionInput {
    return {
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
      submissionStatusId: isSet(object.submissionStatusId) ? Number(object.submissionStatusId) : 0,
      submissionTypeId: isSet(object.submissionTypeId) ? Number(object.submissionTypeId) : 0,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: UpdateSubmissionInput): unknown {
    const obj: any = {};
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    message.submissionStatusId !== undefined && (obj.submissionStatusId = Math.round(message.submissionStatusId));
    message.submissionTypeId !== undefined && (obj.submissionTypeId = Math.round(message.submissionTypeId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateSubmissionInput>, I>>(base?: I): UpdateSubmissionInput {
    return UpdateSubmissionInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateSubmissionInput>, I>>(object: I): UpdateSubmissionInput {
    const message = createBaseUpdateSubmissionInput();
    message.submissionId = object.submissionId ?? 0;
    message.submissionStatusId = object.submissionStatusId ?? 0;
    message.submissionTypeId = object.submissionTypeId ?? 0;
    message.uploadId = object.uploadId ?? 0;
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
