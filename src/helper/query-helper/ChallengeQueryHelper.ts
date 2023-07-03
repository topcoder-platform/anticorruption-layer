import { Operator, Query, QueryBuilder } from "@topcoder-framework/client-relational";
import dayjs from "dayjs";
import _ from "lodash";
import { Util } from "../../common/Util";
import { ObserverResourceInfoToAdd, ResourceInfoTypeIds } from "../../config/constants";
import { Phase, Prize } from "../../models/domain-layer/legacy/challenge";
import { PhaseCriteria } from "../../models/domain-layer/legacy/phase";
import { ContestEligibilitySchema } from "../../schema/contest_eligibility/ContestEligibility";
import { GroupContestEligibilitySchema } from "../../schema/contest_eligibility/GroupContestEligibility";
import { PhaseCriteriaSchema } from "../../schema/project/PhaseCriteria";
import { PhaseDependencySchema } from "../../schema/project/PhaseDependency";
import { ProjectSchema } from "../../schema/project/Project";
import { ProjectInfoSchema } from "../../schema/project/ProjectInfo";
import { ProjectPhaseSchema } from "../../schema/project/ProjectPhase";
import { PrizeSchema } from "../../schema/project_payment/Prize";
import { ProjectPaymentSchema } from "../../schema/project_payment/ProjectPayment";
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

  public getChallengeCategoryQuery(projectId: number): Query {
    return new QueryBuilder(ProjectSchema)
      .select(ProjectSchema.columns.projectCategoryId)
      .where(ProjectSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: projectId,
        },
      })
      .limit(1)
      .build();
  }

  public getPrizeCreateQueries(projectId: number, prizes: Prize[], user: number | undefined = undefined): Query[] {
    const placementPrizes = prizes
      .filter((prize) => _.toLower(prize.type) === "placement")
      .map((prize) => {
        try {
          return new QueryBuilder(PrizeSchema)
            .insert({
              projectId,
              place: prize.place,
              prizeAmount: prize.amountInCents / 100,
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
    const checkPointPrizes = _.filter(prizes, (prize) => _.toLower(prize.type) === "checkpoint");
    const numOfCheckpointPrizes = checkPointPrizes.length;
    const checkPointPrize = _.map(_.take(checkPointPrizes, 1), (prize) => {
      try {
        return new QueryBuilder(PrizeSchema)
          .insert({
            projectId,
            place: 1,
            prizeAmount: prize.amountInCents / 100,
            prizeTypeId: 14,
            numberOfSubmissions: numOfCheckpointPrizes,
            createUser: user,
            modifyUser: user,
          })
          .build();
      } catch (err) {
        console.log("Failed when handling", prize, err);
        throw err;
      }
    });
    return [...placementPrizes, ...checkPointPrize];
  }

  public getPrizeListQuery(projectId: number): Query {
    return new QueryBuilder(PrizeSchema)
      .select(..._.map(PrizeSchema.columns))
      .where(PrizeSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
      })
      .build();
  }

  public getPrizeUpdateQuery = (prizeId: number, prizeAmount: number, numberOfSubmissions: number, user: number) => {
    return new QueryBuilder(PrizeSchema)
      .update({
        prizeAmount,
        numberOfSubmissions,
        modifyUser: user,
      })
      .where(PrizeSchema.columns.prizeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: prizeId },
      })
      .build();
  };

  public getPrizeDeleteQuery(prizeId: number): Query {
    return new QueryBuilder(PrizeSchema)
      .delete()
      .where(PrizeSchema.columns.prizeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: prizeId },
      })
      .build();
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

  public getChallengeInfoSelectQuery(projectId: number, projectInfoTypeId: number): Query {
    return new QueryBuilder(ProjectInfoSchema)
      .select(ProjectInfoSchema.columns.value)
      .where(ProjectInfoSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
      })
      .andWhere(ProjectInfoSchema.columns.projectInfoTypeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: projectInfoTypeId },
      })
      .build();
  }

  public getChallengeInfoUpdateQuery(projectId: number, key: number, value: string, user: number) {
    return new QueryBuilder(ProjectInfoSchema)
      .update({
        value,
        modifyUser: user,
      })
      .where(ProjectInfoSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
      })
      .andWhere(ProjectInfoSchema.columns.projectInfoTypeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: key },
      })
      .build();
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

  public getPhaseUpdateQuery(projectId: number, phaseId: number, phase: Phase, user: number | undefined): Query {
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
      .andWhere(ProjectPhaseSchema.columns.projectPhaseId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: phaseId },
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
          query: `SELECT project_phase_id as projectphaseid, phase_criteria_type_id as phasecriteriatypeid, parameter as parameter FROM tcs_catalog:phase_criteria where project_phase_id IN (${_.join(
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

  public getResourceListQuery(projectId: number, resourceRoleId: number): Query {
    return new QueryBuilder(ResourceSchema)
      .select(..._.map(ResourceSchema.columns))
      .where(ResourceSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectId },
      })
      .andWhere(ResourceSchema.columns.resourceRoleId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: resourceRoleId },
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

  public getResourceInfoUpdateQuery(
    resourceId: number,
    resourceInfoTypeId: number,
    value: string,
    user: number
  ): Query {
    return new QueryBuilder(ResourceInfoSchema)
      .update({
        value,
        modifyUser: user,
      })
      .where(ResourceInfoSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: resourceId },
      })
      .andWhere(ResourceInfoSchema.columns.resourceInfoTypeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: resourceInfoTypeId },
      })
      .build();
  }

  public getResourceInfoSelectQuery(resourceId: number, resourceInfoTypeId?: number): Query {
    let query = new QueryBuilder(ResourceInfoSchema)
      .select(..._.map(ResourceInfoSchema.columns))
      .where(ResourceInfoSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: resourceId },
      });
    if (!_.isUndefined(resourceInfoTypeId)) {
      query = query.andWhere(ResourceInfoSchema.columns.resourceInfoTypeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: resourceInfoTypeId },
      });
    }
    return query.build();
  }

  public getProjectPaymentCreateQuery(
    resourceId: number,
    amount: number,
    projectPaymentTypeId: number,
    user: number | undefined = undefined
  ): Query {
    return new QueryBuilder(ProjectPaymentSchema)
      .insert({
        resourceId,
        amount,
        projectPaymentTypeId,
        createUser: user,
        modifyUser: user,
      })
      .build();
  }

  public getProjectPaymentSelectQuery(resourceId: number, projectPaymentTypeId: number): Query {
    return new QueryBuilder(ProjectPaymentSchema)
      .select(..._.map(ProjectPaymentSchema.columns))
      .where(ProjectPaymentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: resourceId },
      })
      .andWhere(ProjectPaymentSchema.columns.projectPaymentTypeId, Operator.OPERATOR_EQUAL, {
        value: { $case: "intValue", intValue: projectPaymentTypeId },
      })
      .build();
  }

  public getProjectPaymentUpdateQuery(projectPaymentId: number, resourceId: number, amount: number, userId: number) {
    return new QueryBuilder(ProjectPaymentSchema)
      .update({
        amount,
        modifyUser: userId,
      })
      .where(ProjectPaymentSchema.columns.projectPaymentId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: projectPaymentId },
      })
      .andWhere(ProjectPaymentSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: resourceId },
      })
      .build();
  }

  public getObserverResourceInfoCreateQueries(
    resourceId: number,
    userId: number,
    handle: string,
    user: number
  ): Query[] {
    return ObserverResourceInfoToAdd.map((info) => {
      let value: string = handle;

      if (info === "AppealsCompletedEarly") value = "NO";
      if (info === "PaymentStatus") value = "N/A";
      if (info === "RegistrationDate") value = dayjs().format("MM.DD.YYYY hh:mm A");
      if (info === "Handle") value = handle;
      if (info === "ExternalReferenceId") value = userId.toString();

      return this.getResourceInfoCreateQuery(resourceId, ResourceInfoTypeIds[info], value, user);
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

  public getContestEligibilityCreateQuery(projectId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `INSERT INTO tcs_catalog:contest_eligibility (contest_eligibility_id, contest_id, is_studio) VALUES(tcs_catalog:contest_eligibility_seq.NEXTVAL, ${projectId}, 0)`,
        },
      },
    };
  }

  public getContestEligibilityIdQuery(projectId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT FIRST 1 contest_eligibility_id FROM tcs_catalog:contest_eligibility WHERE contest_id = ${projectId} ORDER BY contest_eligibility_id DESC`,
        },
      },
    };
  }

  public getContestEligibilityForDeleteQuery(projectId: number, groupId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT ce.contest_eligibility_id FROM tcs_catalog:contest_eligibility ce inner join tcs_catalog:group_contest_eligibility gce on ce.contest_eligibility_id = gce.contest_eligibility_id WHERE contest_id = ${projectId} and gce.group_id = ${groupId}`,
        },
      },
    };
  }

  public getGroupContestEligibilityCreateQuery(contestEligibilityId: number, groupId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `INSERT INTO tcs_catalog:group_contest_eligibility (contest_eligibility_id, group_id) VALUES(${contestEligibilityId}, ${groupId})`,
        },
      },
    };
  }

  public getContestEligibilityIdsQuery(projectId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT contest_eligibility_id as contestEligibilityId FROM tcs_catalog:contest_eligibility WHERE contest_id = ${projectId}`,
        },
      },
    };
  }

  public getGroupContestEligibilitySelectQuery(contestEligibilityId: number): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT group_id FROM tcs_catalog:group_contest_eligibility WHERE contest_eligibility_id = ${contestEligibilityId}`,
        },
      },
    };
  }

  public getGroupContestEligibilityDeleteQuery(contestEligibilityId: number): Query {
    return new QueryBuilder(GroupContestEligibilitySchema)
      .delete()
      .where(GroupContestEligibilitySchema.columns.contestEligibilityId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: contestEligibilityId },
      })
      .build();
  }

  public getContestEligibilityDeleteQuery(contestEligibilityId: number): Query {
    return new QueryBuilder(ContestEligibilitySchema)
      .delete()
      .where(ContestEligibilitySchema.columns.contestEligibilityId, Operator.OPERATOR_EQUAL, {
        value: { $case: "longValue", longValue: contestEligibilityId },
      })
      .build();
  }

  public getChallengePaymentAmountByResourceId(
    projectCategoryId: number,
    firstPlacePrize: number,
    resourceId: number,
    resourceRoleId: number
  ): Query {
    return {
      query: {
        $case: "raw",
        raw: {
          query: `SELECT ROUND(p.fixed_amount + (p.base_coefficient + p.incremental_coefficient * r.submission_count) * ${firstPlacePrize}, 2) AS payment
            FROM default_project_payment p
            JOIN (
              SELECT resource_id, COUNT(*) AS submission_count
              FROM review
              WHERE committed = 1
              GROUP BY resource_id) r
            ON p.project_category_id = ${projectCategoryId} AND p.resource_role_id = ${resourceRoleId} AND r.resource_id = ${resourceId}`,
        },
      },
    };
  }
}

export default new ChallengeQueryHelper();
