import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyChallengePaymentServer,
  LegacyChallengePaymentService,
} from "../models/domain-layer/legacy/services/challenge_payment";

import { CreateResult, Empty, UpdateResult } from "@topcoder-framework/lib-common";
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

  update: handleUnaryCall<UpdateLegacyChallengePaymentInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateLegacyChallengePaymentInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
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
}

export {
  LegacyChallengePaymentServerImpl as LegacyChallengePaymentServer,
  LegacyChallengePaymentService,
};
