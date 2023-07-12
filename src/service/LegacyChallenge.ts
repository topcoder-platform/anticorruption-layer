import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  CreateChallengeInput,
  LegacyChallenge,
  LegacyChallengeId,
  UpdateChallengeInput,
} from "../models/domain-layer/legacy/challenge";

import { LegacyChallengeServer, LegacyChallengeService } from "../models/domain-layer/legacy/services/challenge";

import {
  CheckExistsResult,
  CreateResult,
  PhaseFactRequest,
  PhaseFactResponse,
  UpdateResult,
} from "@topcoder-framework/lib-common";
import LegacyChallengeDomain from "../domain/LegacyChallenge";
import ErrorHelper from "../helper/ErrorHelper";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
  [name: string]: UntypedHandleCall;

  checkExists: handleUnaryCall<LegacyChallengeId, CheckExistsResult> = (
    call: ServerUnaryCall<LegacyChallengeId, CheckExistsResult>,
    callback: sendUnaryData<CheckExistsResult>
  ) => {
    LegacyChallengeDomain.checkExists(call.request.legacyChallengeId)
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };

  create: handleUnaryCall<CreateChallengeInput, CreateResult> = (
    call: ServerUnaryCall<CreateChallengeInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyChallengeDomain.create(call.request, call.metadata)
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };

  update: handleUnaryCall<UpdateChallengeInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateChallengeInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
  ) => {
    LegacyChallengeDomain.update(call.request, call.metadata)
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

  getPhaseFacts: handleUnaryCall<PhaseFactRequest, PhaseFactResponse> = (
    call: ServerUnaryCall<PhaseFactRequest, PhaseFactResponse>,
    callback: sendUnaryData<PhaseFactResponse>
  ) => {
    const {
      request: { legacyId, facts },
    } = call;
    LegacyChallengeDomain.getPhaseFacts(legacyId, facts)
      .then((response) =>
        callback(null, {
          factResponses: response,
        })
      )
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };
}

export { LegacyChallengeServerImpl as LegacyChallengeServer, LegacyChallengeService };
