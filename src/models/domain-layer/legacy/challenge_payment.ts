/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyChallengePayment {
  projectPaymentId: number;
  projectPaymentTypeId: number;
  resourceId: number;
  submissionId: number;
  amount: number;
  pactsPaymentId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface LegacyChallengePaymentList {
  projectPayments: LegacyChallengePayment[];
}

export interface GetLegacyChallengePaymentInput {
  resourceId: number;
  projectPaymentTypeId: number;
}

export interface CreateLegacyChallengePaymentInput {
  projectPaymentId?: number | undefined;
  projectPaymentTypeId: number;
  resourceId: number;
  submissionId?: number | undefined;
  amount: number;
  pactsPaymentId?: number | undefined;
}

export interface UpdateLegacyChallengePaymentInput {
  resourceId: number;
  projectPaymentTypeId: number;
  amount: number;
}

export interface DeleteLegacyChallengePaymentInput {
  resourceId: number;
  projectPaymentTypeId: number;
}

function createBaseLegacyChallengePayment(): LegacyChallengePayment {
  return {
    projectPaymentId: 0,
    projectPaymentTypeId: 0,
    resourceId: 0,
    submissionId: 0,
    amount: 0,
    pactsPaymentId: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const LegacyChallengePayment = {
  encode(message: LegacyChallengePayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectPaymentId !== 0) {
      writer.uint32(8).int32(message.projectPaymentId);
    }
    if (message.projectPaymentTypeId !== 0) {
      writer.uint32(16).int32(message.projectPaymentTypeId);
    }
    if (message.resourceId !== 0) {
      writer.uint32(24).int32(message.resourceId);
    }
    if (message.submissionId !== 0) {
      writer.uint32(32).int32(message.submissionId);
    }
    if (message.amount !== 0) {
      writer.uint32(45).float(message.amount);
    }
    if (message.pactsPaymentId !== 0) {
      writer.uint32(48).int32(message.pactsPaymentId);
    }
    if (message.createUser !== 0) {
      writer.uint32(56).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(64).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(72).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(80).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallengePayment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallengePayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectPaymentId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectPaymentTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.resourceId = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.submissionId = reader.int32();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.amount = reader.float();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.pactsPaymentId = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.createDate = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
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

  fromJSON(object: any): LegacyChallengePayment {
    return {
      projectPaymentId: isSet(object.projectPaymentId) ? globalThis.Number(object.projectPaymentId) : 0,
      projectPaymentTypeId: isSet(object.projectPaymentTypeId) ? globalThis.Number(object.projectPaymentTypeId) : 0,
      resourceId: isSet(object.resourceId) ? globalThis.Number(object.resourceId) : 0,
      submissionId: isSet(object.submissionId) ? globalThis.Number(object.submissionId) : 0,
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
      pactsPaymentId: isSet(object.pactsPaymentId) ? globalThis.Number(object.pactsPaymentId) : 0,
      createUser: isSet(object.createUser) ? globalThis.Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? globalThis.Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? globalThis.Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? globalThis.Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: LegacyChallengePayment): unknown {
    const obj: any = {};
    if (message.projectPaymentId !== 0) {
      obj.projectPaymentId = Math.round(message.projectPaymentId);
    }
    if (message.projectPaymentTypeId !== 0) {
      obj.projectPaymentTypeId = Math.round(message.projectPaymentTypeId);
    }
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.submissionId !== 0) {
      obj.submissionId = Math.round(message.submissionId);
    }
    if (message.amount !== 0) {
      obj.amount = message.amount;
    }
    if (message.pactsPaymentId !== 0) {
      obj.pactsPaymentId = Math.round(message.pactsPaymentId);
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

  create<I extends Exact<DeepPartial<LegacyChallengePayment>, I>>(base?: I): LegacyChallengePayment {
    return LegacyChallengePayment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegacyChallengePayment>, I>>(object: I): LegacyChallengePayment {
    const message = createBaseLegacyChallengePayment();
    message.projectPaymentId = object.projectPaymentId ?? 0;
    message.projectPaymentTypeId = object.projectPaymentTypeId ?? 0;
    message.resourceId = object.resourceId ?? 0;
    message.submissionId = object.submissionId ?? 0;
    message.amount = object.amount ?? 0;
    message.pactsPaymentId = object.pactsPaymentId ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseLegacyChallengePaymentList(): LegacyChallengePaymentList {
  return { projectPayments: [] };
}

export const LegacyChallengePaymentList = {
  encode(message: LegacyChallengePaymentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.projectPayments) {
      LegacyChallengePayment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallengePaymentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallengePaymentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectPayments.push(LegacyChallengePayment.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegacyChallengePaymentList {
    return {
      projectPayments: globalThis.Array.isArray(object?.projectPayments)
        ? object.projectPayments.map((e: any) => LegacyChallengePayment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LegacyChallengePaymentList): unknown {
    const obj: any = {};
    if (message.projectPayments?.length) {
      obj.projectPayments = message.projectPayments.map((e) => LegacyChallengePayment.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallengePaymentList>, I>>(base?: I): LegacyChallengePaymentList {
    return LegacyChallengePaymentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegacyChallengePaymentList>, I>>(object: I): LegacyChallengePaymentList {
    const message = createBaseLegacyChallengePaymentList();
    message.projectPayments = object.projectPayments?.map((e) => LegacyChallengePayment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetLegacyChallengePaymentInput(): GetLegacyChallengePaymentInput {
  return { resourceId: 0, projectPaymentTypeId: 0 };
}

export const GetLegacyChallengePaymentInput = {
  encode(message: GetLegacyChallengePaymentInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.projectPaymentTypeId !== 0) {
      writer.uint32(16).int32(message.projectPaymentTypeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLegacyChallengePaymentInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLegacyChallengePaymentInput();
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

          message.projectPaymentTypeId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLegacyChallengePaymentInput {
    return {
      resourceId: isSet(object.resourceId) ? globalThis.Number(object.resourceId) : 0,
      projectPaymentTypeId: isSet(object.projectPaymentTypeId) ? globalThis.Number(object.projectPaymentTypeId) : 0,
    };
  },

  toJSON(message: GetLegacyChallengePaymentInput): unknown {
    const obj: any = {};
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.projectPaymentTypeId !== 0) {
      obj.projectPaymentTypeId = Math.round(message.projectPaymentTypeId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLegacyChallengePaymentInput>, I>>(base?: I): GetLegacyChallengePaymentInput {
    return GetLegacyChallengePaymentInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLegacyChallengePaymentInput>, I>>(
    object: I,
  ): GetLegacyChallengePaymentInput {
    const message = createBaseGetLegacyChallengePaymentInput();
    message.resourceId = object.resourceId ?? 0;
    message.projectPaymentTypeId = object.projectPaymentTypeId ?? 0;
    return message;
  },
};

function createBaseCreateLegacyChallengePaymentInput(): CreateLegacyChallengePaymentInput {
  return {
    projectPaymentId: undefined,
    projectPaymentTypeId: 0,
    resourceId: 0,
    submissionId: undefined,
    amount: 0,
    pactsPaymentId: undefined,
  };
}

export const CreateLegacyChallengePaymentInput = {
  encode(message: CreateLegacyChallengePaymentInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectPaymentId !== undefined) {
      writer.uint32(8).int32(message.projectPaymentId);
    }
    if (message.projectPaymentTypeId !== 0) {
      writer.uint32(16).int32(message.projectPaymentTypeId);
    }
    if (message.resourceId !== 0) {
      writer.uint32(24).int32(message.resourceId);
    }
    if (message.submissionId !== undefined) {
      writer.uint32(32).int32(message.submissionId);
    }
    if (message.amount !== 0) {
      writer.uint32(45).float(message.amount);
    }
    if (message.pactsPaymentId !== undefined) {
      writer.uint32(48).int32(message.pactsPaymentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateLegacyChallengePaymentInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateLegacyChallengePaymentInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectPaymentId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectPaymentTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.resourceId = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.submissionId = reader.int32();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.amount = reader.float();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.pactsPaymentId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateLegacyChallengePaymentInput {
    return {
      projectPaymentId: isSet(object.projectPaymentId) ? globalThis.Number(object.projectPaymentId) : undefined,
      projectPaymentTypeId: isSet(object.projectPaymentTypeId) ? globalThis.Number(object.projectPaymentTypeId) : 0,
      resourceId: isSet(object.resourceId) ? globalThis.Number(object.resourceId) : 0,
      submissionId: isSet(object.submissionId) ? globalThis.Number(object.submissionId) : undefined,
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
      pactsPaymentId: isSet(object.pactsPaymentId) ? globalThis.Number(object.pactsPaymentId) : undefined,
    };
  },

  toJSON(message: CreateLegacyChallengePaymentInput): unknown {
    const obj: any = {};
    if (message.projectPaymentId !== undefined) {
      obj.projectPaymentId = Math.round(message.projectPaymentId);
    }
    if (message.projectPaymentTypeId !== 0) {
      obj.projectPaymentTypeId = Math.round(message.projectPaymentTypeId);
    }
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.submissionId !== undefined) {
      obj.submissionId = Math.round(message.submissionId);
    }
    if (message.amount !== 0) {
      obj.amount = message.amount;
    }
    if (message.pactsPaymentId !== undefined) {
      obj.pactsPaymentId = Math.round(message.pactsPaymentId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateLegacyChallengePaymentInput>, I>>(
    base?: I,
  ): CreateLegacyChallengePaymentInput {
    return CreateLegacyChallengePaymentInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateLegacyChallengePaymentInput>, I>>(
    object: I,
  ): CreateLegacyChallengePaymentInput {
    const message = createBaseCreateLegacyChallengePaymentInput();
    message.projectPaymentId = object.projectPaymentId ?? undefined;
    message.projectPaymentTypeId = object.projectPaymentTypeId ?? 0;
    message.resourceId = object.resourceId ?? 0;
    message.submissionId = object.submissionId ?? undefined;
    message.amount = object.amount ?? 0;
    message.pactsPaymentId = object.pactsPaymentId ?? undefined;
    return message;
  },
};

function createBaseUpdateLegacyChallengePaymentInput(): UpdateLegacyChallengePaymentInput {
  return { resourceId: 0, projectPaymentTypeId: 0, amount: 0 };
}

export const UpdateLegacyChallengePaymentInput = {
  encode(message: UpdateLegacyChallengePaymentInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.projectPaymentTypeId !== 0) {
      writer.uint32(16).int32(message.projectPaymentTypeId);
    }
    if (message.amount !== 0) {
      writer.uint32(29).float(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateLegacyChallengePaymentInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateLegacyChallengePaymentInput();
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

          message.projectPaymentTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.amount = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateLegacyChallengePaymentInput {
    return {
      resourceId: isSet(object.resourceId) ? globalThis.Number(object.resourceId) : 0,
      projectPaymentTypeId: isSet(object.projectPaymentTypeId) ? globalThis.Number(object.projectPaymentTypeId) : 0,
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
    };
  },

  toJSON(message: UpdateLegacyChallengePaymentInput): unknown {
    const obj: any = {};
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.projectPaymentTypeId !== 0) {
      obj.projectPaymentTypeId = Math.round(message.projectPaymentTypeId);
    }
    if (message.amount !== 0) {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateLegacyChallengePaymentInput>, I>>(
    base?: I,
  ): UpdateLegacyChallengePaymentInput {
    return UpdateLegacyChallengePaymentInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateLegacyChallengePaymentInput>, I>>(
    object: I,
  ): UpdateLegacyChallengePaymentInput {
    const message = createBaseUpdateLegacyChallengePaymentInput();
    message.resourceId = object.resourceId ?? 0;
    message.projectPaymentTypeId = object.projectPaymentTypeId ?? 0;
    message.amount = object.amount ?? 0;
    return message;
  },
};

function createBaseDeleteLegacyChallengePaymentInput(): DeleteLegacyChallengePaymentInput {
  return { resourceId: 0, projectPaymentTypeId: 0 };
}

export const DeleteLegacyChallengePaymentInput = {
  encode(message: DeleteLegacyChallengePaymentInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceId !== 0) {
      writer.uint32(8).int32(message.resourceId);
    }
    if (message.projectPaymentTypeId !== 0) {
      writer.uint32(16).int32(message.projectPaymentTypeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteLegacyChallengePaymentInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteLegacyChallengePaymentInput();
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

          message.projectPaymentTypeId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteLegacyChallengePaymentInput {
    return {
      resourceId: isSet(object.resourceId) ? globalThis.Number(object.resourceId) : 0,
      projectPaymentTypeId: isSet(object.projectPaymentTypeId) ? globalThis.Number(object.projectPaymentTypeId) : 0,
    };
  },

  toJSON(message: DeleteLegacyChallengePaymentInput): unknown {
    const obj: any = {};
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.projectPaymentTypeId !== 0) {
      obj.projectPaymentTypeId = Math.round(message.projectPaymentTypeId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteLegacyChallengePaymentInput>, I>>(
    base?: I,
  ): DeleteLegacyChallengePaymentInput {
    return DeleteLegacyChallengePaymentInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteLegacyChallengePaymentInput>, I>>(
    object: I,
  ): DeleteLegacyChallengePaymentInput {
    const message = createBaseDeleteLegacyChallengePaymentInput();
    message.resourceId = object.resourceId ?? 0;
    message.projectPaymentTypeId = object.projectPaymentTypeId ?? 0;
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
