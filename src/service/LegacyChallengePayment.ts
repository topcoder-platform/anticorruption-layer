import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyChallengePaymentServer,
  LegacyChallengePaymentService,
} from "../models/domain-layer/legacy/services/challenge_payment";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyPaymentDomain from "../domain/LegacyChallengePayment";
import {
  CreateLegacyChallengePaymentInput,
  DeleteLegacyChallengePaymentInput,
  GetLegacyChallengePaymentInput,
  LegacyChallengePaymentList,
  UpdateLegacyChallengePaymentInput,
} from "../../dist/models/domain-layer/legacy/challenge_payment";

class LegacyChallengePaymentServerImpl implements LegacyChallengePaymentServer {
  [name: string]: UntypedHandleCall;

  get: handleUnaryCall<GetLegacyChallengePaymentInput, LegacyChallengePaymentList> = (
    call: ServerUnaryCall<GetLegacyChallengePaymentInput, LegacyChallengePaymentList>,
    callback: sendUnaryData<LegacyChallengePaymentList>
  ) => {
    LegacyPaymentDomain.getProjectPayments(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  create: handleUnaryCall<CreateLegacyChallengePaymentInput, CreateResult> = (
    call: ServerUnaryCall<CreateLegacyChallengePaymentInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyPaymentDomain.createProjectPayment(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  update: handleUnaryCall<UpdateLegacyChallengePaymentInput, Empty> = (
    call: ServerUnaryCall<UpdateLegacyChallengePaymentInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPaymentDomain.updateProjectPayment(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  delete: handleUnaryCall<DeleteLegacyChallengePaymentInput, Empty> = (
    call: ServerUnaryCall<DeleteLegacyChallengePaymentInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPaymentDomain.deleteProjectPayment(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  // getProjectPrizes: handleUnaryCall<GetPrizesInput, PrizeList> = (
  //   call: ServerUnaryCall<GetPrizesInput, PrizeList>,
  //   callback: sendUnaryData<PrizeList>
  // ) => {
  //   LegacyPaymentDomain.getProjectPrizes(call.request)
  //     .then((response) => callback(null, response))
  //     .catch((err) => callback(err, null));
  // };

  // createProjectPrize: handleUnaryCall<CreatePrizeInput, CreateResult> = (
  //   call: ServerUnaryCall<CreatePrizeInput, CreateResult>,
  //   callback: sendUnaryData<CreateResult>
  // ) => {
  //   LegacyPaymentDomain.createProjectPrize(call.request)
  //     .then((response) => callback(null, response))
  //     .catch((err) => callback(err, null));
  // };

  // updateProjectPrize: handleUnaryCall<UpdatePrizeInput, Empty> = (
  //   call: ServerUnaryCall<UpdatePrizeInput, Empty>,
  //   callback: sendUnaryData<Empty>
  // ) => {
  //   LegacyPaymentDomain.updateProjectPrize(call.request)
  //     .then((response) => callback(null))
  //     .catch((err) => callback(err, null));
  // };

  // deleteProjectPrize: handleUnaryCall<DeletePrizeInput, Empty> = (
  //   call: ServerUnaryCall<DeletePrizeInput, Empty>,
  //   callback: sendUnaryData<Empty>
  // ) => {
  //   LegacyPaymentDomain.deleteProjectPrize(call.request)
  //     .then((response) => callback(null))
  //     .catch((err) => callback(err, null));
  // };
}

export {
  LegacyChallengePaymentServerImpl as LegacyChallengePaymentServer,
  LegacyChallengePaymentService,
};
