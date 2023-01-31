import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  CheckChallengeExistsResponse,
  LegacyChallengeId,
  LegacyChallengeList,
} from "../models/domain-layer/legacy/challenge";

import {
  LegacyChallengeService,
  LegacyChallengeServer,
} from "../models/domain-layer/legacy/services/challenge";

import LegacyChallengeDomain from "../domain/LegacyChallenge";
import { LookupCriteria } from "@topcoder-framework/lib-common";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
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
  ) => {};
}

export { LegacyChallengeServerImpl as LegacyChallengeServer, LegacyChallengeService };
