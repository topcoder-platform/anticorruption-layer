import { QueryRunner } from "../common/QueryRunner";
import { Value } from "@topcoder-framework/client-relational";
import { CreatePhaseInput, PhaseTypeList } from "../models/domain-layer/legacy/challenge_phase";
import { PhaseType } from "../schema/project/PhaseType";
import { ProjectPhaseSchema } from "../schema/project/ProjectPhase";
import { CreateResult } from "@topcoder-framework/lib-common";

class LegacyChallengePhaseDomain {
  public async create(input: CreatePhaseInput): Promise<CreateResult> {
    const createInput = {
      ...input,
      createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
      modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
    };

    const phaseId = (await new QueryRunner(ProjectPhaseSchema)
      .insert(createInput)
      .exec()) as number;

    return {
      kind: {
        $case: "integerId",
        integerId: phaseId,
      },
    };
  }

  public async getPhaseTypes(): Promise<PhaseTypeList> {
    const projectPhases = (await new QueryRunner(PhaseType)
      .select([PhaseType.columns.phaseTypeId, PhaseType.columns.name])
      .limit(500)
      .offset(0)
      .exec()) as [
      {
        values: {
          phase_type_id: Value;
          name: Value;
        };
      }
    ];

    const list: PhaseTypeList = {
      items: projectPhases.map(({ values }) => {
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
