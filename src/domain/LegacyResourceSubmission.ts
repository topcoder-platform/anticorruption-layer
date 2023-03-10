import { CreateResourceSubmissionInput } from '../models/domain-layer/legacy/resource_submission';
import { QueryBuilder } from '@topcoder-framework/client-relational';
import { ResourceSubmissionSchema } from '../schema/resource/ResourceSubmission';
import { queryRunner } from '../helper/QueryRunner';


class LegacyResourceSubmissionDomain {
  public async create(input: CreateResourceSubmissionInput): Promise<boolean> {
    const query = new QueryBuilder(ResourceSubmissionSchema)
      .insert({
        submission_id: input.submissionId,
      })
      .build();
    await queryRunner.run(query);
    return true;
  }
}

export default new LegacyResourceSubmissionDomain();