import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import ErrorHelper, { GrpcError } from "../helper/ErrorHelper";
import { Interceptor } from "./InterceptorWrapper";
class LoggingInterceptor implements Interceptor {
  public onMessage(call: ServerUnaryCall<any, any>, serviceName: string, method: string) {
    console.log("OnMessage:", serviceName, "#", method, call.request, call.metadata);
  }
  public onSuccess(response: any, call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
    console.log("Request succeeded:", response);
    callback(null, response);
  }
  public onError(error: GrpcError, call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) {
    console.error("Request failed:", error);
    callback(ErrorHelper.wrapError(error));
  }
}

export default new LoggingInterceptor();
