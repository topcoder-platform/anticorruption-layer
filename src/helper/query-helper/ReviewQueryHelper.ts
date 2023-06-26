import { Query } from "@topcoder-framework/client-relational";

class ReviewQueryHelper {
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
