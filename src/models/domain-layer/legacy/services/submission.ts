/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CheckExistsResult, CreateResult, LookupCriteria, UpdateResult } from "@topcoder-framework/lib-common";
import {
  CreateSubmissionInput,
  LegacySubmission,
  LegacySubmissionId,
  LegacySubmissionList,
  UpdateSubmissionInput,
} from "../submission";

export type LegacySubmissionService = typeof LegacySubmissionService;
export const LegacySubmissionService = {
  checkExists: {
    path: "/topcoder.domain.service.legacy_submission_service.LegacySubmission/CheckExists",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacySubmissionId) => Buffer.from(LegacySubmissionId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacySubmissionId.decode(value),
    responseSerialize: (value: CheckExistsResult) => Buffer.from(CheckExistsResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CheckExistsResult.decode(value),
  },
  lookup: {
    path: "/topcoder.domain.service.legacy_submission_service.LegacySubmission/Lookup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: LegacySubmissionList) => Buffer.from(LegacySubmissionList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacySubmissionList.decode(value),
  },
  create: {
    path: "/topcoder.domain.service.legacy_submission_service.LegacySubmission/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateSubmissionInput) => Buffer.from(CreateSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateSubmissionInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  update: {
    path: "/topcoder.domain.service.legacy_submission_service.LegacySubmission/Update",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateSubmissionInput) => Buffer.from(UpdateSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateSubmissionInput.decode(value),
    responseSerialize: (value: UpdateResult) => Buffer.from(UpdateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateResult.decode(value),
  },
  get: {
    path: "/topcoder.domain.service.legacy_submission_service.LegacySubmission/Get",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacySubmissionId) => Buffer.from(LegacySubmissionId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacySubmissionId.decode(value),
    responseSerialize: (value: LegacySubmission) => Buffer.from(LegacySubmission.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacySubmission.decode(value),
  },
} as const;

export interface LegacySubmissionServer extends UntypedServiceImplementation {
  checkExists: handleUnaryCall<LegacySubmissionId, CheckExistsResult>;
  lookup: handleUnaryCall<LookupCriteria, LegacySubmissionList>;
  create: handleUnaryCall<CreateSubmissionInput, CreateResult>;
  update: handleUnaryCall<UpdateSubmissionInput, UpdateResult>;
  get: handleUnaryCall<LegacySubmissionId, LegacySubmission>;
}
