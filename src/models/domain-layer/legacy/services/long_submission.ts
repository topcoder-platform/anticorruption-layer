/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, ScanRequest, ScanResult } from "@topcoder-framework/lib-common";
import { CreateLongSubmissionInput } from "../long_submission";

export type LegacyLongSubmissionService = typeof LegacyLongSubmissionService;
export const LegacyLongSubmissionService = {
  scan: {
    path: "/topcoder.domain.service.legacy_long_submission.LegacyLongSubmission/Scan",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ScanRequest) => Buffer.from(ScanRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ScanRequest.decode(value),
    responseSerialize: (value: ScanResult) => Buffer.from(ScanResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ScanResult.decode(value),
  },
  create: {
    path: "/topcoder.domain.service.legacy_long_submission.LegacyLongSubmission/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateLongSubmissionInput) =>
      Buffer.from(CreateLongSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateLongSubmissionInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
} as const;

export interface LegacyLongSubmissionServer extends UntypedServiceImplementation {
  scan: handleUnaryCall<ScanRequest, ScanResult>;
  create: handleUnaryCall<CreateLongSubmissionInput, CreateResult>;
}
