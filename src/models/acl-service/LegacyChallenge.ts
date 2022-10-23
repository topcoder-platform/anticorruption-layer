/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import {
  LegacyChallengeId,
  LegacyChallengeInfoRequest,
  LegacyChallengeInfoTypeList,
  LegacyChallengeList,
  LegacyChallengePhaseList,
} from "../acl-domain/LegacyChallenge";
import { LookupCriteria } from "../common/Common";

export interface CheckChallengeExistsResponse {
  exists: boolean;
}

export interface RequestResponse {
  success: boolean;
}

export interface ChallengeInfoTypeFilterCriteria {
}

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

  fromPartial<I extends Exact<DeepPartial<CheckChallengeExistsResponse>, I>>(object: I): CheckChallengeExistsResponse {
    const message = createBaseCheckChallengeExistsResponse();
    message.exists = object.exists ?? false;
    return message;
  },
};

function createBaseRequestResponse(): RequestResponse {
  return { success: false };
}

export const RequestResponse = {
  encode(message: RequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: RequestResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestResponse>, I>>(object: I): RequestResponse {
    const message = createBaseRequestResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseChallengeInfoTypeFilterCriteria(): ChallengeInfoTypeFilterCriteria {
  return {};
}

export const ChallengeInfoTypeFilterCriteria = {
  encode(_: ChallengeInfoTypeFilterCriteria, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChallengeInfoTypeFilterCriteria {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChallengeInfoTypeFilterCriteria();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ChallengeInfoTypeFilterCriteria {
    return {};
  },

  toJSON(_: ChallengeInfoTypeFilterCriteria): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChallengeInfoTypeFilterCriteria>, I>>(_: I): ChallengeInfoTypeFilterCriteria {
    const message = createBaseChallengeInfoTypeFilterCriteria();
    return message;
  },
};

export type LegacyChallengeService = typeof LegacyChallengeService;
export const LegacyChallengeService = {
  /** project */
  lookup: {
    path: "/topcoder.domain.acl.legacy_challenge_service.LegacyChallenge/Lookup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: LegacyChallengeList) => Buffer.from(LegacyChallengeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallengeList.decode(value),
  },
  checkChallengeExists: {
    path: "/topcoder.domain.acl.legacy_challenge_service.LegacyChallenge/CheckChallengeExists",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacyChallengeId) => Buffer.from(LegacyChallengeId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacyChallengeId.decode(value),
    responseSerialize: (value: CheckChallengeExistsResponse) =>
      Buffer.from(CheckChallengeExistsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CheckChallengeExistsResponse.decode(value),
  },
  /** project_info */
  addOrUpdateChallengeInfo: {
    path: "/topcoder.domain.acl.legacy_challenge_service.LegacyChallenge/AddOrUpdateChallengeInfo",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacyChallengeInfoRequest) =>
      Buffer.from(LegacyChallengeInfoRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacyChallengeInfoRequest.decode(value),
    responseSerialize: (value: RequestResponse) => Buffer.from(RequestResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RequestResponse.decode(value),
  },
  listAvailableChallengeInfoTypes: {
    path: "/topcoder.domain.acl.legacy_challenge_service.LegacyChallenge/ListAvailableChallengeInfoTypes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ChallengeInfoTypeFilterCriteria) =>
      Buffer.from(ChallengeInfoTypeFilterCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ChallengeInfoTypeFilterCriteria.decode(value),
    responseSerialize: (value: LegacyChallengeInfoTypeList) =>
      Buffer.from(LegacyChallengeInfoTypeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallengeInfoTypeList.decode(value),
  },
  /** project_phase */
  listChallengePhases: {
    path: "/topcoder.domain.acl.legacy_challenge_service.LegacyChallenge/ListChallengePhases",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacyChallengeId) => Buffer.from(LegacyChallengeId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacyChallengeId.decode(value),
    responseSerialize: (value: LegacyChallengePhaseList) =>
      Buffer.from(LegacyChallengePhaseList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallengePhaseList.decode(value),
  },
} as const;

export interface LegacyChallengeServer extends UntypedServiceImplementation {
  /** project */
  lookup: handleUnaryCall<LookupCriteria, LegacyChallengeList>;
  checkChallengeExists: handleUnaryCall<LegacyChallengeId, CheckChallengeExistsResponse>;
  /** project_info */
  addOrUpdateChallengeInfo: handleUnaryCall<LegacyChallengeInfoRequest, RequestResponse>;
  listAvailableChallengeInfoTypes: handleUnaryCall<ChallengeInfoTypeFilterCriteria, LegacyChallengeInfoTypeList>;
  /** project_phase */
  listChallengePhases: handleUnaryCall<LegacyChallengeId, LegacyChallengePhaseList>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
