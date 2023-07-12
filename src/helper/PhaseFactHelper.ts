import PhaseFactQueryHelper from "./query-helper/PhaseFactQueryHelper";
import { queryRunner } from "./QueryRunner";

class PhaseFactHelper {
  async submissionsCount(legacyId: number): Promise<number> {
    const query = PhaseFactQueryHelper.getSubmissionsByChallengeIdQuery(legacyId);
    const result = await queryRunner.run(query);
    if (result.rows == null) {
      return 0;
    }
    const { rows } = result as { rows: { submission_id?: number }[] };
    return rows.filter((row) => row.submission_id != null && row.submission_id > 0).length;
  }
  async reviewCount(legacyId: number): Promise<number> {
    const query = PhaseFactQueryHelper.getReviewsByChallengeIdQuery(legacyId);
    const result = await queryRunner.run(query);
    if (result.rows == null) {
      return 0;
    }
    const { rows } = result as { rows: { review_id?: number }[] };
    return rows.filter((row) => row.review_id != null && row.review_id > 0).length;
  }

  async getReviewIdInCurrentOpenIterativeReviewPhase(legacyId: number): Promise<number | null> {
    const query = PhaseFactQueryHelper.getIterativewReviewByChallengeIdQuery(legacyId);
    const result = await queryRunner.run(query);
    if (result.rows == null) {
      return null;
    }
    const { rows } = result as { rows: { review_id?: number }[] };

    if (rows.length === 0) {
      return null;
    }

    if (rows[0].review_id == null || rows[0].review_id <= 0) {
      return null;
    }

    return rows[0].review_id;
  }

  async reviewHasPassingScore(reviewId: number): Promise<boolean> {
    const query = PhaseFactQueryHelper.getReviewScoreByReviewIdQuery(reviewId);
    const result = await queryRunner.run(query);
    if (result.rows == null) {
      return false;
    }
    const { rows } = result as { rows: { score?: number; min_score?: number }[] };

    if (rows.length === 0) {
      return false;
    }

    const { score = 0, min_score: minScore = 100 } = rows[0];

    return score >= minScore;
  }
}

export default new PhaseFactHelper();
