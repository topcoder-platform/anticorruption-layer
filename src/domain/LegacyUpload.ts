import { Query, QueryBuilder } from "@topcoder-framework/client-relational";
import { UpdateResult } from "@topcoder-framework/lib-common";
import { Util } from "../common/Util";
import { queryRunner } from "../helper/QueryRunner";
import {
  UpdateUploadInput,
} from "../models/domain-layer/legacy/upload";
import { UploadSchema } from "../schema/submission/Upload";

class LegacySubmissionDomain {
  public async update(input: UpdateUploadInput): Promise<UpdateResult> {   
    const query: Query = new QueryBuilder(UploadSchema)
      .update({ ...input })
      .where(...Util.toScanCriteria({ ...input } as { [key: string]: number|string|undefined }))
      .build();

    const { affectedRows } = await queryRunner.run(query);
    return {
      updatedCount: affectedRows || 0,
    }
  }
}

export default new LegacySubmissionDomain();
