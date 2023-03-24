import * as dotenv from "dotenv";
import "source-map-support/register";

dotenv.config();

import * as path from "path";

import { Server, ServerCredentials } from "@grpc/grpc-js";
import { addReflection } from "grpc-server-reflection";
import { LegacyChallengeServer, LegacyChallengeService } from "./service/LegacyChallenge";

import {
  LegacyChallengePhaseServer,
  LegacyChallengePhaseService,
} from "./service/LegacyChallengePhase";

import InterceptorWrapper from "./interceptors/InterceptorWrapper";
import {
  LegacyGroupContestEligibilityServer,
  LegacyGroupContestEligibilityService,
} from "./service/GroupContestEligibility";
import {
  LegacyChallengePaymentServer,
  LegacyChallengePaymentService,
} from "./service/LegacyChallengePayment";
import { LegacyPhaseServer, LegacyPhaseService } from "./service/LegacyPhase";
import { LegacyPrizeServer, LegacyPrizeServiceService } from "./service/LegacyPrize";
import { LegacyNotificationServer, LegacyNotificationService } from "./service/Notification";
import { LegacyProjectInfoServer, LegacyProjectInfoService } from "./service/ProjectInfo";
import { LegacyResourceServer, LegacyResourceService } from "./service/Resource";
import { LegacyReviewServer, LegacyReviewService } from "./service/Review";
import { LegacySyncServer, LegacySyncService } from "./service/Sync";
import { LegacyTermServer, LegacyTermService } from "./service/Term";

const { GRPC_SERVER_HOST = "", GRPC_SERVER_PORT = 9091 } = process.env;

const server = new Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
});

if (process.env.ENV === "local") {
  addReflection(server, path.join(__dirname, "../reflections/reflection.bin"));
}

server.addService(
  LegacyChallengeService,
  InterceptorWrapper.serviceWrapper(
    LegacyChallengeService,
    new LegacyChallengeServer(),
    "LegacyChallenge"
  )
);
server.addService(
  LegacyChallengePhaseService,
  InterceptorWrapper.serviceWrapper(
    LegacyChallengePhaseService,
    new LegacyChallengePhaseServer(),
    "LegacyChallengePhase"
  )
);
server.addService(
  LegacyProjectInfoService,
  InterceptorWrapper.serviceWrapper(
    LegacyProjectInfoService,
    new LegacyProjectInfoServer(),
    "LegacyProjectInfo"
  )
);
server.addService(
  LegacyTermService,
  InterceptorWrapper.serviceWrapper(LegacyTermService, new LegacyTermServer(), "LegacyTerm")
);
server.addService(
  LegacyReviewService,
  InterceptorWrapper.serviceWrapper(LegacyReviewService, new LegacyReviewServer(), "LegacyReview")
);
server.addService(
  LegacyPhaseService,
  InterceptorWrapper.serviceWrapper(LegacyPhaseService, new LegacyPhaseServer(), "LegacyPhase")
);
server.addService(
  LegacyNotificationService,
  InterceptorWrapper.serviceWrapper(
    LegacyNotificationService,
    new LegacyNotificationServer(),
    "LegacyNotification"
  )
);
server.addService(
  LegacyResourceService,
  InterceptorWrapper.serviceWrapper(
    LegacyResourceService,
    new LegacyResourceServer(),
    "LegacyResource"
  )
);
server.addService(
  LegacyGroupContestEligibilityService,
  InterceptorWrapper.serviceWrapper(
    LegacyGroupContestEligibilityService,
    new LegacyGroupContestEligibilityServer(),
    "LegacyGroupContestEligibility"
  )
);
server.addService(
  LegacyChallengePaymentService,
  InterceptorWrapper.serviceWrapper(
    LegacyChallengePaymentService,
    new LegacyChallengePaymentServer(),
    "LegacyChallengePayment"
  )
);
server.addService(
  LegacyPrizeServiceService,
  InterceptorWrapper.serviceWrapper(
    LegacyPrizeServiceService,
    new LegacyPrizeServer(),
    "LegacyPrize"
  )
);
server.addService(
  LegacySyncService,
  InterceptorWrapper.serviceWrapper(LegacySyncService, new LegacySyncServer(), "LegacySync")
);

server.bindAsync(
  `${GRPC_SERVER_HOST}:${GRPC_SERVER_PORT}`,
  ServerCredentials.createInsecure(),
  (err: Error | null, bindPort: number) => {
    if (err) {
      throw err;
    }

    console.info(
      `gRPC:Server running at: ${GRPC_SERVER_HOST}:${bindPort}`,
      new Date().toLocaleString()
    );
    server.start();
  }
);
