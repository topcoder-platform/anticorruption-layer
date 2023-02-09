import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import { GetContestEligibilityInput, ContestEligibilityList, ContestEligibility, GetGroupContestEligibilityInput, GroupContestEligibilityList, GroupContestEligibility, DeleteContestEligibilityInput, DeleteGroupContestEligibilityInput } from "../models/domain-layer/legacy/group_contest_eligibility";
import { ContestEligibilitySchema } from "../schema/contest_eligibility/ContestEligibility";
import { GroupContestEligibilitySchema } from "../schema/contest_eligibility/GroupContestEligibility";

class LegacyGroupContestEligibilityDomain {
  public async getContestEligibilities(input:GetContestEligibilityInput): Promise<ContestEligibilityList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ContestEligibilitySchema)
        .select(..._.map(ContestEligibilitySchema.columns))
        .where(ContestEligibilitySchema.columns.contestId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.contestId,
          },
        })
        .build()
    );

    return { contestEligibilities: rows && rows?.length > 0 ? rows!.map(r => ContestEligibility.fromPartial(r as ContestEligibility)) : [] }
  }

  public async createContestEligibility(input:ContestEligibility): Promise<CreateResult> {
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ContestEligibilitySchema)
      .insert({ ...input })
      .build()
    )
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async getGroupContestEligibilities(input:GetGroupContestEligibilityInput): Promise<GroupContestEligibilityList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(GroupContestEligibilitySchema)
        .select(..._.map(GroupContestEligibilitySchema.columns))
        .where(GroupContestEligibilitySchema.columns.contestEligibilityId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.contestEligibilityId,
          },
        })
        .build()
    );

    return { groupContestEligibilities: rows && rows?.length > 0 ? rows!.map(r => GroupContestEligibility.fromPartial(r as GroupContestEligibility)) : [] }
  }

  public async createGroupContestEligibility(input:GroupContestEligibility): Promise<CreateResult> {
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(GroupContestEligibilitySchema)
      .insert({ ...input })
      .build()
    )
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async deleteContestEligibility (input: DeleteContestEligibilityInput) {
    await queryRunner.run(
      new QueryBuilder(ContestEligibilitySchema)
        .delete()
        .where(ContestEligibilitySchema.columns.contestEligibilityId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.contestEligibilityId,
          },
        })
        .build()
    );
  }

  public async deleteGroupContestEligibility (input: DeleteGroupContestEligibilityInput) {
    await queryRunner.run(
      new QueryBuilder(GroupContestEligibilitySchema)
        .delete()
        .where(GroupContestEligibilitySchema.columns.contestEligibilityId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.contestEligibilityId,
          },
        })
        .andWhere(GroupContestEligibilitySchema.columns.groupId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.groupId,
          },
        })
        .build()
    );
  }
}

export default new LegacyGroupContestEligibilityDomain();
