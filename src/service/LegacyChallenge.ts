import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";
import { LookupCriteria } from "../models/common/common";

import {
  CheckChallengeExistsResponse,
  LegacyChallengeId,
  LegacyChallengeList,
} from "../models/domain-layer/legacy/legacy_challenge";

import {
  LegacyChallengeService,
  LegacyChallengeServer,
} from "../models/domain-layer/legacy/services/legacy_challenge";

import LegacyChallengeDomain from "../domain/LegacyChallenge";

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
