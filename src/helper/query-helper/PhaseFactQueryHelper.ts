import { Query } from "@topcoder-framework/client-relational";

class PhaseFactQueryHelper {
  public getReviewsByChallengeIdQuery(legacyId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `
          SELECT p.project_id, u.upload_id, s.submission_id, r.review_id
          FROM project p
                   INNER JOIN upload u on u.project_id = p.project_id
                   INNER JOIN submission s on s.upload_id = u.upload_id
                   LEFT JOIN review r on r.submission_id = s.submission_id
          WHERE p.project_id = ${legacyId}
            AND u.upload_status_id = 1
            AND u.upload_type_id = 1
            AND s.submission_status_id = 1`,
        },
      },
    };
  }
}

export default new PhaseFactQueryHelper();
