import { Row, Value } from "@topcoder-framework/client-relational";
import _ from "lodash";

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

  public parseRow(row: Row): any {
    const obj: any = {};
    for (const key of Object.keys(row.values)) {
      if (row.values[key].value?.$case) {
        obj[_.camelCase(key)] = _.get(row.values[key].value, row.values[key].value!.$case);
      }
    }
    return obj;
  }
}

export default new Util();
