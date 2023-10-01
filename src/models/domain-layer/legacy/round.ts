/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Round {
  roundId: number;
  contestId: number;
  name: string;
  status: string;
  ranRatings: boolean;
  paidMoney: boolean;
  registrationLimit: number;
  notes: string;
  invitational: number;
  roundTypeId: number;
  link: string;
  shortName: string;
  forumId: number;
  ratedInd: boolean;
  regionId: number;
  tcDirectProjectId: number;
  autoEnd: boolean;
  editorialLink: string;
  creatorId: number;
}

function createBaseRound(): Round {
  return {
    roundId: 0,
    contestId: 0,
    name: "",
    status: "",
    ranRatings: false,
    paidMoney: false,
    registrationLimit: 0,
    notes: "",
    invitational: 0,
    roundTypeId: 0,
    link: "",
    shortName: "",
    forumId: 0,
    ratedInd: false,
    regionId: 0,
    tcDirectProjectId: 0,
    autoEnd: false,
    editorialLink: "",
    creatorId: 0,
  };
}

export const Round = {
  encode(message: Round, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roundId !== 0) {
      writer.uint32(8).int32(message.roundId);
    }
    if (message.contestId !== 0) {
      writer.uint32(16).int32(message.contestId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    if (message.ranRatings === true) {
      writer.uint32(40).bool(message.ranRatings);
    }
    if (message.paidMoney === true) {
      writer.uint32(48).bool(message.paidMoney);
    }
    if (message.registrationLimit !== 0) {
      writer.uint32(56).int32(message.registrationLimit);
    }
    if (message.notes !== "") {
      writer.uint32(66).string(message.notes);
    }
    if (message.invitational !== 0) {
      writer.uint32(72).int32(message.invitational);
    }
    if (message.roundTypeId !== 0) {
      writer.uint32(80).int32(message.roundTypeId);
    }
    if (message.link !== "") {
      writer.uint32(90).string(message.link);
    }
    if (message.shortName !== "") {
      writer.uint32(98).string(message.shortName);
    }
    if (message.forumId !== 0) {
      writer.uint32(104).int32(message.forumId);
    }
    if (message.ratedInd === true) {
      writer.uint32(112).bool(message.ratedInd);
    }
    if (message.regionId !== 0) {
      writer.uint32(120).int32(message.regionId);
    }
    if (message.tcDirectProjectId !== 0) {
      writer.uint32(128).int64(message.tcDirectProjectId);
    }
    if (message.autoEnd === true) {
      writer.uint32(136).bool(message.autoEnd);
    }
    if (message.editorialLink !== "") {
      writer.uint32(146).string(message.editorialLink);
    }
    if (message.creatorId !== 0) {
      writer.uint32(152).int32(message.creatorId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Round {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRound();
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

          message.contestId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.status = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.ranRatings = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.paidMoney = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.registrationLimit = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.notes = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.invitational = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.roundTypeId = reader.int32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.link = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.shortName = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.forumId = reader.int32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.ratedInd = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.regionId = reader.int32();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.tcDirectProjectId = longToNumber(reader.int64() as Long);
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.autoEnd = reader.bool();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.editorialLink = reader.string();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.creatorId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Round {
    return {
      roundId: isSet(object.roundId) ? Number(object.roundId) : 0,
      contestId: isSet(object.contestId) ? Number(object.contestId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      status: isSet(object.status) ? String(object.status) : "",
      ranRatings: isSet(object.ranRatings) ? Boolean(object.ranRatings) : false,
      paidMoney: isSet(object.paidMoney) ? Boolean(object.paidMoney) : false,
      registrationLimit: isSet(object.registrationLimit) ? Number(object.registrationLimit) : 0,
      notes: isSet(object.notes) ? String(object.notes) : "",
      invitational: isSet(object.invitational) ? Number(object.invitational) : 0,
      roundTypeId: isSet(object.roundTypeId) ? Number(object.roundTypeId) : 0,
      link: isSet(object.link) ? String(object.link) : "",
      shortName: isSet(object.shortName) ? String(object.shortName) : "",
      forumId: isSet(object.forumId) ? Number(object.forumId) : 0,
      ratedInd: isSet(object.ratedInd) ? Boolean(object.ratedInd) : false,
      regionId: isSet(object.regionId) ? Number(object.regionId) : 0,
      tcDirectProjectId: isSet(object.tcDirectProjectId) ? Number(object.tcDirectProjectId) : 0,
      autoEnd: isSet(object.autoEnd) ? Boolean(object.autoEnd) : false,
      editorialLink: isSet(object.editorialLink) ? String(object.editorialLink) : "",
      creatorId: isSet(object.creatorId) ? Number(object.creatorId) : 0,
    };
  },

  toJSON(message: Round): unknown {
    const obj: any = {};
    if (message.roundId !== 0) {
      obj.roundId = Math.round(message.roundId);
    }
    if (message.contestId !== 0) {
      obj.contestId = Math.round(message.contestId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.ranRatings === true) {
      obj.ranRatings = message.ranRatings;
    }
    if (message.paidMoney === true) {
      obj.paidMoney = message.paidMoney;
    }
    if (message.registrationLimit !== 0) {
      obj.registrationLimit = Math.round(message.registrationLimit);
    }
    if (message.notes !== "") {
      obj.notes = message.notes;
    }
    if (message.invitational !== 0) {
      obj.invitational = Math.round(message.invitational);
    }
    if (message.roundTypeId !== 0) {
      obj.roundTypeId = Math.round(message.roundTypeId);
    }
    if (message.link !== "") {
      obj.link = message.link;
    }
    if (message.shortName !== "") {
      obj.shortName = message.shortName;
    }
    if (message.forumId !== 0) {
      obj.forumId = Math.round(message.forumId);
    }
    if (message.ratedInd === true) {
      obj.ratedInd = message.ratedInd;
    }
    if (message.regionId !== 0) {
      obj.regionId = Math.round(message.regionId);
    }
    if (message.tcDirectProjectId !== 0) {
      obj.tcDirectProjectId = Math.round(message.tcDirectProjectId);
    }
    if (message.autoEnd === true) {
      obj.autoEnd = message.autoEnd;
    }
    if (message.editorialLink !== "") {
      obj.editorialLink = message.editorialLink;
    }
    if (message.creatorId !== 0) {
      obj.creatorId = Math.round(message.creatorId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Round>, I>>(base?: I): Round {
    return Round.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Round>, I>>(object: I): Round {
    const message = createBaseRound();
    message.roundId = object.roundId ?? 0;
    message.contestId = object.contestId ?? 0;
    message.name = object.name ?? "";
    message.status = object.status ?? "";
    message.ranRatings = object.ranRatings ?? false;
    message.paidMoney = object.paidMoney ?? false;
    message.registrationLimit = object.registrationLimit ?? 0;
    message.notes = object.notes ?? "";
    message.invitational = object.invitational ?? 0;
    message.roundTypeId = object.roundTypeId ?? 0;
    message.link = object.link ?? "";
    message.shortName = object.shortName ?? "";
    message.forumId = object.forumId ?? 0;
    message.ratedInd = object.ratedInd ?? false;
    message.regionId = object.regionId ?? 0;
    message.tcDirectProjectId = object.tcDirectProjectId ?? 0;
    message.autoEnd = object.autoEnd ?? false;
    message.editorialLink = object.editorialLink ?? "";
    message.creatorId = object.creatorId ?? 0;
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
