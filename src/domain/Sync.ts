/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryBuilder } from "@topcoder-framework/client-relational";
import {
  Challenge,
  ChallengeDomain,
  UpdateChallengeInput as V5UpdateChallengeInput,
  UpdateChallengeInput_UpdateInput,
} from "@topcoder-framework/domain-challenge";
import _, { update } from "lodash";
import moment from "moment-timezone";
import { uuid } from "uuidv4";
import { queryRunner } from "../helper/QueryRunner";

import { validateLoadBalancingConfig } from "@grpc/grpc-js/build/src/load-balancer";
import { DomainHelper, Operator } from "@topcoder-framework/lib-common";
import {
  ChallengeStatusIds,
  ChallengeStatusMap,
  IFX_TIMEZONE,
  PHASE_NAME_MAPPINGS,
} from "../config/constants";
import LegacyChallengeDomain from "../domain/LegacyChallenge";
import { LegacyChallenge, LegacyChallengeId } from "../models/domain-layer/legacy/challenge";
import { GetProjectPhasesInput } from "../models/domain-layer/legacy/phase";
import { SyncInput } from "../models/domain-layer/legacy/sync";

const challengeDomain = new ChallengeDomain(
  process.env.GRPC_CHALLENGE_DOMAIN_SERVER_HOST as string,
  process.env.GRPC_CHALLENGE_DOMAIN_SERVER_PORT as string
);

class LegacySyncDomain {
  public async syncLegacy(input: SyncInput): Promise<void> {
    const legacyId = input.projectId;
    const payload = {};
    const legacyChallenge = await LegacyChallengeDomain.getLegacyChallenge(
      LegacyChallengeId.create({ legacyChallengeId: legacyId })
    );

    const { items } = await challengeDomain.scan({
      criteria: [{ key: "legacyId", operator: Operator.OPERATOR_EQUAL, value: legacyId }],
    });

    if (items.length === 0) {
      throw new Error("Challenge not found");
    }
    const v5ChallengeUpdates: Partial<UpdateChallengeInput_UpdateInput> = {};
    const v5ChallengeUpdateInput: Partial<V5UpdateChallengeInput> = {
      filterCriteria: [
        {
          key: "id",
          operator: Operator.OPERATOR_EQUAL,
          value: (items[0] as { id: string }).id,
        },
      ],
    };
    const updatePayload: IUpdatePayload = {};
    for (const table of input.updatedTables) {
      switch (table.table) {
        case "project":
          _.assign(updatePayload, this.handleProjectUpdate(table.value, legacyChallenge));
          break;
        case "project_phase":
          _.assign(updatePayload, await this.handlePhaseUpdate(legacyId));
          break;
        case "project_info":
          break;
        case "phase_criteria":
          _.assign(updatePayload, await this.handlePhaseCriteriaUpdate(legacyId));
          break;
        case "prize":
          break;
        case "project_payment":
          break;
        case "submission":
          _.assign(updatePayload, await this.handleSubmissionUpdate(legacyId));
          break;
        case "resource":
          break;
        default:
      }
    }

    // set v5ChallengeUpdates to v5ChallengeUpdateInput
  }

  private handleProjectUpdate(
    columnNames: string[],
    legacyChallenge: LegacyChallenge
  ): IHandleProjectUpdateResponse {
    const result: IHandleProjectUpdateResponse = {};
    if (
      _.includes(columnNames, "project_status_id") &&
      !_.includes([1, 2], legacyChallenge.projectStatusId)
    ) {
      result["status"] = ChallengeStatusMap[legacyChallenge.projectStatusId as ChallengeStatusIds];
    }
    return result;
  }

  private async handlePhaseUpdate(projectId: number): Promise<IHandlePhaseUpdateResponse> {
    const result: IHandlePhaseUpdateResponse = { phases: [] };
    const { rows } = await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          pt.description AS type,
          pp.phase_status_id AS statusId
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
    });

    const phases: IPhase[] = _.map(rows, (row) => {
      const scheduledEndDate = moment.tz(row.scheduledEndTime, IFX_TIMEZONE);
      if (!result.endDate || scheduledEndDate.isAfter(moment(result.endDate))) {
        result.endDate = scheduledEndDate.format();
      }
      return {
        id: uuid(),
        name: row.type,
        phaseId: _.get(_.find(PHASE_NAME_MAPPINGS, { name: row.type }), "phaseId"),
        duration: _.toInteger(Number(row.duration) / 1000),
        scheduledStartDate: moment.tz(row.scheduledStartTime, IFX_TIMEZONE).format(),
        scheduledEndDate: moment.tz(row.scheduledEndTime, IFX_TIMEZONE).format(),
        actualStartDate: moment.tz(row.actualStartTime, IFX_TIMEZONE).format(),
        actualEndDate: moment.tz(row.actualEndTime, IFX_TIMEZONE).format(),
        isOpen: row.status === 2,
      };
    });
    if (phases.length > 0) {
      const registrationPhase = _.find(phases, (p) => p.name === "Registration");
      const submissionPhase = _.find(phases, (p) => p.name === "Submission");

      result.currentPhaseNames = _.map(
        _.filter(phases, (p) => p.isOpen === true),
        "name"
      );
      if (registrationPhase) {
        result.registrationStartDate =
          registrationPhase.actualStartDate || registrationPhase.scheduledStartDate;
        result.registrationEndDate =
          registrationPhase.actualEndDate || registrationPhase.scheduledEndDate;
        result.startDate = result.registrationStartDate;
      }
      if (submissionPhase) {
        result.submissionStartDate =
          submissionPhase.actualStartDate || submissionPhase.scheduledStartDate;
        result.submissionEndDate =
          submissionPhase.actualEndDate || submissionPhase.scheduledEndDate;
      }
    }
    return result;
  }

  private async handlePhaseCriteriaUpdate(
    projectId: number
  ): Promise<IHandlePhaseCriteriaUpdateResponse> {
    const result: IHandlePhaseCriteriaUpdateResponse = {};
    const { rows } = await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          pcr.parameter AS reviewScorecardId,
          pcs.parameter AS screeningScorecardId, 
          FROM project p
          LEFT JOIN project_phase pps ON p.project_id = pps.project_id AND pps.phase_type_id = 3
          LEFT JOIN phase_criteria pcs ON pcs.project_phase_id = pps.project_phase_id AND pcs.phase_criteria_type_id = 1
          LEFT JOIN project_phase ppr ON ppr.project_id = p.project_id AND (ppr.phase_type_id = 4 OR (ppr.phase_type_id = 18 AND p.project_category_id = 38)) AND ppr.project_phase_id = (SELECT MAX(project_phase_id) FROM project_phase WHERE project_id = p.project_id AND phase_type_id IN (4,18))
          LEFT JOIN phase_criteria pcr ON ppr.project_phase_id = pcr.project_phase_id AND pcr.phase_criteria_type_id = 1
          WHERE p.project_id = ${projectId}`,
        },
      },
    });
    if (!_.isEmpty(rows)) {
      result.reviewScorecardId = rows![0].reviewScorecardId;
      result.screeningScorecardId = rows![0].screeningScorecardId;
    }
    return result;
  }

  private async handleSubmissionUpdate(
    projectId: number
  ): Promise<IHandleSubmissionUpdateResponse> {
    const result: IHandleSubmissionUpdateResponse = { winners: [] };
    const { rows } = await queryRunner.run({
      query: {
        $case: "raw",
        raw: {
          query: `SELECT
          user.handle as submitter,
          s.placement as rank,
          FROM upload u
          LEFT JOIN submission s ON s.upload_id = u.upload_id
          LEFT JOIN prize p ON p.prize_id = s.prize_id
          LEFT JOIN user ON user.user_id = s.create_user
          WHERE s.submission_type_id = 1 AND p.prize_type_id in (15,16) AND u.project_id = ${projectId}
          ORDER BY s.placement`,
        },
      },
    });
    result.winners = _.map(rows, (row) => {
      return {
        handle: row.submitter,
        placement: row.rank,
      };
    });
    return result;
  }
}

interface IUpdatePayload {
  status?: string;
  currentPhaseNames?: string[];
}

interface IHandleProjectUpdateResponse {
  status?: string;
}

interface IHandlePhaseUpdateResponse {
  phases: IPhase[];
  currentPhaseNames?: string[];
  registrationStartDate?: string;
  registrationEndDate?: string;
  submissionStartDate?: string;
  submissionEndDate?: string;
  startDate?: string;
  endDate?: string;
}

interface IPhase {
  id: string;
  name: string;
  phaseId: string | undefined;
  duration: number;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate: string;
  actualEndDate: string;
  isOpen: boolean;
}

interface IHandlePhaseCriteriaUpdateResponse {
  reviewScorecardId?: number;
  screeningScorecardId?: number;
}

interface IHandleSubmissionUpdateResponse {
  winners: IWinner[];
}

interface IWinner {
  handle: string;
  placement: string;
}

export default new LegacySyncDomain();
