import { Operator, QueryBuilder } from "@topcoder-framework/client-relational";
import { CreateResult } from "@topcoder-framework/lib-common";
import _ from "lodash";
import { queryRunner } from "../helper/QueryRunner";
import {
  CreateResourceInfoInput,
  CreateResourceInput,
  DeleteResourceInfoInput,
  DeleteResourcesInput,
  GetResourceInfosInput,
  GetResourcesInput,
  Resource,
  ResourceInfo,
  ResourceInfoList,
  ResourceList,
  UpdateResourceInfoInput,
} from "../models/domain-layer/legacy/resource";
import { ResourceSchema } from "../schema/resource/Resource";
import { ResourceInfoSchema } from "../schema/resource/ResourceInfo";

class LegacyResourceDomain {
  public async createResource(input: CreateResourceInput): Promise<CreateResult> {
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ResourceSchema)
        .insert({
          ...input,
          createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
        })
        .build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  public async getResources(input: GetResourcesInput): Promise<ResourceList> {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ResourceSchema)
        .select(..._.map(ResourceSchema.columns))
        .where(ResourceSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(ResourceSchema.columns.resourceRoleId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceRoleId!,
          },
        })
        .build()
    );

    return {
      resources:
        rows && rows?.length > 0 ? rows!.map((r) => Resource.fromPartial(r as Resource)) : [],
    };
  }

  public async getResourceInfos(input: GetResourceInfosInput): Promise<ResourceInfoList> {
    let query = new QueryBuilder(ResourceInfoSchema)
      .select(..._.map(ResourceInfoSchema.columns))
      .where(ResourceInfoSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
        value: {
          $case: "intValue",
          intValue: input.resourceId,
        },
      });
    if (input.resourceInfoTypeId) {
      query = query.andWhere(
        ResourceInfoSchema.columns.resourceInfoTypeId,
        Operator.OPERATOR_EQUAL,
        {
          value: {
            $case: "intValue",
            intValue: input.resourceInfoTypeId,
          },
        }
      );
    }
    const { rows } = await queryRunner.run(query.build());

    return {
      resourceInfos:
        rows && rows?.length > 0
          ? rows!.map((r) => ResourceInfo.fromPartial(r as ResourceInfo))
          : [],
    };
  }

  public async createResourceInfos(input: CreateResourceInfoInput): Promise<CreateResult> {
    const { lastInsertId } = await queryRunner.run(
      new QueryBuilder(ResourceInfoSchema)
        .insert({
          ...input,
          createUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
        })
        .build()
    );
    return {
      kind: {
        $case: "integerId",
        integerId: lastInsertId!,
      },
    };
  }

  // TODO: Test this after informix-access-layer is fixed
  public async updateResourceInfos(input: UpdateResourceInfoInput) {
    const { rows } = await queryRunner.run(
      new QueryBuilder(ResourceInfoSchema)
        .update({
          ...input,
          modifyUser: 22838965, // tcwebservice | TODO: Get using grpc interceptor
        })
        .where(ResourceInfoSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceId,
          },
        })
        .andWhere(ResourceInfoSchema.columns.resourceInfoTypeId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceInfoTypeId,
          },
        })
        .build()
    );
  }

  public async deleteResources(input: DeleteResourcesInput) {
    await queryRunner.run(
      new QueryBuilder(ResourceSchema)
        .delete()
        .where(ResourceSchema.columns.projectId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.projectId,
          },
        })
        .andWhere(ResourceSchema.columns.resourceRoleId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceRoleId!,
          },
        })
        .build()
    );
  }

  public async deleteResourceInfos(input: DeleteResourceInfoInput) {
    await queryRunner.run(
      new QueryBuilder(ResourceInfoSchema)
        .delete()
        .where(ResourceInfoSchema.columns.resourceId, Operator.OPERATOR_EQUAL, {
          value: {
            $case: "intValue",
            intValue: input.resourceId,
          },
        })
        .build()
    );
  }
}

export default new LegacyResourceDomain();
