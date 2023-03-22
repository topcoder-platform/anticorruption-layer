import { Query, QueryBuilder } from "@topcoder-framework/client-relational";
import dayjs from "dayjs";
import {
  CreateChallengeInput_Phase,
  CreateChallengeInput_Prize,
} from "../../../dist/models/domain-layer/legacy/challenge";
import { Util } from "../../common/Util";
import {
  ObserverResourceInfoToAdd,
  PhaseTypeIds,
  ResourceInfoTypeIds,
} from "../../config/constants";
import { PhaseDependency, PhaseType } from "../../models/domain-layer/legacy/phase";
import { PhaseCriteriaSchema } from "../../schema/project/PhaseCriteria";
import { PhaseDependencySchema } from "../../schema/project/PhaseDependency";
import { ProjectSchema } from "../../schema/project/Project";
import { ProjectInfoSchema } from "../../schema/project/ProjectInfo";
import { ProjectPhaseSchema } from "../../schema/project/ProjectPhase";
import { PrizeSchema } from "../../schema/project_payment/Prize";
import { ResourceSchema } from "../../schema/resource/Resource";
import { ResourceInfoSchema } from "../../schema/resource/ResourceInfo";

class ChallengeQueryHelper {
  public getChallengeCreateQuery(
    {
      projectStatusId,
      projectCategoryId,
      tcDirectProjectId,
    }: {
      projectStatusId: number;
      projectCategoryId: number;
      tcDirectProjectId: number;
    },
    user: number | undefined = undefined
  ): Query {
    return new QueryBuilder(ProjectSchema)
      .insert({
        projectCategoryId,
        tcDirectProjectId,
        projectStatusId,
        createUser: user,
        modifyUser: user,
      })
      .build();
  }

  public getPrizeCreateQueries(
    projectId: number,
    prizes: CreateChallengeInput_Prize[],
    user: number | undefined = undefined
  ): Query[] {
    return prizes
      .filter((prize) => prize.type.toLowerCase() === "placement")
      .map((prize) => {
        try {
          return new QueryBuilder(PrizeSchema)
            .insert({
              projectId,
              place: prize.place,
              prizeAmount: prize.amount,
              prizeTypeId: 15,
              numberOfSubmissions: prize.numSubmissions,
              createUser: user,
              modifyUser: user,
            })
            .build();
        } catch (err) {
          console.log("Failed when handling", prize, err);
          throw err;
        }
      });
  }

  public getChallengeInfoCreateQueries(
    projectId: number,
    infos: { [key: number]: string },
    user: number | undefined
  ): Query[] {
    return Object.entries(infos).map(([key, value]) => {
      return new QueryBuilder(ProjectInfoSchema)
        .insert({
          projectId,
          projectInfoTypeId: key,
          value: value,
          createUser: user,
          modifyUser: user,
        })
        .build();
    });
  }

  public getPhaseCreateQuery(
    projectId: number,
    phase: CreateChallengeInput_Phase,
    user: number | undefined
  ): Query {
    return new QueryBuilder(ProjectPhaseSchema)
      .insert({
        projectId,
        phaseTypeId: phase.phaseTypeId,
        phaseStatusId: phase.phaseStatusId,
        fixedStartTime: phase.fixedStartTime,
        scheduledStartTime: phase.scheduledStartTime,
        scheduledEndTime: phase.scheduledEndTime,
        actualStartTime: phase.actualStartTime,
        actualEndTime: phase.actualEndTime,
        duration: phase.duration,
        createUser: user,
        modifyUser: user,
      })
      .build();
  }

  public getPhaseCriteriaCreateQueries(
    projectPhaseId: number,
    criteria: { [key: number]: string },
    user: number | undefined
  ): Query[] {
    return Object.entries(criteria).map(([key, value]) => {
      return new QueryBuilder(PhaseCriteriaSchema)
        .insert({
          projectPhaseId,
          phaseCriteriaTypeId: key,
          parameter: value,
          createUser: user,
          modifyUser: user,
        })
        .build();
    });
  }

  public getPhaseDependencyCreateQuery(
    dependencyPhaseId: number,
    dependentPhaseId: number,
    dependencyStart: number,
    dependentStart: number,
    lagTime: number,
    user: number | undefined
  ): Query {
    const query = new QueryBuilder(PhaseDependencySchema)
      .insert({
        dependentPhaseId,
        dependencyPhaseId,
        dependencyStart,
        dependentStart,
        lagTime,
        createUser: user,
        modifyUser: user,
      })
      .build();
    return query;
  }

  public getDirectProjectListUserQuery(directProjectId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT upg.user_id as user_id, u.handle as handle FROM corporate_oltp:user_permission_grant upg inner join tcs_catalog:user u on upg.user_id = u.user_id where resource_id = ${directProjectId}`,
        },
      },
    };
  }

  public getResourceCreateQuery(
    projectId: number,
    userId: number,
    resourceRoleId: number,
    projectPhaseId: number | undefined,
    user: number | undefined = undefined
  ): Query {
    return new QueryBuilder(ResourceSchema)
      .insert({
        projectId,
        userId,
        resourceRoleId,
        projectPhaseId,
        createUser: user,
        modifyUser: user,
      })
      .build();
  }

  public getResourceInfoCreateQuery(
    resourceId: number,
    resourceInfoTypeId: number,
    value: string,
    user: number
  ): Query {
    return new QueryBuilder(ResourceInfoSchema)
      .insert({
        resourceId,
        resourceInfoTypeId,
        value,
        createUser: user,
        modifyUser: user,
      })
      .build();
  }

  public getObserverResourceInfoCreateQueries(
    resourceId: number,
    userId: number,
    handle: string,
    user: number | undefined
  ): Query[] {
    return ObserverResourceInfoToAdd.map((info) => {
      let value: string = handle;

      if (info === "AppealsCompletedEarly") value = "NO";
      if (info === "PaymentStatus") value = "N/A";
      if (info === "RegistrationDate") value = dayjs().format("MM.DD.YYYY hh:mm A");
      if (info === "Handle") value = handle;
      if (info === "ExternalReferenceId") value = userId.toString();

      return this.getResourceInfoCreateQuery(resourceId, ResourceInfoTypeIds[info], value, user!);
    });
  }
}

export default new ChallengeQueryHelper();
