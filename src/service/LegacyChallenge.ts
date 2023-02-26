import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
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

import {
  CheckExistsResult,
  CreateResult,
  LookupCriteria,
  UpdateResult,
} from "@topcoder-framework/lib-common";
import LegacyChallengeDomain from "../domain/LegacyChallenge";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
  [name: string]: UntypedHandleCall;

  create: handleUnaryCall<any, CreateResult> = (
    call: ServerUnaryCall<any, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyChallengeDomain.create(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  checkExists: handleUnaryCall<LegacyChallengeId, CheckExistsResult> = (
    call: ServerUnaryCall<LegacyChallengeId, CheckExistsResult>,
    callback: sendUnaryData<CheckExistsResult>
  ) => {
    LegacyChallengeDomain.checkExists(call.request.legacyChallengeId)
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
  ) => {
    // TODO: Implement lookup
  };

  update: handleUnaryCall<UpdateChallengeInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateChallengeInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
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

  closeChallenge: handleUnaryCall<CloseChallengeInput, LegacyChallenge> = (
    call: ServerUnaryCall<CloseChallengeInput, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.closeChallenge(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };
}

export { LegacyChallengeServerImpl as LegacyChallengeServer, LegacyChallengeService };
