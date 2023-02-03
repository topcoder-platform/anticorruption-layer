import { CreateResult, ScanCriteria, Value } from "@topcoder-framework/lib-common";
import { QueryRunner } from "../common/QueryRunner";
import { CreatePrizeInput, Prize, PrizeList } from "../models/domain-layer/legacy/prize";
import { PrizeSchema } from "../schema/project_payment/Prize";

class PrizeDomain {
  public async create(input: CreatePrizeInput): Promise<CreateResult> {
    const createInput: Partial<Prize> = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };

    const prizeId = (await new QueryRunner(PrizeSchema).insert(createInput).exec()) as number;
    return {
      kind: {
        $case: "integerId",
        integerId: prizeId,
      },
    };
  }

  public async scan(criteria: ScanCriteria): Promise<PrizeList> {
    const prizes = (await new QueryRunner(PrizeSchema)
      .select([
        PrizeSchema.columns.prizeId,
        PrizeSchema.columns.prizeTypeId,
        PrizeSchema.columns.prizeAmount,
        PrizeSchema.columns.place,
        PrizeSchema.columns.numberOfSubmissions,
        PrizeSchema.columns.projectId,
        PrizeSchema.columns.createDate,
        PrizeSchema.columns.createUser,
        PrizeSchema.columns.modifyDate,
        PrizeSchema.columns.modifyUser,
      ])
      .limit(10)
      .offset(0)
      .exec()) as [
      {
        values: {
          prize_id: Value;
          prize_type_id: number;
          prize_amount: Value;
          place: number;
          number_of_submissions: number;
          prize_description: string;
          project_id: number;
          create_date: number;
          create_user: number;
          modify_date: number;
          modify_user: number;
        };
      }
    ];

    console.log("prizes", prizes);

    const list: PrizeList = {
      prizes: prizes.map(({ values }) => {
        return {
          prizeId:
            values.prize_id.kind?.$case === "numberValue" ? values.prize_id.kind.numberValue : 12,
          prizeTypeId: values.prize_type_id,
          prizeAmount:
            values.prize_amount.kind?.$case === "numberValue"
              ? values.prize_amount.kind.numberValue
              : 12,
          place: values.place,
          numberOfSubmissions: values.number_of_submissions,
          prizeDescription: values.prize_description,
          projectId: values.project_id,
          createDate: values.create_date,
          createUser: values.create_user,
          modifyDate: values.modify_date,
          modifyUser: values.modify_user,
        };
      }),
    };

    return list;
  }
}

export default new PrizeDomain();
