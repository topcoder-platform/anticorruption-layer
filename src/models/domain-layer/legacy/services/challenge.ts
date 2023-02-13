/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, LookupCriteria } from "@topcoder-framework/lib-common";
import {
  CheckExistsResponse,
  CloseChallengeInput,
  CreateChallengeInput,
  LegacyChallenge,
  LegacyChallengeId,
  LegacyChallengeList,
  UpdateChallengeInput,
} from "../challenge";

export type LegacyChallengeService = typeof LegacyChallengeService;
export const LegacyChallengeService = {
  checkExists: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/CheckExists",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacyChallengeId) => Buffer.from(LegacyChallengeId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacyChallengeId.decode(value),
    responseSerialize: (value: CheckExistsResponse) => Buffer.from(CheckExistsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CheckExistsResponse.decode(value),
  },
  lookup: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/Lookup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: LegacyChallengeList) => Buffer.from(LegacyChallengeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallengeList.decode(value),
  },
  create: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateChallengeInput) => Buffer.from(CreateChallengeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateChallengeInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  update: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/Update",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateChallengeInput) => Buffer.from(UpdateChallengeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateChallengeInput.decode(value),
    responseSerialize: (value: LegacyChallenge) => Buffer.from(LegacyChallenge.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallenge.decode(value),
  },
  get: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/Get",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacyChallengeId) => Buffer.from(LegacyChallengeId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacyChallengeId.decode(value),
    responseSerialize: (value: LegacyChallenge) => Buffer.from(LegacyChallenge.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallenge.decode(value),
  },
  activate: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/Activate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacyChallengeId) => Buffer.from(LegacyChallengeId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacyChallengeId.decode(value),
    responseSerialize: (value: LegacyChallenge) => Buffer.from(LegacyChallenge.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallenge.decode(value),
  },
  close: {
    path: "/topcoder.domain.legacy_challenge_service.LegacyChallenge/Close",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CloseChallengeInput) => Buffer.from(CloseChallengeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CloseChallengeInput.decode(value),
    responseSerialize: (value: LegacyChallenge) => Buffer.from(LegacyChallenge.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacyChallenge.decode(value),
  },
} as const;

export interface LegacyChallengeServer extends UntypedServiceImplementation {
  checkExists: handleUnaryCall<LegacyChallengeId, CheckExistsResponse>;
  lookup: handleUnaryCall<LookupCriteria, LegacyChallengeList>;
  create: handleUnaryCall<CreateChallengeInput, CreateResult>;
  update: handleUnaryCall<UpdateChallengeInput, LegacyChallenge>;
  get: handleUnaryCall<LegacyChallengeId, LegacyChallenge>;
  activate: handleUnaryCall<LegacyChallengeId, LegacyChallenge>;
  close: handleUnaryCall<CloseChallengeInput, LegacyChallenge>;
}
