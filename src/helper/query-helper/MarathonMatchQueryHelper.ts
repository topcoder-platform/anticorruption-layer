import { Query, QueryBuilder } from "@topcoder-framework/client-relational";

import { ComponentSchema } from "../../schema/marathon_match/Component";
import { ContestSchema } from "../../schema/marathon_match/Contest";
import { ProblemSchema } from "../../schema/marathon_match/Problem";
import { RoundSchema } from "../../schema/marathon_match/Round";
import { RoundComponentSchema } from "../../schema/marathon_match/RoundComponent";

class MarathonMatchQueryHelper {
  public getCreateContestQuery({
    name,
    startDate,
    endDate,
  }: {
    name: string;
    startDate: string;
    endDate: string;
  }): Query {
    return new QueryBuilder(ContestSchema)
      .insert({
        name,
        startDate,
        endDate,
        status: "A",
        groupId: -1,
        activateMenu: 0,
      })
      .build();
  }

  public getCreateRoundQuery({
    contestId,
    name,
    shortName,
  }: {
    contestId: number;
    name: string;
    shortName: string;
  }): Query {
    return new QueryBuilder(RoundSchema)
      .insert({
        contestId,
        name,
        shortName,
        status: "F",
        registrationLimit: 1024,
        invitational: 0,
        roundTypeId: 13,
        ratedInd: 1,
        calendarInd: 0,
      })
      .build();
  }

  public getCreateProblemQuery({ name, problemText }: { name: string; problemText: string }): Query {
    return new QueryBuilder(ProblemSchema)
      .insert({
        name,
        problemText,
        statusId: 90,
        proposedDivisionId: -1,
        problemTypeId: 3,
        proposedDifficultyId: -1,
        acceptSubmissions: 1,
      })
      .build();
  }

  public getCreateComponentQuery({ problemId }: { problemId: number }): Query {
    return new QueryBuilder(ComponentSchema)
      .insert({
        problemId,
        resultTypeId: 16,
        methodName: "defaultMethodName",
        className: "DefaultClassName",
        statusId: 1,
      })
      .build();
  }

  public getCreateRoundComponentQuery({ roundId, componentId }: { roundId: number; componentId: number }): Query {
    return new QueryBuilder(RoundComponentSchema)
      .insert({
        roundId,
        componentId,
        submitOrder: 0,
        divisionId: 1,
        difficultyId: 1,
        points: 250.0,
        openOrder: 0,
      })
      .build();
  }
}

export default new MarathonMatchQueryHelper();
