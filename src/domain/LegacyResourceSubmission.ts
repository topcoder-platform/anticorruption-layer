import { QueryBuilder } from '@topcoder-framework/client-relational';

import { queryRunner } from '../helper/QueryRunner';
import { CreateResourceSubmissionInput } from '../models/domain-layer/legacy/resource_submission';
import { ResourceSubmissionSchema } from '../schema/resource/ResourceSubmission';


class LegacyResourceSubmissionDomain {
  public async create(input: CreateResourceSubmissionInput): Promise<boolean> {
    const query = new QueryBuilder(ResourceSubmissionSchema)
      .insert({
        submission_id: input.submissionId,
        resource_id: input.resourceId,
        create_date: input.createDate as string,
        update_date: input.modifyDate as string,
        create_user: input.createUser as number,
        modify_user: input.modifyUser as number,
      })
      .build();
    await queryRunner.run(query);
    return true;
  }
}

export default new LegacyResourceSubmissionDomain();