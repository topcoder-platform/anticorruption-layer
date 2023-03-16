import _ from 'lodash';
import {
  ColumnType, Operator, Query, QueryBuilder,
  QueryRequest, QueryResult
} from '@topcoder-framework/client-relational';
import { CheckExistsResult, CreateResult, UpdateResult } from '@topcoder-framework/lib-common';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import { Util } from '../common/Util';
import { TIME_ZONE } from '../config';
import SubmissionQueryHelper from '../helper/query-helper/SubmissionQueryHelper';
import { queryRunner } from '../helper/QueryRunner';
import {
  CreateSubmissionInput, DeleteChallengeSubmissionInput,
  GetMMChallengePropertiesInput, LegacySubmissionId,
  MMChallengeProperties, UpdateSubmissionInput
} from '../models/domain-layer/legacy/submission';
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


const COMPONENT_STATE = {
  // could add more from https://github.com/appirio-tech/tc1-tcnode/blob/master/tc-common/src/main/java/com/topcoder/web/common/model/algo/ComponentState.java
  ACTIVE: 100,
  NOT_CHALLENGED: 130 // Submitted
}

const LANGUAGE = {
  OTHERS: 9
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
      uploadTypeId: uploadType, //TODO: This does not look right
      url: input.url,
      parameter: 'N/A',
      uploadStatusId: UPLOAD_STATUS.Active,
      ...audits
    });
    if (!uploadResult.kind || uploadResult.kind.$case !== 'integerId') {
      return Promise.reject('Error')
    }
    const uploadId = uploadResult.kind.integerId
    if (uploadType === uploadTypes['Final Fix']) {
      return Promise.resolve({
        kind: {
          $case: 'stringId',
          stringId: uploadId.toString(),
        },
      });
    } else {
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


  }


  public async createMMSubmission(input: CreateSubmissionInput): Promise<CreateResult> {
    // eslint-disable-next-line
    const subRoleId: string | undefined = (submissionTypes as any)[input.type] ?
      (submissionTypes as any)[input.type].roleId :
      undefined;
    if (!subRoleId) return Promise.reject('Invalid submission type')
    const challengePropertiesQuery =
      SubmissionQueryHelper.getChallengeProperties(
        input.legacyChallengeId, input.memberId, subRoleId,
        input.submissionPhaseId);

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
      uploadTypeId: uploadType,//TODO: This does not look right
      url: input.url,
      parameter: 'N/A',
      uploadStatusId: UPLOAD_STATUS.Active,
      ...audits
    });
    if (!uploadResult.kind || uploadResult.kind.$case !== 'integerId') {
      return Promise.reject('Error')
    }
    const uploadId = uploadResult.kind.integerId
    if (uploadType === uploadTypes['Final Fix']) {
      return Promise.resolve({
        kind: {
          $case: 'stringId',
          stringId: uploadId.toString(),
        },
      });
    } else {

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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { roundId,
        componentId,
        componentStateId,
        numSubmissions,
        points
      } = await this.getMMChallengeProperties({
        challengeId: input.legacyChallengeId,
        userId: input.memberId,
      });


      const { rows: rrResultRows } = await queryRunner.run({
        query: {
          $case: 'raw',
          raw: {
            query: `select rr.round_id, rr.coder_id from 
          informixoltp:round_registration rr where
           rr.round_id=${roundId as number} and rr.coder_id=${input.memberId}`
          },
        },
      })
      if (!rrResultRows || rrResultRows.length === 0) {
        const rrParams = {
          roundId: roundId as number,
          userId: input.memberId,
          timestamp: moment(input.created).format('YYYY-MM-DD HH:mm:ss'),
          eligible: 1,
          teamId: {
            replace: 'null',
          },
        };

        await queryRunner.run({
          query: {
            $case: 'raw',
            raw: {
              query: `
            insert into informixoltp:round_registration (round_id, coder_id,
               timestamp, eligible, team_id)
            values(${rrParams.roundId}, ${rrParams.userId}, 
              ${rrParams.timestamp}, ${rrParams.eligible}, null)`
            },
          },
        })
      }
      let submissionCounter = numSubmissions as number;
      if (_.isFinite(componentId)) {
        submissionCounter += 1;
        await queryRunner.run({
          query: {
            $case: 'raw',
            raw: {
              query: `update informixoltp:long_component_state set submission_number=${submissionCounter}
            where long_component_state_id=${componentStateId as number}`
            },
          },
        })
      } else {
        submissionCounter = 1;
        const lcsParams = {
          componentStateId: componentStateId as number,
          roundId: roundId as number,
          componentId: componentId as number,
          userId: input.memberId,
          points: 0,
          statusId: COMPONENT_STATE.ACTIVE,
          numSubmissions: submissionCounter,
          numExampleSubmissions: 0,
        };
        await queryRunner.run({
          query: {
            $case: 'raw',
            raw: {
              query: `
              insert into informixoltp:long_component_state
              (long_component_state_id, round_id, coder_id, component_id, points,
                 status_id, submission_number, example_submission_number)
              values(${lcsParams.componentStateId}, ${lcsParams.roundId}, ${lcsParams.userId}, 
                ${lcsParams.componentId},${lcsParams.points},${lcsParams.statusId},
                ${lcsParams.numSubmissions}, ${lcsParams.numExampleSubmissions})`
            },
          },
        })
      }

      const lsParams = {
        componentStateId: componentStateId as number,
        numSubmissions: submissionCounter,
        submissionText: {
          replace: 'null',
        },
        openTime: input.created,
        submitTime: input.created,
        submissionPoints: points as number,
        languageId: LANGUAGE.OTHERS,
        isExample: 0,
      };

      await queryRunner.run({
        query: {
          $case: 'raw',
          raw: {
            query: `insert into informixoltp:long_submission(long_component_state_id, submission_number,
              submission_text, open_time, submit_time, submission_points, language_id, example)
               values(${lsParams.componentStateId}, ${lsParams.numSubmissions},
              ${JSON.stringify(lsParams.submissionText)}, ${lsParams.openTime}, ${lsParams.submitTime}, 
             ${lsParams.submissionPoints},${lsParams.languageId}, ${lsParams.isExample})`
          },
        },
      })
      return Promise.resolve({
        kind: {
          $case: 'integerId',
          integerId: lastInsertId,
        },
      });
    }
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
             where upload_id in (select upload_id from upload where project_id = ${input.challengeId} and resource_id = ${input.resourceId}
             and upload_status_id = ${UPLOAD_STATUS['Deleted']})`,
        },
      },
    })
  }

  private async getMMChallengeProperties(input: GetMMChallengePropertiesInput): Promise<MMChallengeProperties> {
    const { rows } = await queryRunner.run({
      query: {
        $case: 'raw',
        raw: {
          query: `select rc.round_id, rc.component_id, lcs.long_component_state_id, NVL(lcs.submission_number, 0) as submission_number, NVL(lcs.points, 0) as points, r.rated_ind
          from project p
          join project_info pi56 on p.project_id = ${input.challengeId as number} and p.project_id = pi56.project_id and pi56.project_info_type_id = 56 and p.project_category_id = 37
          join informixoltp:round_component rc on rc.round_id = pi56.value
          join informixoltp:round r on rc.round_id = r.round_id
          left join informixoltp:long_component_state lcs on lcs.coder_id = ${input.userId as number}and lcs.round_id = rc.round_id and lcs.component_id = rc.component_id`
        },
      },
    })
    if (!rows || rows.length === 0) return Promise.reject('Error')
    const result = rows[0]
    return {
      roundId: result.round_id as number,
      componentId: result.component_id as number,
      componentStateId: result.long_component_state_id as number,
      numSubmissions: result.submission_number as number,
      points: result.points as number,
    }

  }


}

export default new LegacySubmissionDomain();
