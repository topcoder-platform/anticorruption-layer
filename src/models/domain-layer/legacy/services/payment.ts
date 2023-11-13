/* eslint-disable */
import type { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import {
  CreatePrizeInput,
  CreateProjectPaymentsInput,
  DeletePrizeInput,
  DeleteProjectPaymentsInput,
  GetPrizesInput,
  GetProjectPaymentsInput,
  PrizeList,
  ProjectPaymentList,
  UpdatePrizeInput,
  UpdateProjectPaymentsInput,
} from "../payment";

export type LegacyPaymentService = typeof LegacyPaymentService;
export const LegacyPaymentService = {
  getProjectPayments: {
    path: "/topcoder.domain.service.payment.LegacyPayment/GetProjectPayments",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProjectPaymentsInput) => Buffer.from(GetProjectPaymentsInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProjectPaymentsInput.decode(value),
    responseSerialize: (value: ProjectPaymentList) => Buffer.from(ProjectPaymentList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ProjectPaymentList.decode(value),
  },
  createProjectPayment: {
    path: "/topcoder.domain.service.payment.LegacyPayment/CreateProjectPayment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProjectPaymentsInput) =>
      Buffer.from(CreateProjectPaymentsInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProjectPaymentsInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  updateProjectPayment: {
    path: "/topcoder.domain.service.payment.LegacyPayment/UpdateProjectPayment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProjectPaymentsInput) =>
      Buffer.from(UpdateProjectPaymentsInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProjectPaymentsInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deleteProjectPayment: {
    path: "/topcoder.domain.service.payment.LegacyPayment/DeleteProjectPayment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProjectPaymentsInput) =>
      Buffer.from(DeleteProjectPaymentsInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProjectPaymentsInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  getProjectPrizes: {
    path: "/topcoder.domain.service.payment.LegacyPayment/GetProjectPrizes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetPrizesInput) => Buffer.from(GetPrizesInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetPrizesInput.decode(value),
    responseSerialize: (value: PrizeList) => Buffer.from(PrizeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PrizeList.decode(value),
  },
  createProjectPrize: {
    path: "/topcoder.domain.service.payment.LegacyPayment/CreateProjectPrize",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePrizeInput) => Buffer.from(CreatePrizeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePrizeInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  updateProjectPrize: {
    path: "/topcoder.domain.service.payment.LegacyPayment/UpdateProjectPrize",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdatePrizeInput) => Buffer.from(UpdatePrizeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdatePrizeInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  deleteProjectPrize: {
    path: "/topcoder.domain.service.payment.LegacyPayment/DeleteProjectPrize",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeletePrizeInput) => Buffer.from(DeletePrizeInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeletePrizeInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface LegacyPaymentServer extends UntypedServiceImplementation {
  getProjectPayments: handleUnaryCall<GetProjectPaymentsInput, ProjectPaymentList>;
  createProjectPayment: handleUnaryCall<CreateProjectPaymentsInput, CreateResult>;
  updateProjectPayment: handleUnaryCall<UpdateProjectPaymentsInput, Empty>;
  deleteProjectPayment: handleUnaryCall<DeleteProjectPaymentsInput, Empty>;
  getProjectPrizes: handleUnaryCall<GetPrizesInput, PrizeList>;
  createProjectPrize: handleUnaryCall<CreatePrizeInput, CreateResult>;
  updateProjectPrize: handleUnaryCall<UpdatePrizeInput, Empty>;
  deleteProjectPrize: handleUnaryCall<DeletePrizeInput, Empty>;
}
