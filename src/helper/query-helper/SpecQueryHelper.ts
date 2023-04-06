import { Operator, Query, QueryBuilder, Value } from "@topcoder-framework/client-relational";
import { CategorySchema } from "../../schema/spec/Category";

class SpecQueryHelper {
  public getCategoryQuery(categoryName: string): Query {
    const categoryNameValue: Value = {
      value: {
        $case: "stringValue",
        stringValue: categoryName,
      },
    };

    return new QueryBuilder(CategorySchema)
      .select(CategorySchema.columns.categoryId)
      .where(CategorySchema.columns.categoryName, Operator.OPERATOR_EQUAL, categoryNameValue)
      .build();
  }
}

export default new SpecQueryHelper();
