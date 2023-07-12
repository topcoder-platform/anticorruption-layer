import { Query } from "@topcoder-framework/client-relational";

class ResourceQueryHelper {
  public getResourceInfoQuery(resourceId: number, resourceInfoTypeId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT value FROM resource_info WHERE resource_id = ${resourceId} AND resource_info_type_id = ${resourceInfoTypeId}`,
        },
      },
    };
  }
}

export default new ResourceQueryHelper();
