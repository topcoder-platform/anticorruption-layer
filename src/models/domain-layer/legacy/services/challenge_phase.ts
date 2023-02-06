/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import { CreatePhaseInput, PhaseTypeList } from "../challenge_phase";

export type LegacyChallengePhaseService = typeof LegacyChallengePhaseService;
export const LegacyChallengePhaseService = {
  create: {
    path: "/topcoder.domain.challenge_phase_service.LegacyChallengePhase/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePhaseInput) => Buffer.from(CreatePhaseInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePhaseInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  getPhaseTypes: {
    path: "/topcoder.domain.challenge_phase_service.LegacyChallengePhase/GetPhaseTypes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: PhaseTypeList) => Buffer.from(PhaseTypeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PhaseTypeList.decode(value),
  },
} as const;

export interface LegacyChallengePhaseServer extends UntypedServiceImplementation {
  create: handleUnaryCall<CreatePhaseInput, CreateResult>;
  getPhaseTypes: handleUnaryCall<Empty, PhaseTypeList>;
}
