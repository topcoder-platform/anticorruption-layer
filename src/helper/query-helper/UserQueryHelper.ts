import { Operator, Query, QueryBuilder, Value } from "@topcoder-framework/client-relational";
import { UserSchema } from "../../schema/member/User";

class UserHelper {
  public getUserHandleQuery(userId: number): Query {
    const userIdValue: Value = {
      value: {
        $case: "intValue",
        intValue: userId,
      },
    };
    return new QueryBuilder(UserSchema)
      .select(UserSchema.columns.handleLower)
      .where(UserSchema.columns.userId, Operator.OPERATOR_EQUAL, userIdValue)
      .build();
  }
}

export default new UserHelper();
