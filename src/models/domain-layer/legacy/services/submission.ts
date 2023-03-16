/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import {
  CheckExistsResult,
  CreateResult,
  Empty,
  LookupCriteria,
  ScanRequest,
  ScanResult,
  UpdateResult,
} from "@topcoder-framework/lib-common";
import {
  CreateSubmissionInput,
  DeleteChallengeSubmissionInput,
  LegacySubmission,
  LegacySubmissionId,
  UpdateSubmissionInput,
} from "../submission";

export type LegacySubmissionService = typeof LegacySubmissionService;
export const LegacySubmissionService = {
  checkExists: {
    path: "/topcoder.domain.service.legacy_submission.LegacySubmission/CheckExists",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LegacySubmissionId) => Buffer.from(LegacySubmissionId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LegacySubmissionId.decode(value),
    responseSerialize: (value: CheckExistsResult) => Buffer.from(CheckExistsResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CheckExistsResult.decode(value),
  },
  scan: {
    path: "/topcoder.domain.service.legacy_submission.LegacySubmission/Scan",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ScanRequest) => Buffer.from(ScanRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ScanRequest.decode(value),
    responseSerialize: (value: ScanResult) => Buffer.from(ScanResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ScanResult.decode(value),
  },
  lookup: {
    path: "/topcoder.domain.service.legacy_submission.LegacySubmission/Lookup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: LegacySubmission) => Buffer.from(LegacySubmission.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LegacySubmission.decode(value),
  },
  create: {
    path: "/topcoder.domain.service.legacy_submission.LegacySubmission/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateSubmissionInput) => Buffer.from(CreateSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateSubmissionInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  update: {
    path: "/topcoder.domain.service.legacy_submission.LegacySubmission/Update",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateSubmissionInput) => Buffer.from(UpdateSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateSubmissionInput.decode(value),
    responseSerialize: (value: UpdateResult) => Buffer.from(UpdateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateResult.decode(value),
  },
  deleteChallengeSubmission: {
    path: "/topcoder.domain.service.legacy_submission.LegacySubmission/DeleteChallengeSubmission",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteChallengeSubmissionInput) =>
      Buffer.from(DeleteChallengeSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteChallengeSubmissionInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface LegacySubmissionServer extends UntypedServiceImplementation {
  checkExists: handleUnaryCall<LegacySubmissionId, CheckExistsResult>;
  scan: handleUnaryCall<ScanRequest, ScanResult>;
  lookup: handleUnaryCall<LookupCriteria, LegacySubmission>;
  create: handleUnaryCall<CreateSubmissionInput, CreateResult>;
  update: handleUnaryCall<UpdateSubmissionInput, UpdateResult>;
  deleteChallengeSubmission: handleUnaryCall<DeleteChallengeSubmissionInput, Empty>;
}
