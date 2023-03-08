import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";
import {
  CreateResult, LookupCriteria,
  CheckExistsResult, UpdateResult
} from "@topcoder-framework/lib-common";
import LegacySubmissionDomain from '../domain/LegacySubmission'

import { LegacySubmissionService, LegacySubmissionServer } from '../models/domain-layer/legacy/services/submission';
import {
  CreateSubmissionInput, UpdateSubmissionInput,
  LegacySubmission
} from "../models/domain-layer/legacy/submission";

class LegacySubmissionServerImpl implements LegacySubmissionServer {
  create: handleUnaryCall<CreateSubmissionInput, CreateResult> = (
    call: ServerUnaryCall<CreateSubmissionInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacySubmissionDomain.createLegacySubmission(call.request)
      .then((response) => callback(null, response)) //TODO: Fix this response type
      .catch((err) => callback(err, null));
  };

  [name: string]: UntypedHandleCall;
  checkExists: handleUnaryCall<LegacySubmissionId, CheckExistsResult> = (
    call: ServerUnaryCall<LegacySubmissionId, CheckExistsResult>,
    callback: sendUnaryData<CheckExistsResult>
  ) => { };


  lookup: handleUnaryCall<LookupCriteria, LegacySubmissionList> = (
    call: ServerUnaryCall<LookupCriteria, LegacySubmissionList>,
    callback: sendUnaryData<LegacySubmissionList>
  ) => { };

  scan: handleUnaryCall<LookupCriteria, LegacySubmissionList> = (
    call: ServerUnaryCall<LookupCriteria, LegacySubmissionList>,
    callback: sendUnaryData<LegacySubmissionList>
  ) => { };


  get: handleUnaryCall<LegacySubmissionId, LegacySubmission> = (
    call: ServerUnaryCall<LegacySubmissionId, LegacySubmission>,
    callback: sendUnaryData<LegacySubmission>
  ) => { };

  update: handleUnaryCall<UpdateSubmissionInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateSubmissionInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
  ) => {
    LegacySubmissionDomain.update(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };
}

export { LegacySubmissionServerImpl as LegacySubmissionServer, LegacySubmissionService };
