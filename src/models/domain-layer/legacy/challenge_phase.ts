/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyChallengePhase {
  projectPhaseId: number;
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
  createDate?: string | undefined;
  modifyUser?: number | undefined;
  modifyDate?: string | undefined;
}

export interface PhaseType {
  phaseTypeId: number;
  name: string;
  description?: string | undefined;
  createUser?: number | undefined;
  createDate?: string | undefined;
  modifyUser?: number | undefined;
  modifyDate?: string | undefined;
}

export interface LegacyChallengePhaseList {
  phases: LegacyChallengePhase[];
}

export interface PhaseTypeList {
  items: PhaseType[];
}

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
}

function createBaseLegacyChallengePhase(): LegacyChallengePhase {
  return {
    projectPhaseId: 0,
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
    createDate: undefined,
    modifyUser: undefined,
    modifyDate: undefined,
  };
}

export const LegacyChallengePhase = {
  encode(message: LegacyChallengePhase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectPhaseId !== 0) {
      writer.uint32(8).int64(message.projectPhaseId);
    }
    if (message.projectId !== 0) {
      writer.uint32(16).int64(message.projectId);
    }
    if (message.phaseTypeId !== 0) {
      writer.uint32(24).int64(message.phaseTypeId);
    }
    if (message.phaseStatusId !== 0) {
      writer.uint32(32).int64(message.phaseStatusId);
    }
    if (message.fixedStartTime !== undefined) {
      writer.uint32(42).string(message.fixedStartTime);
    }
    if (message.scheduledStartTime !== undefined) {
      writer.uint32(50).string(message.scheduledStartTime);
    }
    if (message.scheduledEndTime !== undefined) {
      writer.uint32(58).string(message.scheduledEndTime);
    }
    if (message.actualStartTime !== undefined) {
      writer.uint32(66).string(message.actualStartTime);
    }
    if (message.actualEndTime !== undefined) {
      writer.uint32(74).string(message.actualEndTime);
    }
    if (message.duration !== 0) {
      writer.uint32(80).int64(message.duration);
    }
    if (message.createUser !== undefined) {
      writer.uint32(88).int32(message.createUser);
    }
    if (message.createDate !== undefined) {
      writer.uint32(98).string(message.createDate);
    }
    if (message.modifyUser !== undefined) {
      writer.uint32(104).int32(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      writer.uint32(114).string(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallengePhase {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallengePhase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectPhaseId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.phaseTypeId = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.phaseStatusId = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fixedStartTime = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.scheduledStartTime = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.scheduledEndTime = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.actualStartTime = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.actualEndTime = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.duration = longToNumber(reader.int64() as Long);
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.createDate = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.modifyDate = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegacyChallengePhase {
    return {
      projectPhaseId: isSet(object.projectPhaseId) ? Number(object.projectPhaseId) : 0,
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
      createDate: isSet(object.createDate) ? String(object.createDate) : undefined,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : undefined,
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : undefined,
    };
  },

  toJSON(message: LegacyChallengePhase): unknown {
    const obj: any = {};
    if (message.projectPhaseId !== 0) {
      obj.projectPhaseId = Math.round(message.projectPhaseId);
    }
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.phaseTypeId !== 0) {
      obj.phaseTypeId = Math.round(message.phaseTypeId);
    }
    if (message.phaseStatusId !== 0) {
      obj.phaseStatusId = Math.round(message.phaseStatusId);
    }
    if (message.fixedStartTime !== undefined) {
      obj.fixedStartTime = message.fixedStartTime;
    }
    if (message.scheduledStartTime !== undefined) {
      obj.scheduledStartTime = message.scheduledStartTime;
    }
    if (message.scheduledEndTime !== undefined) {
      obj.scheduledEndTime = message.scheduledEndTime;
    }
    if (message.actualStartTime !== undefined) {
      obj.actualStartTime = message.actualStartTime;
    }
    if (message.actualEndTime !== undefined) {
      obj.actualEndTime = message.actualEndTime;
    }
    if (message.duration !== 0) {
      obj.duration = Math.round(message.duration);
    }
    if (message.createUser !== undefined) {
      obj.createUser = Math.round(message.createUser);
    }
    if (message.createDate !== undefined) {
      obj.createDate = message.createDate;
    }
    if (message.modifyUser !== undefined) {
      obj.modifyUser = Math.round(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      obj.modifyDate = message.modifyDate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallengePhase>, I>>(base?: I): LegacyChallengePhase {
    return LegacyChallengePhase.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegacyChallengePhase>, I>>(object: I): LegacyChallengePhase {
    const message = createBaseLegacyChallengePhase();
    message.projectPhaseId = object.projectPhaseId ?? 0;
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
    message.createDate = object.createDate ?? undefined;
    message.modifyUser = object.modifyUser ?? undefined;
    message.modifyDate = object.modifyDate ?? undefined;
    return message;
  },
};

function createBasePhaseType(): PhaseType {
  return {
    phaseTypeId: 0,
    name: "",
    description: undefined,
    createUser: undefined,
    createDate: undefined,
    modifyUser: undefined,
    modifyDate: undefined,
  };
}

export const PhaseType = {
  encode(message: PhaseType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phaseTypeId !== 0) {
      writer.uint32(8).int64(message.phaseTypeId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.createUser !== undefined) {
      writer.uint32(32).int32(message.createUser);
    }
    if (message.createDate !== undefined) {
      writer.uint32(42).string(message.createDate);
    }
    if (message.modifyUser !== undefined) {
      writer.uint32(48).int32(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      writer.uint32(58).string(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PhaseType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhaseType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.phaseTypeId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createDate = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.modifyDate = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PhaseType {
    return {
      phaseTypeId: isSet(object.phaseTypeId) ? Number(object.phaseTypeId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      createUser: isSet(object.createUser) ? Number(object.createUser) : undefined,
      createDate: isSet(object.createDate) ? String(object.createDate) : undefined,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : undefined,
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : undefined,
    };
  },

  toJSON(message: PhaseType): unknown {
    const obj: any = {};
    if (message.phaseTypeId !== 0) {
      obj.phaseTypeId = Math.round(message.phaseTypeId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.createUser !== undefined) {
      obj.createUser = Math.round(message.createUser);
    }
    if (message.createDate !== undefined) {
      obj.createDate = message.createDate;
    }
    if (message.modifyUser !== undefined) {
      obj.modifyUser = Math.round(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      obj.modifyDate = message.modifyDate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PhaseType>, I>>(base?: I): PhaseType {
    return PhaseType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PhaseType>, I>>(object: I): PhaseType {
    const message = createBasePhaseType();
    message.phaseTypeId = object.phaseTypeId ?? 0;
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    message.createUser = object.createUser ?? undefined;
    message.createDate = object.createDate ?? undefined;
    message.modifyUser = object.modifyUser ?? undefined;
    message.modifyDate = object.modifyDate ?? undefined;
    return message;
  },
};

function createBaseLegacyChallengePhaseList(): LegacyChallengePhaseList {
  return { phases: [] };
}

export const LegacyChallengePhaseList = {
  encode(message: LegacyChallengePhaseList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.phases) {
      LegacyChallengePhase.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallengePhaseList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallengePhaseList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.phases.push(LegacyChallengePhase.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegacyChallengePhaseList {
    return {
      phases: globalThis.Array.isArray(object?.phases)
        ? object.phases.map((e: any) => LegacyChallengePhase.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LegacyChallengePhaseList): unknown {
    const obj: any = {};
    if (message.phases?.length) {
      obj.phases = message.phases.map((e) => LegacyChallengePhase.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallengePhaseList>, I>>(base?: I): LegacyChallengePhaseList {
    return LegacyChallengePhaseList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegacyChallengePhaseList>, I>>(object: I): LegacyChallengePhaseList {
    const message = createBaseLegacyChallengePhaseList();
    message.phases = object.phases?.map((e) => LegacyChallengePhase.fromPartial(e)) || [];
    return message;
  },
};

function createBasePhaseTypeList(): PhaseTypeList {
  return { items: [] };
}

export const PhaseTypeList = {
  encode(message: PhaseTypeList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      PhaseType.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PhaseTypeList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhaseTypeList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(PhaseType.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PhaseTypeList {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => PhaseType.fromJSON(e)) : [],
    };
  },

  toJSON(message: PhaseTypeList): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => PhaseType.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PhaseTypeList>, I>>(base?: I): PhaseTypeList {
    return PhaseTypeList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PhaseTypeList>, I>>(object: I): PhaseTypeList {
    const message = createBasePhaseTypeList();
    message.items = object.items?.map((e) => PhaseType.fromPartial(e)) || [];
    return message;
  },
};

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
      writer.uint32(72).int64(message.duration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePhaseInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePhaseInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.phaseTypeId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.phaseStatusId = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fixedStartTime = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.scheduledStartTime = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.scheduledEndTime = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.actualStartTime = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.actualEndTime = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.duration = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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
    };
  },

  toJSON(message: CreatePhaseInput): unknown {
    const obj: any = {};
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.phaseTypeId !== 0) {
      obj.phaseTypeId = Math.round(message.phaseTypeId);
    }
    if (message.phaseStatusId !== 0) {
      obj.phaseStatusId = Math.round(message.phaseStatusId);
    }
    if (message.fixedStartTime !== undefined) {
      obj.fixedStartTime = message.fixedStartTime;
    }
    if (message.scheduledStartTime !== undefined) {
      obj.scheduledStartTime = message.scheduledStartTime;
    }
    if (message.scheduledEndTime !== undefined) {
      obj.scheduledEndTime = message.scheduledEndTime;
    }
    if (message.actualStartTime !== undefined) {
      obj.actualStartTime = message.actualStartTime;
    }
    if (message.actualEndTime !== undefined) {
      obj.actualEndTime = message.actualEndTime;
    }
    if (message.duration !== 0) {
      obj.duration = Math.round(message.duration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePhaseInput>, I>>(base?: I): CreatePhaseInput {
    return CreatePhaseInput.fromPartial(base ?? ({} as any));
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
