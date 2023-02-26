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
      .build();

    const { rows: projectPhases } = await queryRunner.run(query);

    const list: PhaseTypeList = {
      items: projectPhases!.map(({ values }) => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          phaseTypeId:
            values.phase_type_id.value?.$case === "intValue"
              ? values.phase_type_id.value?.intValue
              : 0,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          name: values.name.value?.$case === "stringValue" ? values.name.value?.stringValue : "",
        };
      }),
    };

    return list;
  }
}

export default new LegacyChallengePhaseDomain();
