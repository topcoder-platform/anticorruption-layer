/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Component {
  componentId: number;
  problemId: number;
  resultTypeId: number;
  methodName: string;
  className: string;
  defaultSolution: string;
  componentTypeId: number;
  componentText: string;
  statusId: number;
  modifyDate: string;
}

function createBaseComponent(): Component {
  return {
    componentId: 0,
    problemId: 0,
    resultTypeId: 0,
    methodName: "",
    className: "",
    defaultSolution: "",
    componentTypeId: 0,
    componentText: "",
    statusId: 0,
    modifyDate: "",
  };
}

export const Component = {
  encode(message: Component, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.componentId !== 0) {
      writer.uint32(8).int32(message.componentId);
    }
    if (message.problemId !== 0) {
      writer.uint32(16).int32(message.problemId);
    }
    if (message.resultTypeId !== 0) {
      writer.uint32(24).int32(message.resultTypeId);
    }
    if (message.methodName !== "") {
      writer.uint32(34).string(message.methodName);
    }
    if (message.className !== "") {
      writer.uint32(42).string(message.className);
    }
    if (message.defaultSolution !== "") {
      writer.uint32(50).string(message.defaultSolution);
    }
    if (message.componentTypeId !== 0) {
      writer.uint32(56).int32(message.componentTypeId);
    }
    if (message.componentText !== "") {
      writer.uint32(66).string(message.componentText);
    }
    if (message.statusId !== 0) {
      writer.uint32(72).int32(message.statusId);
    }
    if (message.modifyDate !== "") {
      writer.uint32(82).string(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Component {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComponent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.componentId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.problemId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.resultTypeId = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.methodName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.className = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.defaultSolution = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.componentTypeId = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.componentText = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.statusId = reader.int32();
          continue;
        case 10:
          if (tag !== 82) {
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

  fromJSON(object: any): Component {
    return {
      componentId: isSet(object.componentId) ? Number(object.componentId) : 0,
      problemId: isSet(object.problemId) ? Number(object.problemId) : 0,
      resultTypeId: isSet(object.resultTypeId) ? Number(object.resultTypeId) : 0,
      methodName: isSet(object.methodName) ? String(object.methodName) : "",
      className: isSet(object.className) ? String(object.className) : "",
      defaultSolution: isSet(object.defaultSolution) ? String(object.defaultSolution) : "",
      componentTypeId: isSet(object.componentTypeId) ? Number(object.componentTypeId) : 0,
      componentText: isSet(object.componentText) ? String(object.componentText) : "",
      statusId: isSet(object.statusId) ? Number(object.statusId) : 0,
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : "",
    };
  },

  toJSON(message: Component): unknown {
    const obj: any = {};
    if (message.componentId !== 0) {
      obj.componentId = Math.round(message.componentId);
    }
    if (message.problemId !== 0) {
      obj.problemId = Math.round(message.problemId);
    }
    if (message.resultTypeId !== 0) {
      obj.resultTypeId = Math.round(message.resultTypeId);
    }
    if (message.methodName !== "") {
      obj.methodName = message.methodName;
    }
    if (message.className !== "") {
      obj.className = message.className;
    }
    if (message.defaultSolution !== "") {
      obj.defaultSolution = message.defaultSolution;
    }
    if (message.componentTypeId !== 0) {
      obj.componentTypeId = Math.round(message.componentTypeId);
    }
    if (message.componentText !== "") {
      obj.componentText = message.componentText;
    }
    if (message.statusId !== 0) {
      obj.statusId = Math.round(message.statusId);
    }
    if (message.modifyDate !== "") {
      obj.modifyDate = message.modifyDate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Component>, I>>(base?: I): Component {
    return Component.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Component>, I>>(object: I): Component {
    const message = createBaseComponent();
    message.componentId = object.componentId ?? 0;
    message.problemId = object.problemId ?? 0;
    message.resultTypeId = object.resultTypeId ?? 0;
    message.methodName = object.methodName ?? "";
    message.className = object.className ?? "";
    message.defaultSolution = object.defaultSolution ?? "";
    message.componentTypeId = object.componentTypeId ?? 0;
    message.componentText = object.componentText ?? "";
    message.statusId = object.statusId ?? 0;
    message.modifyDate = object.modifyDate ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
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
