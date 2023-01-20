/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../../google/protobuf/empty";
import { PhaseTypeList } from "../legacy_challenge_phase";

export interface CreatePhaseInput {
  projectId: number;
  phaseTypeId: number;
  phaseStatusId: number;
  fixedStartTime?: string | undefined;
  scheduledStartTime?: string | undefined;
  scheduledEndTime?: string | undefined;
  actualStartTime?: string | undefined;
  actualEndTime?: string | undefined;
  duration: number;
  createUser?: number | undefined;
  modifyUser?: number | undefined;
}

/** TODO: Move this to "lib-common" */
export interface CreateResult {
  kind?: { $case: "integerId"; integerId: number } | { $case: "stringId"; stringId: string };
}

function createBaseCreatePhaseInput(): CreatePhaseInput {
  return {
    projectId: 0,
    phaseTypeId: 0,
    phaseStatusId: 0,
    fixedStartTime: undefined,
    scheduledStartTime: undefined,
    scheduledEndTime: undefined,
    actualStartTime: undefined,
    actualEndTime: undefined,
    duration: 0,
    createUser: undefined,
    modifyUser: undefined,
  };
}

export const CreatePhaseInput = {
  encode(message: CreatePhaseInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int64(message.projectId);
    }
    if (message.phaseTypeId !== 0) {
      writer.uint32(16).int64(message.phaseTypeId);
    }
    if (message.phaseStatusId !== 0) {
      writer.uint32(24).int64(message.phaseStatusId);
    }
    if (message.fixedStartTime !== undefined) {
      writer.uint32(34).string(message.fixedStartTime);
    }
    if (message.scheduledStartTime !== undefined) {
      writer.uint32(42).string(message.scheduledStartTime);
    }
    if (message.scheduledEndTime !== undefined) {
      writer.uint32(50).string(message.scheduledEndTime);
    }
    if (message.actualStartTime !== undefined) {
      writer.uint32(58).string(message.actualStartTime);
    }
    if (message.actualEndTime !== undefined) {
      writer.uint32(66).string(message.actualEndTime);
    }
    if (message.duration !== 0) {
      writer.uint32(72).int32(message.duration);
    }
    if (message.createUser !== undefined) {
      writer.uint32(80).int32(message.createUser);
    }
    if (message.modifyUser !== undefined) {
      writer.uint32(88).int32(message.modifyUser);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePhaseInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePhaseInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.phaseTypeId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.phaseStatusId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.fixedStartTime = reader.string();
          break;
        case 5:
          message.scheduledStartTime = reader.string();
          break;
        case 6:
          message.scheduledEndTime = reader.string();
          break;
        case 7:
          message.actualStartTime = reader.string();
          break;
        case 8:
          message.actualEndTime = reader.string();
          break;
        case 9:
          message.duration = reader.int32();
          break;
        case 10:
          message.createUser = reader.int32();
          break;
        case 11:
          message.modifyUser = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreatePhaseInput {
    return {
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      phaseTypeId: isSet(object.phaseTypeId) ? Number(object.phaseTypeId) : 0,
      phaseStatusId: isSet(object.phaseStatusId) ? Number(object.phaseStatusId) : 0,
      fixedStartTime: isSet(object.fixedStartTime) ? String(object.fixedStartTime) : undefined,
      scheduledStartTime: isSet(object.scheduledStartTime) ? String(object.scheduledStartTime) : undefined,
      scheduledEndTime: isSet(object.scheduledEndTime) ? String(object.scheduledEndTime) : undefined,
      actualStartTime: isSet(object.actualStartTime) ? String(object.actualStartTime) : undefined,
      actualEndTime: isSet(object.actualEndTime) ? String(object.actualEndTime) : undefined,
      duration: isSet(object.duration) ? Number(object.duration) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : undefined,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : undefined,
    };
  },

  toJSON(message: CreatePhaseInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.phaseTypeId !== undefined && (obj.phaseTypeId = Math.round(message.phaseTypeId));
    message.phaseStatusId !== undefined && (obj.phaseStatusId = Math.round(message.phaseStatusId));
    message.fixedStartTime !== undefined && (obj.fixedStartTime = message.fixedStartTime);
    message.scheduledStartTime !== undefined && (obj.scheduledStartTime = message.scheduledStartTime);
    message.scheduledEndTime !== undefined && (obj.scheduledEndTime = message.scheduledEndTime);
    message.actualStartTime !== undefined && (obj.actualStartTime = message.actualStartTime);
    message.actualEndTime !== undefined && (obj.actualEndTime = message.actualEndTime);
    message.duration !== undefined && (obj.duration = Math.round(message.duration));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePhaseInput>, I>>(base?: I): CreatePhaseInput {
    return CreatePhaseInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreatePhaseInput>, I>>(object: I): CreatePhaseInput {
    const message = createBaseCreatePhaseInput();
    message.projectId = object.projectId ?? 0;
    message.phaseTypeId = object.phaseTypeId ?? 0;
    message.phaseStatusId = object.phaseStatusId ?? 0;
    message.fixedStartTime = object.fixedStartTime ?? undefined;
    message.scheduledStartTime = object.scheduledStartTime ?? undefined;
    message.scheduledEndTime = object.scheduledEndTime ?? undefined;
    message.actualStartTime = object.actualStartTime ?? undefined;
    message.actualEndTime = object.actualEndTime ?? undefined;
    message.duration = object.duration ?? 0;
    message.createUser = object.createUser ?? undefined;
    message.modifyUser = object.modifyUser ?? undefined;
    return message;
  },
};

function createBaseCreateResult(): CreateResult {
  return { kind: undefined };
}

export const CreateResult = {
  encode(message: CreateResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind?.$case === "integerId") {
      writer.uint32(8).int64(message.kind.integerId);
    }
    if (message.kind?.$case === "stringId") {
      writer.uint32(18).string(message.kind.stringId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = { $case: "integerId", integerId: longToNumber(reader.int64() as Long) };
          break;
        case 2:
          message.kind = { $case: "stringId", stringId: reader.string() };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateResult {
    return {
      kind: isSet(object.integerId)
        ? { $case: "integerId", integerId: Number(object.integerId) }
        : isSet(object.stringId)
        ? { $case: "stringId", stringId: String(object.stringId) }
        : undefined,
    };
  },

  toJSON(message: CreateResult): unknown {
    const obj: any = {};
    message.kind?.$case === "integerId" && (obj.integerId = Math.round(message.kind?.integerId));
    message.kind?.$case === "stringId" && (obj.stringId = message.kind?.stringId);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateResult>, I>>(base?: I): CreateResult {
    return CreateResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateResult>, I>>(object: I): CreateResult {
    const message = createBaseCreateResult();
    if (object.kind?.$case === "integerId" && object.kind?.integerId !== undefined && object.kind?.integerId !== null) {
      message.kind = { $case: "integerId", integerId: object.kind.integerId };
    }
    if (object.kind?.$case === "stringId" && object.kind?.stringId !== undefined && object.kind?.stringId !== null) {
      message.kind = { $case: "stringId", stringId: object.kind.stringId };
    }
    return message;
  },
};

export type LegacyChallengePhaseService = typeof LegacyChallengePhaseService;
export const LegacyChallengePhaseService = {
  create: {
    path: "/topcoder.domain.legacy_challenge_phase_service.LegacyChallengePhase/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePhaseInput) => Buffer.from(CreatePhaseInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePhaseInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  getPhaseTypes: {
    path: "/topcoder.domain.legacy_challenge_phase_service.LegacyChallengePhase/GetPhaseTypes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: PhaseTypeList) => Buffer.from(PhaseTypeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PhaseTypeList.decode(value),
  },
} as const;

export interface LegacyChallengePhaseServer extends UntypedServiceImplementation {
  create: handleUnaryCall<CreatePhaseInput, CreateResult>;
  getPhaseTypes: handleUnaryCall<Empty, PhaseTypeList>;
}

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
