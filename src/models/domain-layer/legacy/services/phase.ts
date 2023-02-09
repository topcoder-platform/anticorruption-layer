/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateResult, Empty } from "@topcoder-framework/lib-common";
import {
  CreatePhaseCriteriaInput,
  CreatePhaseDependencyInput,
  CreateProjectPhaseInput,
  DeletePhaseCriteriaInput,
  DeleteProjectPhasesInput,
  GetPhaseCriteriaInput,
  GetProjectPhasesInput,
  PhaseCriteriaList,
  PhaseTypeList,
  ProjectPhaseList,
  UpdateProjectPhaseInput,
} from "../phase";

export type LegacyPhaseService = typeof LegacyPhaseService;
export const LegacyPhaseService = {
  getPhaseCriteria: {
    path: "/topcoder.domain.service.phase.LegacyPhase/GetPhaseCriteria",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetPhaseCriteriaInput) => Buffer.from(GetPhaseCriteriaInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetPhaseCriteriaInput.decode(value),
    responseSerialize: (value: PhaseCriteriaList) => Buffer.from(PhaseCriteriaList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PhaseCriteriaList.decode(value),
  },
  createPhaseCriteria: {
    path: "/topcoder.domain.service.phase.LegacyPhase/CreatePhaseCriteria",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePhaseCriteriaInput) => Buffer.from(CreatePhaseCriteriaInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePhaseCriteriaInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  deletePhaseCriteria: {
    path: "/topcoder.domain.service.phase.LegacyPhase/DeletePhaseCriteria",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeletePhaseCriteriaInput) => Buffer.from(DeletePhaseCriteriaInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeletePhaseCriteriaInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  getPhaseTypes: {
    path: "/topcoder.domain.service.phase.LegacyPhase/GetPhaseTypes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: PhaseTypeList) => Buffer.from(PhaseTypeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PhaseTypeList.decode(value),
  },
  getProjectPhases: {
    path: "/topcoder.domain.service.phase.LegacyPhase/GetProjectPhases",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProjectPhasesInput) => Buffer.from(GetProjectPhasesInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProjectPhasesInput.decode(value),
    responseSerialize: (value: ProjectPhaseList) => Buffer.from(ProjectPhaseList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ProjectPhaseList.decode(value),
  },
  deleteProjectPhases: {
    path: "/topcoder.domain.service.phase.LegacyPhase/DeleteProjectPhases",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProjectPhasesInput) => Buffer.from(DeleteProjectPhasesInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProjectPhasesInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  createProjectPhase: {
    path: "/topcoder.domain.service.phase.LegacyPhase/CreateProjectPhase",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProjectPhaseInput) => Buffer.from(CreateProjectPhaseInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProjectPhaseInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
  updateProjectPhase: {
    path: "/topcoder.domain.service.phase.LegacyPhase/UpdateProjectPhase",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProjectPhaseInput) => Buffer.from(UpdateProjectPhaseInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProjectPhaseInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  createPhaseDependency: {
    path: "/topcoder.domain.service.phase.LegacyPhase/CreatePhaseDependency",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePhaseDependencyInput) =>
      Buffer.from(CreatePhaseDependencyInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePhaseDependencyInput.decode(value),
    responseSerialize: (value: CreateResult) => Buffer.from(CreateResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateResult.decode(value),
  },
} as const;

export interface LegacyPhaseServer extends UntypedServiceImplementation {
  getPhaseCriteria: handleUnaryCall<GetPhaseCriteriaInput, PhaseCriteriaList>;
  createPhaseCriteria: handleUnaryCall<CreatePhaseCriteriaInput, CreateResult>;
  deletePhaseCriteria: handleUnaryCall<DeletePhaseCriteriaInput, Empty>;
  getPhaseTypes: handleUnaryCall<Empty, PhaseTypeList>;
  getProjectPhases: handleUnaryCall<GetProjectPhasesInput, ProjectPhaseList>;
  deleteProjectPhases: handleUnaryCall<DeleteProjectPhasesInput, Empty>;
  createProjectPhase: handleUnaryCall<CreateProjectPhaseInput, CreateResult>;
  updateProjectPhase: handleUnaryCall<UpdateProjectPhaseInput, Empty>;
  createPhaseDependency: handleUnaryCall<CreatePhaseDependencyInput, CreateResult>;
}
