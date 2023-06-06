/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { QueryInput, QueryOutput } from "../query";

export type QueryService = typeof QueryService;
export const QueryService = {
  rawQuery: {
    path: "/topcoder.domain.service.query.Query/RawQuery",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QueryInput) => Buffer.from(QueryInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QueryInput.decode(value),
    responseSerialize: (value: QueryOutput) => Buffer.from(QueryOutput.encode(value).finish()),
    responseDeserialize: (value: Buffer) => QueryOutput.decode(value),
  },
} as const;

export interface QueryServer extends UntypedServiceImplementation {
  rawQuery: handleUnaryCall<QueryInput, QueryOutput>;
}
