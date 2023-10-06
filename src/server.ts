import * as dotenv from "dotenv";
import "source-map-support/register";

dotenv.config();

import * as path from "path";

import { Server, ServerCredentials } from "@grpc/grpc-js";
import { addReflection } from "grpc-server-reflection";
import { LegacyChallengeServer, LegacyChallengeService } from "./service/LegacyChallenge";

import InterceptorWrapper from "./interceptors/InterceptorWrapper";
import { QueryServer, QueryService } from "./service/Query";
import { LegacySyncServer, LegacySyncService } from "./service/Sync";

const { GRPC_SERVER_HOST = "", GRPC_SERVER_PORT = 9091 } = process.env;

const server = new Server({
  "grpc.max_send_message_length": 10 * 1024 * 1024, // e.g., 10 MB
  "grpc.max_receive_message_length": 10 * 1024 * 1024, // e.g., 10 MB
  "grpc.keepalive_time_ms": 120000,
  "grpc.keepalive_timeout_ms": 20000,
  "grpc.http2.min_time_between_pings_ms": 120000,
  "grpc.http2.max_pings_without_data": 0,
  "grpc.keepalive_permit_without_calls": 1,
});

if (process.env.ENV === "local") {
  addReflection(server, path.join(__dirname, "../reflections/reflection.bin"));
}

server.addService(
  LegacyChallengeService,
  InterceptorWrapper.serviceWrapper(LegacyChallengeService, new LegacyChallengeServer(), "LegacyChallenge"),
);
server.addService(
  LegacySyncService,
  InterceptorWrapper.serviceWrapper(LegacySyncService, new LegacySyncServer(), "LegacySync"),
);
server.addService(QueryService, InterceptorWrapper.serviceWrapper(QueryService, new QueryServer(), "Query"));

server.bindAsync(
  `${GRPC_SERVER_HOST}:${GRPC_SERVER_PORT}`,
  ServerCredentials.createInsecure(),
  (err: Error | null, bindPort: number) => {
    if (err) {
      throw err;
    }

    console.info(`gRPC:Server running at: ${GRPC_SERVER_HOST}:${bindPort}`, new Date().toLocaleString());
    server.start();
  },
);
