import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import {
  LegacyPhaseServer,
  LegacyPhaseService,
} from "../models/domain-layer/legacy/services/phase";

import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import LegacyPhaseDomain from "../domain/LegacyPhase";
import {
  PhaseCriteriaList,
  CreatePhaseCriteriaInput,
  DeletePhaseCriteriaInput,
  PhaseTypeList,
  GetProjectPhasesInput,
  ProjectPhaseList,
  DeleteProjectPhasesInput,
  CreateProjectPhaseInput,
  ProjectPhase,
  UpdateProjectPhaseInput,
  CreatePhaseDependencyInput,
  GetPhaseCriteriaInput,
} from "../models/domain-layer/legacy/phase";

class LegacyPhaseServerImpl implements LegacyPhaseServer {
  [name: string]: UntypedHandleCall;
  getPhaseCriteria: handleUnaryCall<GetPhaseCriteriaInput, PhaseCriteriaList> = (
    call: ServerUnaryCall<GetPhaseCriteriaInput, PhaseCriteriaList>,
    callback: sendUnaryData<PhaseCriteriaList>
  ) => {
    LegacyPhaseDomain.getPhaseCriteria(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  createPhaseCriteria: handleUnaryCall<CreatePhaseCriteriaInput, CreateResult> = (
    call: ServerUnaryCall<CreatePhaseCriteriaInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyPhaseDomain.createPhaseCriteria(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  deletePhaseCriteria: handleUnaryCall<DeletePhaseCriteriaInput, Empty> = (
    call: ServerUnaryCall<DeletePhaseCriteriaInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPhaseDomain.deletePhaseCriteria(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  getPhaseTypes: handleUnaryCall<Empty, PhaseTypeList> = (
    call: ServerUnaryCall<Empty, PhaseTypeList>,
    callback: sendUnaryData<PhaseTypeList>
  ) => {
    LegacyPhaseDomain.getPhaseTypes()
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  getProjectPhases: handleUnaryCall<GetProjectPhasesInput, ProjectPhaseList> = (
    call: ServerUnaryCall<GetProjectPhasesInput, ProjectPhaseList>,
    callback: sendUnaryData<ProjectPhaseList>
  ) => {
    LegacyPhaseDomain.getProjectPhases(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  deleteProjectPhases: handleUnaryCall<DeleteProjectPhasesInput, Empty> = (
    call: ServerUnaryCall<DeleteProjectPhasesInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacyPhaseDomain.deleteProjectPhases(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  createProjectPhase: handleUnaryCall<CreateProjectPhaseInput, CreateResult> = (
    call: ServerUnaryCall<CreateProjectPhaseInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyPhaseDomain.createProjectPhase(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };

  updateProjectPhase: handleUnaryCall<UpdateProjectPhaseInput, ProjectPhase> = (
    call: ServerUnaryCall<UpdateProjectPhaseInput, ProjectPhase>,
    callback: sendUnaryData<ProjectPhase>
  ) => {
    LegacyPhaseDomain.updateProjectPhase(call.request)
      .then((response) => callback(null))
      .catch((err) => callback(err, null));
  };

  createPhaseDependency: handleUnaryCall<CreatePhaseDependencyInput, CreateResult> = (
    call: ServerUnaryCall<CreatePhaseDependencyInput, CreateResult>,
    callback: sendUnaryData<CreateResult>
  ) => {
    LegacyPhaseDomain.createPhaseDependency(call.request)
      .then((response) => callback(null, response))
      .catch((err) => callback(err, null));
  };
}

export { LegacyPhaseServerImpl as LegacyPhaseServer, LegacyPhaseService };
