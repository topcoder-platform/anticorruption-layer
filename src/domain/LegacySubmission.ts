import { Operator, Query, QueryBuilder, QueryResult } from "@topcoder-framework/client-relational";
import { UpdateResult } from "@topcoder-framework/lib-common";
import { Util } from "../common/Util";
import moment from "moment";
import SubmissionQueryHelper from "../helper/query-helper/SubmissionQueryHelper";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateSubmissionInput, UpdateSubmissionInput
} from "../models/domain-layer/legacy/submission";
import { LegacySubmissionSchema } from "../schema/submission/Submission";

const submissionTypes = {
  'Contest Submission': { id: 1, roleId: 1 },
  'Specification Submission': { id: 2, roleId: 17 },
  'Checkpoint Submission': { id: 3, roleId: 1 },
  'Studio Final Fix Submission': { id: 4, roleId: 1 }
}

const submissionStatus = {
  Active: 1,
  Deleted: 5
}
class LegacySubmissionDomain {
  public async checkSubmissionExists(legacySubmissionId: number): Promise<any> {
    const { submissionId } = LegacySubmissionSchema.columns;

    const query = new QueryBuilder(LegacySubmissionSchema)
      .select(submissionId)
      .where(submissionId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: legacySubmissionId,
        },
      })
      .limit(1)
      .build();

    const { rows } = await queryRunner.run(query);

    return {
      exists: rows?.length == 1,
    };
  }

  public async create(input: CreateSubmissionInput): Promise<number> {
    // eslint-disable-next-line 
    const subRoleId: string | undefined = (submissionTypes as any)[input.type] ? (submissionTypes as any)[input.type].roleId : undefined;
    if (!subRoleId) throw new Error('Invalid submission type')
    const challengePropertiesQuery = SubmissionQueryHelper
      .getChallengeProperties(input.legacyChallengeId ?? 0, input.memberId, subRoleId, input.submissionPhaseId);

    //TODO: We do not need this but check
    await queryRunner.run(challengePropertiesQuery);

    const insertSubmissionQuery = new QueryBuilder(LegacySubmissionSchema)
      .insert({
        submission_status_id: submissionStatus.Active,
        // eslint-disable-next-line 
        submission_type_id: (submissionTypes as any)[input.type].id,
        parameter: 'N/A',
        create_user: input.memberId,
        create_date: moment(input.created).format('YYYY-MM-DD HH:mm:ss'),
        modify_user: input.memberId,
        modify_date: moment(input.created).format('YYYY-MM-DD HH:mm:ss')
      })
      .build();


    const { rows }: QueryResult = await queryRunner.run(insertSubmissionQuery);


    const { lastInsertId: legacySubmissionId } = createLegacySubmissionQueryResult;

    return Promise.resolve(legacySubmissionId!);
  }

  public async listAvailableSubmissionInfoTypes(key: string): Promise<number> {
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: "select",
          select: {
            table: "project_info_type_lu",
            join: [],
            column: [
              {
                name: "",
                type: ColumnType.COLUMN_TYPE_INT,
              },
            ],
            where: [
              {
                key: "name",
                operator: Operator.OPERATOR_EQUAL,
                value: {
                  value: {
                    $case: "stringValue",
                    stringValue: key,
                  },
                },
              },
            ],
            groupBy: [],
            orderBy: [],
            limit: 1,
            offset: 0,
          },
        },
      },
    };
    return Promise.resolve(10);
  }

  public async update(input: UpdateSubmissionInput): Promise<UpdateResult> {
    const query: Query = new QueryBuilder(LegacySubmissionSchema)
      .update({ ...input })
      .where(...Util.toScanCriteria({ ...input } as { [key: string]: number | string | undefined }))
      .build();

    const { affectedRows } = await queryRunner.run(query);
    return {
      updatedCount: affectedRows || 0,
    }
  }
}

export default new LegacySubmissionDomain();
