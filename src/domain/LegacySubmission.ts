import { ColumnType, Operator, Query, QueryBuilder, QueryRequest, QueryResult } from '@topcoder-framework/client-relational';
import { CheckExistsResult, CreateResult, UpdateResult } from '@topcoder-framework/lib-common';
import momentTZ from 'moment-timezone';

import { Util } from '../common/Util';
import { TIME_ZONE } from '../config';
import SubmissionQueryHelper from '../helper/query-helper/SubmissionQueryHelper';
import { queryRunner } from '../helper/QueryRunner';
import { CreateSubmissionInput, DeleteChallengeSubmissionInput, LegacySubmissionId, UpdateSubmissionInput } from '../models/domain-layer/legacy/submission';
import { LegacySubmissionSchema } from '../schema/submission/Submission';

import LegacyResourceSubmissionDomain from './LegacyResourceSubmission';
import LegacyUploadDomain from './LegacyUpload';

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

const phaseTypes = {
  Submission: 2,
  'Final Fix': 9,
  'Specification Submission': 13
}


const uploadTypes = {
  Submission: 1,
  'Final Fix': 3
}

const CHALLENGE_TYPE = {
  'Component': 1,
  'Application': 2,
  'Studio': 3
}

const UPLOAD_STATUS = {
  'Active': 1,
  'Deleted': 2
}

class LegacySubmissionDomain {
  public async checkSubmissionExists({ legacySubmissionId }: LegacySubmissionId):
    Promise<CheckExistsResult> {
    const { submissionId } = LegacySubmissionSchema.columns;

    const query = new QueryBuilder(LegacySubmissionSchema)
      .select(submissionId)
      .where(submissionId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: 'intValue',
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

  public async create(input: CreateSubmissionInput): Promise<CreateResult> {
    // eslint-disable-next-line
    const subRoleId: string | undefined = (submissionTypes as any)[input.type] ?
      (submissionTypes as any)[input.type].roleId :
      undefined;
    if (!subRoleId) return Promise.reject('Invalid submission type')
    const challengePropertiesQuery =
      SubmissionQueryHelper.getChallengeProperties(
        input.legacyChallengeId, input.memberId, subRoleId,
        input.submissionPhaseId);

    // TODO: We do not need this but check
    const { rows } = await queryRunner.run(challengePropertiesQuery);

    if (!rows || rows.length === 0) return Promise.reject('Error')

    const { resourceId, phaseTypeId, value, challengeTypeId } = rows[0];
    const uploadType = phaseTypeId === phaseTypes['Final Fix'] ?
      uploadTypes['Final Fix'] :
      uploadTypes.Submission;

    let isAllowMultipleSubmission = true;

    if (challengeTypeId === CHALLENGE_TYPE['Studio'] || value === 'true') {
      isAllowMultipleSubmission = true;
    }
    const audits = {
      createUser: input.memberId,
      createDate:
        momentTZ.tz(input.created, TIME_ZONE).format('YYYY-MM-DD HH:mm:ss'),
      modifyUser: input.memberId,
      modifyDate:
        momentTZ.tz(input.created, TIME_ZONE).format('YYYY-MM-DD HH:mm:ss')
    }

    const uploadResult = await LegacyUploadDomain.create({
      projectId: input.legacyChallengeId,
      projectPhaseId: input.submissionPhaseId,
      resourceId: <number>resourceId,
      uploadTypeId: uploadType,
      url: input.url,
      parameter: 'N/A',
      uploadStatusId: UPLOAD_STATUS.Active,
      ...audits
    });
    if (!uploadResult.kind || uploadResult.kind.$case !== 'integerId') {
      return Promise.reject('Error')
    }
    const uploadId = uploadResult.kind.integerId
    const insertSubmissionQuery =
      new QueryBuilder(LegacySubmissionSchema)
        .insert({
          uploadId,
          submission_status_id: submissionStatus.Active,
          // eslint-disable-next-line
          submission_type_id: (submissionTypes as any)[input.type].id,
          ...audits
        })
        .build();



    const { lastInsertId }: QueryResult =
      await queryRunner.run(insertSubmissionQuery);


    if (!lastInsertId) {
      return Promise.reject('Error while creating submission')
    }
    await LegacyResourceSubmissionDomain.create({
      submissionId: lastInsertId,
      resourceId: (resourceId as number),
      ...audits
    });

    if (!isAllowMultipleSubmission) {
      await LegacyUploadDomain
        .deleteSubmissionUpload({
          uploadId,
          challengeId: input.legacyChallengeId,
          resourceId: (resourceId as number),
        })

      await this.deleteChallengeSubmission({
        challengeId: input.legacyChallengeId,
        resourceId: (resourceId as number),
      })
    }



    return Promise.resolve({
      kind: {
        $case: 'integerId',
        integerId: lastInsertId,
      },
    });
  }

  public async listAvailableSubmissionInfoTypes(key: string): Promise<number> {
    // TODO : ask about this function
    // ASK RAKIB
    const queryRequest: QueryRequest = {
      query: {
        query: {
          $case: 'select',
          select: {
            table: 'project_info_type_lu',
            join: [],
            column: [
              {
                name: '',
                type: ColumnType.COLUMN_TYPE_INT,
              },
            ],
            where: [
              {
                key: 'name',
                operator: Operator.OPERATOR_EQUAL,
                value: {
                  value: {
                    $case: 'stringValue',
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
    const query: Query =
      new QueryBuilder(LegacySubmissionSchema)
        .update({ ...input })
        .where(...Util.toScanCriteria(
          { ...input } as { [key: string]: number | string | undefined }))
        .build();

    const { affectedRows } = await queryRunner.run(query);
    return {
      updatedCount: affectedRows || 0,
    }
  }

  public async deleteChallengeSubmission(input: DeleteChallengeSubmissionInput):
    Promise<void> {
    await queryRunner.run({
      query: {
        $case: 'raw',
        raw: {
          query: `update submission set submission_status_id =${submissionStatus['Deleted']}
             where upload_id in (select upload_id from upload where project_id=${input.challengeId} and resource_id=${input.resourceId}
             and upload_status_id=${UPLOAD_STATUS['Deleted']})`,
        },
      },
    })
  }

  export default new LegacySubmissionDomain();
