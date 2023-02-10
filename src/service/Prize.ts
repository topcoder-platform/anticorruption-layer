import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";
import { CreateResult, ScanCriteria, Empty, UpdateResult } from "@topcoder-framework/lib-common";
import {
  CreatePrizeInput,
  UpdatePrizeInput,
  PrizeList,
  PrizeTypeList,
} from "../models/domain-layer/legacy/prize";

import {
  PrizeServiceServer,
  PrizeServiceService,
} from "../models/domain-layer/legacy/services/prize";

import PrizeDomain from "../domain/Prize";

class PrizeServerImpl implements PrizeServiceServer {
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

  scan: handleUnaryCall<ScanCriteria, PrizeList> = (
    call: ServerUnaryCall<ScanCriteria, PrizeList>,
    callback: sendUnaryData<PrizeList>
  ) => {
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
}

export { PrizeServerImpl as PrizeServer, PrizeServiceService };
