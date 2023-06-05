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
  LegacySyncService,
  InterceptorWrapper.serviceWrapper(LegacySyncService, new LegacySyncServer(), "LegacySync")
);
server.addService(
  QueryService,
  InterceptorWrapper.serviceWrapper(QueryService, new QueryServer(), "Query")
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
