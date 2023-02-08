import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyPaymentServer,
  LegacyPaymentService
} from "../models/domain-layer/legacy/services/payment";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyPaymentDomain from "../domain/Payment";
import { GetProjectPaymentsInput, ProjectPaymentList, CreateProjectPaymentsInput, ProjectPayment, UpdateProjectPaymentsInput, DeleteProjectPaymentsInput, GetPrizesInput, PrizeList, CreatePrizeInput, Prize, UpdatePrizeInput, DeletePrizeInput } from "../models/domain-layer/legacy/payment";

class LegacyPaymentServerImpl implements LegacyPaymentServer {
  [name: string]: UntypedHandleCall;
  getProjectPayments: handleUnaryCall<GetProjectPaymentsInput, ProjectPaymentList> = (
    call: ServerUnaryCall<GetProjectPaymentsInput, ProjectPaymentList>,
    callback: sendUnaryData<ProjectPaymentList>
  ) => {
    LegacyPaymentDomain.getProjectPayments(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null))
  };

  createProjectPayment: handleUnaryCall<CreateProjectPaymentsInput, CreateResult> = (
    call: ServerUnaryCall<CreateProjectPaymentsInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyPaymentDomain.createProjectPayment(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null))
  };

  updateProjectPayment: handleUnaryCall<UpdateProjectPaymentsInput, Empty> = (
    call: ServerUnaryCall<UpdateProjectPaymentsInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPaymentDomain.updateProjectPayment(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null))
  };

  deleteProjectPayment: handleUnaryCall<DeleteProjectPaymentsInput, Empty> = (
    call: ServerUnaryCall<DeleteProjectPaymentsInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPaymentDomain.deleteProjectPayment(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null))
  };

  getProjectPrizes: handleUnaryCall<GetPrizesInput, PrizeList> = (
    call: ServerUnaryCall<GetPrizesInput, PrizeList>,
    callback: sendUnaryData<PrizeList>
  ) => {
    LegacyPaymentDomain.getProjectPrizes(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null))
  };

  createProjectPrize: handleUnaryCall<CreatePrizeInput, CreateResult> = (
    call: ServerUnaryCall<CreatePrizeInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyPaymentDomain.createProjectPrize(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null))
  };

  updateProjectPrize: handleUnaryCall<UpdatePrizeInput, Empty> = (
    call: ServerUnaryCall<UpdatePrizeInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPaymentDomain.updateProjectPrize(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null))
  };

  deleteProjectPrize: handleUnaryCall<DeletePrizeInput, Empty> = (
    call: ServerUnaryCall<DeletePrizeInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPaymentDomain.deleteProjectPrize(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null))
  };
}

export { LegacyPaymentServerImpl as LegacyPaymentServer, LegacyPaymentService };
