import { Row, Value as RelationalValue } from "@topcoder-framework/client-relational";
import { Operator, ScanCriteria, Value } from "@topcoder-framework/lib-common";
import dayjs, { Dayjs } from "dayjs";
import _ from "lodash";
import { dateFormatIfx, IFX_TIMEZONE } from "../config/constants";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export class Util {
  public static toScanCriteria(criteria: { [key: string]: any }): ScanCriteria[] {
    return Object.entries(criteria).map(
      ([key, value]) =>
        ({
          key,
          operator: Operator.OPERATOR_EQUAL,
          value: Value.wrap(value),
        } as ScanCriteria)
    );
  }

  public static toIntValue(val: number): RelationalValue {
    return {
      value: {
        $case: "intValue",
        intValue: val,
      },
    };
  }

  public static toFloatValue(val: number): RelationalValue {
    return {
      value: {
        $case: "floatValue",
        floatValue: val,
      },
    };
  }

  public static toStringValue(val: string): RelationalValue {
    return {
      value: {
        $case: "stringValue",
        stringValue: val,
      },
    };
  }

  public static toDatetimeValue(val: string): RelationalValue {
    return {
      value: {
        $case: "datetimeValue",
        datetimeValue: val,
      },
    };
  }

  public static parseRow(row: Row): any {
    const obj: any = {};
    for (const key of Object.keys(row.values)) {
      if (row.values[key].value?.$case) {
        obj[_.camelCase(key)] = _.get(row.values[key].value, row.values[key].value!.$case);
      }
    }
    return obj;
  }

  public static dateFromInformix(date?: string, format: string = dateFormatIfx): Dayjs | undefined {
    if (_.isEmpty(date)) {
      return undefined;
    }
    return dayjs.tz(date, format, IFX_TIMEZONE).utc();
  }

  public static dateToInformix(date?: string, format: string = dateFormatIfx): string | undefined {
    if (_.isEmpty(date)) {
      return undefined;
    }
    return dayjs(date).tz(IFX_TIMEZONE).format(format);
  }

  public static formatDate(str: string | undefined) {
    if (str == null || str.length == 0) {
      return undefined;
    }
    try {
      const date = new Date(str);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

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

  public static assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
      throw new Error("Expected 'val' to be defined");
    }
  }
}
