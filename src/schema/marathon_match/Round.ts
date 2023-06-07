import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { Round } from "../../models/domain-layer/legacy/Round";

export const RoundSchema: Schema<Round> = {
  dbSchema: "informixoltp",
  tableName: "round",
  idSequence: "ROUND_SEQ",
  idColumn: "round_id",
  idTable: "round",
  columns: {
    roundId: { name: "round_id", type: ColumnType.COLUMN_TYPE_INT },
    contestId: { name: "contest_id", type: ColumnType.COLUMN_TYPE_INT },
    name: { name: "name", type: ColumnType.COLUMN_TYPE_STRING },
    status: { name: "status", type: ColumnType.COLUMN_TYPE_STRING },
    ranRatings: { name: "ran_ratings", type: ColumnType.COLUMN_TYPE_INT },
    paidMoney: { name: "paid_money", type: ColumnType.COLUMN_TYPE_INT },
    registrationLimit: { name: "registration_limit", type: ColumnType.COLUMN_TYPE_INT },
    notes: { name: "notes", type: ColumnType.COLUMN_TYPE_STRING },
    invitational: { name: "invitational", type: ColumnType.COLUMN_TYPE_INT },
    roundTypeId: { name: "round_type_id", type: ColumnType.COLUMN_TYPE_INT },
    link: { name: "link", type: ColumnType.COLUMN_TYPE_STRING },
    shortName: { name: "short_name", type: ColumnType.COLUMN_TYPE_STRING },
    forumId: { name: "forum_id", type: ColumnType.COLUMN_TYPE_INT },
    ratedInd: { name: "rated_ind", type: ColumnType.COLUMN_TYPE_INT },
    regionId: { name: "region_id", type: ColumnType.COLUMN_TYPE_INT },
    tcDirectProjectId: { name: "tc_direct_project_id", type: ColumnType.COLUMN_TYPE_INT },
    autoEnd: { name: "auto_end", type: ColumnType.COLUMN_TYPE_INT },
    editorialLink: { name: "editorial_link", type: ColumnType.COLUMN_TYPE_STRING },
    creatorId: { name: "creator_id", type: ColumnType.COLUMN_TYPE_INT },
  },
};
