/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyChallenge {
  projectId: number;
  projectStatusId: number;
  projectCategoryId: number;
  createUser: number;
  createDate: string;
  modifyUser: number;
  modifyDate: string;
  tcDirectProjectId: number;
}

export interface LegacyChallengeId {
  legacyChallengeId: number;
}

export interface LegacyChallengeList {
  legacyChallenges: LegacyChallenge[];
}

export interface Phase {
  phaseTypeId: number;
  phaseStatusId: number;
  fixedStartTime?: string | undefined;
  scheduledStartTime: string;
  scheduledEndTime: string;
  actualStartTime?: string | undefined;
  actualEndTime?: string | undefined;
  duration: number;
  phaseCriteria: { [key: number]: string };
}

export interface Phase_PhaseCriteriaEntry {
  key: number;
  value: string;
}

export interface Prize {
  place: number;
  amount: number;
  type?: string | undefined;
  numSubmissions: number;
}

export interface CreateChallengeInput {
  name: string;
  projectStatusId: number;
  projectCategoryId: number;
  projectStudioSpecId?: number | undefined;
  projectMmSpecId?: number | undefined;
  tcDirectProjectId: number;
  winnerPrizes: Prize[];
  reviewType?: string | undefined;
  confidentialityType: string;
  billingProject: number;
  projectInfo: { [key: number]: string };
  phases: Phase[];
}

export interface CreateChallengeInput_ProjectInfoEntry {
  key: number;
  value: string;
}

export interface UpdateChallengeInput {
  projectId: number;
  name?: string | undefined;
  projectStatusId?: number | undefined;
  prizeUpdate?: UpdateChallengeInput_PrizeUpdate | undefined;
  phaseUpdate?: UpdateChallengeInput_PhaseUpdate | undefined;
  groupUpdate?: UpdateChallengeInput_GroupUpdate | undefined;
  termUpdate?: UpdateChallengeInput_TermUpdate | undefined;
  billingProject?: number | undefined;
  projectInfo: { [key: number]: string };
}

export interface UpdateChallengeInput_ProjectInfoEntry {
  key: number;
  value: string;
}

export interface UpdateChallengeInput_PrizeUpdate {
  winnerPrizes: Prize[];
}

export interface UpdateChallengeInput_PhaseUpdate {
  phases: Phase[];
}

export interface UpdateChallengeInput_GroupUpdate {
  groups: string[];
}

export interface UpdateChallengeInput_Term {
  id?: string | undefined;
  roleId?: string | undefined;
}

export interface UpdateChallengeInput_TermUpdate {
  terms: UpdateChallengeInput_Term[];
}

export interface CloseChallengeInput {
  projectId: number;
  winnerId: number;
}

function createBaseLegacyChallenge(): LegacyChallenge {
  return {
    projectId: 0,
    projectStatusId: 0,
    projectCategoryId: 0,
    createUser: 0,
    createDate: "",
    modifyUser: 0,
    modifyDate: "",
    tcDirectProjectId: 0,
  };
}

export const LegacyChallenge = {
  encode(message: LegacyChallenge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectStatusId !== 0) {
      writer.uint32(16).int32(message.projectStatusId);
    }
    if (message.projectCategoryId !== 0) {
      writer.uint32(24).int32(message.projectCategoryId);
    }
    if (message.createUser !== 0) {
      writer.uint32(32).int32(message.createUser);
    }
    if (message.createDate !== "") {
      writer.uint32(42).string(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(48).int32(message.modifyUser);
    }
    if (message.modifyDate !== "") {
      writer.uint32(58).string(message.modifyDate);
    }
    if (message.tcDirectProjectId !== 0) {
      writer.uint32(64).int64(message.tcDirectProjectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallenge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallenge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.int32();
          break;
        case 2:
          message.projectStatusId = reader.int32();
          break;
        case 3:
          message.projectCategoryId = reader.int32();
          break;
        case 4:
          message.createUser = reader.int32();
          break;
        case 5:
          message.createDate = reader.string();
          break;
        case 6:
          message.modifyUser = reader.int32();
          break;
        case 7:
          message.modifyDate = reader.string();
          break;
        case 8:
          message.tcDirectProjectId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacyChallenge {
    return {
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      projectStatusId: isSet(object.projectStatusId) ? Number(object.projectStatusId) : 0,
      projectCategoryId: isSet(object.projectCategoryId) ? Number(object.projectCategoryId) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? String(object.createDate) : "",
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : "",
      tcDirectProjectId: isSet(object.tcDirectProjectId) ? Number(object.tcDirectProjectId) : 0,
    };
  },

  toJSON(message: LegacyChallenge): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.projectStatusId !== undefined &&
      (obj.projectStatusId = Math.round(message.projectStatusId));
    message.projectCategoryId !== undefined &&
      (obj.projectCategoryId = Math.round(message.projectCategoryId));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = message.createDate);
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = message.modifyDate);
    message.tcDirectProjectId !== undefined &&
      (obj.tcDirectProjectId = Math.round(message.tcDirectProjectId));
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallenge>, I>>(base?: I): LegacyChallenge {
    return LegacyChallenge.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyChallenge>, I>>(object: I): LegacyChallenge {
    const message = createBaseLegacyChallenge();
    message.projectId = object.projectId ?? 0;
    message.projectStatusId = object.projectStatusId ?? 0;
    message.projectCategoryId = object.projectCategoryId ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? "";
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? "";
    message.tcDirectProjectId = object.tcDirectProjectId ?? 0;
    return message;
  },
};

function createBaseLegacyChallengeId(): LegacyChallengeId {
  return { legacyChallengeId: 0 };
}

export const LegacyChallengeId = {
  encode(message: LegacyChallengeId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.legacyChallengeId !== 0) {
      writer.uint32(8).int32(message.legacyChallengeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallengeId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallengeId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.legacyChallengeId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacyChallengeId {
    return {
      legacyChallengeId: isSet(object.legacyChallengeId) ? Number(object.legacyChallengeId) : 0,
    };
  },

  toJSON(message: LegacyChallengeId): unknown {
    const obj: any = {};
    message.legacyChallengeId !== undefined &&
      (obj.legacyChallengeId = Math.round(message.legacyChallengeId));
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallengeId>, I>>(base?: I): LegacyChallengeId {
    return LegacyChallengeId.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyChallengeId>, I>>(object: I): LegacyChallengeId {
    const message = createBaseLegacyChallengeId();
    message.legacyChallengeId = object.legacyChallengeId ?? 0;
    return message;
  },
};

function createBaseLegacyChallengeList(): LegacyChallengeList {
  return { legacyChallenges: [] };
}

export const LegacyChallengeList = {
  encode(message: LegacyChallengeList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.legacyChallenges) {
      LegacyChallenge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyChallengeList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyChallengeList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.legacyChallenges.push(LegacyChallenge.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacyChallengeList {
    return {
      legacyChallenges: Array.isArray(object?.legacyChallenges)
        ? object.legacyChallenges.map((e: any) => LegacyChallenge.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LegacyChallengeList): unknown {
    const obj: any = {};
    if (message.legacyChallenges) {
      obj.legacyChallenges = message.legacyChallenges.map((e) =>
        e ? LegacyChallenge.toJSON(e) : undefined
      );
    } else {
      obj.legacyChallenges = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallengeList>, I>>(base?: I): LegacyChallengeList {
    return LegacyChallengeList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyChallengeList>, I>>(
    object: I
  ): LegacyChallengeList {
    const message = createBaseLegacyChallengeList();
    message.legacyChallenges =
      object.legacyChallenges?.map((e) => LegacyChallenge.fromPartial(e)) || [];
    return message;
  },
};

function createBasePhase(): Phase {
  return {
    phaseTypeId: 0,
    phaseStatusId: 0,
    fixedStartTime: undefined,
    scheduledStartTime: "",
    scheduledEndTime: "",
    actualStartTime: undefined,
    actualEndTime: undefined,
    duration: 0,
    phaseCriteria: {},
  };
}

export const Phase = {
  encode(message: Phase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.phaseTypeId !== 0) {
      writer.uint32(8).sint32(message.phaseTypeId);
    }
    if (message.phaseStatusId !== 0) {
      writer.uint32(16).sint32(message.phaseStatusId);
    }
    if (message.fixedStartTime !== undefined) {
      writer.uint32(26).string(message.fixedStartTime);
    }
    if (message.scheduledStartTime !== "") {
      writer.uint32(34).string(message.scheduledStartTime);
    }
    if (message.scheduledEndTime !== "") {
      writer.uint32(42).string(message.scheduledEndTime);
    }
    if (message.actualStartTime !== undefined) {
      writer.uint32(50).string(message.actualStartTime);
    }
    if (message.actualEndTime !== undefined) {
      writer.uint32(58).string(message.actualEndTime);
    }
    if (message.duration !== 0) {
      writer.uint32(64).int64(message.duration);
    }
    Object.entries(message.phaseCriteria).forEach(([key, value]) => {
      Phase_PhaseCriteriaEntry.encode(
        { key: key as any, value },
        writer.uint32(74).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Phase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.phaseTypeId = reader.sint32();
          break;
        case 2:
          message.phaseStatusId = reader.sint32();
          break;
        case 3:
          message.fixedStartTime = reader.string();
          break;
        case 4:
          message.scheduledStartTime = reader.string();
          break;
        case 5:
          message.scheduledEndTime = reader.string();
          break;
        case 6:
          message.actualStartTime = reader.string();
          break;
        case 7:
          message.actualEndTime = reader.string();
          break;
        case 8:
          message.duration = longToNumber(reader.int64() as Long);
          break;
        case 9:
          const entry9 = Phase_PhaseCriteriaEntry.decode(reader, reader.uint32());
          if (entry9.value !== undefined) {
            message.phaseCriteria[entry9.key] = entry9.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Phase {
    return {
      phaseTypeId: isSet(object.phaseTypeId) ? Number(object.phaseTypeId) : 0,
      phaseStatusId: isSet(object.phaseStatusId) ? Number(object.phaseStatusId) : 0,
      fixedStartTime: isSet(object.fixedStartTime) ? String(object.fixedStartTime) : undefined,
      scheduledStartTime: isSet(object.scheduledStartTime) ? String(object.scheduledStartTime) : "",
      scheduledEndTime: isSet(object.scheduledEndTime) ? String(object.scheduledEndTime) : "",
      actualStartTime: isSet(object.actualStartTime) ? String(object.actualStartTime) : undefined,
      actualEndTime: isSet(object.actualEndTime) ? String(object.actualEndTime) : undefined,
      duration: isSet(object.duration) ? Number(object.duration) : 0,
      phaseCriteria: isObject(object.phaseCriteria)
        ? Object.entries(object.phaseCriteria).reduce<{ [key: number]: string }>(
            (acc, [key, value]) => {
              acc[Number(key)] = String(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: Phase): unknown {
    const obj: any = {};
    message.phaseTypeId !== undefined && (obj.phaseTypeId = Math.round(message.phaseTypeId));
    message.phaseStatusId !== undefined && (obj.phaseStatusId = Math.round(message.phaseStatusId));
    message.fixedStartTime !== undefined && (obj.fixedStartTime = message.fixedStartTime);
    message.scheduledStartTime !== undefined &&
      (obj.scheduledStartTime = message.scheduledStartTime);
    message.scheduledEndTime !== undefined && (obj.scheduledEndTime = message.scheduledEndTime);
    message.actualStartTime !== undefined && (obj.actualStartTime = message.actualStartTime);
    message.actualEndTime !== undefined && (obj.actualEndTime = message.actualEndTime);
    message.duration !== undefined && (obj.duration = Math.round(message.duration));
    obj.phaseCriteria = {};
    if (message.phaseCriteria) {
      Object.entries(message.phaseCriteria).forEach(([k, v]) => {
        obj.phaseCriteria[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Phase>, I>>(base?: I): Phase {
    return Phase.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Phase>, I>>(object: I): Phase {
    const message = createBasePhase();
    message.phaseTypeId = object.phaseTypeId ?? 0;
    message.phaseStatusId = object.phaseStatusId ?? 0;
    message.fixedStartTime = object.fixedStartTime ?? undefined;
    message.scheduledStartTime = object.scheduledStartTime ?? "";
    message.scheduledEndTime = object.scheduledEndTime ?? "";
    message.actualStartTime = object.actualStartTime ?? undefined;
    message.actualEndTime = object.actualEndTime ?? undefined;
    message.duration = object.duration ?? 0;
    message.phaseCriteria = Object.entries(object.phaseCriteria ?? {}).reduce<{
      [key: number]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBasePhase_PhaseCriteriaEntry(): Phase_PhaseCriteriaEntry {
  return { key: 0, value: "" };
}

export const Phase_PhaseCriteriaEntry = {
  encode(message: Phase_PhaseCriteriaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).sint32(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Phase_PhaseCriteriaEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhase_PhaseCriteriaEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.sint32();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Phase_PhaseCriteriaEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: Phase_PhaseCriteriaEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Phase_PhaseCriteriaEntry>, I>>(
    base?: I
  ): Phase_PhaseCriteriaEntry {
    return Phase_PhaseCriteriaEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Phase_PhaseCriteriaEntry>, I>>(
    object: I
  ): Phase_PhaseCriteriaEntry {
    const message = createBasePhase_PhaseCriteriaEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? "";
    return message;
  },
};

function createBasePrize(): Prize {
  return { place: 0, amount: 0, type: undefined, numSubmissions: 0 };
}

export const Prize = {
  encode(message: Prize, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.place !== 0) {
      writer.uint32(8).int32(message.place);
    }
    if (message.amount !== 0) {
      writer.uint32(21).float(message.amount);
    }
    if (message.type !== undefined) {
      writer.uint32(26).string(message.type);
    }
    if (message.numSubmissions !== 0) {
      writer.uint32(32).int32(message.numSubmissions);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Prize {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.place = reader.int32();
          break;
        case 2:
          message.amount = reader.float();
          break;
        case 3:
          message.type = reader.string();
          break;
        case 4:
          message.numSubmissions = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Prize {
    return {
      place: isSet(object.place) ? Number(object.place) : 0,
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      type: isSet(object.type) ? String(object.type) : undefined,
      numSubmissions: isSet(object.numSubmissions) ? Number(object.numSubmissions) : 0,
    };
  },

  toJSON(message: Prize): unknown {
    const obj: any = {};
    message.place !== undefined && (obj.place = Math.round(message.place));
    message.amount !== undefined && (obj.amount = message.amount);
    message.type !== undefined && (obj.type = message.type);
    message.numSubmissions !== undefined &&
      (obj.numSubmissions = Math.round(message.numSubmissions));
    return obj;
  },

  create<I extends Exact<DeepPartial<Prize>, I>>(base?: I): Prize {
    return Prize.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Prize>, I>>(object: I): Prize {
    const message = createBasePrize();
    message.place = object.place ?? 0;
    message.amount = object.amount ?? 0;
    message.type = object.type ?? undefined;
    message.numSubmissions = object.numSubmissions ?? 0;
    return message;
  },
};

function createBaseCreateChallengeInput(): CreateChallengeInput {
  return {
    name: "",
    projectStatusId: 0,
    projectCategoryId: 0,
    projectStudioSpecId: undefined,
    projectMmSpecId: undefined,
    tcDirectProjectId: 0,
    winnerPrizes: [],
    reviewType: undefined,
    confidentialityType: "",
    billingProject: 0,
    projectInfo: {},
    phases: [],
  };
}

export const CreateChallengeInput = {
  encode(message: CreateChallengeInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.projectStatusId !== 0) {
      writer.uint32(16).int32(message.projectStatusId);
    }
    if (message.projectCategoryId !== 0) {
      writer.uint32(24).int32(message.projectCategoryId);
    }
    if (message.projectStudioSpecId !== undefined) {
      writer.uint32(32).int32(message.projectStudioSpecId);
    }
    if (message.projectMmSpecId !== undefined) {
      writer.uint32(40).int32(message.projectMmSpecId);
    }
    if (message.tcDirectProjectId !== 0) {
      writer.uint32(48).int64(message.tcDirectProjectId);
    }
    for (const v of message.winnerPrizes) {
      Prize.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.reviewType !== undefined) {
      writer.uint32(66).string(message.reviewType);
    }
    if (message.confidentialityType !== "") {
      writer.uint32(74).string(message.confidentialityType);
    }
    if (message.billingProject !== 0) {
      writer.uint32(80).int32(message.billingProject);
    }
    Object.entries(message.projectInfo).forEach(([key, value]) => {
      CreateChallengeInput_ProjectInfoEntry.encode(
        { key: key as any, value },
        writer.uint32(90).fork()
      ).ldelim();
    });
    for (const v of message.phases) {
      Phase.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChallengeInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChallengeInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.projectStatusId = reader.int32();
          break;
        case 3:
          message.projectCategoryId = reader.int32();
          break;
        case 4:
          message.projectStudioSpecId = reader.int32();
          break;
        case 5:
          message.projectMmSpecId = reader.int32();
          break;
        case 6:
          message.tcDirectProjectId = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.winnerPrizes.push(Prize.decode(reader, reader.uint32()));
          break;
        case 8:
          message.reviewType = reader.string();
          break;
        case 9:
          message.confidentialityType = reader.string();
          break;
        case 10:
          message.billingProject = reader.int32();
          break;
        case 11:
          const entry11 = CreateChallengeInput_ProjectInfoEntry.decode(reader, reader.uint32());
          if (entry11.value !== undefined) {
            message.projectInfo[entry11.key] = entry11.value;
          }
          break;
        case 13:
          message.phases.push(Phase.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChallengeInput {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      projectStatusId: isSet(object.projectStatusId) ? Number(object.projectStatusId) : 0,
      projectCategoryId: isSet(object.projectCategoryId) ? Number(object.projectCategoryId) : 0,
      projectStudioSpecId: isSet(object.projectStudioSpecId)
        ? Number(object.projectStudioSpecId)
        : undefined,
      projectMmSpecId: isSet(object.projectMmSpecId) ? Number(object.projectMmSpecId) : undefined,
      tcDirectProjectId: isSet(object.tcDirectProjectId) ? Number(object.tcDirectProjectId) : 0,
      winnerPrizes: Array.isArray(object?.winnerPrizes)
        ? object.winnerPrizes.map((e: any) => Prize.fromJSON(e))
        : [],
      reviewType: isSet(object.reviewType) ? String(object.reviewType) : undefined,
      confidentialityType: isSet(object.confidentialityType)
        ? String(object.confidentialityType)
        : "",
      billingProject: isSet(object.billingProject) ? Number(object.billingProject) : 0,
      projectInfo: isObject(object.projectInfo)
        ? Object.entries(object.projectInfo).reduce<{ [key: number]: string }>(
            (acc, [key, value]) => {
              acc[Number(key)] = String(value);
              return acc;
            },
            {}
          )
        : {},
      phases: Array.isArray(object?.phases) ? object.phases.map((e: any) => Phase.fromJSON(e)) : [],
    };
  },

  toJSON(message: CreateChallengeInput): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.projectStatusId !== undefined &&
      (obj.projectStatusId = Math.round(message.projectStatusId));
    message.projectCategoryId !== undefined &&
      (obj.projectCategoryId = Math.round(message.projectCategoryId));
    message.projectStudioSpecId !== undefined &&
      (obj.projectStudioSpecId = Math.round(message.projectStudioSpecId));
    message.projectMmSpecId !== undefined &&
      (obj.projectMmSpecId = Math.round(message.projectMmSpecId));
    message.tcDirectProjectId !== undefined &&
      (obj.tcDirectProjectId = Math.round(message.tcDirectProjectId));
    if (message.winnerPrizes) {
      obj.winnerPrizes = message.winnerPrizes.map((e) => (e ? Prize.toJSON(e) : undefined));
    } else {
      obj.winnerPrizes = [];
    }
    message.reviewType !== undefined && (obj.reviewType = message.reviewType);
    message.confidentialityType !== undefined &&
      (obj.confidentialityType = message.confidentialityType);
    message.billingProject !== undefined &&
      (obj.billingProject = Math.round(message.billingProject));
    obj.projectInfo = {};
    if (message.projectInfo) {
      Object.entries(message.projectInfo).forEach(([k, v]) => {
        obj.projectInfo[k] = v;
      });
    }
    if (message.phases) {
      obj.phases = message.phases.map((e) => (e ? Phase.toJSON(e) : undefined));
    } else {
      obj.phases = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChallengeInput>, I>>(base?: I): CreateChallengeInput {
    return CreateChallengeInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateChallengeInput>, I>>(
    object: I
  ): CreateChallengeInput {
    const message = createBaseCreateChallengeInput();
    message.name = object.name ?? "";
    message.projectStatusId = object.projectStatusId ?? 0;
    message.projectCategoryId = object.projectCategoryId ?? 0;
    message.projectStudioSpecId = object.projectStudioSpecId ?? undefined;
    message.projectMmSpecId = object.projectMmSpecId ?? undefined;
    message.tcDirectProjectId = object.tcDirectProjectId ?? 0;
    message.winnerPrizes = object.winnerPrizes?.map((e) => Prize.fromPartial(e)) || [];
    message.reviewType = object.reviewType ?? undefined;
    message.confidentialityType = object.confidentialityType ?? "";
    message.billingProject = object.billingProject ?? 0;
    message.projectInfo = Object.entries(object.projectInfo ?? {}).reduce<{
      [key: number]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = String(value);
      }
      return acc;
    }, {});
    message.phases = object.phases?.map((e) => Phase.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateChallengeInput_ProjectInfoEntry(): CreateChallengeInput_ProjectInfoEntry {
  return { key: 0, value: "" };
}

export const CreateChallengeInput_ProjectInfoEntry = {
  encode(
    message: CreateChallengeInput_ProjectInfoEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).sint32(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChallengeInput_ProjectInfoEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChallengeInput_ProjectInfoEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.sint32();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChallengeInput_ProjectInfoEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: CreateChallengeInput_ProjectInfoEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChallengeInput_ProjectInfoEntry>, I>>(
    base?: I
  ): CreateChallengeInput_ProjectInfoEntry {
    return CreateChallengeInput_ProjectInfoEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateChallengeInput_ProjectInfoEntry>, I>>(
    object: I
  ): CreateChallengeInput_ProjectInfoEntry {
    const message = createBaseCreateChallengeInput_ProjectInfoEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseUpdateChallengeInput(): UpdateChallengeInput {
  return {
    projectId: 0,
    name: undefined,
    projectStatusId: undefined,
    prizeUpdate: undefined,
    phaseUpdate: undefined,
    groupUpdate: undefined,
    termUpdate: undefined,
    billingProject: undefined,
    projectInfo: {},
  };
}

export const UpdateChallengeInput = {
  encode(message: UpdateChallengeInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.projectStatusId !== undefined) {
      writer.uint32(24).int32(message.projectStatusId);
    }
    if (message.prizeUpdate !== undefined) {
      UpdateChallengeInput_PrizeUpdate.encode(
        message.prizeUpdate,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.phaseUpdate !== undefined) {
      UpdateChallengeInput_PhaseUpdate.encode(
        message.phaseUpdate,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.groupUpdate !== undefined) {
      UpdateChallengeInput_GroupUpdate.encode(
        message.groupUpdate,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.termUpdate !== undefined) {
      UpdateChallengeInput_TermUpdate.encode(message.termUpdate, writer.uint32(58).fork()).ldelim();
    }
    if (message.billingProject !== undefined) {
      writer.uint32(64).int32(message.billingProject);
    }
    Object.entries(message.projectInfo).forEach(([key, value]) => {
      UpdateChallengeInput_ProjectInfoEntry.encode(
        { key: key as any, value },
        writer.uint32(74).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.projectStatusId = reader.int32();
          break;
        case 4:
          message.prizeUpdate = UpdateChallengeInput_PrizeUpdate.decode(reader, reader.uint32());
          break;
        case 5:
          message.phaseUpdate = UpdateChallengeInput_PhaseUpdate.decode(reader, reader.uint32());
          break;
        case 6:
          message.groupUpdate = UpdateChallengeInput_GroupUpdate.decode(reader, reader.uint32());
          break;
        case 7:
          message.termUpdate = UpdateChallengeInput_TermUpdate.decode(reader, reader.uint32());
          break;
        case 8:
          message.billingProject = reader.int32();
          break;
        case 9:
          const entry9 = UpdateChallengeInput_ProjectInfoEntry.decode(reader, reader.uint32());
          if (entry9.value !== undefined) {
            message.projectInfo[entry9.key] = entry9.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput {
    return {
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      name: isSet(object.name) ? String(object.name) : undefined,
      projectStatusId: isSet(object.projectStatusId) ? Number(object.projectStatusId) : undefined,
      prizeUpdate: isSet(object.prizeUpdate)
        ? UpdateChallengeInput_PrizeUpdate.fromJSON(object.prizeUpdate)
        : undefined,
      phaseUpdate: isSet(object.phaseUpdate)
        ? UpdateChallengeInput_PhaseUpdate.fromJSON(object.phaseUpdate)
        : undefined,
      groupUpdate: isSet(object.groupUpdate)
        ? UpdateChallengeInput_GroupUpdate.fromJSON(object.groupUpdate)
        : undefined,
      termUpdate: isSet(object.termUpdate)
        ? UpdateChallengeInput_TermUpdate.fromJSON(object.termUpdate)
        : undefined,
      billingProject: isSet(object.billingProject) ? Number(object.billingProject) : undefined,
      projectInfo: isObject(object.projectInfo)
        ? Object.entries(object.projectInfo).reduce<{ [key: number]: string }>(
            (acc, [key, value]) => {
              acc[Number(key)] = String(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: UpdateChallengeInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.name !== undefined && (obj.name = message.name);
    message.projectStatusId !== undefined &&
      (obj.projectStatusId = Math.round(message.projectStatusId));
    message.prizeUpdate !== undefined &&
      (obj.prizeUpdate = message.prizeUpdate
        ? UpdateChallengeInput_PrizeUpdate.toJSON(message.prizeUpdate)
        : undefined);
    message.phaseUpdate !== undefined &&
      (obj.phaseUpdate = message.phaseUpdate
        ? UpdateChallengeInput_PhaseUpdate.toJSON(message.phaseUpdate)
        : undefined);
    message.groupUpdate !== undefined &&
      (obj.groupUpdate = message.groupUpdate
        ? UpdateChallengeInput_GroupUpdate.toJSON(message.groupUpdate)
        : undefined);
    message.termUpdate !== undefined &&
      (obj.termUpdate = message.termUpdate
        ? UpdateChallengeInput_TermUpdate.toJSON(message.termUpdate)
        : undefined);
    message.billingProject !== undefined &&
      (obj.billingProject = Math.round(message.billingProject));
    obj.projectInfo = {};
    if (message.projectInfo) {
      Object.entries(message.projectInfo).forEach(([k, v]) => {
        obj.projectInfo[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput>, I>>(base?: I): UpdateChallengeInput {
    return UpdateChallengeInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput>, I>>(
    object: I
  ): UpdateChallengeInput {
    const message = createBaseUpdateChallengeInput();
    message.projectId = object.projectId ?? 0;
    message.name = object.name ?? undefined;
    message.projectStatusId = object.projectStatusId ?? undefined;
    message.prizeUpdate =
      object.prizeUpdate !== undefined && object.prizeUpdate !== null
        ? UpdateChallengeInput_PrizeUpdate.fromPartial(object.prizeUpdate)
        : undefined;
    message.phaseUpdate =
      object.phaseUpdate !== undefined && object.phaseUpdate !== null
        ? UpdateChallengeInput_PhaseUpdate.fromPartial(object.phaseUpdate)
        : undefined;
    message.groupUpdate =
      object.groupUpdate !== undefined && object.groupUpdate !== null
        ? UpdateChallengeInput_GroupUpdate.fromPartial(object.groupUpdate)
        : undefined;
    message.termUpdate =
      object.termUpdate !== undefined && object.termUpdate !== null
        ? UpdateChallengeInput_TermUpdate.fromPartial(object.termUpdate)
        : undefined;
    message.billingProject = object.billingProject ?? undefined;
    message.projectInfo = Object.entries(object.projectInfo ?? {}).reduce<{
      [key: number]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseUpdateChallengeInput_ProjectInfoEntry(): UpdateChallengeInput_ProjectInfoEntry {
  return { key: 0, value: "" };
}

export const UpdateChallengeInput_ProjectInfoEntry = {
  encode(
    message: UpdateChallengeInput_ProjectInfoEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).sint32(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput_ProjectInfoEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput_ProjectInfoEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.sint32();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput_ProjectInfoEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: UpdateChallengeInput_ProjectInfoEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput_ProjectInfoEntry>, I>>(
    base?: I
  ): UpdateChallengeInput_ProjectInfoEntry {
    return UpdateChallengeInput_ProjectInfoEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput_ProjectInfoEntry>, I>>(
    object: I
  ): UpdateChallengeInput_ProjectInfoEntry {
    const message = createBaseUpdateChallengeInput_ProjectInfoEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseUpdateChallengeInput_PrizeUpdate(): UpdateChallengeInput_PrizeUpdate {
  return { winnerPrizes: [] };
}

export const UpdateChallengeInput_PrizeUpdate = {
  encode(
    message: UpdateChallengeInput_PrizeUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.winnerPrizes) {
      Prize.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput_PrizeUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput_PrizeUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.winnerPrizes.push(Prize.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput_PrizeUpdate {
    return {
      winnerPrizes: Array.isArray(object?.winnerPrizes)
        ? object.winnerPrizes.map((e: any) => Prize.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UpdateChallengeInput_PrizeUpdate): unknown {
    const obj: any = {};
    if (message.winnerPrizes) {
      obj.winnerPrizes = message.winnerPrizes.map((e) => (e ? Prize.toJSON(e) : undefined));
    } else {
      obj.winnerPrizes = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput_PrizeUpdate>, I>>(
    base?: I
  ): UpdateChallengeInput_PrizeUpdate {
    return UpdateChallengeInput_PrizeUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput_PrizeUpdate>, I>>(
    object: I
  ): UpdateChallengeInput_PrizeUpdate {
    const message = createBaseUpdateChallengeInput_PrizeUpdate();
    message.winnerPrizes = object.winnerPrizes?.map((e) => Prize.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateChallengeInput_PhaseUpdate(): UpdateChallengeInput_PhaseUpdate {
  return { phases: [] };
}

export const UpdateChallengeInput_PhaseUpdate = {
  encode(
    message: UpdateChallengeInput_PhaseUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.phases) {
      Phase.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput_PhaseUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput_PhaseUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.phases.push(Phase.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput_PhaseUpdate {
    return {
      phases: Array.isArray(object?.phases) ? object.phases.map((e: any) => Phase.fromJSON(e)) : [],
    };
  },

  toJSON(message: UpdateChallengeInput_PhaseUpdate): unknown {
    const obj: any = {};
    if (message.phases) {
      obj.phases = message.phases.map((e) => (e ? Phase.toJSON(e) : undefined));
    } else {
      obj.phases = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput_PhaseUpdate>, I>>(
    base?: I
  ): UpdateChallengeInput_PhaseUpdate {
    return UpdateChallengeInput_PhaseUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput_PhaseUpdate>, I>>(
    object: I
  ): UpdateChallengeInput_PhaseUpdate {
    const message = createBaseUpdateChallengeInput_PhaseUpdate();
    message.phases = object.phases?.map((e) => Phase.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateChallengeInput_GroupUpdate(): UpdateChallengeInput_GroupUpdate {
  return { groups: [] };
}

export const UpdateChallengeInput_GroupUpdate = {
  encode(
    message: UpdateChallengeInput_GroupUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.groups) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput_GroupUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput_GroupUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groups.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput_GroupUpdate {
    return {
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: UpdateChallengeInput_GroupUpdate): unknown {
    const obj: any = {};
    if (message.groups) {
      obj.groups = message.groups.map((e) => e);
    } else {
      obj.groups = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput_GroupUpdate>, I>>(
    base?: I
  ): UpdateChallengeInput_GroupUpdate {
    return UpdateChallengeInput_GroupUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput_GroupUpdate>, I>>(
    object: I
  ): UpdateChallengeInput_GroupUpdate {
    const message = createBaseUpdateChallengeInput_GroupUpdate();
    message.groups = object.groups?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateChallengeInput_Term(): UpdateChallengeInput_Term {
  return { id: undefined, roleId: undefined };
}

export const UpdateChallengeInput_Term = {
  encode(message: UpdateChallengeInput_Term, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.roleId !== undefined) {
      writer.uint32(18).string(message.roleId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput_Term {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput_Term();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.roleId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput_Term {
    return {
      id: isSet(object.id) ? String(object.id) : undefined,
      roleId: isSet(object.roleId) ? String(object.roleId) : undefined,
    };
  },

  toJSON(message: UpdateChallengeInput_Term): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.roleId !== undefined && (obj.roleId = message.roleId);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput_Term>, I>>(
    base?: I
  ): UpdateChallengeInput_Term {
    return UpdateChallengeInput_Term.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput_Term>, I>>(
    object: I
  ): UpdateChallengeInput_Term {
    const message = createBaseUpdateChallengeInput_Term();
    message.id = object.id ?? undefined;
    message.roleId = object.roleId ?? undefined;
    return message;
  },
};

function createBaseUpdateChallengeInput_TermUpdate(): UpdateChallengeInput_TermUpdate {
  return { terms: [] };
}

export const UpdateChallengeInput_TermUpdate = {
  encode(
    message: UpdateChallengeInput_TermUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.terms) {
      UpdateChallengeInput_Term.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChallengeInput_TermUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChallengeInput_TermUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.terms.push(UpdateChallengeInput_Term.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChallengeInput_TermUpdate {
    return {
      terms: Array.isArray(object?.terms)
        ? object.terms.map((e: any) => UpdateChallengeInput_Term.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UpdateChallengeInput_TermUpdate): unknown {
    const obj: any = {};
    if (message.terms) {
      obj.terms = message.terms.map((e) => (e ? UpdateChallengeInput_Term.toJSON(e) : undefined));
    } else {
      obj.terms = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput_TermUpdate>, I>>(
    base?: I
  ): UpdateChallengeInput_TermUpdate {
    return UpdateChallengeInput_TermUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput_TermUpdate>, I>>(
    object: I
  ): UpdateChallengeInput_TermUpdate {
    const message = createBaseUpdateChallengeInput_TermUpdate();
    message.terms = object.terms?.map((e) => UpdateChallengeInput_Term.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCloseChallengeInput(): CloseChallengeInput {
  return { projectId: 0, winnerId: 0 };
}

export const CloseChallengeInput = {
  encode(message: CloseChallengeInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.winnerId !== 0) {
      writer.uint32(16).int32(message.winnerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CloseChallengeInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloseChallengeInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.int32();
          break;
        case 2:
          message.winnerId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CloseChallengeInput {
    return {
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      winnerId: isSet(object.winnerId) ? Number(object.winnerId) : 0,
    };
  },

  toJSON(message: CloseChallengeInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.winnerId !== undefined && (obj.winnerId = Math.round(message.winnerId));
    return obj;
  },

  create<I extends Exact<DeepPartial<CloseChallengeInput>, I>>(base?: I): CloseChallengeInput {
    return CloseChallengeInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CloseChallengeInput>, I>>(
    object: I
  ): CloseChallengeInput {
    const message = createBaseCloseChallengeInput();
    message.projectId = object.projectId ?? 0;
    message.winnerId = object.winnerId ?? 0;
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
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
