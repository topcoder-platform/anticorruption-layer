import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  CloseChallengeInput,
  CreateChallengeInput,
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
import ErrorHelper from "../helper/ErrorHelper";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
  [name: string]: UntypedHandleCall;

  create: handleUnaryCall<CreateChallengeInput, CreateResult> = (
    call: ServerUnaryCall<CreateChallengeInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyChallengeDomain.create(call.request)
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };

  checkExists: handleUnaryCall<LegacyChallengeId, CheckExistsResult> = (
    call: ServerUnaryCall<LegacyChallengeId, CheckExistsResult>,
    callback: sendUnaryData<CheckExistsResult>
  ) => {
    LegacyChallengeDomain.checkExists(call.request.legacyChallengeId)
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };

  get: handleUnaryCall<LegacyChallengeId, LegacyChallenge> = (
    call: ServerUnaryCall<LegacyChallengeId, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.getLegacyChallenge(call.request)
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
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
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };

  activate: handleUnaryCall<LegacyChallengeId, LegacyChallenge> = (
    call: ServerUnaryCall<LegacyChallengeId, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.activateChallenge(call.request)
      .then((response) => callback(null))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };

  closeChallenge: handleUnaryCall<CloseChallengeInput, LegacyChallenge> = (
    call: ServerUnaryCall<CloseChallengeInput, LegacyChallenge>,
    callback: sendUnaryData<LegacyChallenge>
  ) => {
    LegacyChallengeDomain.closeChallenge(call.request)
      .then((response) => callback(null))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };
}

export { LegacyChallengeServerImpl as LegacyChallengeServer, LegacyChallengeService };
