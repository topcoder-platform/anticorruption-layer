import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreatePhaseCriteriaInput,
  CreatePhaseDependencyInput,
  CreateProjectPhaseInput,
  DeletePhaseCriteriaInput,
  DeleteProjectPhasesInput,
  GetPhaseCriteriaInput,
  GetProjectPhasesInput,
  PhaseCriteria,
  PhaseCriteriaList,
  PhaseType,
  PhaseTypeList,
  ProjectPhase,
  ProjectPhaseList,
  UpdateProjectPhaseInput,
} from "../../dist/models/domain-layer/legacy/phase";
import { PhaseCriteriaSchema } from "../schema/project/PhaseCriteria";
import { PhaseDependencySchema } from "../schema/project/PhaseDependency";
import { PhaseTypeSchema } from "../schema/project/PhaseType";
import { ProjectPhaseSchema } from "../schema/project/ProjectPhase";

class LegacyPhaseDomain {
  public async getPhaseTypes(): Promise<PhaseTypeList | undefined> {
    const query = new QueryBuilder(PhaseTypeSchema)
      .select(..._.map(PhaseTypeSchema.columns))
      .limit(500)
      .build();

    const { rows } = await queryRunner.run(query);
    return { phaseTypes: rows!.map((r) => PhaseType.fromPartial(r as PhaseType)) };
  }

  public async getPhaseCriteria(input: GetPhaseCriteriaInput): Promise<PhaseCriteriaList> {
    const query = new QueryBuilder(PhaseCriteriaSchema)
      .select(..._.map(PhaseCriteriaSchema.columns))
      .where(PhaseCriteriaSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectPhaseId,
        },
      })
      .andWhere(PhaseCriteriaSchema.columns.phaseCriteriaTypeId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.phaseCriteriaTypeId!,
        },
      })
      .limit(500)
      .build();

    const { rows } = await queryRunner.run(query);
    return { phaseCriteriaList: rows!.map((r) => PhaseCriteria.fromPartial(r as PhaseCriteria)) };
  }

  public async createPhaseCriteria(input: CreatePhaseCriteriaInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(PhaseCriteriaSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async deletePhaseCriteria(input: DeletePhaseCriteriaInput) {
    let query = new QueryBuilder(PhaseCriteriaSchema)
      .delete()
      .where(PhaseCriteriaSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectPhaseId,
        },
      });
    if (input.phaseCriteriaTypeId) {
      query = query.andWhere(
        PhaseCriteriaSchema.columns.phaseCriteriaTypeId,
        Operator.OPERATOR_EQUAL,
        {
          value: {
            $case: "intValue",
            intValue: input.phaseCriteriaTypeId,
          },
        }
      );
    }
    await queryRunner.run(query.build());
  }

  public async getProjectPhases(input: GetProjectPhasesInput): Promise<ProjectPhaseList> {
    let query = new QueryBuilder(ProjectPhaseSchema)
      .select(..._.map(ProjectPhaseSchema.columns))
      .where(ProjectPhaseSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectId,
        },
      });
    if (input.phaseTypeId) {
      query = query.andWhere(ProjectPhaseSchema.columns.phaseTypeId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.phaseTypeId,
        },
      });
    }

    const { rows } = await queryRunner.run(query.build());
    return { projectPhases: rows!.map((r) => ProjectPhase.fromPartial(r as ProjectPhase)) };
  }

  public async deleteProjectPhases(input: DeleteProjectPhasesInput) {
    await queryRunner.run(
      new QueryBuilder(ProjectPhaseSchema)
        .delete()
        .where(ProjectPhaseSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(ProjectPhaseSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectPhaseId,
          },
        })
        .build()
    );
  }

  public async createProjectPhase(input: CreateProjectPhaseInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ProjectPhaseSchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  // TODO: Test this after informix-access-layer is fixed
  public async updateProjectPhase(input: UpdateProjectPhaseInput) {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ProjectPhaseSchema)
        .update({
          ...input,
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
        })
        .where(ProjectPhaseSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectPhaseId,
          },
        })
        .build()
    );
  }

  public async createPhaseDependency(input: CreatePhaseDependencyInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(PhaseDependencySchema).insert(createInput).build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }
}

export default new LegacyPhaseDomain();
