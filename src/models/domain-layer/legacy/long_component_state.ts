/* eslint-disable */
import { ScanCriteria } from "@topcoder-framework/lib-common";
import _m0 from "protobufjs/minimal";

export interface LongComponentState {
  longComponentStateId: number;
  roundId: number;
  coderId: number;
  componentId: number;
  points: number;
  statusId: number;
  submissionNumber: number;
  exampleSubmissionNumber: number;
}

export interface CreateLongComponentStateInput {
  roundId: number;
  coderId: number;
  componentId: number;
  points: number;
  statusId: number;
  submissionNumber: number;
  exampleSubmissionNumber: number;
}

export interface UpdateLongComponentStateInput {
  filterCriteria: ScanCriteria[];
  updateInput?: UpdateLongComponentStateInput_UpdateInput;
}

export interface UpdateLongComponentStateInput_UpdateInput {
  submissionNumber?: number | undefined;
  points?: number | undefined;
}

function createBaseLongComponentState(): LongComponentState {
  return {
    longComponentStateId: 0,
    roundId: 0,
    coderId: 0,
    componentId: 0,
    points: 0,
    statusId: 0,
    submissionNumber: 0,
    exampleSubmissionNumber: 0,
  };
}

export const LongComponentState = {
  encode(message: LongComponentState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.longComponentStateId !== 0) {
      writer.uint32(8).int32(message.longComponentStateId);
    }
    if (message.roundId !== 0) {
      writer.uint32(16).int32(message.roundId);
    }
    if (message.coderId !== 0) {
      writer.uint32(24).int32(message.coderId);
    }
    if (message.componentId !== 0) {
      writer.uint32(32).int32(message.componentId);
    }
    if (message.points !== 0) {
      writer.uint32(40).int32(message.points);
    }
    if (message.statusId !== 0) {
      writer.uint32(48).int32(message.statusId);
    }
    if (message.submissionNumber !== 0) {
      writer.uint32(56).int32(message.submissionNumber);
    }
    if (message.exampleSubmissionNumber !== 0) {
      writer.uint32(64).int32(message.exampleSubmissionNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LongComponentState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLongComponentState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.longComponentStateId = reader.int32();
          break;
        case 2:
          message.roundId = reader.int32();
          break;
        case 3:
          message.coderId = reader.int32();
          break;
        case 4:
          message.componentId = reader.int32();
          break;
        case 5:
          message.points = reader.int32();
          break;
        case 6:
          message.statusId = reader.int32();
          break;
        case 7:
          message.submissionNumber = reader.int32();
          break;
        case 8:
          message.exampleSubmissionNumber = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LongComponentState {
    return {
      longComponentStateId: isSet(object.longComponentStateId) ? Number(object.longComponentStateId) : 0,
      roundId: isSet(object.roundId) ? Number(object.roundId) : 0,
      coderId: isSet(object.coderId) ? Number(object.coderId) : 0,
      componentId: isSet(object.componentId) ? Number(object.componentId) : 0,
      points: isSet(object.points) ? Number(object.points) : 0,
      statusId: isSet(object.statusId) ? Number(object.statusId) : 0,
      submissionNumber: isSet(object.submissionNumber) ? Number(object.submissionNumber) : 0,
      exampleSubmissionNumber: isSet(object.exampleSubmissionNumber) ? Number(object.exampleSubmissionNumber) : 0,
    };
  },

  toJSON(message: LongComponentState): unknown {
    const obj: any = {};
    message.longComponentStateId !== undefined && (obj.longComponentStateId = Math.round(message.longComponentStateId));
    message.roundId !== undefined && (obj.roundId = Math.round(message.roundId));
    message.coderId !== undefined && (obj.coderId = Math.round(message.coderId));
    message.componentId !== undefined && (obj.componentId = Math.round(message.componentId));
    message.points !== undefined && (obj.points = Math.round(message.points));
    message.statusId !== undefined && (obj.statusId = Math.round(message.statusId));
    message.submissionNumber !== undefined && (obj.submissionNumber = Math.round(message.submissionNumber));
    message.exampleSubmissionNumber !== undefined &&
      (obj.exampleSubmissionNumber = Math.round(message.exampleSubmissionNumber));
    return obj;
  },

  create<I extends Exact<DeepPartial<LongComponentState>, I>>(base?: I): LongComponentState {
    return LongComponentState.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LongComponentState>, I>>(object: I): LongComponentState {
    const message = createBaseLongComponentState();
    message.longComponentStateId = object.longComponentStateId ?? 0;
    message.roundId = object.roundId ?? 0;
    message.coderId = object.coderId ?? 0;
    message.componentId = object.componentId ?? 0;
    message.points = object.points ?? 0;
    message.statusId = object.statusId ?? 0;
    message.submissionNumber = object.submissionNumber ?? 0;
    message.exampleSubmissionNumber = object.exampleSubmissionNumber ?? 0;
    return message;
  },
};

function createBaseCreateLongComponentStateInput(): CreateLongComponentStateInput {
  return {
    roundId: 0,
    coderId: 0,
    componentId: 0,
    points: 0,
    statusId: 0,
    submissionNumber: 0,
    exampleSubmissionNumber: 0,
  };
}

export const CreateLongComponentStateInput = {
  encode(message: CreateLongComponentStateInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roundId !== 0) {
      writer.uint32(8).int32(message.roundId);
    }
    if (message.coderId !== 0) {
      writer.uint32(16).int32(message.coderId);
    }
    if (message.componentId !== 0) {
      writer.uint32(24).int32(message.componentId);
    }
    if (message.points !== 0) {
      writer.uint32(32).int32(message.points);
    }
    if (message.statusId !== 0) {
      writer.uint32(40).int32(message.statusId);
    }
    if (message.submissionNumber !== 0) {
      writer.uint32(48).int32(message.submissionNumber);
    }
    if (message.exampleSubmissionNumber !== 0) {
      writer.uint32(56).int32(message.exampleSubmissionNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateLongComponentStateInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateLongComponentStateInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roundId = reader.int32();
          break;
        case 2:
          message.coderId = reader.int32();
          break;
        case 3:
          message.componentId = reader.int32();
          break;
        case 4:
          message.points = reader.int32();
          break;
        case 5:
          message.statusId = reader.int32();
          break;
        case 6:
          message.submissionNumber = reader.int32();
          break;
        case 7:
          message.exampleSubmissionNumber = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateLongComponentStateInput {
    return {
      roundId: isSet(object.roundId) ? Number(object.roundId) : 0,
      coderId: isSet(object.coderId) ? Number(object.coderId) : 0,
      componentId: isSet(object.componentId) ? Number(object.componentId) : 0,
      points: isSet(object.points) ? Number(object.points) : 0,
      statusId: isSet(object.statusId) ? Number(object.statusId) : 0,
      submissionNumber: isSet(object.submissionNumber) ? Number(object.submissionNumber) : 0,
      exampleSubmissionNumber: isSet(object.exampleSubmissionNumber) ? Number(object.exampleSubmissionNumber) : 0,
    };
  },

  toJSON(message: CreateLongComponentStateInput): unknown {
    const obj: any = {};
    message.roundId !== undefined && (obj.roundId = Math.round(message.roundId));
    message.coderId !== undefined && (obj.coderId = Math.round(message.coderId));
    message.componentId !== undefined && (obj.componentId = Math.round(message.componentId));
    message.points !== undefined && (obj.points = Math.round(message.points));
    message.statusId !== undefined && (obj.statusId = Math.round(message.statusId));
    message.submissionNumber !== undefined && (obj.submissionNumber = Math.round(message.submissionNumber));
    message.exampleSubmissionNumber !== undefined &&
      (obj.exampleSubmissionNumber = Math.round(message.exampleSubmissionNumber));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateLongComponentStateInput>, I>>(base?: I): CreateLongComponentStateInput {
    return CreateLongComponentStateInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateLongComponentStateInput>, I>>(
    object: I,
  ): CreateLongComponentStateInput {
    const message = createBaseCreateLongComponentStateInput();
    message.roundId = object.roundId ?? 0;
    message.coderId = object.coderId ?? 0;
    message.componentId = object.componentId ?? 0;
    message.points = object.points ?? 0;
    message.statusId = object.statusId ?? 0;
    message.submissionNumber = object.submissionNumber ?? 0;
    message.exampleSubmissionNumber = object.exampleSubmissionNumber ?? 0;
    return message;
  },
};

function createBaseUpdateLongComponentStateInput(): UpdateLongComponentStateInput {
  return { filterCriteria: [], updateInput: undefined };
}

export const UpdateLongComponentStateInput = {
  encode(message: UpdateLongComponentStateInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.filterCriteria) {
      ScanCriteria.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.updateInput !== undefined) {
      UpdateLongComponentStateInput_UpdateInput.encode(message.updateInput, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateLongComponentStateInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateLongComponentStateInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filterCriteria.push(ScanCriteria.decode(reader, reader.uint32()));
          break;
        case 3:
          message.updateInput = UpdateLongComponentStateInput_UpdateInput.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateLongComponentStateInput {
    return {
      filterCriteria: Array.isArray(object?.filterCriteria)
        ? object.filterCriteria.map((e: any) => ScanCriteria.fromJSON(e))
        : [],
      updateInput: isSet(object.updateInput)
        ? UpdateLongComponentStateInput_UpdateInput.fromJSON(object.updateInput)
        : undefined,
    };
  },

  toJSON(message: UpdateLongComponentStateInput): unknown {
    const obj: any = {};
    if (message.filterCriteria) {
      obj.filterCriteria = message.filterCriteria.map((e) => e ? ScanCriteria.toJSON(e) : undefined);
    } else {
      obj.filterCriteria = [];
    }
    message.updateInput !== undefined && (obj.updateInput = message.updateInput
      ? UpdateLongComponentStateInput_UpdateInput.toJSON(message.updateInput)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateLongComponentStateInput>, I>>(base?: I): UpdateLongComponentStateInput {
    return UpdateLongComponentStateInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateLongComponentStateInput>, I>>(
    object: I,
  ): UpdateLongComponentStateInput {
    const message = createBaseUpdateLongComponentStateInput();
    message.filterCriteria = object.filterCriteria?.map((e) => ScanCriteria.fromPartial(e)) || [];
    message.updateInput = (object.updateInput !== undefined && object.updateInput !== null)
      ? UpdateLongComponentStateInput_UpdateInput.fromPartial(object.updateInput)
      : undefined;
    return message;
  },
};

function createBaseUpdateLongComponentStateInput_UpdateInput(): UpdateLongComponentStateInput_UpdateInput {
  return { submissionNumber: undefined, points: undefined };
}

export const UpdateLongComponentStateInput_UpdateInput = {
  encode(message: UpdateLongComponentStateInput_UpdateInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionNumber !== undefined) {
      writer.uint32(8).int32(message.submissionNumber);
    }
    if (message.points !== undefined) {
      writer.uint32(16).int32(message.points);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateLongComponentStateInput_UpdateInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateLongComponentStateInput_UpdateInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionNumber = reader.int32();
          break;
        case 2:
          message.points = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateLongComponentStateInput_UpdateInput {
    return {
      submissionNumber: isSet(object.submissionNumber) ? Number(object.submissionNumber) : undefined,
      points: isSet(object.points) ? Number(object.points) : undefined,
    };
  },

  toJSON(message: UpdateLongComponentStateInput_UpdateInput): unknown {
    const obj: any = {};
    message.submissionNumber !== undefined && (obj.submissionNumber = Math.round(message.submissionNumber));
    message.points !== undefined && (obj.points = Math.round(message.points));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateLongComponentStateInput_UpdateInput>, I>>(
    base?: I,
  ): UpdateLongComponentStateInput_UpdateInput {
    return UpdateLongComponentStateInput_UpdateInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateLongComponentStateInput_UpdateInput>, I>>(
    object: I,
  ): UpdateLongComponentStateInput_UpdateInput {
    const message = createBaseUpdateLongComponentStateInput_UpdateInput();
    message.submissionNumber = object.submissionNumber ?? undefined;
    message.points = object.points ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
