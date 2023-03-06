import assert from "assert";

export const ENV = <string>process.env.ENV || "local";
export const GRPC_SERVER_HOST = process.env.GRPC_SERVER_HOST || "localhost";
export const GRPC_SERVER_PORT = process.env.GRPC_SERVER_PORT || 9091;

export const GRPC_RDB_SERVER_HOST = process.env.GRPC_RDB_SERVER_HOST;
export const GRPC_RDB_SERVER_PORT = process.env.GRPC_RDB_SERVER_PORT;

assert(GRPC_RDB_SERVER_HOST, "GRPC_RDB_SERVER_HOST is required");
assert(GRPC_RDB_SERVER_PORT, "GRPC_RDB_SERVER_PORT is required");
