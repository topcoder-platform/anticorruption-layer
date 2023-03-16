import {QueryBuilder} from '@topcoder-framework/client-relational';

import {queryRunner} from '../helper/QueryRunner';
import {CreateResourceSubmissionInput} from '../models/domain-layer/legacy/resource_submission';
import {ResourceSubmissionSchema} from '../schema/resource/ResourceSubmission';


class LegacyResourceSubmissionDomain {
  public async create(input: CreateResourceSubmissionInput): Promise<boolean> {
    const query = new QueryBuilder(ResourceSubmissionSchema)
                      .insert({
                        submission_id: input.submissionId,
                        resource_id: input.resourceId,
                        create_date: input.createDate,
                        update_date: input.updateDate,
                        create_user: input.createUser,
                        modeify_user: input.modifyUser
                      })
                      .build();
    await queryRunner.run(query);
    return true;
  }
}

export default new LegacyResourceSubmissionDomain();