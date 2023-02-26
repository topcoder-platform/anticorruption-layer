/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { Empty } from "@topcoder-framework/lib-common";
import {
  ContestEligibility,
  ContestEligibilityList,
  DeleteContestEligibilityInput,
  DeleteGroupContestEligibilityInput,
  GetContestEligibilityInput,
  GetGroupContestEligibilityInput,
  GroupContestEligibility,
  GroupContestEligibilityList,
} from "../group_contest_eligibility";

export type LegacyGroupContestEligibilityService = typeof LegacyGroupContestEligibilityService;
export const LegacyGroupContestEligibilityService = {
  getContestEligibilities: {
    path: "/topcoder.domain.service.group_contest_eligibility.LegacyGroupContestEligibility/GetContestEligibilities",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetContestEligibilityInput) =>
      Buffer.from(GetContestEligibilityInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetContestEligibilityInput.decode(value),
    responseSerialize: (value: ContestEligibilityList) => Buffer.from(ContestEligibilityList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ContestEligibilityList.decode(value),
  },
  createContestEligibility: {
    path: "/topcoder.domain.service.group_contest_eligibility.LegacyGroupContestEligibility/CreateContestEligibility",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ContestEligibility) => Buffer.from(ContestEligibility.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ContestEligibility.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  getGroupContestEligibilities: {
    path:
      "/topcoder.domain.service.group_contest_eligibility.LegacyGroupContestEligibility/GetGroupContestEligibilities",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetGroupContestEligibilityInput) =>
      Buffer.from(GetGroupContestEligibilityInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetGroupContestEligibilityInput.decode(value),
    responseSerialize: (value: GroupContestEligibilityList) =>
      Buffer.from(GroupContestEligibilityList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GroupContestEligibilityList.decode(value),
  },
  createGroupContestEligibility: {
    path:
      "/topcoder.domain.service.group_contest_eligibility.LegacyGroupContestEligibility/CreateGroupContestEligibility",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GroupContestEligibility) => Buffer.from(GroupContestEligibility.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GroupContestEligibility.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deleteContestEligibility: {
    path: "/topcoder.domain.service.group_contest_eligibility.LegacyGroupContestEligibility/DeleteContestEligibility",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteContestEligibilityInput) =>
      Buffer.from(DeleteContestEligibilityInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteContestEligibilityInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deleteGroupContestEligibility: {
    path:
      "/topcoder.domain.service.group_contest_eligibility.LegacyGroupContestEligibility/DeleteGroupContestEligibility",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteGroupContestEligibilityInput) =>
      Buffer.from(DeleteGroupContestEligibilityInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteGroupContestEligibilityInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface LegacyGroupContestEligibilityServer extends UntypedServiceImplementation {
  getContestEligibilities: handleUnaryCall<GetContestEligibilityInput, ContestEligibilityList>;
  createContestEligibility: handleUnaryCall<ContestEligibility, Empty>;
  getGroupContestEligibilities: handleUnaryCall<GetGroupContestEligibilityInput, GroupContestEligibilityList>;
  createGroupContestEligibility: handleUnaryCall<GroupContestEligibility, Empty>;
  deleteContestEligibility: handleUnaryCall<DeleteContestEligibilityInput, Empty>;
  deleteGroupContestEligibility: handleUnaryCall<DeleteGroupContestEligibilityInput, Empty>;
}
