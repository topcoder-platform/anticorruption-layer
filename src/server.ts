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
import { LegacyTermServer, LegacyTermService } from "./service/Term";

const { GRPC_SERVER_HOST = "", GRPC_SERVER_PORT = 9091 } = process.env;

const server = new Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
});

if (process.env.ENV === "local") {
  addReflection(server, path.join(__dirname, "../reflections/reflection.bin"));
}

server.addService(LegacyChallengeService, new LegacyChallengeServer());
server.addService(LegacyChallengePhaseService, new LegacyChallengePhaseServer());
server.addService(LegacyProjectInfoService, new LegacyProjectInfoServer());
server.addService(LegacyTermService, new LegacyTermServer());
server.addService(LegacyReviewService, new LegacyReviewServer());
server.addService(LegacyPhaseService, new LegacyPhaseServer());
server.addService(LegacyNotificationService, new LegacyNotificationServer());
server.addService(LegacyResourceService, new LegacyResourceServer());
server.addService(LegacyGroupContestEligibilityService, new LegacyGroupContestEligibilityServer());
server.addService(LegacyChallengePaymentService, new LegacyChallengePaymentServer());
server.addService(LegacyPrizeServiceService, new LegacyPrizeServer());

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
