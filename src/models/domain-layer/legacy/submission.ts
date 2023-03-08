/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacySubmission {
  submissionId: number;
  submissionStatusId: number;
  submissionTypeId: number;
  uploadId: number;
  screeningScore: number;
  initialScore: number;
  finalScore: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface CreateSubmissionInput {
  submissionStatusId: number;
  submissionTypeId: number;
  uploadId: number;
  challengeId: string;
  created: number;
  fileType: string;
  legacyChallengeId?: number | undefined;
  memberId: number;
  submissionPhaseId: string;
  submittedDate?: number | undefined;
  type: string;
  updated?: number | undefined;
  updatedBy?: string | undefined;
  url?: string | undefined;
  legacyUploadId?: number | undefined;
  v5ChallengeId?: string | undefined;
}

export interface UpdateSubmissionInput {
  submissionId: number;
  submissionStatusId?: number | undefined;
  submissionTypeId?: number | undefined;
  uploadId?: number | undefined;
  screeningScore?: number | undefined;
  initialScore?: number | undefined;
  finalScore?: number | undefined;
}

function createBaseLegacySubmission(): LegacySubmission {
  return {
    submissionId: 0,
    submissionStatusId: 0,
    submissionTypeId: 0,
    uploadId: 0,
    screeningScore: 0,
    initialScore: 0,
    finalScore: 0,
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
    if (message.screeningScore !== 0) {
      writer.uint32(40).int32(message.screeningScore);
    }
    if (message.initialScore !== 0) {
      writer.uint32(48).int32(message.initialScore);
    }
    if (message.finalScore !== 0) {
      writer.uint32(56).int32(message.finalScore);
    }
    if (message.createUser !== 0) {
      writer.uint32(64).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(72).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(80).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(88).int64(message.modifyDate);
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
          message.screeningScore = reader.int32();
          break;
        case 6:
          message.initialScore = reader.int32();
          break;
        case 7:
          message.finalScore = reader.int32();
          break;
        case 8:
          message.createUser = reader.int32();
          break;
        case 9:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.modifyUser = reader.int32();
          break;
        case 11:
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
      screeningScore: isSet(object.screeningScore) ? Number(object.screeningScore) : 0,
      initialScore: isSet(object.initialScore) ? Number(object.initialScore) : 0,
      finalScore: isSet(object.finalScore) ? Number(object.finalScore) : 0,
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
    message.screeningScore !== undefined && (obj.screeningScore = Math.round(message.screeningScore));
    message.initialScore !== undefined && (obj.initialScore = Math.round(message.initialScore));
    message.finalScore !== undefined && (obj.finalScore = Math.round(message.finalScore));
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
    message.screeningScore = object.screeningScore ?? 0;
    message.initialScore = object.initialScore ?? 0;
    message.finalScore = object.finalScore ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseCreateSubmissionInput(): CreateSubmissionInput {
  return {
    submissionStatusId: 0,
    submissionTypeId: 0,
    uploadId: 0,
    challengeId: "",
    created: 0,
    fileType: "",
    legacyChallengeId: undefined,
    memberId: 0,
    submissionPhaseId: "",
    submittedDate: undefined,
    type: "",
    updated: undefined,
    updatedBy: undefined,
    url: undefined,
    legacyUploadId: undefined,
    v5ChallengeId: undefined,
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
    if (message.challengeId !== "") {
      writer.uint32(34).string(message.challengeId);
    }
    if (message.created !== 0) {
      writer.uint32(40).int64(message.created);
    }
    if (message.fileType !== "") {
      writer.uint32(50).string(message.fileType);
    }
    if (message.legacyChallengeId !== undefined) {
      writer.uint32(56).int64(message.legacyChallengeId);
    }
    if (message.memberId !== 0) {
      writer.uint32(64).int64(message.memberId);
    }
    if (message.submissionPhaseId !== "") {
      writer.uint32(74).string(message.submissionPhaseId);
    }
    if (message.submittedDate !== undefined) {
      writer.uint32(80).int64(message.submittedDate);
    }
    if (message.type !== "") {
      writer.uint32(90).string(message.type);
    }
    if (message.updated !== undefined) {
      writer.uint32(96).int64(message.updated);
    }
    if (message.updatedBy !== undefined) {
      writer.uint32(106).string(message.updatedBy);
    }
    if (message.url !== undefined) {
      writer.uint32(114).string(message.url);
    }
    if (message.legacyUploadId !== undefined) {
      writer.uint32(120).int64(message.legacyUploadId);
    }
    if (message.v5ChallengeId !== undefined) {
      writer.uint32(130).string(message.v5ChallengeId);
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
          message.challengeId = reader.string();
          break;
        case 5:
          message.created = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.fileType = reader.string();
          break;
        case 7:
          message.legacyChallengeId = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.memberId = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.submissionPhaseId = reader.string();
          break;
        case 10:
          message.submittedDate = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.type = reader.string();
          break;
        case 12:
          message.updated = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.updatedBy = reader.string();
          break;
        case 14:
          message.url = reader.string();
          break;
        case 15:
          message.legacyUploadId = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.v5ChallengeId = reader.string();
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
      challengeId: isSet(object.challengeId) ? String(object.challengeId) : "",
      created: isSet(object.created) ? Number(object.created) : 0,
      fileType: isSet(object.fileType) ? String(object.fileType) : "",
      legacyChallengeId: isSet(object.legacyChallengeId) ? Number(object.legacyChallengeId) : undefined,
      memberId: isSet(object.memberId) ? Number(object.memberId) : 0,
      submissionPhaseId: isSet(object.submissionPhaseId) ? String(object.submissionPhaseId) : "",
      submittedDate: isSet(object.submittedDate) ? Number(object.submittedDate) : undefined,
      type: isSet(object.type) ? String(object.type) : "",
      updated: isSet(object.updated) ? Number(object.updated) : undefined,
      updatedBy: isSet(object.updatedBy) ? String(object.updatedBy) : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
      legacyUploadId: isSet(object.legacyUploadId) ? Number(object.legacyUploadId) : undefined,
      v5ChallengeId: isSet(object.v5ChallengeId) ? String(object.v5ChallengeId) : undefined,
    };
  },

  toJSON(message: CreateSubmissionInput): unknown {
    const obj: any = {};
    message.submissionStatusId !== undefined && (obj.submissionStatusId = Math.round(message.submissionStatusId));
    message.submissionTypeId !== undefined && (obj.submissionTypeId = Math.round(message.submissionTypeId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.challengeId !== undefined && (obj.challengeId = message.challengeId);
    message.created !== undefined && (obj.created = Math.round(message.created));
    message.fileType !== undefined && (obj.fileType = message.fileType);
    message.legacyChallengeId !== undefined && (obj.legacyChallengeId = Math.round(message.legacyChallengeId));
    message.memberId !== undefined && (obj.memberId = Math.round(message.memberId));
    message.submissionPhaseId !== undefined && (obj.submissionPhaseId = message.submissionPhaseId);
    message.submittedDate !== undefined && (obj.submittedDate = Math.round(message.submittedDate));
    message.type !== undefined && (obj.type = message.type);
    message.updated !== undefined && (obj.updated = Math.round(message.updated));
    message.updatedBy !== undefined && (obj.updatedBy = message.updatedBy);
    message.url !== undefined && (obj.url = message.url);
    message.legacyUploadId !== undefined && (obj.legacyUploadId = Math.round(message.legacyUploadId));
    message.v5ChallengeId !== undefined && (obj.v5ChallengeId = message.v5ChallengeId);
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
    message.challengeId = object.challengeId ?? "";
    message.created = object.created ?? 0;
    message.fileType = object.fileType ?? "";
    message.legacyChallengeId = object.legacyChallengeId ?? undefined;
    message.memberId = object.memberId ?? 0;
    message.submissionPhaseId = object.submissionPhaseId ?? "";
    message.submittedDate = object.submittedDate ?? undefined;
    message.type = object.type ?? "";
    message.updated = object.updated ?? undefined;
    message.updatedBy = object.updatedBy ?? undefined;
    message.url = object.url ?? undefined;
    message.legacyUploadId = object.legacyUploadId ?? undefined;
    message.v5ChallengeId = object.v5ChallengeId ?? undefined;
    return message;
  },
};

function createBaseUpdateSubmissionInput(): UpdateSubmissionInput {
  return {
    submissionId: 0,
    submissionStatusId: undefined,
    submissionTypeId: undefined,
    uploadId: undefined,
    screeningScore: undefined,
    initialScore: undefined,
    finalScore: undefined,
  };
}

export const UpdateSubmissionInput = {
  encode(message: UpdateSubmissionInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionId !== 0) {
      writer.uint32(8).int32(message.submissionId);
    }
    if (message.submissionStatusId !== undefined) {
      writer.uint32(16).int32(message.submissionStatusId);
    }
    if (message.submissionTypeId !== undefined) {
      writer.uint32(24).int32(message.submissionTypeId);
    }
    if (message.uploadId !== undefined) {
      writer.uint32(32).int32(message.uploadId);
    }
    if (message.screeningScore !== undefined) {
      writer.uint32(40).int32(message.screeningScore);
    }
    if (message.initialScore !== undefined) {
      writer.uint32(48).int32(message.initialScore);
    }
    if (message.finalScore !== undefined) {
      writer.uint32(56).int32(message.finalScore);
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
          message.screeningScore = reader.int32();
          break;
        case 6:
          message.initialScore = reader.int32();
          break;
        case 7:
          message.finalScore = reader.int32();
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
      submissionStatusId: isSet(object.submissionStatusId) ? Number(object.submissionStatusId) : undefined,
      submissionTypeId: isSet(object.submissionTypeId) ? Number(object.submissionTypeId) : undefined,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : undefined,
      screeningScore: isSet(object.screeningScore) ? Number(object.screeningScore) : undefined,
      initialScore: isSet(object.initialScore) ? Number(object.initialScore) : undefined,
      finalScore: isSet(object.finalScore) ? Number(object.finalScore) : undefined,
    };
  },

  toJSON(message: UpdateSubmissionInput): unknown {
    const obj: any = {};
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    message.submissionStatusId !== undefined && (obj.submissionStatusId = Math.round(message.submissionStatusId));
    message.submissionTypeId !== undefined && (obj.submissionTypeId = Math.round(message.submissionTypeId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.screeningScore !== undefined && (obj.screeningScore = Math.round(message.screeningScore));
    message.initialScore !== undefined && (obj.initialScore = Math.round(message.initialScore));
    message.finalScore !== undefined && (obj.finalScore = Math.round(message.finalScore));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateSubmissionInput>, I>>(base?: I): UpdateSubmissionInput {
    return UpdateSubmissionInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateSubmissionInput>, I>>(object: I): UpdateSubmissionInput {
    const message = createBaseUpdateSubmissionInput();
    message.submissionId = object.submissionId ?? 0;
    message.submissionStatusId = object.submissionStatusId ?? undefined;
    message.submissionTypeId = object.submissionTypeId ?? undefined;
    message.uploadId = object.uploadId ?? undefined;
    message.screeningScore = object.screeningScore ?? undefined;
    message.initialScore = object.initialScore ?? undefined;
    message.finalScore = object.finalScore ?? undefined;
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
