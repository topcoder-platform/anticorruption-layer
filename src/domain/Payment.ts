import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import { GetProjectPaymentsInput, CreatePrizeInput, DeletePrizeInput, UpdatePrizeInput, ProjectPaymentList, ProjectPayment, CreateProjectPaymentsInput, UpdateProjectPaymentsInput, DeleteProjectPaymentsInput, GetPrizesInput, PrizeList, Prize } from "../models/domain-layer/legacy/payment";
import { PrizeSchema } from "../schema/project_payment/Prize";
import { ProjectPaymentSchema } from "../schema/project_payment/ProjectPayment";

class LegacyPaymentDomain {
  public async getProjectPayments(input:GetProjectPaymentsInput): Promise<ProjectPaymentList> {
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

    return { projectPayments: rows && rows?.length > 0 ? rows!.map(r => ProjectPayment.fromPartial(r as ProjectPayment)) : [] }
  }

  public async createProjectPayment(input:CreateProjectPaymentsInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ProjectPaymentSchema)
      .insert(createInput)
      .build()
    )
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  // TODO: Test this after informix-access-layer is fixed
  public async updateProjectPayment (input: UpdateProjectPaymentsInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectPaymentSchema)
        .update({
          ...input,
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
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

  public async deleteProjectPayment(input:DeleteProjectPaymentsInput) {
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

  public async getProjectPrizes(input:GetPrizesInput): Promise<PrizeList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(PrizeSchema)
        .select(..._.map(PrizeSchema.columns))
        .where(PrizeSchema.columns.prizeTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.prizeTypeId,
          },
        })
        .andWhere(PrizeSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );

    return { prizes: rows && rows?.length > 0 ? rows!.map(r => Prize.fromPartial(r as Prize)) : [] }
  }

  public async createProjectPrize(input:CreatePrizeInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(PrizeSchema)
      .insert(createInput)
      .build()
    )
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  // TODO: Test this after informix-access-layer is fixed
  public async updateProjectPrize (input: UpdatePrizeInput) {
    await queryRunner.run(
      new QueryBuilder(PrizeSchema)
        .update({
          ...input,
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
        })
        .where(PrizeSchema.columns.prizeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.prizeId,
          },
        })
        .andWhere(PrizeSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
  }

  public async deleteProjectPrize(input:DeletePrizeInput) {
    await queryRunner.run(
      new QueryBuilder(PrizeSchema)
      .delete()
      .where(PrizeSchema.columns.prizeId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.prizeId,
        },
      })
      .andWhere(PrizeSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectId,
        },
      })
      .build()
    );
  }
}

export default new LegacyPaymentDomain();
