import { status, StatusBuilder, StatusObject } from "@grpc/grpc-js";

class ErrorHelper {
  // TODO: Move to @topcoder-framework
  public static wrapError(error: Error): Partial<StatusObject> {
    return new StatusBuilder()
      .withCode(status.INTERNAL)
      .withDetails(error.message || "Internal Server Error")
      .build();
  }
}

export default ErrorHelper;
