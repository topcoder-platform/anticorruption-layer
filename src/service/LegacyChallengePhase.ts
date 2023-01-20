import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import { PhaseTypeList } from "../models/domain-layer/legacy/legacy_challenge_phase";

import {
  CreatePhaseInput,
  CreateResult,
  LegacyChallengePhaseServer,
  LegacyChallengePhaseService,
} from "../models/domain-layer/legacy/services/legacy_challenge_phase";

import LegacyChallengePhaseDomain from "../domain/LegacyChallengePhase";

import { Empty } from "../models/google/protobuf/empty";

class LegacyChallengePhaseServerImpl implements LegacyChallengePhaseServer {
  [name: string]: UntypedHandleCall;

  create: handleUnaryCall<CreatePhaseInput, CreateResult> = async (
    call: ServerUnaryCall<CreatePhaseInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    const createPhaseResult = await LegacyChallengePhaseDomain.create(call.request);
    callback(null, createPhaseResult);
  };

  getPhaseTypes: handleUnaryCall<Empty, PhaseTypeList> = async (
    _call: ServerUnaryCall<Empty, PhaseTypeList>,
    callback: sendUnaryData<PhaseTypeList>
  ) => {
    const phaseTypes = await LegacyChallengePhaseDomain.getPhaseTypes();
    callback(null, phaseTypes);
  };
}

export {
  LegacyChallengePhaseServerImpl as LegacyChallengePhaseServer,
  LegacyChallengePhaseService,
};
