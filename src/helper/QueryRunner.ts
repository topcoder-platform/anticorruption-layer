const { GRPC_RDB_SERVER_HOST, GRPC_RDB_SERVER_PORT } = process.env;

import { QueryRunner } from "@topcoder-framework/client-relational";

export const queryRunner = new QueryRunner(GRPC_RDB_SERVER_HOST!, parseInt(GRPC_RDB_SERVER_PORT!, 10));
