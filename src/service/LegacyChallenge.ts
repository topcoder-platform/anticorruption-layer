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
  RequestResponse,
} from "../models/acl-service/LegacyChallenge";

import { LookupCriteria } from "../models/common/Common";

import LegacyChallengeDomain from "../domain/LegacyChallenge";

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
    RequestResponse
  > = (
    call: ServerUnaryCall<LegacyChallengeInfoRequest, RequestResponse>,
    callback: sendUnaryData<RequestResponse>
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
    LegacyChallengeDomain.listChallengePhases(call.request)
      .then((challengePhases) => {
        callback(null, challengePhases);
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
