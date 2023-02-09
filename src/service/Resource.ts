import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyResourceServer,
  LegacyResourceService,
} from "../models/domain-layer/legacy/services/resource";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyResourceDomain from "../domain/Resource";
import {
  GetResourcesInput,
  ResourceList,
  GetResourceInfosInput,
  ResourceInfoList,
  CreateResourceInfoInput,
  ResourceInfo,
  UpdateResourceInfoInput,
} from "../models/domain-layer/legacy/resource";

class LegacyResourceServerImpl implements LegacyResourceServer {
  [name: string]: UntypedHandleCall;

  getResources: handleUnaryCall<GetResourcesInput, ResourceList> = (
    call: ServerUnaryCall<GetResourcesInput, ResourceList>,
    callback: sendUnaryData<ResourceList>
  ) => {
    LegacyResourceDomain.getResources(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  getResourceInfos: handleUnaryCall<GetResourceInfosInput, ResourceInfoList> = (
    call: ServerUnaryCall<GetResourceInfosInput, ResourceInfoList>,
    callback: sendUnaryData<ResourceInfoList>
  ) => {
    LegacyResourceDomain.getResourceInfos(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  createResourceInfos: handleUnaryCall<CreateResourceInfoInput, CreateResult> = (
    call: ServerUnaryCall<CreateResourceInfoInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyResourceDomain.createResourceInfos(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  updateResourceInfos: handleUnaryCall<UpdateResourceInfoInput, Empty> = (
    call: ServerUnaryCall<UpdateResourceInfoInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyResourceDomain.updateResourceInfos(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };
}

export { LegacyResourceServerImpl as LegacyResourceServer, LegacyResourceService };
