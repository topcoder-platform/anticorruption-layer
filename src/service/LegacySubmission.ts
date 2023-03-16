import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";
import {
  CreateResult, LookupCriteria,
  CheckExistsResult, UpdateResult, ScanResult, ScanRequest, Empty
} from "@topcoder-framework/lib-common";
import LegacySubmissionDomain from '../domain/LegacySubmission'

import { LegacySubmissionService, LegacySubmissionServer } from '../models/domain-layer/legacy/services/submission';
import {
  CreateSubmissionInput, UpdateSubmissionInput,
  LegacySubmission, LegacySubmissionId, DeleteChallengeSubmissionInput
} from "../models/domain-layer/legacy/submission";

class LegacySubmissionServerImpl implements LegacySubmissionServer {
  create: handleUnaryCall<CreateSubmissionInput, CreateResult> = (
    call: ServerUnaryCall<CreateSubmissionInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacySubmissionDomain.create(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  [name: string]: UntypedHandleCall;
  checkExists: handleUnaryCall<LegacySubmissionId, CheckExistsResult> = (
    call: ServerUnaryCall<LegacySubmissionId, CheckExistsResult>,
    callback: sendUnaryData<CheckExistsResult>
  ) => {
    LegacySubmissionDomain.checkSubmissionExists(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };


  lookup: handleUnaryCall<LookupCriteria, LegacySubmission> = (
    call: ServerUnaryCall<LookupCriteria, LegacySubmission>,
    callback: sendUnaryData<LegacySubmission>
  ) => {
    //TODO: implement lookup
  };

  scan: handleUnaryCall<ScanRequest, ScanResult> = (
    call: ServerUnaryCall<ScanRequest, ScanResult>,
    callback: sendUnaryData<ScanResult>
  ) => {
    //TODO: implement scan
  };

  update: handleUnaryCall<UpdateSubmissionInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateSubmissionInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
  ) => {
    LegacySubmissionDomain.update(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  deleteChallengeSubmission: handleUnaryCall<DeleteChallengeSubmissionInput, Empty> = (
    call: ServerUnaryCall<DeleteChallengeSubmissionInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacySubmissionDomain.deleteChallengeSubmission(call.request)
      .then(() => callback(null, null))
      .catch((err) => callback(err, null));
  };
}

export { LegacySubmissionServerImpl as LegacySubmissionServer, LegacySubmissionService };
