import { Query } from "@topcoder-framework/client-relational";

class SubmissionQueryHelper {
  public getChallengeProperties(challengeId: number, userId: number, resourceRoleId: string, phaseId: string): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `select r.resource_id, pi28.value, pp.phase_type_id, pcl.project_type_id
          from project p, project_category_lu pcl, resource r, project_phase pp, outer project_info pi28
          where p.project_category_id = pcl.project_category_id and p.project_id = r.project_id
          and r.user_id = ${userId} and r.resource_role_id = ${resourceRoleId} and p.project_id = pp.project_id
          and pp.project_phase_id = ${phaseId} and p.project_id = pi28.project_id
          and pi28.project_info_type_id = 28 and p.project_id = ${challengeId}`,
        },
      },
    };
  }
}

export default new SubmissionQueryHelper();