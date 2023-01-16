import { Value } from "../dal/models/rdb/SQL";

class Util {
  public static unwrap(message: Value): string | number | undefined {
    const { value } = message;

    if (value == null) return undefined;

    if (value.$case === "intValue") {
      return value.intValue;
    } else if (value.$case === "dateValue") {
      return value.dateValue.toString();
    } else if (value.$case === "longValue") {
      return value.longValue;
    } else if (value.$case === "stringValue") {
      return value.stringValue.toString();
    } else {
      return undefined;
    }
  }
}

export default Util;
