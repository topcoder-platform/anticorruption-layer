import dayjs from "dayjs";
import _ from "lodash";
import { Util } from "../common/Util";
import { CreateChallengeInput_Phase } from "../models/domain-layer/legacy/challenge";
import { LegacyChallengePhase } from "../models/domain-layer/legacy/challenge_phase";

class Comparer {
  public checkIfPhaseChanged(
    legacyPhase: LegacyChallengePhase | undefined,
    phase: CreateChallengeInput_Phase
  ): boolean {
    if (_.isUndefined(legacyPhase)) {
      return false;
    }
    return (
      this.isDateChanged(legacyPhase.scheduledStartTime, phase.scheduledStartTime) ||
      this.isDateChanged(legacyPhase.scheduledEndTime, legacyPhase.scheduledEndTime) ||
      legacyPhase.duration !== phase.duration ||
      this.isDateChanged(legacyPhase.actualStartTime, phase.actualStartTime) ||
      this.isDateChanged(legacyPhase.actualEndTime, phase.actualEndTime) ||
      this.isDateChanged(legacyPhase.fixedStartTime, phase.fixedStartTime)
    );
  }

  private isDateChanged(legacyDate: string | undefined, v5Date: string | undefined): boolean {
    if (_.isUndefined(legacyDate) && _.isUndefined(v5Date)) {
      return false;
    }
    if (_.isUndefined(legacyDate) && !_.isUndefined(v5Date)) {
      return true;
    }
    if (!_.isUndefined(legacyDate) && _.isUndefined(v5Date)) {
      return true;
    }
    return !Util.dateFromInformix(legacyDate!)!.isSame(dayjs(v5Date!));
  }
}

export default new Comparer();
