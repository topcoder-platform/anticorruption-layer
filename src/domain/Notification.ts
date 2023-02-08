import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import { DeleteNotificationsInput, GetNotificationsInput, Notification, NotificationList } from "../models/domain-layer/legacy/notification";
import { NotificationSchema } from "../schema/project/Notification";

class LegacyNotificationDomain {

  public async getNotifications(input:GetNotificationsInput): Promise<NotificationList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(NotificationSchema)
        .select(..._.map(NotificationSchema.columns))
        .where(NotificationSchema.columns.externalRefId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.externalRefId,
          },
        })
        .andWhere(NotificationSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .build()
    );

    return { notifications: rows!.map(r => Notification.fromPartial(r as Notification)) };
  }

  public async deleteNotifications(input:DeleteNotificationsInput) {
    await queryRunner.run(
      new QueryBuilder(NotificationSchema)
      .delete()
      .where(NotificationSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.projectId,
        },
      })
      .andWhere(NotificationSchema.columns.externalRefId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.externalRefId,
        },
      })
      .build()
    );
  }
}

export default new LegacyNotificationDomain();
