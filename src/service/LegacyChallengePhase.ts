import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import { CreatePhaseInput, PhaseTypeList } from "../models/domain-layer/legacy/challenge_phase";

import {
  LegacyChallengePhaseServer,
  LegacyChallengePhaseService,
} from "../models/domain-layer/legacy/services/challenge_phase";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyChallengePhaseDomain from "../domain/LegacyChallengePhase";

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
    call: ServerUnaryCall<Empty, PhaseTypeList>,
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
