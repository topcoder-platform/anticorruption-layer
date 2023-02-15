import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";
import { CreateResult, ScanRequest, UpdateResult, Empty } from "@topcoder-framework/lib-common";
import {
  CreatePrizeInput,
  DeletePrizeInput,
  PrizeList,
  PrizeTypeList,
  UpdatePrizeInput,
} from "../models/domain-layer/legacy/prize";

import {
  LegacyPrizeServiceServer,
  LegacyPrizeServiceService,
} from "../models/domain-layer/legacy/services/prize";

import PrizeDomain from "../domain/Prize";

class LegacyPrizeServerImpl implements LegacyPrizeServiceServer {
  [name: string]: UntypedHandleCall;

  create: handleUnaryCall<CreatePrizeInput, CreateResult> = (
    call: ServerUnaryCall<CreatePrizeInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    PrizeDomain.create(call.request)
      .then((createResult) => {
        callback(null, createResult);
      })
      .catch((error) => {
        callback(error, null);
      });
  };

  scan: handleUnaryCall<ScanRequest, PrizeList> = (
    call: ServerUnaryCall<ScanRequest, PrizeList>,
    callback: sendUnaryData<PrizeList>
  ) => {
    console.log("Request", call.request);
    PrizeDomain.scan(call.request)
      .then((list) => callback(null, list))
      .catch((err) => callback(err, null));
  };

  getPrizeTypes: handleUnaryCall<Empty, PrizeTypeList> = (
    call: ServerUnaryCall<Empty, PrizeTypeList>,
    callback: sendUnaryData<PrizeTypeList>
  ) => {};

  update: handleUnaryCall<UpdatePrizeInput, UpdateResult> = (
    call: ServerUnaryCall<UpdatePrizeInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
  ) => {
    PrizeDomain.update(call.request)
      .then((result) => callback(null, result))
      .catch((err) => callback(err, null));
  };

  delete: handleUnaryCall<DeletePrizeInput, Empty> = (
    call: ServerUnaryCall<DeletePrizeInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {};
}

export { LegacyPrizeServerImpl as LegacyPrizeServer, LegacyPrizeServiceService };
