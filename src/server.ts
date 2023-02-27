import "source-map-support/register";


import * as path from "path";

import { Server, ServerCredentials } from "@grpc/grpc-js";
import { addReflection } from "grpc-server-reflection";
import { LegacyChallengeServer, LegacyChallengeService } from "./service/LegacyChallenge";
import { LegacySubmissionServer, LegacySubmissionService } from "./service/LegacySubmission";
import {
  LegacyChallengePhaseService,
  LegacyChallengePhaseServer,
} from "./service/LegacyChallengePhase";
import { GRPC_SERVER_HOST, GRPC_SERVER_PORT, ENV } from './config'

import { PrizeServiceService, PrizeServer } from "./service/Prize";


const server = new Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
});

if (ENV === "local") {
  addReflection(server, path.join(__dirname, "../reflections/reflection.bin"));
}

server.addService(LegacyChallengeService, new LegacyChallengeServer());
server.addService(LegacySubmissionService, new LegacySubmissionServer());
server.addService(LegacyChallengePhaseService, new LegacyChallengePhaseServer());
server.addService(PrizeServiceService, new PrizeServer());

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
