import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
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

class ProjectInfoDomain {
  public async create(input: CreateProjectInfoInput): Promise<ProjectInfo> {
    await queryRunner.run(
      new QueryBuilder(ProjectInfoSchema)
        .insert({
          value: input.value,
          projectId: input.projectId,
          projectInfoTypeId: input.projectInfoTypeId,
          createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
        })
        .build()
    );
    return input as ProjectInfo;
  }

  // TODO: Test this after informix-access-layer is fixed
  public async update(input: UpdateProjectInfoInput): Promise<ProjectInfo | undefined> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectInfoSchema)
        .update({
          projectId: input.projectId,
          modifyUser: input.modifyUser,
        })
        .where(ProjectInfoSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );
    return rows?.length ? ProjectInfo.fromPartial(rows[0] as ProjectInfo) : undefined;
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
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectInfoSchema)
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
        })
        .andWhere(ProjectInfoSchema.columns.projectInfoTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectInfoTypeId,
          },
        })
        .build()
    );

    return { projectInfo: rows!.map((row) => ProjectInfo.fromPartial(row as ProjectInfo)) };
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
