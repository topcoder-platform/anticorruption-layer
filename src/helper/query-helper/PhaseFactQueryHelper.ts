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
          `,
        },
      },
    };
  }

  public getSubmissionsByChallengeIdQuery(legacyId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `
          SELECT p.project_id, u.upload_id, s.submission_id
          FROM project p
            INNER JOIN upload u on u.project_id = p.project_id
            INNER JOIN submission s on s.upload_id = u.upload_id
          WHERE p.project_id = ${legacyId}
            AND u.upload_status_id = 1
            AND u.upload_type_id = 1
          `,
        },
      },
    };
  }

  public getIterativewReviewByChallengeIdQuery(legacyId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `
          SELECT FIRST 1 p.project_id, ph.project_phase_id, r.review_id
          FROM project p
            INNER JOIN project_phase ph on p.project_id = ph.project_id
            LEFT JOIN review r on ph.project_phase_id = r.project_phase_id
          WHERE ph.phase_type_id = 18
            AND phase_status_id = 2
            AND p.project_id = ${legacyId}};
        `,
        },
      },
    };
  }

  public getReviewScoreByReviewIdQuery(reviewId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `
          SELECT r.review_id, r.score, s.min_score
          FROM review r
            INNER JOIN scorecard s on s.scorecard_id = r.scorecard_id
          WHERE r.review_id = ${reviewId}
        `,
        },
      },
    };
  }
}

export default new PhaseFactQueryHelper();
