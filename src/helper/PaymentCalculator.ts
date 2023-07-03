// Payment = Fixed_Amount + (Base_Coefficient + Incremental_Coefficient * Number_Of_Submissions) * 1st_place_prize

import { Transaction } from "@topcoder-framework/client-relational";
import { ProjectCategories, ProjectPaymentTypeIds, ResourceRoleTypeIds } from "../config/constants";
import ChallengeQueryHelper from "./query-helper/ChallengeQueryHelper";
import ResourceQueryHelper from "./query-helper/ResourceQueryHelper";

class PaymentCalculator {
  public static async createOrUpdateIterativeReviewerPayment(
    projectId: number,
    resourceId: number,
    userId: number,
    transaction: Transaction
  ) {
    let paymentAmount = 0;

    if (await this.shouldUseManualAmount(transaction, resourceId)) {
      const reviewCostQuery = ChallengeQueryHelper.getChallengeInfoSelectQuery(projectId, 33); // 33: Review Cost
      const reviewCostResult = await transaction.add(reviewCostQuery);
      if (reviewCostResult.rows != null && reviewCostResult.rows.length > 0) {
        paymentAmount = reviewCostResult.rows[0].value as number;
      }
    } else {
      const firstPlacePrizeQuery = ChallengeQueryHelper.getChallengeInfoSelectQuery(projectId, 36); // 36: First Place Cost
      const firstPlacePrizeResult = await transaction.add(firstPlacePrizeQuery);
      let firstPlacePrize = 0;
      if (firstPlacePrizeResult.rows != null && firstPlacePrizeResult.rows.length > 0) {
        firstPlacePrize = firstPlacePrizeResult.rows[0].value as number;
      }
      const query = ChallengeQueryHelper.getChallengePaymentAmountByResourceId(
        ProjectCategories.First2Finish,
        firstPlacePrize,
        resourceId,
        ResourceRoleTypeIds.IterativeReviewer
      );
      const result = await transaction.add(query);
      if (result.rows == null || result.rows.length === 0) {
        paymentAmount = 0;
      } else {
        paymentAmount = result.rows[0].payment as number;
      }
    }

    const projectPaymentRecordId = await this.getProjectPaymentRecordId(
      transaction,
      resourceId,
      ProjectPaymentTypeIds.ReviewPayment
    );

    let paymentQuery = null;
    if (projectPaymentRecordId) {
      paymentQuery = ChallengeQueryHelper.getProjectPaymentUpdateQuery(
        projectPaymentRecordId,
        resourceId,
        paymentAmount,
        userId
      );
    } else {
      paymentQuery = ChallengeQueryHelper.getProjectPaymentCreateQuery(
        resourceId,
        paymentAmount,
        ProjectPaymentTypeIds.ReviewPayment,
        userId
      );
    }

    await transaction.add(paymentQuery);
  }

  private static async shouldUseManualAmount(transaction: Transaction, resourceId: number) {
    const query = ResourceQueryHelper.getResourceInfoQuery(resourceId, 15); // 15 = Manual Payments
    const result = await transaction.add(query);
    if (result.rows == null || result.rows.length === 0) {
      return false;
    }

    return result.rows[0].value === "true";
  }

  private static async getProjectPaymentRecordId(
    transaction: Transaction,
    resourceId: number,
    projectPaymentTypeId: number
  ) {
    const query = ChallengeQueryHelper.getProjectPaymentSelectQuery(resourceId, projectPaymentTypeId);
    const result = await transaction.add(query);
    if (result.rows == null || result.rows.length === 0) {
      return null;
    }

    return result.rows[0].project_payment_id as number;
  }
}

export default PaymentCalculator;
