import { QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult, ScanCriteria } from "@topcoder-framework/lib-common";
import { queryRunner } from "../helper/QueryRunner";
import { CreatePrizeInput, Prize, PrizeList } from "../models/domain-layer/legacy/prize";
import { PrizeSchema } from "../schema/project_payment/Prize";

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

  public async scan(criteria: ScanCriteria): Promise<PrizeList> {
    const { rows: prizes } = await queryRunner.run(
      new QueryBuilder(PrizeSchema)
        .select(
          PrizeSchema.columns.prizeId,
          PrizeSchema.columns.prizeTypeId,
          PrizeSchema.columns.prizeAmount,
          PrizeSchema.columns.place,
          PrizeSchema.columns.numberOfSubmissions,
          PrizeSchema.columns.projectId,
          PrizeSchema.columns.createDate,
          PrizeSchema.columns.createUser,
          PrizeSchema.columns.modifyDate,
          PrizeSchema.columns.modifyUser
        )
        .build()
    );

    // const prizes = (await new QueryRunner(PrizeSchema).select([]).limit(10).offset(0).exec()) as [
    //   {
    //     values: {
    //       prize_id: Value;
    //       prize_type_id: number;
    //       prize_amount: Value;
    //       place: number;
    //       number_of_submissions: number;
    //       prize_description: string;
    //       project_id: number;
    //       create_date: number;
    //       create_user: number;
    //       modify_date: number;
    //       modify_user: number;
    //     };
    //   }
    // ];

    console.log("prizes", prizes);

    const list: PrizeList = {
      prizes: [],
      // prizes: prizes!.map(({ values }) => {
      //   return {
      //     place: values.place,
      //     numberOfSubmissions: values.number_of_submissions,
      //     prizeDescription: values.prize_description,
      //     projectId: values.project_id,
      //     createDate: values.create_date,
      //     createUser: values.create_user,
      //     modifyDate: values.modify_date,
      //     modifyUser: values.modify_user,
      //   };
      // }),
    };

    return list;
  }
}

export default new PrizeDomain();
