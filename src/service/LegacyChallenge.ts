import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  CheckExistsResponse,
  CloseChallengeInput,
  LegacyChallenge,
  LegacyChallengeId,
  LegacyChallengeList,
  UpdateChallengeInput,
} from "../models/domain-layer/legacy/challenge";

import {
  LegacyChallengeServer,
  LegacyChallengeService,
} from "../models/domain-layer/legacy/services/challenge";

import { CreateResult, LookupCriteria } from "@topcoder-framework/lib-common";
import LegacyChallengeDomain from "../domain/LegacyChallenge";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
  [name: string]: UntypedHandleCall;

  create: handleUnaryCall<any, CreateResult> = (
    call: ServerUnaryCall<any, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    // LegacyChallengeDomain.create(call.request)
    //   .then((response) => callback(null, response))
    //   .catch((err) => callback(err, null));
  };

  checkExists: handleUnaryCall<LegacyChallengeId, CheckExistsResponse> = (
    call: ServerUnaryCall<LegacyChallengeId, CheckExistsResponse>,
    callback: sendUnaryData<CheckExistsResponse>
  ) => {
    LegacyChallengeDomain.checkChallengeExists(call.request.legacyChallengeId)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  get: handleUnaryCall<LegacyChallengeId, LegacyChallenge> = (
    call: ServerUnaryCall<LegacyChallengeId, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.getLegacyChallenge(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  lookup: handleUnaryCall<LookupCriteria, LegacyChallengeList> = (
    call: ServerUnaryCall<LookupCriteria, LegacyChallengeList>,
    callback: sendUnaryData<LegacyChallengeList>
  ) => {};

  update: handleUnaryCall<UpdateChallengeInput, LegacyChallenge> = (
    call: ServerUnaryCall<UpdateChallengeInput, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.update(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  activate: handleUnaryCall<LegacyChallengeId, LegacyChallenge> = (
    call: ServerUnaryCall<LegacyChallengeId, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.activateChallenge(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  close: handleUnaryCall<CloseChallengeInput, LegacyChallenge> = (
    call: ServerUnaryCall<CloseChallengeInput, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.closeChallenge(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };
}

export { LegacyChallengeServerImpl as LegacyChallengeServer, LegacyChallengeService };
