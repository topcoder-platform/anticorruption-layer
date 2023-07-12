/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface QueryInput {
  sql: string;
}

export interface QueryOutput {
  rows: Row[];
}

export interface Row {
  fields: Field[];
}

export interface Field {
  key: string;
  value: string;
}

function createBaseQueryInput(): QueryInput {
  return { sql: "" };
}

export const QueryInput = {
  encode(message: QueryInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sql !== "") {
      writer.uint32(10).string(message.sql);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sql = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryInput {
    return { sql: isSet(object.sql) ? String(object.sql) : "" };
  },

  toJSON(message: QueryInput): unknown {
    const obj: any = {};
    message.sql !== undefined && (obj.sql = message.sql);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryInput>, I>>(base?: I): QueryInput {
    return QueryInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryInput>, I>>(object: I): QueryInput {
    const message = createBaseQueryInput();
    message.sql = object.sql ?? "";
    return message;
  },
};

function createBaseQueryOutput(): QueryOutput {
  return { rows: [] };
}

export const QueryOutput = {
  encode(message: QueryOutput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rows) {
      Row.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOutput {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rows.push(Row.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryOutput {
    return { rows: Array.isArray(object?.rows) ? object.rows.map((e: any) => Row.fromJSON(e)) : [] };
  },

  toJSON(message: QueryOutput): unknown {
    const obj: any = {};
    if (message.rows) {
      obj.rows = message.rows.map((e) => (e ? Row.toJSON(e) : undefined));
    } else {
      obj.rows = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryOutput>, I>>(base?: I): QueryOutput {
    return QueryOutput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryOutput>, I>>(object: I): QueryOutput {
    const message = createBaseQueryOutput();
    message.rows = object.rows?.map((e) => Row.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRow(): Row {
  return { fields: [] };
}

export const Row = {
  encode(message: Row, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.fields) {
      Field.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Row {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields.push(Field.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Row {
    return { fields: Array.isArray(object?.fields) ? object.fields.map((e: any) => Field.fromJSON(e)) : [] };
  },

  toJSON(message: Row): unknown {
    const obj: any = {};
    if (message.fields) {
      obj.fields = message.fields.map((e) => (e ? Field.toJSON(e) : undefined));
    } else {
      obj.fields = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Row>, I>>(base?: I): Row {
    return Row.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Row>, I>>(object: I): Row {
    const message = createBaseRow();
    message.fields = object.fields?.map((e) => Field.fromPartial(e)) || [];
    return message;
  },
};

function createBaseField(): Field {
  return { key: "", value: "" };
}

export const Field = {
  encode(message: Field, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Field {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): Field {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Field): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Field>, I>>(base?: I): Field {
    return Field.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Field>, I>>(object: I): Field {
    const message = createBaseField();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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
