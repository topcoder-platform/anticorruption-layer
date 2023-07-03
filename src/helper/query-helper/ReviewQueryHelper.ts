import { Query } from "@topcoder-framework/client-relational";

class ReviewQueryHelper {
  public getSubmitterResourceIdQuery(submissionId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT u.resource_id FROM upload u INNER JOIN submission s on s.upload_id = u.upload_id WHERE s.submission_id = ${submissionId}`,
        },
      },
    };
  }

  public getSetSubmissionScoreFromReviewQuery(
    {
      submissionId,
      initialScore,
      finalScore,
      submissionStatusId,
      placement,
      userRank,
      prizeId,
    }: {
      submissionId: number;
      initialScore: number;
      finalScore: number;
      submissionStatusId: number;
      userRank: number;
      placement: number;
      prizeId: number | undefined;
    },
    userId: number
  ): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `UPDATE submission
          SET initial_score         = ${initialScore},
              final_score           = ${finalScore},
              placement             = ${placement},
              submission_status_id  = ${submissionStatusId},
              user_rank             = ${userRank},
              prize_id              = ${prizeId || "null"},
              modify_user           = ${userId}
          WHERE submission_id = ${submissionId}`,
        },
      },
    };
  }
}

export default new ReviewQueryHelper();
