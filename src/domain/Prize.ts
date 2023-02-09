import { Query, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult, ScanCriteria, UpdateResult, Value } from "@topcoder-framework/lib-common";
import { Util } from "../common/Util";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreatePrizeInput,
  Prize,
  PrizeList,
  UpdatePrizeInput,
} from "../models/domain-layer/legacy/prize";
import { PrizeSchema } from "../schema/project_payment/Prize";
import _ from "lodash";

class PrizeDomain {
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

  public async getSingle(input: GetSinglePrizeInput): Promise<Prize | undefined> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(PrizeSchema)
        .select(..._.map(PrizeSchema.columns))
        .where(PrizeSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(PrizeSchema.columns.prizeTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.prizeTypeId,
          },
        })
        .andWhere(PrizeSchema.columns.place, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.place,
          },
        })
        .build()
    );

    return rows && rows.length ? Prize.fromPartial(rows[0] as Prize) : undefined;
  }

  public async scan(criteria: ScanCriteria): Promise<PrizeList> {
    criteria.value = Value.wrap(criteria.value); // TODO: We shouldn't have to do this, check why scanCriteria.value is a Value

    const query: Query = new QueryBuilder(PrizeSchema)
      .select(...Object.values(PrizeSchema.columns))
      .where(criteria)
      .build();

    const { rows: prizes } = await queryRunner.run(query);

    const list: PrizeList = {
      prizes: prizes!.map((prize) => Prize.fromPartial(prize as Prize)),
    };

    return list;
  }

  public async update(updateInput: UpdatePrizeInput): Promise<UpdateResult> {
    const { updateInput: input, updateCriteria: criteria } = updateInput;

    const query: Query = new QueryBuilder(PrizeSchema)
      .update({ ...input })
      .where(...Util.toScanCriteria({ ...criteria }))
      .build();

    console.log("Query", query);
    const { affectedRows } = await queryRunner.run(query);

    return {
      updatedCount: affectedRows!,
    };
  }
}

export default new PrizeDomain();
