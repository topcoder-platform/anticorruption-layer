import { Operator, ScanCriteria, Value } from "@topcoder-framework/lib-common";

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
}
