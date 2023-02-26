import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateProjectRoleTermsOfUseXrefInput,
  DeleteProjectRoleTermsOfUseXrefInput,
  GetProjectRoleTermsOfUseXrefInput,
  ProjectRoleTermsOfUseXref,
  ProjectRoleTermsOfUseXrefList,
} from "../models/domain-layer/legacy/term";
import { ProjectRoleTermsOfUseXrefSchema } from "../schema/terms/Term";

class LegacyTermDomain {
  public async getProjectRoleTermsOfUseXrefs(
    input: GetProjectRoleTermsOfUseXrefInput
  ): Promise<ProjectRoleTermsOfUseXrefList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectRoleTermsOfUseXrefSchema)
        .select(..._.map(ProjectRoleTermsOfUseXrefSchema.columns))
        .where(ProjectRoleTermsOfUseXrefSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
    return {
      terms: rows!.map((r) =>
        ProjectRoleTermsOfUseXref.fromPartial(r as ProjectRoleTermsOfUseXref)
      ),
    }; // rows!.map(r =>)
  }

  public async createProjectRoleTermsOfUseXref(
    input: CreateProjectRoleTermsOfUseXrefInput
  ): Promise<CreateResult> {
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ProjectRoleTermsOfUseXrefSchema).insert({ ...input }).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async deleteProjectRoleTermsOfUseXref(input: DeleteProjectRoleTermsOfUseXrefInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectRoleTermsOfUseXrefSchema)
        .delete()
        .where(ProjectRoleTermsOfUseXrefSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(ProjectRoleTermsOfUseXrefSchema.columns.resourceRoleId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceRoleId,
          },
        })
        .andWhere(ProjectRoleTermsOfUseXrefSchema.columns.termsOfUseId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.termsOfUseId,
          },
        })
        .build()
    );
  }
}

export default new LegacyTermDomain();
