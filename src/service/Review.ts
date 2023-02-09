import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyReviewServer,
  LegacyReviewService,
} from "../models/domain-layer/legacy/services/review";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyReviewDomain from "../domain/Review";
import {
  CreateReviewInput,
  Review,
  CreateReviewItemInput,
  ReviewItem,
  GetSubmissionInput,
  Submission,
} from "../models/domain-layer/legacy/review";

class LegacyReviewServerImpl implements LegacyReviewServer {
  [name: string]: UntypedHandleCall;
  createReviewItem: handleUnaryCall<CreateReviewItemInput, CreateResult> = (
    call: ServerUnaryCall<CreateReviewItemInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyReviewDomain.createReviewItem(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  getSubmission: handleUnaryCall<GetSubmissionInput, Submission> = (
    call: ServerUnaryCall<GetSubmissionInput, Submission>,
    callback: sendUnaryData<Submission>
  ) => {
    LegacyReviewDomain.getSubmission(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  createReview: handleUnaryCall<CreateReviewInput, CreateResult> = (
    call: ServerUnaryCall<CreateReviewInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyReviewDomain.createReview(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };
}

export { LegacyReviewServerImpl as LegacyReviewServer, LegacyReviewService };
