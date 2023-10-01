/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Contest {
  contestId: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  languageId: number;
  groupId: number;
  regionCode: string;
  adText: string;
  adStart: string;
  adEnd: string;
  adTask: string;
  adCommand: string;
  activateMenu: number;
  seasonId: number;
}

function createBaseContest(): Contest {
  return {
    contestId: 0,
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    languageId: 0,
    groupId: 0,
    regionCode: "",
    adText: "",
    adStart: "",
    adEnd: "",
    adTask: "",
    adCommand: "",
    activateMenu: 0,
    seasonId: 0,
  };
}

export const Contest = {
  encode(message: Contest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contestId !== 0) {
      writer.uint32(8).int32(message.contestId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.startDate !== "") {
      writer.uint32(26).string(message.startDate);
    }
    if (message.endDate !== "") {
      writer.uint32(34).string(message.endDate);
    }
    if (message.status !== "") {
      writer.uint32(42).string(message.status);
    }
    if (message.languageId !== 0) {
      writer.uint32(48).int32(message.languageId);
    }
    if (message.groupId !== 0) {
      writer.uint32(56).int32(message.groupId);
    }
    if (message.regionCode !== "") {
      writer.uint32(66).string(message.regionCode);
    }
    if (message.adText !== "") {
      writer.uint32(74).string(message.adText);
    }
    if (message.adStart !== "") {
      writer.uint32(82).string(message.adStart);
    }
    if (message.adEnd !== "") {
      writer.uint32(90).string(message.adEnd);
    }
    if (message.adTask !== "") {
      writer.uint32(98).string(message.adTask);
    }
    if (message.adCommand !== "") {
      writer.uint32(106).string(message.adCommand);
    }
    if (message.activateMenu !== 0) {
      writer.uint32(112).int32(message.activateMenu);
    }
    if (message.seasonId !== 0) {
      writer.uint32(120).int32(message.seasonId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.contestId = reader.int32();
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

          message.startDate = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.endDate = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.status = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.languageId = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.groupId = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.regionCode = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.adText = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.adStart = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.adEnd = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.adTask = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.adCommand = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.activateMenu = reader.int32();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.seasonId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Contest {
    return {
      contestId: isSet(object.contestId) ? Number(object.contestId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      startDate: isSet(object.startDate) ? String(object.startDate) : "",
      endDate: isSet(object.endDate) ? String(object.endDate) : "",
      status: isSet(object.status) ? String(object.status) : "",
      languageId: isSet(object.languageId) ? Number(object.languageId) : 0,
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      regionCode: isSet(object.regionCode) ? String(object.regionCode) : "",
      adText: isSet(object.adText) ? String(object.adText) : "",
      adStart: isSet(object.adStart) ? String(object.adStart) : "",
      adEnd: isSet(object.adEnd) ? String(object.adEnd) : "",
      adTask: isSet(object.adTask) ? String(object.adTask) : "",
      adCommand: isSet(object.adCommand) ? String(object.adCommand) : "",
      activateMenu: isSet(object.activateMenu) ? Number(object.activateMenu) : 0,
      seasonId: isSet(object.seasonId) ? Number(object.seasonId) : 0,
    };
  },

  toJSON(message: Contest): unknown {
    const obj: any = {};
    if (message.contestId !== 0) {
      obj.contestId = Math.round(message.contestId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.startDate !== "") {
      obj.startDate = message.startDate;
    }
    if (message.endDate !== "") {
      obj.endDate = message.endDate;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.languageId !== 0) {
      obj.languageId = Math.round(message.languageId);
    }
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.regionCode !== "") {
      obj.regionCode = message.regionCode;
    }
    if (message.adText !== "") {
      obj.adText = message.adText;
    }
    if (message.adStart !== "") {
      obj.adStart = message.adStart;
    }
    if (message.adEnd !== "") {
      obj.adEnd = message.adEnd;
    }
    if (message.adTask !== "") {
      obj.adTask = message.adTask;
    }
    if (message.adCommand !== "") {
      obj.adCommand = message.adCommand;
    }
    if (message.activateMenu !== 0) {
      obj.activateMenu = Math.round(message.activateMenu);
    }
    if (message.seasonId !== 0) {
      obj.seasonId = Math.round(message.seasonId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Contest>, I>>(base?: I): Contest {
    return Contest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Contest>, I>>(object: I): Contest {
    const message = createBaseContest();
    message.contestId = object.contestId ?? 0;
    message.name = object.name ?? "";
    message.startDate = object.startDate ?? "";
    message.endDate = object.endDate ?? "";
    message.status = object.status ?? "";
    message.languageId = object.languageId ?? 0;
    message.groupId = object.groupId ?? 0;
    message.regionCode = object.regionCode ?? "";
    message.adText = object.adText ?? "";
    message.adStart = object.adStart ?? "";
    message.adEnd = object.adEnd ?? "";
    message.adTask = object.adTask ?? "";
    message.adCommand = object.adCommand ?? "";
    message.activateMenu = object.activateMenu ?? 0;
    message.seasonId = object.seasonId ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
