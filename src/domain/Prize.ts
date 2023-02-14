import { Query, QueryBuilder, Operator } from "@topcoder-framework/client-relational";
import { CreateResult, ScanRequest, UpdateResult } from "@topcoder-framework/lib-common";
import { Util } from "../common/Util";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreatePrizeInput,
  DeletePrizeInput,
  Prize,
  PrizeList,
  UpdatePrizeInput,
} from "../models/domain-layer/legacy/prize";
import { PrizeSchema } from "../schema/project_payment/Prize";

class PrizeDomain {
  public async scan(scanRequest: ScanRequest): Promise<PrizeList> {
    const { criteria: scanCriteria } = scanRequest;

    const query: Query = (
      scanCriteria.length === 0
        ? new QueryBuilder(PrizeSchema).select(...Object.values(PrizeSchema.columns))
        : scanCriteria.reduce(
            (query, criterion, index) => (index === 0 ? query : query.andWhere(criterion)),
            new QueryBuilder(PrizeSchema)
              .select(...Object.values(PrizeSchema.columns))
              .where(scanCriteria[0])
          )
    ).build();

    const { rows: prizes } = await queryRunner.run(query);

    const list: PrizeList = {
      prizes: prizes!.map((prize) => Prize.fromPartial(prize as Prize)),
    };

    return list;
  }

  public async create(input: CreatePrizeInput): Promise<CreateResult> {
    const createInput: Partial<Prize> = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };

    const { lastInsertId: prizeId } = await queryRunner.run(
      new QueryBuilder<CreatePrizeInput>(PrizeSchema).insert(createInput).build()
    );

    return {
      kind: {
        $case: "integerId",
        integerId: prizeId!,
      },
    };
  }

  public async update(updateInput: UpdatePrizeInput): Promise<UpdateResult> {
    const { updateInput: input, updateCriteria: criteria } = updateInput;

    const query: Query = new QueryBuilder(PrizeSchema)
      .update({ ...input })
      .where(...Util.toScanCriteria({ ...criteria }))
      .build();

    const { affectedRows } = await queryRunner.run(query);

    return {
      updatedCount: affectedRows!,
    };
  }

  public async delete(input: DeletePrizeInput) {
    await queryRunner.run(
      new QueryBuilder(PrizeSchema)
        .delete()
        .where(PrizeSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(PrizeSchema.columns.prizeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.prizeId,
          },
        })
        .build()
    );
  }
}

export default new PrizeDomain();
