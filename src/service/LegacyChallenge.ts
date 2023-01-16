import {
  handleUnaryCall,
  sendUnaryData,
  ServerUnaryCall,
  UntypedHandleCall,
} from "@grpc/grpc-js";

import {
  LegacyChallengeId,
  LegacyChallengeList,
  LegacyChallengeInfoRequest,
  LegacyChallengePhaseList,
  LegacyChallengeInfoTypeList,
} from "../models/acl-domain/LegacyChallenge";

import {
  ChallengeInfoTypeFilterCriteria,
  CheckChallengeExistsResponse,
  LegacyChallengeServer,
  LegacyChallengeService,
  UpdateResponse,
} from "../models/acl-service/LegacyChallenge";

import { LookupCriteria } from "../models/common/Common";

import LegacyChallengeDomain from "../domain/LegacyChallenge";
import LegacyChallengePhaseDomain from "../domain/LegacyChallengePhase";

class LegacyChallengeServerImpl implements LegacyChallengeServer {
  [name: string]: UntypedHandleCall;

  checkChallengeExists: handleUnaryCall<
    LegacyChallengeId,
    CheckChallengeExistsResponse
  > = (
    call: ServerUnaryCall<LegacyChallengeId, CheckChallengeExistsResponse>,
    callback: sendUnaryData<CheckChallengeExistsResponse>
  ) => {};

  lookup: handleUnaryCall<LookupCriteria, LegacyChallengeList> = (
    call: ServerUnaryCall<LookupCriteria, LegacyChallengeList>,
    callback: sendUnaryData<LegacyChallengeList>
  ) => {};

  listAvailableChallengeInfoTypes: handleUnaryCall<
    ChallengeInfoTypeFilterCriteria,
    LegacyChallengeInfoTypeList
  > = (
    call: ServerUnaryCall<
      ChallengeInfoTypeFilterCriteria,
      LegacyChallengeInfoTypeList
    >
  ) => {};

  addOrUpdateChallengeInfo: handleUnaryCall<
    LegacyChallengeInfoRequest,
    UpdateResponse
  > = (
    call: ServerUnaryCall<LegacyChallengeInfoRequest, UpdateResponse>,
    callback: sendUnaryData<UpdateResponse>
  ) => {
    // const challengeInfoRequest: LegacyChallengeInfoRequest = call.request;
  };

  listChallengePhases: handleUnaryCall<
    LegacyChallengeId,
    LegacyChallengePhaseList
  > = (
    call: ServerUnaryCall<LegacyChallengeId, LegacyChallengePhaseList>,
    callback: sendUnaryData<LegacyChallengePhaseList>
  ) => {
    LegacyChallengePhaseDomain.listChallengePhases(call.request)
      .then((challengePhases) => {
        callback(null, challengePhases);
      })
      .catch((err) => {
        console.log("Need to handle error", err);
        callback(err);
      });
  };

  updateChallengePhases: handleUnaryCall<
    LegacyChallengePhaseList,
    UpdateResponse
  > = (
    call: ServerUnaryCall<LegacyChallengePhaseList, UpdateResponse>,
    callback: sendUnaryData<UpdateResponse>
  ) => {
    LegacyChallengePhaseDomain.updateChallengePhases(call.request)
      .then((response) => {
        callback(null, response);
      })
      .catch((err) => {
        console.log("Need to handle error", err);
        callback(err);
      });
  };
}

export {
  LegacyChallengeServerImpl as LegacyChallengeServer,
  LegacyChallengeService,
};
