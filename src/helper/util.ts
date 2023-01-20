import { Value } from "../grpc/models/rdb/relational";

class Util {
  public toIntValue(val: number): Value {
    return {
      value: {
        $case: "intValue",
        intValue: val,
      },
    };
  }

  public toFloatValue(val: number): Value {
    return {
      value: {
        $case: "floatValue",
        floatValue: val,
      },
    };
  }

  public toStringValue(val: string): Value {
    return {
      value: {
        $case: "stringValue",
        stringValue: val,
      },
    };
  }

  public toDatetimeValue(val: string): Value {
    return {
      value: {
        $case: "datetimeValue",
        datetimeValue: val,
      },
    };
  }
}
