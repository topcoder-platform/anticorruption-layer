import {
  handleUnaryCall,
  sendUnaryData,
  ServerUnaryCall,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { GrpcError } from "../helper/ErrorHelper";
import {
  LegacyGroupContestEligibilityServer,
  LegacyGroupContestEligibilityService,
} from "../service/GroupContestEligibility";
import { LegacyChallengeServer, LegacyChallengeService } from "../service/LegacyChallenge";
import {
  LegacyChallengePaymentServer,
  LegacyChallengePaymentService,
} from "../service/LegacyChallengePayment";
import {
  LegacyChallengePhaseServer,
  LegacyChallengePhaseService,
} from "../service/LegacyChallengePhase";
import { LegacyPhaseServer, LegacyPhaseService } from "../service/LegacyPhase";
import { LegacyPrizeServer, LegacyPrizeServiceService } from "../service/LegacyPrize";
import { LegacyNotificationServer, LegacyNotificationService } from "../service/Notification";
import { LegacyProjectInfoServer, LegacyProjectInfoService } from "../service/ProjectInfo";
import { LegacyResourceServer, LegacyResourceService } from "../service/Resource";
import { LegacyReviewServer, LegacyReviewService } from "../service/Review";
import { LegacySyncServer, LegacySyncService } from "../service/Sync";
import { LegacyTermServer, LegacyTermService } from "../service/Term";

import loggingInterceptor from "./LoggingInterceptor";
class InterceptorWrapper {
  private wrapCallWithInterceptor(
    interceptor: Interceptor,
    callHandler: handleUnaryCall<any, any>,
    serviceName: string,
    method: string
  ) {
    return function (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
      const newCallback = (err: GrpcError | any, res: any) => {
        if (err) {
          return interceptor.onError(err, call, callback);
        }
        return interceptor.onSuccess(res, call, callback);
      };
      try {
        interceptor.onMessage(call, serviceName, method);
        callHandler(call, newCallback);
      } catch (err: any) {
        interceptor.onError(err, call, callback);
      }
    };
  }

  private implementWithInterceptors(
    serviceDefinition: ServiceDefinition,
    implementation: ServerImplementation,
    serviceName: string,
    interceptors: Interceptor[]
  ) {
    const wrappedImplementation: { [key: string]: handleUnaryCall<any, any> } = {};

    for (const method in serviceDefinition) {
      let callHandler = implementation[method] as handleUnaryCall<any, any>;
      interceptors.forEach((interceptor: Interceptor) => {
        callHandler = this.wrapCallWithInterceptor(interceptor, callHandler, serviceName, method);
      });
      wrappedImplementation[method] = callHandler;
    }

    return wrappedImplementation;
  }

  public serviceWrapper(
    serviceDefinition: ServiceDefinition,
    implementation: ServerImplementation,
    serviceName: string
  ): UntypedServiceImplementation {
    return this.implementWithInterceptors(serviceDefinition, implementation, serviceName, [
      loggingInterceptor,
    ]);
  }
}

type ServiceDefinition =
  | LegacyChallengeService
  | LegacyChallengePhaseService
  | LegacyProjectInfoService
  | LegacyTermService
  | LegacyReviewService
  | LegacyPhaseService
  | LegacyNotificationService
  | LegacyResourceService
  | LegacyGroupContestEligibilityService
  | LegacyChallengePaymentService
  | LegacyPrizeServiceService
  | LegacySyncService;
type ServerImplementation =
  | LegacyChallengeServer
  | LegacyChallengePhaseServer
  | LegacyProjectInfoServer
  | LegacyTermServer
  | LegacyReviewServer
  | LegacyPhaseServer
  | LegacyNotificationServer
  | LegacyResourceServer
  | LegacyGroupContestEligibilityServer
  | LegacyChallengePaymentServer
  | LegacyPrizeServer
  | LegacySyncServer;

export type Interceptor = {
  onMessage: (call: ServerUnaryCall<any, any>, serviceName: string, method: string) => void;
  onSuccess: (response: any, call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => void;
  onError: (
    error: GrpcError,
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>
  ) => void;
};

export default new InterceptorWrapper();
