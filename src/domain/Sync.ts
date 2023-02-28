/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryBuilder } from "@topcoder-framework/client-relational";
import { ChallengeDomain } from "@topcoder-framework/domain-challenge";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";

import { Challenge } from "@topcoder-framework/domain-challenge/dist-es/models/domain-layer/challenge/challenge";
import { Operator } from "@topcoder-framework/lib-common";
import {
  ChallengeStatus,
  ChallengeStatusIds,
  ChallengeStatusMap,
  ChallengeStatusOrders,
} from "../config/constants";
import LegacyChallengeDomain from "../domain/LegacyChallenge";
import { LegacyChallenge, LegacyChallengeId } from "../models/domain-layer/legacy/challenge";
import { SyncInput, Table } from "../models/domain-layer/legacy/sync";

const challengeDomain = new ChallengeDomain(
  process.env.GRPC_CHALLENGE_DOMAIN_SERVER_HOST,
  process.env.GRPC_CHALLENGE_DOMAIN_SERVER_PORT
);

class LegacySyncDomain {
  public async syncLegacy(input: SyncInput): Promise<void> {
    const legacyId = input2.projectId;
    const payload = {};
    const legacyChallenge = await LegacyChallengeDomain.getLegacyChallenge(
      LegacyChallengeId.create({ legacyChallengeId: legacyId })
    );
    await challengeDomain.lookup({ key: "legacyId", value: legacyId });
    const { items } = await challengeDomain.scan({
      criteria: [{ key: "legacyId", operator: Operator.OPERATOR_EQUAL, value: legacyId }],
    });
    const v5Challenge: Challenge = items[0];

    for (const table of input.updatedTables) {
      switch (table.table) {
        case "project":
          _.assign(payload, this.handleProjectUpdate(table.value, legacyChallenge, v5Challenge));
          break;
        case "project_phase":
          break;
        case "project_info":
          break;
        case "phase_criteria":
          break;
        case "prize":
          break;
        case "project_payment":
          break;
        case "submission":
          break;
        case "resource":
          break;
        default:
      }
    }
  }

  private handleProjectUpdate(
    columnNames: string[],
    legacyChallenge: LegacyChallenge,
    v5Challenge: Challenge
  ) {
    const payload = {};
    for (const columnName of columnNames) {
      switch (columnName) {
        case "project_status_id":
          _.assign(payload, this.handleStatusChange(legacyChallenge, v5Challenge));
          break;
        case "project_category_id":
          break;
        case "tc_direct_project_id":
          break;
        default:
      }
    }
  }

  private handleStatusChange(legacyChallenge: LegacyChallenge, v5Challenge: Challenge) {
    const v4StatusNumber =
      ChallengeStatusOrders[
        ChallengeStatusMap[legacyChallenge.projectStatusId as ChallengeStatusIds] as ChallengeStatus
      ] || ChallengeStatusOrders.Cancelled;
    const v5StatusNumber =
      ChallengeStatusOrders[v5Challenge.status as ChallengeStatus] ||
      ChallengeStatusOrders.Cancelled;

    if (v4StatusNumber >= v5StatusNumber) {
      return { status: ChallengeStatusMap[legacyChallenge.projectStatusId as ChallengeStatusIds] };
    } else {
      return {};
    }
  }
}

export default new LegacySyncDomain();
