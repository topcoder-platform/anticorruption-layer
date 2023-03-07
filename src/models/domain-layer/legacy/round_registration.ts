/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface RoundRegistration {
  roundId: number;
  coderId: number;
}

export interface CreateRoundRegistrationInput {
  roundId: number;
  coderId: number;
  timestamp: number;
  eligible: boolean;
  teamId: number;
}

function createBaseRoundRegistration(): RoundRegistration {
  return { roundId: 0, coderId: 0 };
}

export const RoundRegistration = {
  encode(message: RoundRegistration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roundId !== 0) {
      writer.uint32(8).int32(message.roundId);
    }
    if (message.coderId !== 0) {
      writer.uint32(16).int32(message.coderId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoundRegistration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoundRegistration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roundId = reader.int32();
          break;
        case 2:
          message.coderId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RoundRegistration {
    return {
      roundId: isSet(object.roundId) ? Number(object.roundId) : 0,
      coderId: isSet(object.coderId) ? Number(object.coderId) : 0,
    };
  },

  toJSON(message: RoundRegistration): unknown {
    const obj: any = {};
    message.roundId !== undefined && (obj.roundId = Math.round(message.roundId));
    message.coderId !== undefined && (obj.coderId = Math.round(message.coderId));
    return obj;
  },

  create<I extends Exact<DeepPartial<RoundRegistration>, I>>(base?: I): RoundRegistration {
    return RoundRegistration.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RoundRegistration>, I>>(object: I): RoundRegistration {
    const message = createBaseRoundRegistration();
    message.roundId = object.roundId ?? 0;
    message.coderId = object.coderId ?? 0;
    return message;
  },
};

function createBaseCreateRoundRegistrationInput(): CreateRoundRegistrationInput {
  return { roundId: 0, coderId: 0, timestamp: 0, eligible: false, teamId: 0 };
}

export const CreateRoundRegistrationInput = {
  encode(message: CreateRoundRegistrationInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roundId !== 0) {
      writer.uint32(8).int32(message.roundId);
    }
    if (message.coderId !== 0) {
      writer.uint32(16).int32(message.coderId);
    }
    if (message.timestamp !== 0) {
      writer.uint32(24).int64(message.timestamp);
    }
    if (message.eligible === true) {
      writer.uint32(32).bool(message.eligible);
    }
    if (message.teamId !== 0) {
      writer.uint32(40).int32(message.teamId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRoundRegistrationInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRoundRegistrationInput();
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
          message.timestamp = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.eligible = reader.bool();
          break;
        case 5:
          message.teamId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRoundRegistrationInput {
    return {
      roundId: isSet(object.roundId) ? Number(object.roundId) : 0,
      coderId: isSet(object.coderId) ? Number(object.coderId) : 0,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      eligible: isSet(object.eligible) ? Boolean(object.eligible) : false,
      teamId: isSet(object.teamId) ? Number(object.teamId) : 0,
    };
  },

  toJSON(message: CreateRoundRegistrationInput): unknown {
    const obj: any = {};
    message.roundId !== undefined && (obj.roundId = Math.round(message.roundId));
    message.coderId !== undefined && (obj.coderId = Math.round(message.coderId));
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    message.eligible !== undefined && (obj.eligible = message.eligible);
    message.teamId !== undefined && (obj.teamId = Math.round(message.teamId));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateRoundRegistrationInput>, I>>(base?: I): CreateRoundRegistrationInput {
    return CreateRoundRegistrationInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateRoundRegistrationInput>, I>>(object: I): CreateRoundRegistrationInput {
    const message = createBaseCreateRoundRegistrationInput();
    message.roundId = object.roundId ?? 0;
    message.coderId = object.coderId ?? 0;
    message.timestamp = object.timestamp ?? 0;
    message.eligible = object.eligible ?? false;
    message.teamId = object.teamId ?? 0;
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
