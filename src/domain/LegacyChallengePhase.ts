import { QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import { queryRunner } from "../helper/QueryRunner";
import { CreatePhaseInput, PhaseTypeList } from "../models/domain-layer/legacy/challenge_phase";
import { PhaseTypeSchema } from "../schema/project/PhaseType";
import { ProjectPhaseSchema } from "../schema/project/ProjectPhase";

class LegacyChallengePhaseDomain {
  public async create(input: CreatePhaseInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };

    const { lastInsertId: phaseId } = await queryRunner.run(
      new QueryBuilder(ProjectPhaseSchema).insert(createInput).build()
    );

    return {
      kind: {
        $case: "integerId",
        integerId: phaseId!,
      },
    };
  }

  public async getPhaseTypes(): Promise<PhaseTypeList> {
    const query = new QueryBuilder(PhaseTypeSchema)
      .select(PhaseTypeSchema.columns.phaseTypeId, PhaseTypeSchema.columns.name)
      .limit(500)
      .build();

    const { rows: projectPhases } = await queryRunner.run(query);

    const list: PhaseTypeList = {
      items: projectPhases!.map(({ values }) => {
        return {
          phaseTypeId:
            values.phase_type_id.value?.$case === "intValue"
              ? values.phase_type_id.value?.intValue
              : 0,
          name: values.name.value?.$case === "stringValue" ? values.name.value?.stringValue : "",
        };
      }),
    };

    return list;
  }
}

export default new LegacyChallengePhaseDomain();
