/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Problem {
  problemId: number;
  name: string;
  statusId: number;
  problemText: string;
  proposedDivisionId: number;
  problemTypeId: number;
  proposedDifficultyId: number;
  acceptSubmissions: number;
}

function createBaseProblem(): Problem {
  return {
    problemId: 0,
    name: "",
    statusId: 0,
    problemText: "",
    proposedDivisionId: 0,
    problemTypeId: 0,
    proposedDifficultyId: 0,
    acceptSubmissions: 0,
  };
}

export const Problem = {
  encode(message: Problem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.problemId !== 0) {
      writer.uint32(8).int32(message.problemId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.statusId !== 0) {
      writer.uint32(24).int32(message.statusId);
    }
    if (message.problemText !== "") {
      writer.uint32(34).string(message.problemText);
    }
    if (message.proposedDivisionId !== 0) {
      writer.uint32(40).int32(message.proposedDivisionId);
    }
    if (message.problemTypeId !== 0) {
      writer.uint32(48).int32(message.problemTypeId);
    }
    if (message.proposedDifficultyId !== 0) {
      writer.uint32(56).int32(message.proposedDifficultyId);
    }
    if (message.acceptSubmissions !== 0) {
      writer.uint32(64).int32(message.acceptSubmissions);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Problem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProblem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.problemId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.statusId = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.problemText = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.proposedDivisionId = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.problemTypeId = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.proposedDifficultyId = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.acceptSubmissions = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Problem {
    return {
      problemId: isSet(object.problemId) ? globalThis.Number(object.problemId) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      statusId: isSet(object.statusId) ? globalThis.Number(object.statusId) : 0,
      problemText: isSet(object.problemText) ? globalThis.String(object.problemText) : "",
      proposedDivisionId: isSet(object.proposedDivisionId) ? globalThis.Number(object.proposedDivisionId) : 0,
      problemTypeId: isSet(object.problemTypeId) ? globalThis.Number(object.problemTypeId) : 0,
      proposedDifficultyId: isSet(object.proposedDifficultyId) ? globalThis.Number(object.proposedDifficultyId) : 0,
      acceptSubmissions: isSet(object.acceptSubmissions) ? globalThis.Number(object.acceptSubmissions) : 0,
    };
  },

  toJSON(message: Problem): unknown {
    const obj: any = {};
    if (message.problemId !== 0) {
      obj.problemId = Math.round(message.problemId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.statusId !== 0) {
      obj.statusId = Math.round(message.statusId);
    }
    if (message.problemText !== "") {
      obj.problemText = message.problemText;
    }
    if (message.proposedDivisionId !== 0) {
      obj.proposedDivisionId = Math.round(message.proposedDivisionId);
    }
    if (message.problemTypeId !== 0) {
      obj.problemTypeId = Math.round(message.problemTypeId);
    }
    if (message.proposedDifficultyId !== 0) {
      obj.proposedDifficultyId = Math.round(message.proposedDifficultyId);
    }
    if (message.acceptSubmissions !== 0) {
      obj.acceptSubmissions = Math.round(message.acceptSubmissions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Problem>, I>>(base?: I): Problem {
    return Problem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Problem>, I>>(object: I): Problem {
    const message = createBaseProblem();
    message.problemId = object.problemId ?? 0;
    message.name = object.name ?? "";
    message.statusId = object.statusId ?? 0;
    message.problemText = object.problemText ?? "";
    message.proposedDivisionId = object.proposedDivisionId ?? 0;
    message.problemTypeId = object.problemTypeId ?? 0;
    message.proposedDifficultyId = object.proposedDifficultyId ?? 0;
    message.acceptSubmissions = object.acceptSubmissions ?? 0;
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
