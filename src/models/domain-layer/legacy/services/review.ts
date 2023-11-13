/* eslint-disable */
import type { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult } from "@topcoder-framework/lib-common";
import { CreateReviewInput, CreateReviewItemInput, GetSubmissionInput, Submission } from "../review";

export type LegacyReviewService = typeof LegacyReviewService;
export const LegacyReviewService = {
  createReview: {
    path: "/topcoder.domain.service.review.LegacyReview/CreateReview",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateReviewInput) => Buffer.from(CreateReviewInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateReviewInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  createReviewItem: {
    path: "/topcoder.domain.service.review.LegacyReview/CreateReviewItem",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateReviewItemInput) => Buffer.from(CreateReviewItemInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateReviewItemInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  getSubmission: {
    path: "/topcoder.domain.service.review.LegacyReview/GetSubmission",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetSubmissionInput) => Buffer.from(GetSubmissionInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetSubmissionInput.decode(value),
    responseSerialize: (value: Submission) => Buffer.from(Submission.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Submission.decode(value),
  },
} as const;

export interface LegacyReviewServer extends UntypedServiceImplementation {
  createReview: handleUnaryCall<CreateReviewInput, CreateResult>;
  createReviewItem: handleUnaryCall<CreateReviewItemInput, CreateResult>;
  getSubmission: handleUnaryCall<GetSubmissionInput, Submission>;
}
