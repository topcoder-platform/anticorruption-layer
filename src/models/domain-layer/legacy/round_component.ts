/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface RoundComponent {
  roundId: number;
  componentId: number;
  submitOrder: number;
  divisionId: number;
  difficultyId: number;
  points: number;
  openOrder: number;
}

function createBaseRoundComponent(): RoundComponent {
  return { roundId: 0, componentId: 0, submitOrder: 0, divisionId: 0, difficultyId: 0, points: 0, openOrder: 0 };
}

export const RoundComponent = {
  encode(message: RoundComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roundId !== 0) {
      writer.uint32(8).int32(message.roundId);
    }
    if (message.componentId !== 0) {
      writer.uint32(16).int32(message.componentId);
    }
    if (message.submitOrder !== 0) {
      writer.uint32(24).int32(message.submitOrder);
    }
    if (message.divisionId !== 0) {
      writer.uint32(32).int32(message.divisionId);
    }
    if (message.difficultyId !== 0) {
      writer.uint32(40).int32(message.difficultyId);
    }
    if (message.points !== 0) {
      writer.uint32(49).double(message.points);
    }
    if (message.openOrder !== 0) {
      writer.uint32(56).int32(message.openOrder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoundComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoundComponent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.roundId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.componentId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.submitOrder = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.divisionId = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.difficultyId = reader.int32();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.points = reader.double();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.openOrder = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RoundComponent {
    return {
      roundId: isSet(object.roundId) ? globalThis.Number(object.roundId) : 0,
      componentId: isSet(object.componentId) ? globalThis.Number(object.componentId) : 0,
      submitOrder: isSet(object.submitOrder) ? globalThis.Number(object.submitOrder) : 0,
      divisionId: isSet(object.divisionId) ? globalThis.Number(object.divisionId) : 0,
      difficultyId: isSet(object.difficultyId) ? globalThis.Number(object.difficultyId) : 0,
      points: isSet(object.points) ? globalThis.Number(object.points) : 0,
      openOrder: isSet(object.openOrder) ? globalThis.Number(object.openOrder) : 0,
    };
  },

  toJSON(message: RoundComponent): unknown {
    const obj: any = {};
    if (message.roundId !== 0) {
      obj.roundId = Math.round(message.roundId);
    }
    if (message.componentId !== 0) {
      obj.componentId = Math.round(message.componentId);
    }
    if (message.submitOrder !== 0) {
      obj.submitOrder = Math.round(message.submitOrder);
    }
    if (message.divisionId !== 0) {
      obj.divisionId = Math.round(message.divisionId);
    }
    if (message.difficultyId !== 0) {
      obj.difficultyId = Math.round(message.difficultyId);
    }
    if (message.points !== 0) {
      obj.points = message.points;
    }
    if (message.openOrder !== 0) {
      obj.openOrder = Math.round(message.openOrder);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RoundComponent>, I>>(base?: I): RoundComponent {
    return RoundComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RoundComponent>, I>>(object: I): RoundComponent {
    const message = createBaseRoundComponent();
    message.roundId = object.roundId ?? 0;
    message.componentId = object.componentId ?? 0;
    message.submitOrder = object.submitOrder ?? 0;
    message.divisionId = object.divisionId ?? 0;
    message.difficultyId = object.difficultyId ?? 0;
    message.points = object.points ?? 0;
    message.openOrder = object.openOrder ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
