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

  public formatDate(str: string | undefined) {
    if (str == null || str.length == 0) {
      return undefined;
    }
    try {
      let date = new Date(str);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      let seconds = date.getSeconds().toString().padStart(2, "0");
      let milliseconds = date.getMilliseconds().toString().padStart(3, "0");

      return (
        [year, month, day].join("-") +
        " " +
        [hours, minutes, seconds].join(":") +
        "." +
        milliseconds
      );
    } catch {
      return undefined;
    }
  }
}

export default new Util();
