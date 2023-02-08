import _ from 'lodash';
import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { queryRunner } from "../helper/QueryRunner";
import {
  CheckChallengeExistsResponse, CloseChallengeInput, LegacyChallenge, LegacyChallengeId, UpdateChallengeInput,
} from "../models/domain-layer/legacy/challenge";
import { ProjectSchema } from "../schema/project/Project";

class LegacyChallengeDomain {

  public async activateChallenge(input:LegacyChallengeId) {
    // TODO: Activate
  }

  public async closeChallenge(input:CloseChallengeInput) {
    // TODO: close challenge
  }

  public async update(input:UpdateChallengeInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectSchema)
        .update({ projectStatusId: input.projectStatusId, modifyUser: input.modifyUser })
        .where(ProjectSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
  }

  public async getLegacyChallenge(
    input: LegacyChallengeId
  ): Promise<LegacyChallenge|undefined> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectSchema)
        .select(..._.map(ProjectSchema.columns))
        .where(ProjectSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.legacyChallengeId,
          },
        })
        .limit(1)
        .build()
    );
    return rows?.length ? LegacyChallenge.fromPartial(rows[0] as LegacyChallenge) : undefined;
  }

  public async checkChallengeExists(
    legacyChallengeId: number
  ): Promise<CheckChallengeExistsResponse> {
    const { projectId } = ProjectSchema.columns;

    const query = new QueryBuilder(ProjectSchema)
      .select(projectId)
      .where(projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: legacyChallengeId,
        },
      })
      .limit(1)
      .build();

    const { rows } = await queryRunner.run(query);

    return {
      exists: rows?.length == 1,
    };
  }

<<<<<<< HEAD
  public async createLegacyChallenge(input: CreateChallengeInput): Promise<number> {
    const transaction = queryRunner.beginTransaction();

    const createLegacyChallengeQuery = new QueryBuilder(ProjectSchema)
      .insert({
        projectStatusId: input.projectStatusId,
        projectCategoryId: input.projectCategoryId,
        tcDirectProjectId: input.tcDirectProjectId,
      })
      .build();

    const createLegacyChallengeQueryResult = await transaction.add(createLegacyChallengeQuery);
    if (createLegacyChallengeQueryResult instanceof Error) {
      transaction.rollback();
      return Promise.reject({
        message: "Failed to create legacy challenge",
      });
    }

    const { lastInsertId: legacyChallengeId } = createLegacyChallengeQueryResult;

    return Promise.resolve(legacyChallengeId!);
=======
  public async createLegacyChallenge(input: any): Promise<number> {
    return Promise.resolve(123);
>>>>>>> 44dc00a (feat(domain-acl): complete challenge update interfaces)
  }

  // public async listAvailableChallengeInfoTypes(key: string): Promise<number> {
  //   const queryRequest: QueryRequest = {
  //     query: {
  //       query: {
  //         $case: "select",
  //         select: {
  //           table: "project_info_type_lu",
  //           join: [],
  //           column: [
  //             {
  //               name: "",
  //               type: ColumnType.COLUMN_TYPE_INT,
  //             },
  //           ],
  //           where: [
  //             {
  //               key: "name",
  //               operator: Operator.OPERATOR_EQUAL,
  //               value: {
  //                 value: {
  //                   $case: "stringValue",
  //                   stringValue: key,
  //                 },
  //               },
  //             },
  //           ],
  //           groupBy: [],
  //           orderBy: [],
  //           limit: 1,
  //           offset: 0,
  //         },
  //       },
  //     },
  //   };
  //   return Promise.resolve(10);
  // }
}

export default new LegacyChallengeDomain();
