/* eslint-disable */
import { ScanCriteria } from "@topcoder-framework/lib-common";
import _m0 from "protobufjs/minimal";

export interface Upload {
  uploadId: number;
  projectId: number;
  resourceId: number;
  projectPhaseId: number;
  uploadTypeId: number;
  url: string;
  uploadStatusId: number;
  parameter: string;
  createUser: number;
  modifyUser: number;
  createDate: number;
  modifyDate: number;
}

export interface UploadId {
  uploadId: number;
}

export interface UploadList {
  uploads: Upload[];
}

export interface CreateUploadInput {
  projectId: number;
  resourceId: number;
  projectPhaseId: number;
  uploadTypeId: number;
  url: string;
  uploadStatusId: number;
  parameter: string;
}

export interface UpdateUploadInput {
  uploadId: number;
  url?: string | undefined;
  uploadStatusId?: number | undefined;
}

export interface DeleteUploadInput {
  filterCriteria: ScanCriteria[];
}

function createBaseUpload(): Upload {
  return {
    uploadId: 0,
    projectId: 0,
    resourceId: 0,
    projectPhaseId: 0,
    uploadTypeId: 0,
    url: "",
    uploadStatusId: 0,
    parameter: "",
    createUser: 0,
    modifyUser: 0,
    createDate: 0,
    modifyDate: 0,
  };
}

export const Upload = {
  encode(message: Upload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uploadId !== 0) {
      writer.uint32(8).int32(message.uploadId);
    }
    if (message.projectId !== 0) {
      writer.uint32(16).int32(message.projectId);
    }
    if (message.resourceId !== 0) {
      writer.uint32(24).int32(message.resourceId);
    }
    if (message.projectPhaseId !== 0) {
      writer.uint32(32).int32(message.projectPhaseId);
    }
    if (message.uploadTypeId !== 0) {
      writer.uint32(40).int32(message.uploadTypeId);
    }
    if (message.url !== "") {
      writer.uint32(50).string(message.url);
    }
    if (message.uploadStatusId !== 0) {
      writer.uint32(56).int32(message.uploadStatusId);
    }
    if (message.parameter !== "") {
      writer.uint32(66).string(message.parameter);
    }
    if (message.createUser !== 0) {
      writer.uint32(72).int32(message.createUser);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(80).int32(message.modifyUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(88).int32(message.createDate);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(96).int32(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Upload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uploadId = reader.int32();
          break;
        case 2:
          message.projectId = reader.int32();
          break;
        case 3:
          message.resourceId = reader.int32();
          break;
        case 4:
          message.projectPhaseId = reader.int32();
          break;
        case 5:
          message.uploadTypeId = reader.int32();
          break;
        case 6:
          message.url = reader.string();
          break;
        case 7:
          message.uploadStatusId = reader.int32();
          break;
        case 8:
          message.parameter = reader.string();
          break;
        case 9:
          message.createUser = reader.int32();
          break;
        case 10:
          message.modifyUser = reader.int32();
          break;
        case 11:
          message.createDate = reader.int32();
          break;
        case 12:
          message.modifyDate = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Upload {
    return {
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      projectPhaseId: isSet(object.projectPhaseId) ? Number(object.projectPhaseId) : 0,
      uploadTypeId: isSet(object.uploadTypeId) ? Number(object.uploadTypeId) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      uploadStatusId: isSet(object.uploadStatusId) ? Number(object.uploadStatusId) : 0,
      parameter: isSet(object.parameter) ? String(object.parameter) : "",
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: Upload): unknown {
    const obj: any = {};
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.resourceId !== undefined && (obj.resourceId = Math.round(message.resourceId));
    message.projectPhaseId !== undefined && (obj.projectPhaseId = Math.round(message.projectPhaseId));
    message.uploadTypeId !== undefined && (obj.uploadTypeId = Math.round(message.uploadTypeId));
    message.url !== undefined && (obj.url = message.url);
    message.uploadStatusId !== undefined && (obj.uploadStatusId = Math.round(message.uploadStatusId));
    message.parameter !== undefined && (obj.parameter = message.parameter);
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<Upload>, I>>(base?: I): Upload {
    return Upload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Upload>, I>>(object: I): Upload {
    const message = createBaseUpload();
    message.uploadId = object.uploadId ?? 0;
    message.projectId = object.projectId ?? 0;
    message.resourceId = object.resourceId ?? 0;
    message.projectPhaseId = object.projectPhaseId ?? 0;
    message.uploadTypeId = object.uploadTypeId ?? 0;
    message.url = object.url ?? "";
    message.uploadStatusId = object.uploadStatusId ?? 0;
    message.parameter = object.parameter ?? "";
    message.createUser = object.createUser ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseUploadId(): UploadId {
  return { uploadId: 0 };
}

export const UploadId = {
  encode(message: UploadId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uploadId !== 0) {
      writer.uint32(8).int32(message.uploadId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uploadId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadId {
    return { uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0 };
  },

  toJSON(message: UploadId): unknown {
    const obj: any = {};
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadId>, I>>(base?: I): UploadId {
    return UploadId.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UploadId>, I>>(object: I): UploadId {
    const message = createBaseUploadId();
    message.uploadId = object.uploadId ?? 0;
    return message;
  },
};

function createBaseUploadList(): UploadList {
  return { uploads: [] };
}

export const UploadList = {
  encode(message: UploadList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.uploads) {
      Upload.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uploads.push(Upload.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadList {
    return { uploads: Array.isArray(object?.uploads) ? object.uploads.map((e: any) => Upload.fromJSON(e)) : [] };
  },

  toJSON(message: UploadList): unknown {
    const obj: any = {};
    if (message.uploads) {
      obj.uploads = message.uploads.map((e) => e ? Upload.toJSON(e) : undefined);
    } else {
      obj.uploads = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadList>, I>>(base?: I): UploadList {
    return UploadList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UploadList>, I>>(object: I): UploadList {
    const message = createBaseUploadList();
    message.uploads = object.uploads?.map((e) => Upload.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateUploadInput(): CreateUploadInput {
  return { projectId: 0, resourceId: 0, projectPhaseId: 0, uploadTypeId: 0, url: "", uploadStatusId: 0, parameter: "" };
}

export const CreateUploadInput = {
  encode(message: CreateUploadInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.resourceId !== 0) {
      writer.uint32(16).int32(message.resourceId);
    }
    if (message.projectPhaseId !== 0) {
      writer.uint32(24).int32(message.projectPhaseId);
    }
    if (message.uploadTypeId !== 0) {
      writer.uint32(32).int32(message.uploadTypeId);
    }
    if (message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    if (message.uploadStatusId !== 0) {
      writer.uint32(48).int32(message.uploadStatusId);
    }
    if (message.parameter !== "") {
      writer.uint32(58).string(message.parameter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUploadInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUploadInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.int32();
          break;
        case 2:
          message.resourceId = reader.int32();
          break;
        case 3:
          message.projectPhaseId = reader.int32();
          break;
        case 4:
          message.uploadTypeId = reader.int32();
          break;
        case 5:
          message.url = reader.string();
          break;
        case 6:
          message.uploadStatusId = reader.int32();
          break;
        case 7:
          message.parameter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUploadInput {
    return {
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      projectPhaseId: isSet(object.projectPhaseId) ? Number(object.projectPhaseId) : 0,
      uploadTypeId: isSet(object.uploadTypeId) ? Number(object.uploadTypeId) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      uploadStatusId: isSet(object.uploadStatusId) ? Number(object.uploadStatusId) : 0,
      parameter: isSet(object.parameter) ? String(object.parameter) : "",
    };
  },

  toJSON(message: CreateUploadInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.resourceId !== undefined && (obj.resourceId = Math.round(message.resourceId));
    message.projectPhaseId !== undefined && (obj.projectPhaseId = Math.round(message.projectPhaseId));
    message.uploadTypeId !== undefined && (obj.uploadTypeId = Math.round(message.uploadTypeId));
    message.url !== undefined && (obj.url = message.url);
    message.uploadStatusId !== undefined && (obj.uploadStatusId = Math.round(message.uploadStatusId));
    message.parameter !== undefined && (obj.parameter = message.parameter);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUploadInput>, I>>(base?: I): CreateUploadInput {
    return CreateUploadInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateUploadInput>, I>>(object: I): CreateUploadInput {
    const message = createBaseCreateUploadInput();
    message.projectId = object.projectId ?? 0;
    message.resourceId = object.resourceId ?? 0;
    message.projectPhaseId = object.projectPhaseId ?? 0;
    message.uploadTypeId = object.uploadTypeId ?? 0;
    message.url = object.url ?? "";
    message.uploadStatusId = object.uploadStatusId ?? 0;
    message.parameter = object.parameter ?? "";
    return message;
  },
};

function createBaseUpdateUploadInput(): UpdateUploadInput {
  return { uploadId: 0, url: undefined, uploadStatusId: undefined };
}

export const UpdateUploadInput = {
  encode(message: UpdateUploadInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uploadId !== 0) {
      writer.uint32(8).int32(message.uploadId);
    }
    if (message.url !== undefined) {
      writer.uint32(18).string(message.url);
    }
    if (message.uploadStatusId !== undefined) {
      writer.uint32(24).int32(message.uploadStatusId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUploadInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUploadInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uploadId = reader.int32();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.uploadStatusId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateUploadInput {
    return {
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      url: isSet(object.url) ? String(object.url) : undefined,
      uploadStatusId: isSet(object.uploadStatusId) ? Number(object.uploadStatusId) : undefined,
    };
  },

  toJSON(message: UpdateUploadInput): unknown {
    const obj: any = {};
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.url !== undefined && (obj.url = message.url);
    message.uploadStatusId !== undefined && (obj.uploadStatusId = Math.round(message.uploadStatusId));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUploadInput>, I>>(base?: I): UpdateUploadInput {
    return UpdateUploadInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateUploadInput>, I>>(object: I): UpdateUploadInput {
    const message = createBaseUpdateUploadInput();
    message.uploadId = object.uploadId ?? 0;
    message.url = object.url ?? undefined;
    message.uploadStatusId = object.uploadStatusId ?? undefined;
    return message;
  },
};

function createBaseDeleteUploadInput(): DeleteUploadInput {
  return { filterCriteria: [] };
}

export const DeleteUploadInput = {
  encode(message: DeleteUploadInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.filterCriteria) {
      ScanCriteria.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteUploadInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUploadInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filterCriteria.push(ScanCriteria.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteUploadInput {
    return {
      filterCriteria: Array.isArray(object?.filterCriteria)
        ? object.filterCriteria.map((e: any) => ScanCriteria.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeleteUploadInput): unknown {
    const obj: any = {};
    if (message.filterCriteria) {
      obj.filterCriteria = message.filterCriteria.map((e) => e ? ScanCriteria.toJSON(e) : undefined);
    } else {
      obj.filterCriteria = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteUploadInput>, I>>(base?: I): DeleteUploadInput {
    return DeleteUploadInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteUploadInput>, I>>(object: I): DeleteUploadInput {
    const message = createBaseDeleteUploadInput();
    message.filterCriteria = object.filterCriteria?.map((e) => ScanCriteria.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
