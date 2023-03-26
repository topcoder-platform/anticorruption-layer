import {
  ChallengeDomain,
  Challenge_Phase as ChallengePhase,
  Challenge_PrizeSet as PrizeSet,
  UpdateChallengeInputForACL,
  UpdateChallengeInputForACL_PrizeSetsACL as PrizeSetsACL,
  UpdateChallengeInputForACL_UpdateInputForACL as UpdateInputACL,
  UpdateChallengeInputForACL_WinnerACL as WinnerACL,
} from "@topcoder-framework/domain-challenge";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import _ from "lodash";
import { uuid } from "uuidv4";
import { queryRunner } from "../helper/QueryRunner";

import { Metadata } from "@grpc/grpc-js";
import { Operator } from "@topcoder-framework/lib-common";
import { Util } from "../common/Util";
import v5Api from "../common/v5Api";
import {
  ChallengeStatusIds,
  ChallengeStatusMap,
  IGNORED_RESOURCE_MEMBER_IDS,
  PHASE_NAME_MAPPING,
} from "../config/constants";
import LegacyChallengeDomain from "../domain/LegacyChallenge";
import { LegacyChallenge, LegacyChallengeId } from "../models/domain-layer/legacy/challenge";
import { SyncInput } from "../models/domain-layer/legacy/sync";

dayjs.extend(utc);
dayjs.extend(timezone);

const challengeDomain = new ChallengeDomain(
  process.env.GRPC_CHALLENGE_DOMAIN_SERVER_HOST as string,
  process.env.GRPC_CHALLENGE_DOMAIN_SERVER_PORT as string
);

class LegacySyncDomain {
  public resourceRoleMap: { [key: number]: string } = {};
  public async syncLegacy(input: SyncInput, metadata: Metadata): Promise<void> {
    const legacyId = input.projectId;
    const token = metadata.get("token")[0].toString();

    const legacyChallenge = await LegacyChallengeDomain.getLegacyChallenge(
      LegacyChallengeId.create({ legacyChallengeId: legacyId })
    );

    const { items } = await challengeDomain.scan({
      criteria: [{ key: "legacyId", operator: Operator.OPERATOR_EQUAL, value: legacyId }],
    });

    if (items.length === 0) {
      throw new Error("Challenge not found");
    }

    const challenge = items[0] as { id: string; phases?: ChallengePhase[] };

    const updateChallengeInput: UpdateChallengeInputForACL = {
      filterCriteria: [
        {
          key: "id",
          operator: Operator.OPERATOR_EQUAL,
          value: challenge.id,
        },
      ],
    };

    const updateInput: UpdateInputACL = {};
    for (const table of input.updatedTables) {
      switch (table.table) {
        case "project":
          _.assign(updateInput, this.handleProjectUpdate(table.value, legacyChallenge));
          break;
        case "project_phase":
          _.assign(updateInput, await this.handlePhaseUpdate(legacyId, challenge.phases));
          break;
        case "phase_criteria":
          _.assign(updateInput, await this.handlePhaseCriteriaUpdate(legacyId));
          break;
        case "prize":
          _.assign(updateInput, await this.handlePrizeUpdate(legacyId));
          break;
        case "project_payment":
          _.assign(
            updateInput,
            await this.handleProjectPaymentUpdate(legacyId, updateInput.prizeSets)
          );
          break;
        case "submission":
          _.assign(updateInput, await this.handleSubmissionUpdate(legacyId));
          break;
        case "resource":
          await this.handleResourceUpdate(legacyId, challenge.id, token);
          break;
        default:
      }
    }
    await challengeDomain.updateForACL({
      ...updateChallengeInput,
      updateInputForAcl: updateInput,
    });
  }

  private handleProjectUpdate(
    columnNames: string[],
    legacyChallenge: LegacyChallenge
  ): UpdateInputACL {
    const result: UpdateInputACL = {};
    if (
      _.includes(columnNames, "project_status_id") &&
      !_.includes([1, 2], legacyChallenge.projectStatusId)
    ) {
      result.status = ChallengeStatusMap[legacyChallenge.projectStatusId as ChallengeStatusIds];
    }
    return result;
  }

  private async handlePhaseUpdate(
    projectId: number,
    v5Phases: ChallengePhase[] | undefined
  ): Promise<UpdateInputACL> {
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      type: string;
      statusid: number;
      scheduledstarttime: string;
      actualstarttime?: string;
      actualendtime?: string;
      scheduledendtime: string;
      duration: string;
    }
    const result: UpdateInputACL = {};
    const queryResult = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          pt.description AS type,
          pp.phase_status_id AS statusId,
          pp.scheduled_start_time AS scheduledStartTime,
          pp.actual_start_time AS actualStartTime,
          pp.actual_end_time AS actualEndTime,
          pp.scheduled_end_time AS scheduledEndTime,
          pp.duration AS duration
          FROM project p
          INNER JOIN project_phase pp ON pp.project_id = p.project_id
          LEFT JOIN phase_type_lu pt ON pt.phase_type_id = pp.phase_type_id
          WHERE p.project_id = ${projectId}`,
        },
      },
    })) as IQueryResult;
    const rows = queryResult.rows;
    const phases: ChallengePhase[] = _.map(rows, (row) => {
      const scheduledEndDate = Util.dateFromInformix(row.scheduledendtime)!;
      if (!result.endDate || scheduledEndDate.isAfter(dayjs(result.endDate))) {
        result.endDate = scheduledEndDate.format();
      }
      const phaseId = PHASE_NAME_MAPPING[row.type as keyof typeof PHASE_NAME_MAPPING];
      const v5Phase = _.find(v5Phases, { phaseId: phaseId });
      return {
        id: uuid(),
        name: row.type,
        description: v5Phase?.description,
        predecessor: v5Phase?.predecessor,
        phaseId,
        duration: _.toInteger(Number(row.duration) / 1000),
        scheduledStartDate: Util.dateFromInformix(row.scheduledstarttime)?.format(),
        scheduledEndDate: Util.dateFromInformix(row.scheduledendtime)?.format(),
        actualStartDate: Util.dateFromInformix(row.actualstarttime)?.format(),
        actualEndDate: Util.dateFromInformix(row.actualendtime)?.format(),
        isOpen: row.statusid === 2,
        constraints: _.defaultTo(v5Phase?.constraints, []),
      };
    });
    result.phases = { phases };
    if (phases.length > 0) {
      const registrationPhase = _.find(phases, (p) => p.name === "Registration");
      const submissionPhase = _.find(phases, (p) => p.name === "Submission");

      result.currentPhase = phases
        .slice()
        .reverse()
        .find((phase) => phase.isOpen);
      const currentPhaseNames = _.map(
        _.filter(phases, (p) => p.isOpen === true),
        "name"
      );
      result.currentPhaseNames = { currentPhaseNames };
      if (!_.isUndefined(registrationPhase)) {
        result.registrationStartDate =
          registrationPhase.actualStartDate || registrationPhase.scheduledStartDate;
        result.registrationEndDate =
          registrationPhase.actualEndDate || registrationPhase.scheduledEndDate;
        result.startDate = result.registrationStartDate;
      }
      if (!_.isUndefined(submissionPhase)) {
        result.submissionStartDate =
          submissionPhase.actualStartDate || submissionPhase.scheduledStartDate;
        result.submissionEndDate =
          submissionPhase.actualEndDate || submissionPhase.scheduledEndDate;
      }
    }
    return result;
  }

  private async handlePhaseCriteriaUpdate(projectId: number): Promise<UpdateInputACL> {
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      reviewscorecardid: string;
      screeningscorecardid: string;
    }
    const result: UpdateInputACL = {};
    const queryResult = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          pcr.parameter AS reviewScorecardId,
          pcs.parameter AS screeningScorecardId
          FROM project p
          LEFT JOIN project_phase pps ON p.project_id = pps.project_id AND pps.phase_type_id = 3
          LEFT JOIN phase_criteria pcs ON pcs.project_phase_id = pps.project_phase_id AND pcs.phase_criteria_type_id = 1
          LEFT JOIN project_phase ppr ON ppr.project_id = p.project_id AND (ppr.phase_type_id = 4 OR (ppr.phase_type_id = 18 AND p.project_category_id = 38)) AND ppr.project_phase_id = (SELECT MAX(project_phase_id) FROM project_phase WHERE project_id = p.project_id AND phase_type_id IN (4,18))
          LEFT JOIN phase_criteria pcr ON ppr.project_phase_id = pcr.project_phase_id AND pcr.phase_criteria_type_id = 1
          WHERE p.project_id = ${projectId}`,
        },
      },
    })) as IQueryResult;
    const rows = queryResult.rows;
    if (!_.isUndefined(rows) && rows.length > 0) {
      const reviewScorecardId = _.isEmpty(rows[0].reviewscorecardid)
        ? undefined
        : _.toNumber(rows[0].reviewscorecardid);
      const screeningScorecardId = _.isEmpty(rows[0].screeningscorecardid)
        ? undefined
        : _.toNumber(rows[0].screeningscorecardid);
      result.legacy = { reviewScorecardId, screeningScorecardId };
    }
    return result;
  }

  private async handleSubmissionUpdate(projectId: number): Promise<UpdateInputACL> {
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      submitter: string;
      rank: string;
    }
    const result: UpdateInputACL = {};
    const queryResult = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          user.handle AS submitter,
          s.placement AS rank
          FROM upload u
          LEFT JOIN submission s ON s.upload_id = u.upload_id
          LEFT JOIN prize p ON p.prize_id = s.prize_id
          LEFT JOIN user ON user.user_id = s.create_user
          WHERE s.submission_type_id = 1 AND p.prize_type_id in (15,16) AND u.project_id = ${projectId}
          ORDER BY s.placement`,
        },
      },
    })) as IQueryResult;
    const rows = queryResult.rows;
    const winners: WinnerACL[] = _.map(rows, (row) => {
      return {
        handle: row.submitter,
        placement: _.toNumber(row.rank),
      };
    });
    result.winners = { winners };
    return result;
  }

  private async handlePrizeUpdate(projectId: number): Promise<UpdateInputACL> {
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      amount: number;
      numberofsubmissions: number;
      prizetypeid: string;
      place: number;
    }
    const result: UpdateInputACL = {};
    const queryResult = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          p.prize_amount AS amount,
          p.number_of_submissions AS numberOfSubmissions,
          p.prize_type_id AS prizeTypeId,
          p.place AS place
          FROM prize p
          WHERE p.prize_type_id IN (14,15) AND p.project_id = ${projectId}
          ORDER BY p.place`,
        },
      },
    })) as IQueryResult;
    const rows = queryResult.rows;
    const prizeSets: PrizeSet[] = [];
    const placementPrizeSet: PrizeSet = {
      type: "placement",
      description: "Challenge Prizes",
      prizes: [],
    };
    let totalPrizes = 0;
    let numberOfCheckpointPrizes = 0;
    let topCheckPointPrize = 0;
    _.forEach(rows, (row) => {
      const amount = row.amount;
      if (row.prizetypeid === "15") {
        placementPrizeSet.prizes.push({ value: amount, type: "USD" });
        totalPrizes += amount;
      } else {
        numberOfCheckpointPrizes += row.numberofsubmissions;
        if (row.place === 1) {
          topCheckPointPrize = amount;
        }
      }
    });
    prizeSets.push(placementPrizeSet);
    if (numberOfCheckpointPrizes > 0) {
      const checkpointPrizeSet: PrizeSet = {
        type: "checkpoint",
        description: "Checkpoint Prizes",
        prizes: [],
      };
      for (let i = 0; i < numberOfCheckpointPrizes; i += 1) {
        checkpointPrizeSet.prizes.push({ value: topCheckPointPrize, type: "USD" });
      }
      prizeSets.push(checkpointPrizeSet);
    }
    result.prizeSets = { prizeSets };
    result.overview = { totalPrizes };
    return result;
  }

  private async handleProjectPaymentUpdate(
    projectId: number,
    currentPrizeSets: PrizeSetsACL | undefined
  ): Promise<UpdateInputACL> {
    interface IQueryResultForResource {
      rows: IRowForResource[] | undefined;
    }
    interface IRowForResource {
      resourceid: number;
    }
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      amount: string;
    }
    const result: UpdateInputACL = { prizeSets: currentPrizeSets };
    const queryResultForResource = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT limit 1 resource_id AS resourceId
          FROM resource
          WHERE project_id = ${projectId}
          AND resource_role_id = 14`,
        },
      },
    })) as IQueryResultForResource;
    let rows: IRow[] = [];
    if (!_.isUndefined(queryResultForResource.rows) && queryResultForResource.rows.length > 0) {
      const queryResult = (await queryRunner.run({
        query: {
          $case: "raw",
          raw: {
            query: `SELECT
            amount AS amount
            FROM project_payment
            WHERE resource_id = ${queryResultForResource.rows[0].resourceid}
            AND project_payment_type_id = 4`,
          },
        },
      })) as IQueryResult;
      rows = queryResult.rows as IRow[];
    }
    if (rows.length > 0 && _.toNumber(rows[0].amount) > 0) {
      if (_.isUndefined(result.prizeSets)) {
        result.prizeSets = { prizeSets: [] };
      }
      result.prizeSets.prizeSets.push({
        type: "copilot",
        description: "Copilot Payment",
        prizes: [{ value: _.toNumber(rows[0].amount), type: "USD" }],
      });
    }
    return result;
  }

  private async handleResourceUpdate(
    projectId: number,
    challengeId: string,
    token: string
  ): Promise<void> {
    interface IQueryResult {
      rows: IRow[] | undefined;
    }
    interface IRow {
      resourceroleid: number;
      memberid: number;
      memberhandle: string;
    }
    const queryResult = (await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT r.resource_role_id as resourceroleid, r.user_id as memberid, u.handle as memberhandle
          FROM resource r
          JOIN user u on r.user_id = u.user_id
          WHERE project_id = ${projectId}`,
        },
      },
    })) as IQueryResult;
    const rows = queryResult.rows || [];
    const v5Resources = await v5Api.getChallengeResources(challengeId, token);
    if (_.isEmpty(this.resourceRoleMap)) {
      await this.prepareResourceRoleMap();
    }
    console.info("Existent Resources:", JSON.stringify(rows));
    for (const resource of rows) {
      if (_.includes(IGNORED_RESOURCE_MEMBER_IDS, resource.memberid)) {
        continue;
      }
      if (
        !_.find(v5Resources, {
          memberId: _.toString(resource.memberid),
          roleId: this.resourceRoleMap[resource.resourceroleid],
        })
      ) {
        const data = {
          challengeId,
          memberHandle: resource.memberhandle,
          roleId: this.resourceRoleMap[resource.resourceroleid],
        };
        console.info("Adding Resource:", JSON.stringify(data));
        await v5Api.addChallengeResource(data, token);
      }
    }
  }

  private async prepareResourceRoleMap() {
    const roles = await v5Api.getResourceRoles();
    _.forEach(roles, (r) => (this.resourceRoleMap[r.legacyId] = r.id));
  }
}

export default new LegacySyncDomain();
