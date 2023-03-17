import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  CreateProjectInfoInput,
  DeleteProjectInfoInput,
  GetProjectInfoInput,
  ProjectInfo,
  ProjectInfoList,
  ProjectInfoTypeList,
  UpdateProjectInfoInput,
} from "../models/domain-layer/legacy/project_info";

import {
  LegacyProjectInfoServer,
  LegacyProjectInfoService,
} from "../models/domain-layer/legacy/services/project_info";

import { CreateResult, Empty, UpdateResult } from "@topcoder-framework/lib-common";
import ProjectInfoDomain from "../domain/ProjectInfo";

class LegacyProjectInfoServerImpl implements LegacyProjectInfoServer {
  [name: string]: UntypedHandleCall;

  create: handleUnaryCall<CreateProjectInfoInput, CreateResult> = (
    call: ServerUnaryCall<CreateProjectInfoInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    ProjectInfoDomain.create(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  update: handleUnaryCall<UpdateProjectInfoInput, UpdateResult> = (
    call: ServerUnaryCall<UpdateProjectInfoInput, UpdateResult>,
    callback: sendUnaryData<UpdateResult>
  ) => {
    ProjectInfoDomain.update(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  delete: handleUnaryCall<DeleteProjectInfoInput, Empty> = (
    call: ServerUnaryCall<DeleteProjectInfoInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    ProjectInfoDomain.delete(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err));
  };

  getProjectInfo: handleUnaryCall<GetProjectInfoInput, ProjectInfoList> = (
    call: ServerUnaryCall<GetProjectInfoInput, ProjectInfoList>,
    callback: sendUnaryData<ProjectInfoList>
  ) => {
    ProjectInfoDomain.getProjectInfo(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  getProjectInfoTypes: handleUnaryCall<Empty, ProjectInfoTypeList> = (
    call: ServerUnaryCall<Empty, ProjectInfoTypeList>,
    callback: sendUnaryData<ProjectInfoTypeList>
  ) => {
    ProjectInfoDomain.getProjectInfoTypes()
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };
}

export { LegacyProjectInfoServerImpl as LegacyProjectInfoServer, LegacyProjectInfoService };
