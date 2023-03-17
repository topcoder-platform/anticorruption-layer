import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult, UpdateResult } from "@topcoder-framework/lib-common";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateProjectInfoInput,
  DeleteProjectInfoInput,
  GetProjectInfoInput,
  ProjectInfo,
  ProjectInfoList,
  ProjectInfoType,
  ProjectInfoTypeList,
  UpdateProjectInfoInput,
} from "../models/domain-layer/legacy/project_info";
import { ProjectInfoSchema } from "../schema/project/ProjectInfo";
import { ProjectInfoTypeSchema } from "../schema/project/ProjectInfoType";
import { TCWEBSERVICE } from "../config/constants"

class ProjectInfoDomain {
  public async create(input: CreateProjectInfoInput): Promise<CreateResult> {
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ProjectInfoSchema)
        .insert({
          value: input.value,
          projectId: input.projectId,
          projectInfoTypeId: input.projectInfoTypeId,
          createUser: TCWEBSERVICE,
          modifyUser: TCWEBSERVICE,
        })
        .build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  // TODO: Test this after informix-access-layer is fixed
  public async update(input: UpdateProjectInfoInput): Promise<UpdateResult> {
    const res = await queryRunner.run(
      new QueryBuilder(ProjectInfoSchema)
        .update({
          value: input.value,
        })
        .where(ProjectInfoSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(ProjectInfoSchema.columns.projectInfoTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectInfoTypeId,
          },
        })
        .build()
    );
    return {
      updatedCount: res.affectedRows!,
    };
  }

  public async delete(input: DeleteProjectInfoInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectInfoSchema)
        .delete()
        .where(ProjectInfoSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(ProjectInfoSchema.columns.projectInfoTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectInfoTypeId,
          },
        })
        .build()
    );
  }

  public async getProjectInfo(input: GetProjectInfoInput): Promise<ProjectInfoList> {
    let query = new QueryBuilder(ProjectInfoSchema)
      .select(
        ProjectInfoSchema.columns.projectId,
        ProjectInfoSchema.columns.projectInfoTypeId,
        ProjectInfoSchema.columns.value
      )
      .where(ProjectInfoSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectId,
        },
      });
    if (input.projectInfoTypeId) {
      query = query.andWhere(ProjectInfoSchema.columns.projectInfoTypeId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectInfoTypeId,
        },
      });
    }
    const { rows } = await queryRunner.run(query.build());

    return { projectInfos: rows!.map((row) => ProjectInfo.fromPartial(row as ProjectInfo)) };
  }

  public async getProjectInfoTypes(): Promise<ProjectInfoTypeList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectInfoTypeSchema)
        .select(
          ProjectInfoTypeSchema.columns.projectInfoTypeId,
          ProjectInfoTypeSchema.columns.name,
          ProjectInfoTypeSchema.columns.description
        )
        .build()
    );

    return {
      projectInfoTypes: rows!.map((row) => ProjectInfoType.fromPartial(row as ProjectInfoType)),
    };
  }
}

export default new ProjectInfoDomain();
