/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface ResourceSubmission {
  resourceId: number;
  submissionId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface CreateResourceSubmissionInput {
  resourceId: number;
  submissionId: number;
}

function createBaseResourceSubmission(): ResourceSubmission {
  return { resourceId: 0, submissionId: 0, createUser: 0, createDate: 0, modifyUser: 0, modifyDate: 0 };
}

export const ResourceSubmission = {
  encode(message: ResourceSubmission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.submissionId !== 0) {
      writer.uint32(16).int32(message.submissionId);
    }
    if (message.createUser !== 0) {
      writer.uint32(24).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(32).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(40).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(48).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceSubmission {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceSubmission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resourceId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.submissionId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.createDate = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.modifyDate = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResourceSubmission {
    return {
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: ResourceSubmission): unknown {
    const obj: any = {};
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.submissionId !== 0) {
      obj.submissionId = Math.round(message.submissionId);
    }
    if (message.createUser !== 0) {
      obj.createUser = Math.round(message.createUser);
    }
    if (message.createDate !== 0) {
      obj.createDate = Math.round(message.createDate);
    }
    if (message.modifyUser !== 0) {
      obj.modifyUser = Math.round(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      obj.modifyDate = Math.round(message.modifyDate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResourceSubmission>, I>>(base?: I): ResourceSubmission {
    return ResourceSubmission.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResourceSubmission>, I>>(object: I): ResourceSubmission {
    const message = createBaseResourceSubmission();
    message.resourceId = object.resourceId ?? 0;
    message.submissionId = object.submissionId ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseCreateResourceSubmissionInput(): CreateResourceSubmissionInput {
  return { resourceId: 0, submissionId: 0 };
}

export const CreateResourceSubmissionInput = {
  encode(message: CreateResourceSubmissionInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.submissionId !== 0) {
      writer.uint32(16).int32(message.submissionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateResourceSubmissionInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResourceSubmissionInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resourceId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.submissionId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateResourceSubmissionInput {
    return {
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
    };
  },

  toJSON(message: CreateResourceSubmissionInput): unknown {
    const obj: any = {};
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.submissionId !== 0) {
      obj.submissionId = Math.round(message.submissionId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateResourceSubmissionInput>, I>>(base?: I): CreateResourceSubmissionInput {
    return CreateResourceSubmissionInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateResourceSubmissionInput>, I>>(
    object: I,
  ): CreateResourceSubmissionInput {
    const message = createBaseCreateResourceSubmissionInput();
    message.resourceId = object.resourceId ?? 0;
    message.submissionId = object.submissionId ?? 0;
    return message;
  },
};

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
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
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
