/* eslint-disable */
import type { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import {
  CreateResourceInfoInput,
  GetResourceInfosInput,
  GetResourcesInput,
  ResourceInfoList,
  ResourceList,
  UpdateResourceInfoInput,
} from "../resource";

export type LegacyResourceService = typeof LegacyResourceService;
export const LegacyResourceService = {
  getResources: {
    path: "/topcoder.domain.service.resource.LegacyResource/GetResources",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetResourcesInput) => Buffer.from(GetResourcesInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetResourcesInput.decode(value),
    responseSerialize: (value: ResourceList) => Buffer.from(ResourceList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ResourceList.decode(value),
  },
  getResourceInfos: {
    path: "/topcoder.domain.service.resource.LegacyResource/GetResourceInfos",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetResourceInfosInput) => Buffer.from(GetResourceInfosInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetResourceInfosInput.decode(value),
    responseSerialize: (value: ResourceInfoList) => Buffer.from(ResourceInfoList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ResourceInfoList.decode(value),
  },
  createResourceInfos: {
    path: "/topcoder.domain.service.resource.LegacyResource/CreateResourceInfos",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateResourceInfoInput) => Buffer.from(CreateResourceInfoInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateResourceInfoInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  updateResourceInfos: {
    path: "/topcoder.domain.service.resource.LegacyResource/UpdateResourceInfos",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateResourceInfoInput) => Buffer.from(UpdateResourceInfoInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateResourceInfoInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface LegacyResourceServer extends UntypedServiceImplementation {
  getResources: handleUnaryCall<GetResourcesInput, ResourceList>;
  getResourceInfos: handleUnaryCall<GetResourceInfosInput, ResourceInfoList>;
  createResourceInfos: handleUnaryCall<CreateResourceInfoInput, CreateResult>;
  updateResourceInfos: handleUnaryCall<UpdateResourceInfoInput, Empty>;
}
