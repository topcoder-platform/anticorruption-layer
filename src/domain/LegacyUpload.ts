import {Query, QueryBuilder} from '@topcoder-framework/client-relational';
import {CreateResult, UpdateResult} from '@topcoder-framework/lib-common';

import {Util} from '../common/Util';
import {queryRunner} from '../helper/QueryRunner';
import {CreateUploadInput, DeleteSubmissionUploadInput, UpdateUploadInput} from '../models/domain-layer/legacy/upload';
import {UploadSchema} from '../schema/submission/Upload';

const UPLOAD_STATUS = {
  'Active': 1,
  'Deleted': 2
}


class LegacyUploadDomain {
  public async update(input: UpdateUploadInput): Promise<UpdateResult> {
    const query: Query =
        new QueryBuilder(UploadSchema)
            .update({...input})
            .where(...Util.toScanCriteria(
                {...input} as {[key: string]: number | string | undefined}))
            .build();

    const {affectedRows} = await queryRunner.run(query);
    return {
      updatedCount: affectedRows || 0,
    }
  }
  public async create(input: CreateUploadInput): Promise<CreateResult> {
    const {lastInsertId} = await queryRunner.run({
      query: {
        $case: 'raw',
        raw: {
          query: `insert into upload( project_id, project_phase_id, resource_id,
            upload_type_id, upload_status_id, parameter, url, create_user, create_date, modify_user, modify_date)
            values( ${input.projectId}, ${input.projectPhaseId}, 
            ${input.resourceId}, ${input.uploadTypeId}, 
            ${input.uploadStatusId},${input.parameter},
            ${input.url}, ${input.createUser as number}, 
            ${input.createDate as string}, ${input.modifyUser as number},
            ${input.modifyDate as string})`,
        },
      },
    });

    if (!lastInsertId) return Promise.reject('Error while creating submission')
      return Promise.resolve({
        kind: {
          $case: 'integerId',
          integerId: lastInsertId,
        },
      });
  }
  public async deleteSubmissionUpload(input: DeleteSubmissionUploadInput):
      Promise<void> {
    await queryRunner.run({
      query: {
        $case: 'raw',
        raw: {
          query:
              `update upload set upload_status_id =${UPLOAD_STATUS['Deleted']}
        where project_id=${input.challengeId as number} and 
        resource_id=${input.resourceId as number} and 
        upload_id <> ${input.uploadId as number}}`,
        },
      },
    })
  }
}

export default new LegacyUploadDomain();
