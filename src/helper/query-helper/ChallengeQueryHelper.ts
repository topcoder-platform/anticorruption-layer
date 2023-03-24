import { Operator, Query, QueryBuilder } from "@topcoder-framework/client-relational";
import dayjs from "dayjs";
import _ from "lodash";
import { Util } from "../../common/Util";
import { ObserverResourceInfoToAdd, ResourceInfoTypeIds } from "../../config/constants";
import { Phase, Prize } from "../../models/domain-layer/legacy/challenge";
import { PhaseCriteria } from "../../models/domain-layer/legacy/phase";
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
    prizes: Prize[],
    user: number | undefined = undefined
  ): Query[] {
    return prizes
      .filter((prize) => prize.type?.toLowerCase() === "placement")
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

  public getPhaseCreateQuery(projectId: number, phase: Phase, user: number | undefined): Query {
    return new QueryBuilder(ProjectPhaseSchema)
      .insert({
        projectId,
        phaseTypeId: phase.phaseTypeId,
        phaseStatusId: phase.phaseStatusId,
        fixedStartTime: Util.dateToInformix(phase.fixedStartTime),
        scheduledStartTime: Util.dateToInformix(phase.scheduledStartTime),
        scheduledEndTime: Util.dateToInformix(phase.scheduledEndTime),
        actualStartTime: Util.dateToInformix(phase.actualStartTime),
        actualEndTime: Util.dateToInformix(phase.actualEndTime),
        duration: phase.duration,
        createUser: user,
        modifyUser: user,
      })
      .build();
  }

  public getPhaseUpdateQuery(projectId: number, phase: Phase, user: number | undefined): Query {
    return new QueryBuilder(ProjectPhaseSchema)
      .update({
        phaseTypeId: phase.phaseTypeId,
        phaseStatusId: phase.phaseStatusId,
        fixedStartTime: Util.dateToInformix(phase.fixedStartTime),
        scheduledStartTime: Util.dateToInformix(phase.scheduledStartTime),
        scheduledEndTime: Util.dateToInformix(phase.scheduledEndTime),
        actualStartTime: Util.dateToInformix(phase.actualStartTime),
        actualEndTime: Util.dateToInformix(phase.actualEndTime),
        duration: phase.duration,
        modifyUser: user,
      })
      .where(ProjectPhaseSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
      })
      .build();
  }

  public getPhaseSelectQuery(projectId: number): Query {
    return new QueryBuilder(ProjectPhaseSchema)
      .select(..._.map(ProjectPhaseSchema.columns))
      .where(ProjectPhaseSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
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

  public getPhaseCriteriaDeleteQueries(criterias: PhaseCriteria[]): Query[] {
    return _.map(criterias, (criteria) => {
      return new QueryBuilder(PhaseCriteriaSchema)
        .delete()
        .where(PhaseCriteriaSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
          value: { $case: "longValue", longValue: criteria.projectPhaseId },
        })
        .andWhere(PhaseCriteriaSchema.columns.phaseCriteriaTypeId, Operator.OPERATOR_EQUAL, {
          value: { $case: "intValue", intValue: criteria.phaseCriteriaTypeId },
        })
        .build();
    });
  }

  public getPhaseCriteriaUpdateQueries(
    projectPhaseId: number,
    criteria: { [key: number]: string },
    user: number | undefined
  ): Query[] {
    return Object.entries(criteria).map(([key, value]) => {
      return new QueryBuilder(PhaseCriteriaSchema)
        .update({
          parameter: value,
          modifyUser: user,
        })
        .where(PhaseCriteriaSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
          value: { $case: "longValue", longValue: projectPhaseId },
        })
        .andWhere(PhaseCriteriaSchema.columns.phaseCriteriaTypeId, Operator.OPERATOR_EQUAL, {
          value: { $case: "intValue", intValue: _.toNumber(key) },
        })
        .build();
    });
  }

  public getPhaseCriteriaSelectQuery(projectPhaseId: number): Query {
    return new QueryBuilder(PhaseCriteriaSchema)
      .select(..._.map(PhaseCriteriaSchema.columns))
      .where(PhaseCriteriaSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectPhaseId },
      })
      .build();
  }

  public getPhaseCriteriasSelectQuery(projectPhaseIds: number[]): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT upg.user_id as user_id, u.handle as handle FROM tcs_catelog:phase_criteria where project_phase_id IN (${_.join(
            projectPhaseIds,
            ","
          )})`,
        },
      },
    };
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

  public getChallengeStatusUpdateQuery(
    projectId: number,
    projectStatusId: number,
    user: number | undefined = undefined
  ) {
    return new QueryBuilder(ProjectSchema)
      .update({
        projectStatusId,
        modifyUser: user,
      })
      .where(ProjectSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
      })
      .build();
  }
}

export default new ChallengeQueryHelper();
