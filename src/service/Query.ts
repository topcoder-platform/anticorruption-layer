import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import { QueryInput, QueryOutput } from "../models/domain-layer/legacy/query";

import { QueryServer, QueryService } from "../models/domain-layer/legacy/services/query";

import QueryDomain from "../domain/Query";
import ErrorHelper from "../helper/ErrorHelper";

class QueryServiceServerImpl implements QueryServer {
  [name: string]: UntypedHandleCall;

  rawQuery: handleUnaryCall<QueryInput, QueryOutput> = (
    call: ServerUnaryCall<QueryInput, QueryOutput>,
    callback: sendUnaryData<QueryOutput>,
  ) => {
    QueryDomain.rawQuery(call.request)
      .then((response) => callback(null, response))
      .catch((err: Error) => callback(ErrorHelper.wrapError(err), null));
  };
}

export { QueryServiceServerImpl as QueryServer, QueryService };
