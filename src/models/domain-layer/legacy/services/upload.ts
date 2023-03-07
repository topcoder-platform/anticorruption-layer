/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, LookupCriteria, ScanRequest, ScanResult, UpdateResult } from "@topcoder-framework/lib-common";
import { CreateUploadInput, UpdateUploadInput, Upload } from "../upload";

export type LegacyUploadService = typeof LegacyUploadService;
export const LegacyUploadService = {
  scan: {
    path: "/topcoder.domain.service.legacy_upload.LegacyUpload/Scan",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ScanRequest) => Buffer.from(ScanRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ScanRequest.decode(value),
    responseSerialize: (value: ScanResult) => Buffer.from(ScanResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ScanResult.decode(value),
  },
  lookup: {
    path: "/topcoder.domain.service.legacy_upload.LegacyUpload/Lookup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: Upload) => Buffer.from(Upload.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Upload.decode(value),
  },
  create: {
    path: "/topcoder.domain.service.legacy_upload.LegacyUpload/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateUploadInput) => Buffer.from(CreateUploadInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateUploadInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  update: {
    path: "/topcoder.domain.service.legacy_upload.LegacyUpload/Update",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateUploadInput) => Buffer.from(UpdateUploadInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateUploadInput.decode(value),
    responseSerialize: (value: UpdateResult) => Buffer.from(UpdateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateResult.decode(value),
  },
} as const;

export interface LegacyUploadServer extends UntypedServiceImplementation {
  scan: handleUnaryCall<ScanRequest, ScanResult>;
  lookup: handleUnaryCall<LookupCriteria, Upload>;
  create: handleUnaryCall<CreateUploadInput, CreateResult>;
  update: handleUnaryCall<UpdateUploadInput, UpdateResult>;
}
