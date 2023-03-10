import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateLegacyChallengePaymentInput,
  DeleteLegacyChallengePaymentInput,
  GetLegacyChallengePaymentInput,
  LegacyChallengePayment,
  LegacyChallengePaymentList,
  UpdateLegacyChallengePaymentInput,
} from "../models/domain-layer/legacy/challenge_payment";
import { ProjectPaymentSchema } from "../schema/project_payment/ProjectPayment";

class LegacyPaymentDomain {
  public async getProjectPayments(
    input: GetLegacyChallengePaymentInput
  ): Promise<LegacyChallengePaymentList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectPaymentSchema)
        .select(..._.map(ProjectPaymentSchema.columns))
        .where(ProjectPaymentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceId,
          },
        })
        .andWhere(ProjectPaymentSchema.columns.projectPaymentTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectPaymentTypeId,
          },
        })
        .build()
    );

    return {
      projectPayments:
        rows && rows?.length > 0
          ? rows.map((r) => LegacyChallengePayment.fromPartial(r as LegacyChallengePayment))
          : [],
    };
  }

  public async createProjectPayment(
    input: CreateLegacyChallengePaymentInput
  ): Promise<CreateResult> {
    const createInput = {
      ...input,
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ProjectPaymentSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  // TODO: Test this after informix-access-layer is fixed
  public async updateProjectPayment(input: UpdateLegacyChallengePaymentInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectPaymentSchema)
        .update({
          ...input,
        })
        .where(ProjectPaymentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceId,
          },
        })
        .andWhere(ProjectPaymentSchema.columns.projectPaymentTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectPaymentTypeId,
          },
        })
        .build()
    );
  }

  public async deleteProjectPayment(input: DeleteLegacyChallengePaymentInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectPaymentSchema)
        .delete()
        .where(ProjectPaymentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceId,
          },
        })
        .andWhere(ProjectPaymentSchema.columns.projectPaymentTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectPaymentTypeId,
          },
        })
        .build()
    );
  }
}

export default new LegacyPaymentDomain();
