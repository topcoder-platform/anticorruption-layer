import PhaseFactQueryHelper from "./query-helper/PhaseFactQueryHelper";
import { queryRunner } from "./QueryRunner";

class PhaseFactHelper {
  async areAllSubmissionsReviewed(legacyId: number): Promise<boolean> {
    const query = PhaseFactQueryHelper.getReviewsByChallengeIdQuery(legacyId);
    const result = await queryRunner.run(query);

    if (result.rows == null) {
      throw new Error("No rows returned");
    }
    const { rows } = result as { rows: { review_id?: number }[] };
    return rows.every((row) => row.review_id != null && row.review_id > 0);
  }
}

export default new PhaseFactHelper();
