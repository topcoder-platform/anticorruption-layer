/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface ProjectInfo {
  projectId: number;
  projectInfoTypeId: number;
  value: string;
  createUser?: number | undefined;
  createDate?: string | undefined;
  modifyUser?: number | undefined;
  modifyDate?: string | undefined;
}

export interface ProjectInfoList {
  projectInfos: ProjectInfo[];
}

export interface GetProjectInfoInput {
  projectId: number;
  projectInfoTypeId?: number | undefined;
}

export interface CreateProjectInfoInput {
  projectId: number;
  projectInfoTypeId: number;
  value: string;
}

export interface DeleteProjectInfoInput {
  projectId: number;
  projectInfoTypeId: number;
}

export interface UpdateProjectInfoInput {
  projectId: number;
  projectInfoTypeId: number;
  value: string;
}

export interface ProjectInfoType {
  projectInfoTypeId: number;
  name: string;
  description: string;
  createUser?: number | undefined;
  createDate?: string | undefined;
  modifyUser?: number | undefined;
  modifyDate?: string | undefined;
}

export interface ProjectInfoTypeList {
  projectInfoTypes: ProjectInfoType[];
}

function createBaseProjectInfo(): ProjectInfo {
  return {
    projectId: 0,
    projectInfoTypeId: 0,
    value: "",
    createUser: undefined,
    createDate: undefined,
    modifyUser: undefined,
    modifyDate: undefined,
  };
}

export const ProjectInfo = {
  encode(message: ProjectInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      writer.uint32(16).int32(message.projectInfoTypeId);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.createUser !== undefined) {
      writer.uint32(32).int32(message.createUser);
    }
    if (message.createDate !== undefined) {
      writer.uint32(42).string(message.createDate);
    }
    if (message.modifyUser !== undefined) {
      writer.uint32(48).int32(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      writer.uint32(58).string(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectInfoTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createDate = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.modifyDate = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProjectInfo {
    return {
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
      projectInfoTypeId: isSet(object.projectInfoTypeId) ? globalThis.Number(object.projectInfoTypeId) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      createUser: isSet(object.createUser) ? globalThis.Number(object.createUser) : undefined,
      createDate: isSet(object.createDate) ? globalThis.String(object.createDate) : undefined,
      modifyUser: isSet(object.modifyUser) ? globalThis.Number(object.modifyUser) : undefined,
      modifyDate: isSet(object.modifyDate) ? globalThis.String(object.modifyDate) : undefined,
    };
  },

  toJSON(message: ProjectInfo): unknown {
    const obj: any = {};
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      obj.projectInfoTypeId = Math.round(message.projectInfoTypeId);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.createUser !== undefined) {
      obj.createUser = Math.round(message.createUser);
    }
    if (message.createDate !== undefined) {
      obj.createDate = message.createDate;
    }
    if (message.modifyUser !== undefined) {
      obj.modifyUser = Math.round(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      obj.modifyDate = message.modifyDate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProjectInfo>, I>>(base?: I): ProjectInfo {
    return ProjectInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProjectInfo>, I>>(object: I): ProjectInfo {
    const message = createBaseProjectInfo();
    message.projectId = object.projectId ?? 0;
    message.projectInfoTypeId = object.projectInfoTypeId ?? 0;
    message.value = object.value ?? "";
    message.createUser = object.createUser ?? undefined;
    message.createDate = object.createDate ?? undefined;
    message.modifyUser = object.modifyUser ?? undefined;
    message.modifyDate = object.modifyDate ?? undefined;
    return message;
  },
};

function createBaseProjectInfoList(): ProjectInfoList {
  return { projectInfos: [] };
}

export const ProjectInfoList = {
  encode(message: ProjectInfoList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.projectInfos) {
      ProjectInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectInfoList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectInfoList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectInfos.push(ProjectInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProjectInfoList {
    return {
      projectInfos: globalThis.Array.isArray(object?.projectInfos)
        ? object.projectInfos.map((e: any) => ProjectInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProjectInfoList): unknown {
    const obj: any = {};
    if (message.projectInfos?.length) {
      obj.projectInfos = message.projectInfos.map((e) => ProjectInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProjectInfoList>, I>>(base?: I): ProjectInfoList {
    return ProjectInfoList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProjectInfoList>, I>>(object: I): ProjectInfoList {
    const message = createBaseProjectInfoList();
    message.projectInfos = object.projectInfos?.map((e) => ProjectInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetProjectInfoInput(): GetProjectInfoInput {
  return { projectId: 0, projectInfoTypeId: undefined };
}

export const GetProjectInfoInput = {
  encode(message: GetProjectInfoInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectInfoTypeId !== undefined) {
      writer.uint32(16).int32(message.projectInfoTypeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectInfoInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProjectInfoInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectInfoTypeId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProjectInfoInput {
    return {
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
      projectInfoTypeId: isSet(object.projectInfoTypeId) ? globalThis.Number(object.projectInfoTypeId) : undefined,
    };
  },

  toJSON(message: GetProjectInfoInput): unknown {
    const obj: any = {};
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.projectInfoTypeId !== undefined) {
      obj.projectInfoTypeId = Math.round(message.projectInfoTypeId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProjectInfoInput>, I>>(base?: I): GetProjectInfoInput {
    return GetProjectInfoInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProjectInfoInput>, I>>(object: I): GetProjectInfoInput {
    const message = createBaseGetProjectInfoInput();
    message.projectId = object.projectId ?? 0;
    message.projectInfoTypeId = object.projectInfoTypeId ?? undefined;
    return message;
  },
};

function createBaseCreateProjectInfoInput(): CreateProjectInfoInput {
  return { projectId: 0, projectInfoTypeId: 0, value: "" };
}

export const CreateProjectInfoInput = {
  encode(message: CreateProjectInfoInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      writer.uint32(16).int32(message.projectInfoTypeId);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectInfoInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateProjectInfoInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectInfoTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateProjectInfoInput {
    return {
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
      projectInfoTypeId: isSet(object.projectInfoTypeId) ? globalThis.Number(object.projectInfoTypeId) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: CreateProjectInfoInput): unknown {
    const obj: any = {};
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      obj.projectInfoTypeId = Math.round(message.projectInfoTypeId);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateProjectInfoInput>, I>>(base?: I): CreateProjectInfoInput {
    return CreateProjectInfoInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateProjectInfoInput>, I>>(object: I): CreateProjectInfoInput {
    const message = createBaseCreateProjectInfoInput();
    message.projectId = object.projectId ?? 0;
    message.projectInfoTypeId = object.projectInfoTypeId ?? 0;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeleteProjectInfoInput(): DeleteProjectInfoInput {
  return { projectId: 0, projectInfoTypeId: 0 };
}

export const DeleteProjectInfoInput = {
  encode(message: DeleteProjectInfoInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      writer.uint32(16).int32(message.projectInfoTypeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectInfoInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteProjectInfoInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectInfoTypeId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectInfoInput {
    return {
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
      projectInfoTypeId: isSet(object.projectInfoTypeId) ? globalThis.Number(object.projectInfoTypeId) : 0,
    };
  },

  toJSON(message: DeleteProjectInfoInput): unknown {
    const obj: any = {};
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      obj.projectInfoTypeId = Math.round(message.projectInfoTypeId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteProjectInfoInput>, I>>(base?: I): DeleteProjectInfoInput {
    return DeleteProjectInfoInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteProjectInfoInput>, I>>(object: I): DeleteProjectInfoInput {
    const message = createBaseDeleteProjectInfoInput();
    message.projectId = object.projectId ?? 0;
    message.projectInfoTypeId = object.projectInfoTypeId ?? 0;
    return message;
  },
};

function createBaseUpdateProjectInfoInput(): UpdateProjectInfoInput {
  return { projectId: 0, projectInfoTypeId: 0, value: "" };
}

export const UpdateProjectInfoInput = {
  encode(message: UpdateProjectInfoInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      writer.uint32(16).int32(message.projectInfoTypeId);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectInfoInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProjectInfoInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.projectInfoTypeId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectInfoInput {
    return {
      projectId: isSet(object.projectId) ? globalThis.Number(object.projectId) : 0,
      projectInfoTypeId: isSet(object.projectInfoTypeId) ? globalThis.Number(object.projectInfoTypeId) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: UpdateProjectInfoInput): unknown {
    const obj: any = {};
    if (message.projectId !== 0) {
      obj.projectId = Math.round(message.projectId);
    }
    if (message.projectInfoTypeId !== 0) {
      obj.projectInfoTypeId = Math.round(message.projectInfoTypeId);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateProjectInfoInput>, I>>(base?: I): UpdateProjectInfoInput {
    return UpdateProjectInfoInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateProjectInfoInput>, I>>(object: I): UpdateProjectInfoInput {
    const message = createBaseUpdateProjectInfoInput();
    message.projectId = object.projectId ?? 0;
    message.projectInfoTypeId = object.projectInfoTypeId ?? 0;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseProjectInfoType(): ProjectInfoType {
  return {
    projectInfoTypeId: 0,
    name: "",
    description: "",
    createUser: undefined,
    createDate: undefined,
    modifyUser: undefined,
    modifyDate: undefined,
  };
}

export const ProjectInfoType = {
  encode(message: ProjectInfoType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectInfoTypeId !== 0) {
      writer.uint32(8).int32(message.projectInfoTypeId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.createUser !== undefined) {
      writer.uint32(32).int32(message.createUser);
    }
    if (message.createDate !== undefined) {
      writer.uint32(42).string(message.createDate);
    }
    if (message.modifyUser !== undefined) {
      writer.uint32(48).int32(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      writer.uint32(58).string(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectInfoType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectInfoType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.projectInfoTypeId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.createUser = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createDate = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.modifyUser = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.modifyDate = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProjectInfoType {
    return {
      projectInfoTypeId: isSet(object.projectInfoTypeId) ? globalThis.Number(object.projectInfoTypeId) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      createUser: isSet(object.createUser) ? globalThis.Number(object.createUser) : undefined,
      createDate: isSet(object.createDate) ? globalThis.String(object.createDate) : undefined,
      modifyUser: isSet(object.modifyUser) ? globalThis.Number(object.modifyUser) : undefined,
      modifyDate: isSet(object.modifyDate) ? globalThis.String(object.modifyDate) : undefined,
    };
  },

  toJSON(message: ProjectInfoType): unknown {
    const obj: any = {};
    if (message.projectInfoTypeId !== 0) {
      obj.projectInfoTypeId = Math.round(message.projectInfoTypeId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.createUser !== undefined) {
      obj.createUser = Math.round(message.createUser);
    }
    if (message.createDate !== undefined) {
      obj.createDate = message.createDate;
    }
    if (message.modifyUser !== undefined) {
      obj.modifyUser = Math.round(message.modifyUser);
    }
    if (message.modifyDate !== undefined) {
      obj.modifyDate = message.modifyDate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProjectInfoType>, I>>(base?: I): ProjectInfoType {
    return ProjectInfoType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProjectInfoType>, I>>(object: I): ProjectInfoType {
    const message = createBaseProjectInfoType();
    message.projectInfoTypeId = object.projectInfoTypeId ?? 0;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createUser = object.createUser ?? undefined;
    message.createDate = object.createDate ?? undefined;
    message.modifyUser = object.modifyUser ?? undefined;
    message.modifyDate = object.modifyDate ?? undefined;
    return message;
  },
};

function createBaseProjectInfoTypeList(): ProjectInfoTypeList {
  return { projectInfoTypes: [] };
}

export const ProjectInfoTypeList = {
  encode(message: ProjectInfoTypeList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.projectInfoTypes) {
      ProjectInfoType.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectInfoTypeList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectInfoTypeList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectInfoTypes.push(ProjectInfoType.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProjectInfoTypeList {
    return {
      projectInfoTypes: globalThis.Array.isArray(object?.projectInfoTypes)
        ? object.projectInfoTypes.map((e: any) => ProjectInfoType.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProjectInfoTypeList): unknown {
    const obj: any = {};
    if (message.projectInfoTypes?.length) {
      obj.projectInfoTypes = message.projectInfoTypes.map((e) => ProjectInfoType.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProjectInfoTypeList>, I>>(base?: I): ProjectInfoTypeList {
    return ProjectInfoTypeList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProjectInfoTypeList>, I>>(object: I): ProjectInfoTypeList {
    const message = createBaseProjectInfoTypeList();
    message.projectInfoTypes = object.projectInfoTypes?.map((e) => ProjectInfoType.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
