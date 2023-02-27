/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { ChallengeDomain } from "@topcoder-framework/domain-challenge";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";

import LegacyChallengeDomain from "../domain/LegacyChallenge";
import { LegacyChallenge, LegacyChallengeId } from "../models/domain-layer/legacy/challenge";
import { SyncInput, Table } from "../models/domain-layer/legacy/sync";

class LegacySyncDomain {
  public async syncLegacy(input: SyncInput): Promise<void> {
    const legacyId = input.projectId;
    const payload = {};
    const legacyChallenge = await LegacyChallengeDomain.getLegacyChallenge(
      LegacyChallengeId.create({ legacyChallengeId: legacyId })
    );
    for (const table of input.updatedTables) {
      switch (table.table) {
        case "project":
          _.assign(payload, this.handleProjectUpdate(table.value, legacyChallenge));
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

  private handleProjectUpdate(columnNames: string[], legacyChallenge: LegacyChallenge) {
    const payload = {};
    for (const columnName of columnNames) {
      switch (columnName) {
        case "project_status_id":
          _.assign(payload, this.handleStatusChange(legacyChallenge, {}));
          break;
        case "project_category_id":
          break;
        case "tc_direct_project_id":
          break;
        default:
      }
    }
  }

  private handleStatusChange(legacyChallenge: LegacyChallenge, v5Challenge) {
    const challengeStatusOrders = {
      Draft: 1,
      Active: 2,
      Completed: 3,
      Deleted: 3,
      Cancelled: 3,
    };
    const challengeStatusMap = {
      1: "Active",
      2: "Draft",
      3: "Deleted",
      7: "Completed",
    };
    /*
    const v4StatusNumber = challengeStatusOrders[challengeStatusMap[legacyChallenge.projectStatusId]] || challengeStatusOrders.Cancelled
    const v5StatusNumber = challengeStatusOrders[v5Challenge.status] || challengeStatusOrders.Cancelled

    if (v4StatusNumber >= v5StatusNumber) {
      return { status: challengeStatusMap[legacyChallenge.projectStatusId] }
    } else {
      return {}
    }
    */
  }
}

export default new LegacySyncDomain();
