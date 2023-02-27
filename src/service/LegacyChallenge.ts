import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  CheckChallengeExistsResponse,
  CreateChallengeInput,
  LegacyChallengeId,
  LegacyChallengeList,
} from "../models/domain-layer/legacy/challenge";

import {
  LegacyChallengeServer,
  LegacyChallengeService,
} from "../models/domain-layer/legacy/services/challenge";

import { CreateResult, LookupCriteria } from "@topcoder-framework/lib-common";
import LegacyChallengeDomain from "../domain/LegacyChallenge";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
  create: handleUnaryCall<CreateChallengeInput, CreateResult> = (
    call: ServerUnaryCall<CreateChallengeInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    // LegacyChallengeDomain.create(call.request)
    //   .then((response) => callback(null, response))
    //   .catch((err) => callback(err, null));
  };

  [name: string]: UntypedHandleCall;
  checkChallengeExists: handleUnaryCall<LegacyChallengeId, CheckChallengeExistsResponse> = (
    call: ServerUnaryCall<LegacyChallengeId, CheckChallengeExistsResponse>,
    callback: sendUnaryData<CheckChallengeExistsResponse>
  ) => {
    LegacyChallengeDomain.checkChallengeExists(call.request.legacyChallengeId)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  lookup: handleUnaryCall<LookupCriteria, LegacyChallengeList> = (
    call: ServerUnaryCall<LookupCriteria, LegacyChallengeList>,
    callback: sendUnaryData<LegacyChallengeList>
  ) => { };
}

export { LegacyChallengeServerImpl as LegacyChallengeServer, LegacyChallengeService };
