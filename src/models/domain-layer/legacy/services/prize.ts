/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, Empty, ScanCriteria, UpdateResult } from "@topcoder-framework/lib-common";
import { CreatePrizeInput, PrizeList, PrizeTypeList, UpdatePrizeInput } from "../prize";

export type PrizeServiceService = typeof PrizeServiceService;
export const PrizeServiceService = {
  create: {
    path: "/topcoder.domain.legacy_prize_service.PrizeService/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePrizeInput) => Buffer.from(CreatePrizeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePrizeInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  scan: {
    path: "/topcoder.domain.legacy_prize_service.PrizeService/Scan",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ScanCriteria) => Buffer.from(ScanCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ScanCriteria.decode(value),
    responseSerialize: (value: PrizeList) => Buffer.from(PrizeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PrizeList.decode(value),
  },
  update: {
    path: "/topcoder.domain.legacy_prize_service.PrizeService/Update",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdatePrizeInput) => Buffer.from(UpdatePrizeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdatePrizeInput.decode(value),
    responseSerialize: (value: UpdateResult) => Buffer.from(UpdateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateResult.decode(value),
  },
  getPrizeTypes: {
    path: "/topcoder.domain.legacy_prize_service.PrizeService/GetPrizeTypes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: PrizeTypeList) => Buffer.from(PrizeTypeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PrizeTypeList.decode(value),
  },
} as const;

export interface PrizeServiceServer extends UntypedServiceImplementation {
  create: handleUnaryCall<CreatePrizeInput, CreateResult>;
  scan: handleUnaryCall<ScanCriteria, PrizeList>;
  update: handleUnaryCall<UpdatePrizeInput, UpdateResult>;
  getPrizeTypes: handleUnaryCall<Empty, PrizeTypeList>;
}
