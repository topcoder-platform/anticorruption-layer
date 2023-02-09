/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface LegacyChallenge {
  projectId: number;
  projectStatusId: number;
  projectCategoryId: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
  tcDirectProjectId: number;
}

export interface LegacyChallengeId {
  legacyChallengeId: number;
}

export interface LegacyChallengeList {
  legacyChallenges: LegacyChallenge[];
}

export interface CheckChallengeExistsResponse {
  exists: boolean;
}

export interface UpdateChallengeInput {
  projectId: number;
  projectStatusId: number;
  modifyUser: number;
}

export interface CloseChallengeInput {
  projectId: number;
  winnerId: number;
  modifyUser: number;
}

export interface CreateChallengeInput {
  name: string;
  projectStatusId: number;
  projectCategoryId: number;
  tcDirectProjectId: number;
  winnerPrizes: number[];
  copilotCost: number;
  reviewType?: string | undefined;
  reviewCost?: number | undefined;
  timelineNotification: boolean;
  statusNotification: boolean;
  rated: boolean;
  confidentialityType: string;
  billingProject: number;
  reliabilityBonusCost?: number | undefined;
  checkpointBonusCost?: number | undefined;
  projectInfo: { [key: string]: string };
}

export interface CreateChallengeInput_ProjectInfoEntry {
  key: string;
  value: string;
}

function createBaseLegacyChallenge(): LegacyChallenge {
  return {
    projectId: 0,
    projectStatusId: 0,
    projectCategoryId: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
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
    if (message.createDate !== 0) {
      writer.uint32(40).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(48).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(56).int64(message.modifyDate);
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
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.modifyUser = reader.int32();
          break;
        case 7:
          message.modifyDate = longToNumber(reader.int64() as Long);
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
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
      tcDirectProjectId: isSet(object.tcDirectProjectId) ? Number(object.tcDirectProjectId) : 0,
    };
  },

  toJSON(message: LegacyChallenge): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.projectStatusId !== undefined && (obj.projectStatusId = Math.round(message.projectStatusId));
    message.projectCategoryId !== undefined && (obj.projectCategoryId = Math.round(message.projectCategoryId));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    message.tcDirectProjectId !== undefined && (obj.tcDirectProjectId = Math.round(message.tcDirectProjectId));
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
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
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
    return { legacyChallengeId: isSet(object.legacyChallengeId) ? Number(object.legacyChallengeId) : 0 };
  },

  toJSON(message: LegacyChallengeId): unknown {
    const obj: any = {};
    message.legacyChallengeId !== undefined && (obj.legacyChallengeId = Math.round(message.legacyChallengeId));
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
      obj.legacyChallenges = message.legacyChallenges.map((e) => e ? LegacyChallenge.toJSON(e) : undefined);
    } else {
      obj.legacyChallenges = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegacyChallengeList>, I>>(base?: I): LegacyChallengeList {
    return LegacyChallengeList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LegacyChallengeList>, I>>(object: I): LegacyChallengeList {
    const message = createBaseLegacyChallengeList();
    message.legacyChallenges = object.legacyChallenges?.map((e) => LegacyChallenge.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCheckChallengeExistsResponse(): CheckChallengeExistsResponse {
  return { exists: false };
}

export const CheckChallengeExistsResponse = {
  encode(message: CheckChallengeExistsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exists === true) {
      writer.uint32(8).bool(message.exists);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckChallengeExistsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckChallengeExistsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exists = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CheckChallengeExistsResponse {
    return { exists: isSet(object.exists) ? Boolean(object.exists) : false };
  },

  toJSON(message: CheckChallengeExistsResponse): unknown {
    const obj: any = {};
    message.exists !== undefined && (obj.exists = message.exists);
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckChallengeExistsResponse>, I>>(base?: I): CheckChallengeExistsResponse {
    return CheckChallengeExistsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CheckChallengeExistsResponse>, I>>(object: I): CheckChallengeExistsResponse {
    const message = createBaseCheckChallengeExistsResponse();
    message.exists = object.exists ?? false;
    return message;
  },
};

function createBaseUpdateChallengeInput(): UpdateChallengeInput {
  return { projectId: 0, projectStatusId: 0, modifyUser: 0 };
}

export const UpdateChallengeInput = {
  encode(message: UpdateChallengeInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectStatusId !== 0) {
      writer.uint32(16).int32(message.projectStatusId);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(24).int32(message.modifyUser);
    }
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
          message.projectStatusId = reader.int32();
          break;
        case 3:
          message.modifyUser = reader.int32();
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
      projectStatusId: isSet(object.projectStatusId) ? Number(object.projectStatusId) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
    };
  },

  toJSON(message: UpdateChallengeInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.projectStatusId !== undefined && (obj.projectStatusId = Math.round(message.projectStatusId));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChallengeInput>, I>>(base?: I): UpdateChallengeInput {
    return UpdateChallengeInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChallengeInput>, I>>(object: I): UpdateChallengeInput {
    const message = createBaseUpdateChallengeInput();
    message.projectId = object.projectId ?? 0;
    message.projectStatusId = object.projectStatusId ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    return message;
  },
};

function createBaseCloseChallengeInput(): CloseChallengeInput {
  return { projectId: 0, winnerId: 0, modifyUser: 0 };
}

export const CloseChallengeInput = {
  encode(message: CloseChallengeInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.winnerId !== 0) {
      writer.uint32(16).int32(message.winnerId);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(24).int32(message.modifyUser);
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
        case 3:
          message.modifyUser = reader.int32();
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
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
    };
  },

  toJSON(message: CloseChallengeInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.winnerId !== undefined && (obj.winnerId = Math.round(message.winnerId));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    return obj;
  },

  create<I extends Exact<DeepPartial<CloseChallengeInput>, I>>(base?: I): CloseChallengeInput {
    return CloseChallengeInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CloseChallengeInput>, I>>(object: I): CloseChallengeInput {
    const message = createBaseCloseChallengeInput();
    message.projectId = object.projectId ?? 0;
    message.winnerId = object.winnerId ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    return message;
  },
};

function createBaseCreateChallengeInput(): CreateChallengeInput {
  return {
    name: "",
    projectStatusId: 0,
    projectCategoryId: 0,
    tcDirectProjectId: 0,
    winnerPrizes: [],
    copilotCost: 0,
    reviewType: undefined,
    reviewCost: undefined,
    timelineNotification: false,
    statusNotification: false,
    rated: false,
    confidentialityType: "",
    billingProject: 0,
    reliabilityBonusCost: undefined,
    checkpointBonusCost: undefined,
    projectInfo: {},
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
    if (message.tcDirectProjectId !== 0) {
      writer.uint32(32).int64(message.tcDirectProjectId);
    }
    writer.uint32(42).fork();
    for (const v of message.winnerPrizes) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.copilotCost !== 0) {
      writer.uint32(53).float(message.copilotCost);
    }
    if (message.reviewType !== undefined) {
      writer.uint32(58).string(message.reviewType);
    }
    if (message.reviewCost !== undefined) {
      writer.uint32(69).float(message.reviewCost);
    }
    if (message.timelineNotification === true) {
      writer.uint32(72).bool(message.timelineNotification);
    }
    if (message.statusNotification === true) {
      writer.uint32(80).bool(message.statusNotification);
    }
    if (message.rated === true) {
      writer.uint32(88).bool(message.rated);
    }
    if (message.confidentialityType !== "") {
      writer.uint32(98).string(message.confidentialityType);
    }
    if (message.billingProject !== 0) {
      writer.uint32(104).int32(message.billingProject);
    }
    if (message.reliabilityBonusCost !== undefined) {
      writer.uint32(117).float(message.reliabilityBonusCost);
    }
    if (message.checkpointBonusCost !== undefined) {
      writer.uint32(125).float(message.checkpointBonusCost);
    }
    Object.entries(message.projectInfo).forEach(([key, value]) => {
      CreateChallengeInput_ProjectInfoEntry.encode({ key: key as any, value }, writer.uint32(130).fork()).ldelim();
    });
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
          message.tcDirectProjectId = longToNumber(reader.int64() as Long);
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.winnerPrizes.push(reader.float());
            }
          } else {
            message.winnerPrizes.push(reader.float());
          }
          break;
        case 6:
          message.copilotCost = reader.float();
          break;
        case 7:
          message.reviewType = reader.string();
          break;
        case 8:
          message.reviewCost = reader.float();
          break;
        case 9:
          message.timelineNotification = reader.bool();
          break;
        case 10:
          message.statusNotification = reader.bool();
          break;
        case 11:
          message.rated = reader.bool();
          break;
        case 12:
          message.confidentialityType = reader.string();
          break;
        case 13:
          message.billingProject = reader.int32();
          break;
        case 14:
          message.reliabilityBonusCost = reader.float();
          break;
        case 15:
          message.checkpointBonusCost = reader.float();
          break;
        case 16:
          const entry16 = CreateChallengeInput_ProjectInfoEntry.decode(reader, reader.uint32());
          if (entry16.value !== undefined) {
            message.projectInfo[entry16.key] = entry16.value;
          }
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
      tcDirectProjectId: isSet(object.tcDirectProjectId) ? Number(object.tcDirectProjectId) : 0,
      winnerPrizes: Array.isArray(object?.winnerPrizes) ? object.winnerPrizes.map((e: any) => Number(e)) : [],
      copilotCost: isSet(object.copilotCost) ? Number(object.copilotCost) : 0,
      reviewType: isSet(object.reviewType) ? String(object.reviewType) : undefined,
      reviewCost: isSet(object.reviewCost) ? Number(object.reviewCost) : undefined,
      timelineNotification: isSet(object.timelineNotification) ? Boolean(object.timelineNotification) : false,
      statusNotification: isSet(object.statusNotification) ? Boolean(object.statusNotification) : false,
      rated: isSet(object.rated) ? Boolean(object.rated) : false,
      confidentialityType: isSet(object.confidentialityType) ? String(object.confidentialityType) : "",
      billingProject: isSet(object.billingProject) ? Number(object.billingProject) : 0,
      reliabilityBonusCost: isSet(object.reliabilityBonusCost) ? Number(object.reliabilityBonusCost) : undefined,
      checkpointBonusCost: isSet(object.checkpointBonusCost) ? Number(object.checkpointBonusCost) : undefined,
      projectInfo: isObject(object.projectInfo)
        ? Object.entries(object.projectInfo).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: CreateChallengeInput): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.projectStatusId !== undefined && (obj.projectStatusId = Math.round(message.projectStatusId));
    message.projectCategoryId !== undefined && (obj.projectCategoryId = Math.round(message.projectCategoryId));
    message.tcDirectProjectId !== undefined && (obj.tcDirectProjectId = Math.round(message.tcDirectProjectId));
    if (message.winnerPrizes) {
      obj.winnerPrizes = message.winnerPrizes.map((e) => e);
    } else {
      obj.winnerPrizes = [];
    }
    message.copilotCost !== undefined && (obj.copilotCost = message.copilotCost);
    message.reviewType !== undefined && (obj.reviewType = message.reviewType);
    message.reviewCost !== undefined && (obj.reviewCost = message.reviewCost);
    message.timelineNotification !== undefined && (obj.timelineNotification = message.timelineNotification);
    message.statusNotification !== undefined && (obj.statusNotification = message.statusNotification);
    message.rated !== undefined && (obj.rated = message.rated);
    message.confidentialityType !== undefined && (obj.confidentialityType = message.confidentialityType);
    message.billingProject !== undefined && (obj.billingProject = Math.round(message.billingProject));
    message.reliabilityBonusCost !== undefined && (obj.reliabilityBonusCost = message.reliabilityBonusCost);
    message.checkpointBonusCost !== undefined && (obj.checkpointBonusCost = message.checkpointBonusCost);
    obj.projectInfo = {};
    if (message.projectInfo) {
      Object.entries(message.projectInfo).forEach(([k, v]) => {
        obj.projectInfo[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChallengeInput>, I>>(base?: I): CreateChallengeInput {
    return CreateChallengeInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateChallengeInput>, I>>(object: I): CreateChallengeInput {
    const message = createBaseCreateChallengeInput();
    message.name = object.name ?? "";
    message.projectStatusId = object.projectStatusId ?? 0;
    message.projectCategoryId = object.projectCategoryId ?? 0;
    message.tcDirectProjectId = object.tcDirectProjectId ?? 0;
    message.winnerPrizes = object.winnerPrizes?.map((e) => e) || [];
    message.copilotCost = object.copilotCost ?? 0;
    message.reviewType = object.reviewType ?? undefined;
    message.reviewCost = object.reviewCost ?? undefined;
    message.timelineNotification = object.timelineNotification ?? false;
    message.statusNotification = object.statusNotification ?? false;
    message.rated = object.rated ?? false;
    message.confidentialityType = object.confidentialityType ?? "";
    message.billingProject = object.billingProject ?? 0;
    message.reliabilityBonusCost = object.reliabilityBonusCost ?? undefined;
    message.checkpointBonusCost = object.checkpointBonusCost ?? undefined;
    message.projectInfo = Object.entries(object.projectInfo ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseCreateChallengeInput_ProjectInfoEntry(): CreateChallengeInput_ProjectInfoEntry {
  return { key: "", value: "" };
}

export const CreateChallengeInput_ProjectInfoEntry = {
  encode(message: CreateChallengeInput_ProjectInfoEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
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
          message.key = reader.string();
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
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CreateChallengeInput_ProjectInfoEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChallengeInput_ProjectInfoEntry>, I>>(
    base?: I,
  ): CreateChallengeInput_ProjectInfoEntry {
    return CreateChallengeInput_ProjectInfoEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateChallengeInput_ProjectInfoEntry>, I>>(
    object: I,
  ): CreateChallengeInput_ProjectInfoEntry {
    const message = createBaseCreateChallengeInput_ProjectInfoEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
