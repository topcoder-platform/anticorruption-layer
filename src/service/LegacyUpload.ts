import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";
import {
  CreateResult, Empty, LookupCriteria, ScanRequest, ScanResult, UpdateResult
} from "@topcoder-framework/lib-common";
import LegacyUploadDomain from '../domain/LegacyUpload'

import { LegacyUploadServer, LegacyUploadService } from '../models/domain-layer/legacy/services/upload';
import {
  Upload, CreateUploadInput, UpdateUploadInput,
  DeleteSubmissionUploadInput
} from "../models/domain-layer/legacy/upload";

class LegacyUploadServerImpl implements LegacyUploadServer {
  [name: string]: UntypedHandleCall;

  scan: handleUnaryCall<ScanRequest, ScanResult> = (
    call: ServerUnaryCall<ScanRequest, ScanResult>,
    callback: sendUnaryData<ScanResult>
  ) => {
    // not implemented
  };

  lookup: handleUnaryCall<LookupCriteria, Upload>
    = (
      call: ServerUnaryCall<LookupCriteria, Upload>,
      callback: sendUnaryData<Upload>
    ) => {
      // not implemented
    };

  create: handleUnaryCall<CreateUploadInput, CreateResult> = (
    call: ServerUnaryCall<CreateUploadInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    // not implemented
  };

  delete: handleUnaryCall<LookupCriteria, Empty> = (
    call: ServerUnaryCall<LookupCriteria, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    // not implemented
  };


  update: handleUnaryCall<UpdateUploadInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateUploadInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
  ) => {
    LegacyUploadDomain.update(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  deleteSubmissionUploadInput: handleUnaryCall<DeleteSubmissionUploadInput, Empty> = (
    call: ServerUnaryCall<DeleteSubmissionUploadInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    // not implemented
  };
}

export { LegacyUploadServerImpl as LegacyUploadServer, LegacyUploadService };
