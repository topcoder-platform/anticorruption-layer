import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyGroupContestEligibilityServer,
  LegacyGroupContestEligibilityService,
} from "../models/domain-layer/legacy/services/group_contest_eligibility";

import { Empty } from "@topcoder-framework/lib-common";
import LegacyGroupContestEligibilityDomain from "../domain/GroupContestEligibility";
import {
  GetContestEligibilityInput,
  ContestEligibilityList,
  ContestEligibility,
  GetGroupContestEligibilityInput,
  GroupContestEligibilityList,
  GroupContestEligibility,
  DeleteContestEligibilityInput,
  DeleteGroupContestEligibilityInput,
} from "../models/domain-layer/legacy/group_contest_eligibility";

class LegacyGroupContestEligibilityServerImpl implements LegacyGroupContestEligibilityServer {
  [name: string]: UntypedHandleCall;

  getContestEligibilities: handleUnaryCall<GetContestEligibilityInput, ContestEligibilityList> = (
    call: ServerUnaryCall<GetContestEligibilityInput, ContestEligibilityList>,
    callback: sendUnaryData<ContestEligibilityList>
  ) => {
    LegacyGroupContestEligibilityDomain.getContestEligibilities(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  createContestEligibility: handleUnaryCall<ContestEligibility, Empty> = (
    call: ServerUnaryCall<ContestEligibility, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyGroupContestEligibilityDomain.createContestEligibility(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  getGroupContestEligibilities: handleUnaryCall<
    GetGroupContestEligibilityInput,
    GroupContestEligibilityList
  > = (
    call: ServerUnaryCall<GetGroupContestEligibilityInput, GroupContestEligibilityList>,
    callback: sendUnaryData<GroupContestEligibilityList>
  ) => {
    LegacyGroupContestEligibilityDomain.getGroupContestEligibilities(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  createGroupContestEligibility: handleUnaryCall<GroupContestEligibility, Empty> = (
    call: ServerUnaryCall<GroupContestEligibility, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyGroupContestEligibilityDomain.createGroupContestEligibility(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  deleteContestEligibility: handleUnaryCall<DeleteContestEligibilityInput, Empty> = (
    call: ServerUnaryCall<DeleteContestEligibilityInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyGroupContestEligibilityDomain.deleteContestEligibility(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  deleteGroupContestEligibility: handleUnaryCall<DeleteGroupContestEligibilityInput, Empty> = (
    call: ServerUnaryCall<DeleteGroupContestEligibilityInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyGroupContestEligibilityDomain.deleteGroupContestEligibility(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };
}

export {
  LegacyGroupContestEligibilityServerImpl as LegacyGroupContestEligibilityServer,
  LegacyGroupContestEligibilityService,
};
