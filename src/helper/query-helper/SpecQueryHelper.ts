import { Operator, Query, QueryBuilder, Value } from "@topcoder-framework/client-relational";
import { CategorySchema } from "../../schema/spec/Category";
import { ComponentCatalogSchema } from "../../schema/spec/ComponentCatalog";
import { ComponentVersionSchema } from "../../schema/spec/ComponentVersion";

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

  public getComponentCatalogCreateQuery({
    currentVersion,
    shortDesc,
    componentName,
    desc,
    statusId,
    rootCategoryId,
    publicInd,
  }: {
    currentVersion: number;
    shortDesc: string;
    componentName: string;
    desc: string;
    statusId: number;
    rootCategoryId: number;
    publicInd: number;
  }): Query {
    return new QueryBuilder(ComponentCatalogSchema)
      .insert({
        currentVersion,
        shortDesc,
        componentName,
        description: desc,
        statusId,
        rootCategoryId,
        publicInd,
      })
      .build();
  }

  public getComponentVersionCreateQuery({
    componentId,
    version,
    versionText,
    phaseId,
    phaseTime,
    price,
    suspendedInd,
  }: {
    componentId: number;
    version: number;
    versionText: string;
    phaseId: number;
    phaseTime: string;
    price: number;
    suspendedInd: number;
  }): Query {
    return new QueryBuilder(ComponentVersionSchema)
      .insert({
        componentId,
        version,
        versionText,
        phaseId,
        phaseTime,
        price,
        suspendedInd,
      })
      .build();
  }
}

export default new SpecQueryHelper();
