import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import { LegacyTermServer, LegacyTermService } from "../models/domain-layer/legacy/services/term";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyTermDomain from "../domain/Term";
import {
  GetProjectRoleTermsOfUseXrefInput,
  ProjectRoleTermsOfUseXrefList,
  CreateProjectRoleTermsOfUseXrefInput,
  DeleteProjectRoleTermsOfUseXrefInput,
} from "../models/domain-layer/legacy/term";

class LegacyTermServerImpl implements LegacyTermServer {
  [name: string]: UntypedHandleCall;

  getProjectRoleTermsOfUseXrefs: handleUnaryCall<
    GetProjectRoleTermsOfUseXrefInput,
    ProjectRoleTermsOfUseXrefList
  > = (
    call: ServerUnaryCall<GetProjectRoleTermsOfUseXrefInput, ProjectRoleTermsOfUseXrefList>,
    callback: sendUnaryData<ProjectRoleTermsOfUseXrefList>
  ) => {
    LegacyTermDomain.getProjectRoleTermsOfUseXrefs(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  createProjectRoleTermsOfUseXref: handleUnaryCall<
    CreateProjectRoleTermsOfUseXrefInput,
    CreateResult
  > = (
    call: ServerUnaryCall<CreateProjectRoleTermsOfUseXrefInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyTermDomain.createProjectRoleTermsOfUseXref(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  deleteProjectRoleTermsOfUseXref: handleUnaryCall<DeleteProjectRoleTermsOfUseXrefInput, Empty> = (
    call: ServerUnaryCall<DeleteProjectRoleTermsOfUseXrefInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyTermDomain.deleteProjectRoleTermsOfUseXref(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };
}

export { LegacyTermServerImpl as LegacyTermServer, LegacyTermService };
