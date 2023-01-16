/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import Long from "long";
import _m0 from "protobufjs/minimal";

export enum ColumnType {
  COLUMN_TYPE_UNSPECIFIED = 0,
  COLUMN_TYPE_STRING = 1,
  COLUMN_TYPE_INT = 2,
  COLUMN_TYPE_LONG = 3,
  COLUMN_TYPE_FLOAT = 4,
  COLUMN_TYPE_DOUBLE = 5,
  COLUMN_TYPE_BOOLEAN = 6,
  COLUMN_TYPE_DATE = 7,
  COLUMN_TYPE_DATETIME = 8,
  COLUMN_TYPE_BLOB = 9,
  UNRECOGNIZED = -1,
}

export function columnTypeFromJSON(object: any): ColumnType {
  switch (object) {
    case 0:
    case "COLUMN_TYPE_UNSPECIFIED":
      return ColumnType.COLUMN_TYPE_UNSPECIFIED;
    case 1:
    case "COLUMN_TYPE_STRING":
      return ColumnType.COLUMN_TYPE_STRING;
    case 2:
    case "COLUMN_TYPE_INT":
      return ColumnType.COLUMN_TYPE_INT;
    case 3:
    case "COLUMN_TYPE_LONG":
      return ColumnType.COLUMN_TYPE_LONG;
    case 4:
    case "COLUMN_TYPE_FLOAT":
      return ColumnType.COLUMN_TYPE_FLOAT;
    case 5:
    case "COLUMN_TYPE_DOUBLE":
      return ColumnType.COLUMN_TYPE_DOUBLE;
    case 6:
    case "COLUMN_TYPE_BOOLEAN":
      return ColumnType.COLUMN_TYPE_BOOLEAN;
    case 7:
    case "COLUMN_TYPE_DATE":
      return ColumnType.COLUMN_TYPE_DATE;
    case 8:
    case "COLUMN_TYPE_DATETIME":
      return ColumnType.COLUMN_TYPE_DATETIME;
    case 9:
    case "COLUMN_TYPE_BLOB":
      return ColumnType.COLUMN_TYPE_BLOB;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ColumnType.UNRECOGNIZED;
  }
}

export function columnTypeToJSON(object: ColumnType): string {
  switch (object) {
    case ColumnType.COLUMN_TYPE_UNSPECIFIED:
      return "COLUMN_TYPE_UNSPECIFIED";
    case ColumnType.COLUMN_TYPE_STRING:
      return "COLUMN_TYPE_STRING";
    case ColumnType.COLUMN_TYPE_INT:
      return "COLUMN_TYPE_INT";
    case ColumnType.COLUMN_TYPE_LONG:
      return "COLUMN_TYPE_LONG";
    case ColumnType.COLUMN_TYPE_FLOAT:
      return "COLUMN_TYPE_FLOAT";
    case ColumnType.COLUMN_TYPE_DOUBLE:
      return "COLUMN_TYPE_DOUBLE";
    case ColumnType.COLUMN_TYPE_BOOLEAN:
      return "COLUMN_TYPE_BOOLEAN";
    case ColumnType.COLUMN_TYPE_DATE:
      return "COLUMN_TYPE_DATE";
    case ColumnType.COLUMN_TYPE_DATETIME:
      return "COLUMN_TYPE_DATETIME";
    case ColumnType.COLUMN_TYPE_BLOB:
      return "COLUMN_TYPE_BLOB";
    case ColumnType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Operator {
  OPERATOR_UNSPECIFIED = 0,
  OPERATOR_EQUAL = 1,
  OPERATOR_NOT_EQUAL = 2,
  OPERATOR_GREATER_THAN = 3,
  OPERATOR_GREATER_THAN_OR_EQUAL = 4,
  OPERATOR_LESS_THAN = 5,
  OPERATOR_LESS_THAN_OR_EQUAL = 6,
  OPERATOR_IN = 7,
  OPERATOR_NOT_IN = 8,
  OPERATOR_LIKE = 9,
  OPERATOR_NOT_LIKE = 10,
  OPERATOR_IS_NULL = 11,
  OPERATOR_IS_NOT_NULL = 12,
  UNRECOGNIZED = -1,
}

export function operatorFromJSON(object: any): Operator {
  switch (object) {
    case 0:
    case "OPERATOR_UNSPECIFIED":
      return Operator.OPERATOR_UNSPECIFIED;
    case 1:
    case "OPERATOR_EQUAL":
      return Operator.OPERATOR_EQUAL;
    case 2:
    case "OPERATOR_NOT_EQUAL":
      return Operator.OPERATOR_NOT_EQUAL;
    case 3:
    case "OPERATOR_GREATER_THAN":
      return Operator.OPERATOR_GREATER_THAN;
    case 4:
    case "OPERATOR_GREATER_THAN_OR_EQUAL":
      return Operator.OPERATOR_GREATER_THAN_OR_EQUAL;
    case 5:
    case "OPERATOR_LESS_THAN":
      return Operator.OPERATOR_LESS_THAN;
    case 6:
    case "OPERATOR_LESS_THAN_OR_EQUAL":
      return Operator.OPERATOR_LESS_THAN_OR_EQUAL;
    case 7:
    case "OPERATOR_IN":
      return Operator.OPERATOR_IN;
    case 8:
    case "OPERATOR_NOT_IN":
      return Operator.OPERATOR_NOT_IN;
    case 9:
    case "OPERATOR_LIKE":
      return Operator.OPERATOR_LIKE;
    case 10:
    case "OPERATOR_NOT_LIKE":
      return Operator.OPERATOR_NOT_LIKE;
    case 11:
    case "OPERATOR_IS_NULL":
      return Operator.OPERATOR_IS_NULL;
    case 12:
    case "OPERATOR_IS_NOT_NULL":
      return Operator.OPERATOR_IS_NOT_NULL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Operator.UNRECOGNIZED;
  }
}

export function operatorToJSON(object: Operator): string {
  switch (object) {
    case Operator.OPERATOR_UNSPECIFIED:
      return "OPERATOR_UNSPECIFIED";
    case Operator.OPERATOR_EQUAL:
      return "OPERATOR_EQUAL";
    case Operator.OPERATOR_NOT_EQUAL:
      return "OPERATOR_NOT_EQUAL";
    case Operator.OPERATOR_GREATER_THAN:
      return "OPERATOR_GREATER_THAN";
    case Operator.OPERATOR_GREATER_THAN_OR_EQUAL:
      return "OPERATOR_GREATER_THAN_OR_EQUAL";
    case Operator.OPERATOR_LESS_THAN:
      return "OPERATOR_LESS_THAN";
    case Operator.OPERATOR_LESS_THAN_OR_EQUAL:
      return "OPERATOR_LESS_THAN_OR_EQUAL";
    case Operator.OPERATOR_IN:
      return "OPERATOR_IN";
    case Operator.OPERATOR_NOT_IN:
      return "OPERATOR_NOT_IN";
    case Operator.OPERATOR_LIKE:
      return "OPERATOR_LIKE";
    case Operator.OPERATOR_NOT_LIKE:
      return "OPERATOR_NOT_LIKE";
    case Operator.OPERATOR_IS_NULL:
      return "OPERATOR_IS_NULL";
    case Operator.OPERATOR_IS_NOT_NULL:
      return "OPERATOR_IS_NOT_NULL";
    case Operator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum JoinType {
  JOIN_TYPE_UNSPECIFIED = 0,
  JOIN_TYPE_INNER = 1,
  JOIN_TYPE_LEFT = 2,
  JOIN_TYPE_RIGHT = 3,
  JOIN_TYPE_FULL = 4,
  UNRECOGNIZED = -1,
}

export function joinTypeFromJSON(object: any): JoinType {
  switch (object) {
    case 0:
    case "JOIN_TYPE_UNSPECIFIED":
      return JoinType.JOIN_TYPE_UNSPECIFIED;
    case 1:
    case "JOIN_TYPE_INNER":
      return JoinType.JOIN_TYPE_INNER;
    case 2:
    case "JOIN_TYPE_LEFT":
      return JoinType.JOIN_TYPE_LEFT;
    case 3:
    case "JOIN_TYPE_RIGHT":
      return JoinType.JOIN_TYPE_RIGHT;
    case 4:
    case "JOIN_TYPE_FULL":
      return JoinType.JOIN_TYPE_FULL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JoinType.UNRECOGNIZED;
  }
}

export function joinTypeToJSON(object: JoinType): string {
  switch (object) {
    case JoinType.JOIN_TYPE_UNSPECIFIED:
      return "JOIN_TYPE_UNSPECIFIED";
    case JoinType.JOIN_TYPE_INNER:
      return "JOIN_TYPE_INNER";
    case JoinType.JOIN_TYPE_LEFT:
      return "JOIN_TYPE_LEFT";
    case JoinType.JOIN_TYPE_RIGHT:
      return "JOIN_TYPE_RIGHT";
    case JoinType.JOIN_TYPE_FULL:
      return "JOIN_TYPE_FULL";
    case JoinType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Value {
  value?:
    | { $case: "stringValue"; stringValue: string }
    | { $case: "intValue"; intValue: number }
    | { $case: "longValue"; longValue: number }
    | { $case: "floatValue"; floatValue: number }
    | { $case: "doubleValue"; doubleValue: number }
    | { $case: "booleanValue"; booleanValue: boolean }
    | { $case: "dateValue"; dateValue: string }
    | { $case: "datetimeValue"; datetimeValue: string }
    | { $case: "blobValue"; blobValue: Buffer };
}

export interface Column {
  tableName?: string | undefined;
  name: string;
  type?: ColumnType | undefined;
}

export interface WhereCriteria {
  operator: Operator;
  key: string;
  value?: Value;
}

export interface RawQuery {
  query: string;
  columns: Column[];
}

export interface Join {
  type: JoinType;
  fromTableSchema?: string | undefined;
  joinTableSchema?: string | undefined;
  fromTable: string;
  joinTable: string;
  fromColumn: string;
  joinColumn: string;
}

export interface SelectQuery {
  schema?: string | undefined;
  table: string;
  column: Column[];
  where: WhereCriteria[];
  groupBy: string[];
  orderBy: string[];
  join: Join[];
  limit: number;
  offset: number;
}

export interface ColumnValue {
  column: string;
  value?: Value;
}

export interface InsertQuery {
  schema?: string | undefined;
  table: string;
  columnValue: ColumnValue[];
  idColumn?: string | undefined;
  idSequence?: string | undefined;
  idTable?: string | undefined;
}

export interface BulkInsertQuery {
  insert: InsertQuery[];
}

export interface UpdateQuery {
  schema?: string | undefined;
  table: string;
  columnValue: ColumnValue[];
  where: WhereCriteria[];
}

export interface DeleteQuery {
  schema?: string | undefined;
  table: string;
  where: WhereCriteria[];
}

export interface Query {
  query?:
    | { $case: "raw"; raw: RawQuery }
    | { $case: "select"; select: SelectQuery }
    | { $case: "insert"; insert: InsertQuery }
    | { $case: "update"; update: UpdateQuery }
    | { $case: "delete"; delete: DeleteQuery };
}

export interface Row {
  values: { [key: string]: Value };
}

export interface Row_ValuesEntry {
  key: string;
  value?: Value;
}

export interface QueryRequest {
  query?: Query;
}

export interface SelectQueryResult {
  rows: Row[];
}

export interface InsertQueryResult {
  lastInsertId: number;
}

export interface UpdateQueryResult {
  affectedRows: number;
}

export interface DeleteQueryResult {
  affectedRows: number;
}

export interface QueryResponse {
  result?:
    | { $case: "selectResult"; selectResult: SelectQueryResult }
    | { $case: "insertResult"; insertResult: InsertQueryResult }
    | { $case: "updateResult"; updateResult: UpdateQueryResult }
    | { $case: "deleteResult"; deleteResult: DeleteQueryResult };
}

function createBaseValue(): Value {
  return { value: undefined };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value?.$case === "stringValue") {
      writer.uint32(26).string(message.value.stringValue);
    }
    if (message.value?.$case === "intValue") {
      writer.uint32(32).int32(message.value.intValue);
    }
    if (message.value?.$case === "longValue") {
      writer.uint32(40).int64(message.value.longValue);
    }
    if (message.value?.$case === "floatValue") {
      writer.uint32(53).float(message.value.floatValue);
    }
    if (message.value?.$case === "doubleValue") {
      writer.uint32(57).double(message.value.doubleValue);
    }
    if (message.value?.$case === "booleanValue") {
      writer.uint32(64).bool(message.value.booleanValue);
    }
    if (message.value?.$case === "dateValue") {
      writer.uint32(74).string(message.value.dateValue);
    }
    if (message.value?.$case === "datetimeValue") {
      writer.uint32(82).string(message.value.datetimeValue);
    }
    if (message.value?.$case === "blobValue") {
      writer.uint32(90).bytes(message.value.blobValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.value = { $case: "stringValue", stringValue: reader.string() };
          break;
        case 4:
          message.value = { $case: "intValue", intValue: reader.int32() };
          break;
        case 5:
          message.value = { $case: "longValue", longValue: longToNumber(reader.int64() as Long) };
          break;
        case 6:
          message.value = { $case: "floatValue", floatValue: reader.float() };
          break;
        case 7:
          message.value = { $case: "doubleValue", doubleValue: reader.double() };
          break;
        case 8:
          message.value = { $case: "booleanValue", booleanValue: reader.bool() };
          break;
        case 9:
          message.value = { $case: "dateValue", dateValue: reader.string() };
          break;
        case 10:
          message.value = { $case: "datetimeValue", datetimeValue: reader.string() };
          break;
        case 11:
          message.value = { $case: "blobValue", blobValue: reader.bytes() as Buffer };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Value {
    return {
      value: isSet(object.stringValue)
        ? { $case: "stringValue", stringValue: String(object.stringValue) }
        : isSet(object.intValue)
        ? { $case: "intValue", intValue: Number(object.intValue) }
        : isSet(object.longValue)
        ? { $case: "longValue", longValue: Number(object.longValue) }
        : isSet(object.floatValue)
        ? { $case: "floatValue", floatValue: Number(object.floatValue) }
        : isSet(object.doubleValue)
        ? { $case: "doubleValue", doubleValue: Number(object.doubleValue) }
        : isSet(object.booleanValue)
        ? { $case: "booleanValue", booleanValue: Boolean(object.booleanValue) }
        : isSet(object.dateValue)
        ? { $case: "dateValue", dateValue: String(object.dateValue) }
        : isSet(object.datetimeValue)
        ? { $case: "datetimeValue", datetimeValue: String(object.datetimeValue) }
        : isSet(object.blobValue)
        ? { $case: "blobValue", blobValue: Buffer.from(bytesFromBase64(object.blobValue)) }
        : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    message.value?.$case === "stringValue" && (obj.stringValue = message.value?.stringValue);
    message.value?.$case === "intValue" && (obj.intValue = Math.round(message.value?.intValue));
    message.value?.$case === "longValue" && (obj.longValue = Math.round(message.value?.longValue));
    message.value?.$case === "floatValue" && (obj.floatValue = message.value?.floatValue);
    message.value?.$case === "doubleValue" && (obj.doubleValue = message.value?.doubleValue);
    message.value?.$case === "booleanValue" && (obj.booleanValue = message.value?.booleanValue);
    message.value?.$case === "dateValue" && (obj.dateValue = message.value?.dateValue);
    message.value?.$case === "datetimeValue" && (obj.datetimeValue = message.value?.datetimeValue);
    message.value?.$case === "blobValue" &&
      (obj.blobValue = message.value?.blobValue !== undefined ? base64FromBytes(message.value?.blobValue) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Value>, I>>(base?: I): Value {
    return Value.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    if (
      object.value?.$case === "stringValue" &&
      object.value?.stringValue !== undefined &&
      object.value?.stringValue !== null
    ) {
      message.value = { $case: "stringValue", stringValue: object.value.stringValue };
    }
    if (object.value?.$case === "intValue" && object.value?.intValue !== undefined && object.value?.intValue !== null) {
      message.value = { $case: "intValue", intValue: object.value.intValue };
    }
    if (
      object.value?.$case === "longValue" && object.value?.longValue !== undefined && object.value?.longValue !== null
    ) {
      message.value = { $case: "longValue", longValue: object.value.longValue };
    }
    if (
      object.value?.$case === "floatValue" &&
      object.value?.floatValue !== undefined &&
      object.value?.floatValue !== null
    ) {
      message.value = { $case: "floatValue", floatValue: object.value.floatValue };
    }
    if (
      object.value?.$case === "doubleValue" &&
      object.value?.doubleValue !== undefined &&
      object.value?.doubleValue !== null
    ) {
      message.value = { $case: "doubleValue", doubleValue: object.value.doubleValue };
    }
    if (
      object.value?.$case === "booleanValue" &&
      object.value?.booleanValue !== undefined &&
      object.value?.booleanValue !== null
    ) {
      message.value = { $case: "booleanValue", booleanValue: object.value.booleanValue };
    }
    if (
      object.value?.$case === "dateValue" && object.value?.dateValue !== undefined && object.value?.dateValue !== null
    ) {
      message.value = { $case: "dateValue", dateValue: object.value.dateValue };
    }
    if (
      object.value?.$case === "datetimeValue" &&
      object.value?.datetimeValue !== undefined &&
      object.value?.datetimeValue !== null
    ) {
      message.value = { $case: "datetimeValue", datetimeValue: object.value.datetimeValue };
    }
    if (
      object.value?.$case === "blobValue" && object.value?.blobValue !== undefined && object.value?.blobValue !== null
    ) {
      message.value = { $case: "blobValue", blobValue: object.value.blobValue };
    }
    return message;
  },
};

function createBaseColumn(): Column {
  return { tableName: undefined, name: "", type: undefined };
}

export const Column = {
  encode(message: Column, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tableName !== undefined) {
      writer.uint32(10).string(message.tableName);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.type !== undefined) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Column {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tableName = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Column {
    return {
      tableName: isSet(object.tableName) ? String(object.tableName) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? columnTypeFromJSON(object.type) : undefined,
    };
  },

  toJSON(message: Column): unknown {
    const obj: any = {};
    message.tableName !== undefined && (obj.tableName = message.tableName);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type !== undefined ? columnTypeToJSON(message.type) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Column>, I>>(base?: I): Column {
    return Column.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Column>, I>>(object: I): Column {
    const message = createBaseColumn();
    message.tableName = object.tableName ?? undefined;
    message.name = object.name ?? "";
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBaseWhereCriteria(): WhereCriteria {
  return { operator: 0, key: "", value: undefined };
}

export const WhereCriteria = {
  encode(message: WhereCriteria, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WhereCriteria {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWhereCriteria();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operator = reader.int32() as any;
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WhereCriteria {
    return {
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: WhereCriteria): unknown {
    const obj: any = {};
    message.operator !== undefined && (obj.operator = operatorToJSON(message.operator));
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<WhereCriteria>, I>>(base?: I): WhereCriteria {
    return WhereCriteria.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WhereCriteria>, I>>(object: I): WhereCriteria {
    const message = createBaseWhereCriteria();
    message.operator = object.operator ?? 0;
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Value.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseRawQuery(): RawQuery {
  return { query: "", columns: [] };
}

export const RawQuery = {
  encode(message: RawQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    for (const v of message.columns) {
      Column.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RawQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRawQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query = reader.string();
          break;
        case 2:
          message.columns.push(Column.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RawQuery {
    return {
      query: isSet(object.query) ? String(object.query) : "",
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => Column.fromJSON(e)) : [],
    };
  },

  toJSON(message: RawQuery): unknown {
    const obj: any = {};
    message.query !== undefined && (obj.query = message.query);
    if (message.columns) {
      obj.columns = message.columns.map((e) => e ? Column.toJSON(e) : undefined);
    } else {
      obj.columns = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RawQuery>, I>>(base?: I): RawQuery {
    return RawQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RawQuery>, I>>(object: I): RawQuery {
    const message = createBaseRawQuery();
    message.query = object.query ?? "";
    message.columns = object.columns?.map((e) => Column.fromPartial(e)) || [];
    return message;
  },
};

function createBaseJoin(): Join {
  return {
    type: 0,
    fromTableSchema: undefined,
    joinTableSchema: undefined,
    fromTable: "",
    joinTable: "",
    fromColumn: "",
    joinColumn: "",
  };
}

export const Join = {
  encode(message: Join, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.fromTableSchema !== undefined) {
      writer.uint32(18).string(message.fromTableSchema);
    }
    if (message.joinTableSchema !== undefined) {
      writer.uint32(26).string(message.joinTableSchema);
    }
    if (message.fromTable !== "") {
      writer.uint32(34).string(message.fromTable);
    }
    if (message.joinTable !== "") {
      writer.uint32(42).string(message.joinTable);
    }
    if (message.fromColumn !== "") {
      writer.uint32(50).string(message.fromColumn);
    }
    if (message.joinColumn !== "") {
      writer.uint32(58).string(message.joinColumn);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Join {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.fromTableSchema = reader.string();
          break;
        case 3:
          message.joinTableSchema = reader.string();
          break;
        case 4:
          message.fromTable = reader.string();
          break;
        case 5:
          message.joinTable = reader.string();
          break;
        case 6:
          message.fromColumn = reader.string();
          break;
        case 7:
          message.joinColumn = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Join {
    return {
      type: isSet(object.type) ? joinTypeFromJSON(object.type) : 0,
      fromTableSchema: isSet(object.fromTableSchema) ? String(object.fromTableSchema) : undefined,
      joinTableSchema: isSet(object.joinTableSchema) ? String(object.joinTableSchema) : undefined,
      fromTable: isSet(object.fromTable) ? String(object.fromTable) : "",
      joinTable: isSet(object.joinTable) ? String(object.joinTable) : "",
      fromColumn: isSet(object.fromColumn) ? String(object.fromColumn) : "",
      joinColumn: isSet(object.joinColumn) ? String(object.joinColumn) : "",
    };
  },

  toJSON(message: Join): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = joinTypeToJSON(message.type));
    message.fromTableSchema !== undefined && (obj.fromTableSchema = message.fromTableSchema);
    message.joinTableSchema !== undefined && (obj.joinTableSchema = message.joinTableSchema);
    message.fromTable !== undefined && (obj.fromTable = message.fromTable);
    message.joinTable !== undefined && (obj.joinTable = message.joinTable);
    message.fromColumn !== undefined && (obj.fromColumn = message.fromColumn);
    message.joinColumn !== undefined && (obj.joinColumn = message.joinColumn);
    return obj;
  },

  create<I extends Exact<DeepPartial<Join>, I>>(base?: I): Join {
    return Join.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Join>, I>>(object: I): Join {
    const message = createBaseJoin();
    message.type = object.type ?? 0;
    message.fromTableSchema = object.fromTableSchema ?? undefined;
    message.joinTableSchema = object.joinTableSchema ?? undefined;
    message.fromTable = object.fromTable ?? "";
    message.joinTable = object.joinTable ?? "";
    message.fromColumn = object.fromColumn ?? "";
    message.joinColumn = object.joinColumn ?? "";
    return message;
  },
};

function createBaseSelectQuery(): SelectQuery {
  return {
    schema: undefined,
    table: "",
    column: [],
    where: [],
    groupBy: [],
    orderBy: [],
    join: [],
    limit: 0,
    offset: 0,
  };
}

export const SelectQuery = {
  encode(message: SelectQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      writer.uint32(10).string(message.schema);
    }
    if (message.table !== "") {
      writer.uint32(18).string(message.table);
    }
    for (const v of message.column) {
      Column.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.where) {
      WhereCriteria.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.groupBy) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.orderBy) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.join) {
      Join.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.limit !== 0) {
      writer.uint32(64).uint32(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(72).uint32(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = reader.string();
          break;
        case 2:
          message.table = reader.string();
          break;
        case 3:
          message.column.push(Column.decode(reader, reader.uint32()));
          break;
        case 4:
          message.where.push(WhereCriteria.decode(reader, reader.uint32()));
          break;
        case 5:
          message.groupBy.push(reader.string());
          break;
        case 6:
          message.orderBy.push(reader.string());
          break;
        case 7:
          message.join.push(Join.decode(reader, reader.uint32()));
          break;
        case 8:
          message.limit = reader.uint32();
          break;
        case 9:
          message.offset = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SelectQuery {
    return {
      schema: isSet(object.schema) ? String(object.schema) : undefined,
      table: isSet(object.table) ? String(object.table) : "",
      column: Array.isArray(object?.column) ? object.column.map((e: any) => Column.fromJSON(e)) : [],
      where: Array.isArray(object?.where) ? object.where.map((e: any) => WhereCriteria.fromJSON(e)) : [],
      groupBy: Array.isArray(object?.groupBy) ? object.groupBy.map((e: any) => String(e)) : [],
      orderBy: Array.isArray(object?.orderBy) ? object.orderBy.map((e: any) => String(e)) : [],
      join: Array.isArray(object?.join) ? object.join.map((e: any) => Join.fromJSON(e)) : [],
      limit: isSet(object.limit) ? Number(object.limit) : 0,
      offset: isSet(object.offset) ? Number(object.offset) : 0,
    };
  },

  toJSON(message: SelectQuery): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema);
    message.table !== undefined && (obj.table = message.table);
    if (message.column) {
      obj.column = message.column.map((e) => e ? Column.toJSON(e) : undefined);
    } else {
      obj.column = [];
    }
    if (message.where) {
      obj.where = message.where.map((e) => e ? WhereCriteria.toJSON(e) : undefined);
    } else {
      obj.where = [];
    }
    if (message.groupBy) {
      obj.groupBy = message.groupBy.map((e) => e);
    } else {
      obj.groupBy = [];
    }
    if (message.orderBy) {
      obj.orderBy = message.orderBy.map((e) => e);
    } else {
      obj.orderBy = [];
    }
    if (message.join) {
      obj.join = message.join.map((e) => e ? Join.toJSON(e) : undefined);
    } else {
      obj.join = [];
    }
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectQuery>, I>>(base?: I): SelectQuery {
    return SelectQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelectQuery>, I>>(object: I): SelectQuery {
    const message = createBaseSelectQuery();
    message.schema = object.schema ?? undefined;
    message.table = object.table ?? "";
    message.column = object.column?.map((e) => Column.fromPartial(e)) || [];
    message.where = object.where?.map((e) => WhereCriteria.fromPartial(e)) || [];
    message.groupBy = object.groupBy?.map((e) => e) || [];
    message.orderBy = object.orderBy?.map((e) => e) || [];
    message.join = object.join?.map((e) => Join.fromPartial(e)) || [];
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseColumnValue(): ColumnValue {
  return { column: "", value: undefined };
}

export const ColumnValue = {
  encode(message: ColumnValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.column !== "") {
      writer.uint32(10).string(message.column);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColumnValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumnValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.column = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ColumnValue {
    return {
      column: isSet(object.column) ? String(object.column) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ColumnValue): unknown {
    const obj: any = {};
    message.column !== undefined && (obj.column = message.column);
    message.value !== undefined && (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ColumnValue>, I>>(base?: I): ColumnValue {
    return ColumnValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ColumnValue>, I>>(object: I): ColumnValue {
    const message = createBaseColumnValue();
    message.column = object.column ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Value.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseInsertQuery(): InsertQuery {
  return {
    schema: undefined,
    table: "",
    columnValue: [],
    idColumn: undefined,
    idSequence: undefined,
    idTable: undefined,
  };
}

export const InsertQuery = {
  encode(message: InsertQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      writer.uint32(10).string(message.schema);
    }
    if (message.table !== "") {
      writer.uint32(18).string(message.table);
    }
    for (const v of message.columnValue) {
      ColumnValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.idColumn !== undefined) {
      writer.uint32(34).string(message.idColumn);
    }
    if (message.idSequence !== undefined) {
      writer.uint32(42).string(message.idSequence);
    }
    if (message.idTable !== undefined) {
      writer.uint32(50).string(message.idTable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InsertQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInsertQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = reader.string();
          break;
        case 2:
          message.table = reader.string();
          break;
        case 3:
          message.columnValue.push(ColumnValue.decode(reader, reader.uint32()));
          break;
        case 4:
          message.idColumn = reader.string();
          break;
        case 5:
          message.idSequence = reader.string();
          break;
        case 6:
          message.idTable = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InsertQuery {
    return {
      schema: isSet(object.schema) ? String(object.schema) : undefined,
      table: isSet(object.table) ? String(object.table) : "",
      columnValue: Array.isArray(object?.columnValue)
        ? object.columnValue.map((e: any) => ColumnValue.fromJSON(e))
        : [],
      idColumn: isSet(object.idColumn) ? String(object.idColumn) : undefined,
      idSequence: isSet(object.idSequence) ? String(object.idSequence) : undefined,
      idTable: isSet(object.idTable) ? String(object.idTable) : undefined,
    };
  },

  toJSON(message: InsertQuery): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema);
    message.table !== undefined && (obj.table = message.table);
    if (message.columnValue) {
      obj.columnValue = message.columnValue.map((e) => e ? ColumnValue.toJSON(e) : undefined);
    } else {
      obj.columnValue = [];
    }
    message.idColumn !== undefined && (obj.idColumn = message.idColumn);
    message.idSequence !== undefined && (obj.idSequence = message.idSequence);
    message.idTable !== undefined && (obj.idTable = message.idTable);
    return obj;
  },

  create<I extends Exact<DeepPartial<InsertQuery>, I>>(base?: I): InsertQuery {
    return InsertQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InsertQuery>, I>>(object: I): InsertQuery {
    const message = createBaseInsertQuery();
    message.schema = object.schema ?? undefined;
    message.table = object.table ?? "";
    message.columnValue = object.columnValue?.map((e) => ColumnValue.fromPartial(e)) || [];
    message.idColumn = object.idColumn ?? undefined;
    message.idSequence = object.idSequence ?? undefined;
    message.idTable = object.idTable ?? undefined;
    return message;
  },
};

function createBaseBulkInsertQuery(): BulkInsertQuery {
  return { insert: [] };
}

export const BulkInsertQuery = {
  encode(message: BulkInsertQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.insert) {
      InsertQuery.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkInsertQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkInsertQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.insert.push(InsertQuery.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BulkInsertQuery {
    return { insert: Array.isArray(object?.insert) ? object.insert.map((e: any) => InsertQuery.fromJSON(e)) : [] };
  },

  toJSON(message: BulkInsertQuery): unknown {
    const obj: any = {};
    if (message.insert) {
      obj.insert = message.insert.map((e) => e ? InsertQuery.toJSON(e) : undefined);
    } else {
      obj.insert = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BulkInsertQuery>, I>>(base?: I): BulkInsertQuery {
    return BulkInsertQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BulkInsertQuery>, I>>(object: I): BulkInsertQuery {
    const message = createBaseBulkInsertQuery();
    message.insert = object.insert?.map((e) => InsertQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateQuery(): UpdateQuery {
  return { schema: undefined, table: "", columnValue: [], where: [] };
}

export const UpdateQuery = {
  encode(message: UpdateQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      writer.uint32(10).string(message.schema);
    }
    if (message.table !== "") {
      writer.uint32(18).string(message.table);
    }
    for (const v of message.columnValue) {
      ColumnValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.where) {
      WhereCriteria.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = reader.string();
          break;
        case 2:
          message.table = reader.string();
          break;
        case 3:
          message.columnValue.push(ColumnValue.decode(reader, reader.uint32()));
          break;
        case 4:
          message.where.push(WhereCriteria.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateQuery {
    return {
      schema: isSet(object.schema) ? String(object.schema) : undefined,
      table: isSet(object.table) ? String(object.table) : "",
      columnValue: Array.isArray(object?.columnValue)
        ? object.columnValue.map((e: any) => ColumnValue.fromJSON(e))
        : [],
      where: Array.isArray(object?.where) ? object.where.map((e: any) => WhereCriteria.fromJSON(e)) : [],
    };
  },

  toJSON(message: UpdateQuery): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema);
    message.table !== undefined && (obj.table = message.table);
    if (message.columnValue) {
      obj.columnValue = message.columnValue.map((e) => e ? ColumnValue.toJSON(e) : undefined);
    } else {
      obj.columnValue = [];
    }
    if (message.where) {
      obj.where = message.where.map((e) => e ? WhereCriteria.toJSON(e) : undefined);
    } else {
      obj.where = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateQuery>, I>>(base?: I): UpdateQuery {
    return UpdateQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateQuery>, I>>(object: I): UpdateQuery {
    const message = createBaseUpdateQuery();
    message.schema = object.schema ?? undefined;
    message.table = object.table ?? "";
    message.columnValue = object.columnValue?.map((e) => ColumnValue.fromPartial(e)) || [];
    message.where = object.where?.map((e) => WhereCriteria.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDeleteQuery(): DeleteQuery {
  return { schema: undefined, table: "", where: [] };
}

export const DeleteQuery = {
  encode(message: DeleteQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== undefined) {
      writer.uint32(10).string(message.schema);
    }
    if (message.table !== "") {
      writer.uint32(18).string(message.table);
    }
    for (const v of message.where) {
      WhereCriteria.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schema = reader.string();
          break;
        case 2:
          message.table = reader.string();
          break;
        case 3:
          message.where.push(WhereCriteria.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteQuery {
    return {
      schema: isSet(object.schema) ? String(object.schema) : undefined,
      table: isSet(object.table) ? String(object.table) : "",
      where: Array.isArray(object?.where) ? object.where.map((e: any) => WhereCriteria.fromJSON(e)) : [],
    };
  },

  toJSON(message: DeleteQuery): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema);
    message.table !== undefined && (obj.table = message.table);
    if (message.where) {
      obj.where = message.where.map((e) => e ? WhereCriteria.toJSON(e) : undefined);
    } else {
      obj.where = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteQuery>, I>>(base?: I): DeleteQuery {
    return DeleteQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteQuery>, I>>(object: I): DeleteQuery {
    const message = createBaseDeleteQuery();
    message.schema = object.schema ?? undefined;
    message.table = object.table ?? "";
    message.where = object.where?.map((e) => WhereCriteria.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQuery(): Query {
  return { query: undefined };
}

export const Query = {
  encode(message: Query, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query?.$case === "raw") {
      RawQuery.encode(message.query.raw, writer.uint32(10).fork()).ldelim();
    }
    if (message.query?.$case === "select") {
      SelectQuery.encode(message.query.select, writer.uint32(18).fork()).ldelim();
    }
    if (message.query?.$case === "insert") {
      InsertQuery.encode(message.query.insert, writer.uint32(26).fork()).ldelim();
    }
    if (message.query?.$case === "update") {
      UpdateQuery.encode(message.query.update, writer.uint32(34).fork()).ldelim();
    }
    if (message.query?.$case === "delete") {
      DeleteQuery.encode(message.query.delete, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Query {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query = { $case: "raw", raw: RawQuery.decode(reader, reader.uint32()) };
          break;
        case 2:
          message.query = { $case: "select", select: SelectQuery.decode(reader, reader.uint32()) };
          break;
        case 3:
          message.query = { $case: "insert", insert: InsertQuery.decode(reader, reader.uint32()) };
          break;
        case 4:
          message.query = { $case: "update", update: UpdateQuery.decode(reader, reader.uint32()) };
          break;
        case 5:
          message.query = { $case: "delete", delete: DeleteQuery.decode(reader, reader.uint32()) };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Query {
    return {
      query: isSet(object.raw)
        ? { $case: "raw", raw: RawQuery.fromJSON(object.raw) }
        : isSet(object.select)
        ? { $case: "select", select: SelectQuery.fromJSON(object.select) }
        : isSet(object.insert)
        ? { $case: "insert", insert: InsertQuery.fromJSON(object.insert) }
        : isSet(object.update)
        ? { $case: "update", update: UpdateQuery.fromJSON(object.update) }
        : isSet(object.delete)
        ? { $case: "delete", delete: DeleteQuery.fromJSON(object.delete) }
        : undefined,
    };
  },

  toJSON(message: Query): unknown {
    const obj: any = {};
    message.query?.$case === "raw" && (obj.raw = message.query?.raw ? RawQuery.toJSON(message.query?.raw) : undefined);
    message.query?.$case === "select" &&
      (obj.select = message.query?.select ? SelectQuery.toJSON(message.query?.select) : undefined);
    message.query?.$case === "insert" &&
      (obj.insert = message.query?.insert ? InsertQuery.toJSON(message.query?.insert) : undefined);
    message.query?.$case === "update" &&
      (obj.update = message.query?.update ? UpdateQuery.toJSON(message.query?.update) : undefined);
    message.query?.$case === "delete" &&
      (obj.delete = message.query?.delete ? DeleteQuery.toJSON(message.query?.delete) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Query>, I>>(base?: I): Query {
    return Query.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Query>, I>>(object: I): Query {
    const message = createBaseQuery();
    if (object.query?.$case === "raw" && object.query?.raw !== undefined && object.query?.raw !== null) {
      message.query = { $case: "raw", raw: RawQuery.fromPartial(object.query.raw) };
    }
    if (object.query?.$case === "select" && object.query?.select !== undefined && object.query?.select !== null) {
      message.query = { $case: "select", select: SelectQuery.fromPartial(object.query.select) };
    }
    if (object.query?.$case === "insert" && object.query?.insert !== undefined && object.query?.insert !== null) {
      message.query = { $case: "insert", insert: InsertQuery.fromPartial(object.query.insert) };
    }
    if (object.query?.$case === "update" && object.query?.update !== undefined && object.query?.update !== null) {
      message.query = { $case: "update", update: UpdateQuery.fromPartial(object.query.update) };
    }
    if (object.query?.$case === "delete" && object.query?.delete !== undefined && object.query?.delete !== null) {
      message.query = { $case: "delete", delete: DeleteQuery.fromPartial(object.query.delete) };
    }
    return message;
  },
};

function createBaseRow(): Row {
  return { values: {} };
}

export const Row = {
  encode(message: Row, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.values).forEach(([key, value]) => {
      Row_ValuesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Row {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = Row_ValuesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.values[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Row {
    return {
      values: isObject(object.values)
        ? Object.entries(object.values).reduce<{ [key: string]: Value }>((acc, [key, value]) => {
          acc[key] = Value.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Row): unknown {
    const obj: any = {};
    obj.values = {};
    if (message.values) {
      Object.entries(message.values).forEach(([k, v]) => {
        obj.values[k] = Value.toJSON(v);
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Row>, I>>(base?: I): Row {
    return Row.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Row>, I>>(object: I): Row {
    const message = createBaseRow();
    message.values = Object.entries(object.values ?? {}).reduce<{ [key: string]: Value }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Value.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseRow_ValuesEntry(): Row_ValuesEntry {
  return { key: "", value: undefined };
}

export const Row_ValuesEntry = {
  encode(message: Row_ValuesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Row_ValuesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRow_ValuesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Row_ValuesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Row_ValuesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Row_ValuesEntry>, I>>(base?: I): Row_ValuesEntry {
    return Row_ValuesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Row_ValuesEntry>, I>>(object: I): Row_ValuesEntry {
    const message = createBaseRow_ValuesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Value.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseQueryRequest(): QueryRequest {
  return { query: undefined };
}

export const QueryRequest = {
  encode(message: QueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== undefined) {
      Query.encode(message.query, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query = Query.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRequest {
    return { query: isSet(object.query) ? Query.fromJSON(object.query) : undefined };
  },

  toJSON(message: QueryRequest): unknown {
    const obj: any = {};
    message.query !== undefined && (obj.query = message.query ? Query.toJSON(message.query) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRequest>, I>>(base?: I): QueryRequest {
    return QueryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryRequest>, I>>(object: I): QueryRequest {
    const message = createBaseQueryRequest();
    message.query = (object.query !== undefined && object.query !== null) ? Query.fromPartial(object.query) : undefined;
    return message;
  },
};

function createBaseSelectQueryResult(): SelectQueryResult {
  return { rows: [] };
}

export const SelectQueryResult = {
  encode(message: SelectQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rows) {
      Row.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectQueryResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rows.push(Row.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SelectQueryResult {
    return { rows: Array.isArray(object?.rows) ? object.rows.map((e: any) => Row.fromJSON(e)) : [] };
  },

  toJSON(message: SelectQueryResult): unknown {
    const obj: any = {};
    if (message.rows) {
      obj.rows = message.rows.map((e) => e ? Row.toJSON(e) : undefined);
    } else {
      obj.rows = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectQueryResult>, I>>(base?: I): SelectQueryResult {
    return SelectQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelectQueryResult>, I>>(object: I): SelectQueryResult {
    const message = createBaseSelectQueryResult();
    message.rows = object.rows?.map((e) => Row.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInsertQueryResult(): InsertQueryResult {
  return { lastInsertId: 0 };
}

export const InsertQueryResult = {
  encode(message: InsertQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastInsertId !== 0) {
      writer.uint32(8).uint64(message.lastInsertId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InsertQueryResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInsertQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastInsertId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InsertQueryResult {
    return { lastInsertId: isSet(object.lastInsertId) ? Number(object.lastInsertId) : 0 };
  },

  toJSON(message: InsertQueryResult): unknown {
    const obj: any = {};
    message.lastInsertId !== undefined && (obj.lastInsertId = Math.round(message.lastInsertId));
    return obj;
  },

  create<I extends Exact<DeepPartial<InsertQueryResult>, I>>(base?: I): InsertQueryResult {
    return InsertQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InsertQueryResult>, I>>(object: I): InsertQueryResult {
    const message = createBaseInsertQueryResult();
    message.lastInsertId = object.lastInsertId ?? 0;
    return message;
  },
};

function createBaseUpdateQueryResult(): UpdateQueryResult {
  return { affectedRows: 0 };
}

export const UpdateQueryResult = {
  encode(message: UpdateQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.affectedRows !== 0) {
      writer.uint32(8).uint64(message.affectedRows);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateQueryResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.affectedRows = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateQueryResult {
    return { affectedRows: isSet(object.affectedRows) ? Number(object.affectedRows) : 0 };
  },

  toJSON(message: UpdateQueryResult): unknown {
    const obj: any = {};
    message.affectedRows !== undefined && (obj.affectedRows = Math.round(message.affectedRows));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateQueryResult>, I>>(base?: I): UpdateQueryResult {
    return UpdateQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateQueryResult>, I>>(object: I): UpdateQueryResult {
    const message = createBaseUpdateQueryResult();
    message.affectedRows = object.affectedRows ?? 0;
    return message;
  },
};

function createBaseDeleteQueryResult(): DeleteQueryResult {
  return { affectedRows: 0 };
}

export const DeleteQueryResult = {
  encode(message: DeleteQueryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.affectedRows !== 0) {
      writer.uint32(8).uint64(message.affectedRows);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteQueryResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.affectedRows = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteQueryResult {
    return { affectedRows: isSet(object.affectedRows) ? Number(object.affectedRows) : 0 };
  },

  toJSON(message: DeleteQueryResult): unknown {
    const obj: any = {};
    message.affectedRows !== undefined && (obj.affectedRows = Math.round(message.affectedRows));
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteQueryResult>, I>>(base?: I): DeleteQueryResult {
    return DeleteQueryResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteQueryResult>, I>>(object: I): DeleteQueryResult {
    const message = createBaseDeleteQueryResult();
    message.affectedRows = object.affectedRows ?? 0;
    return message;
  },
};

function createBaseQueryResponse(): QueryResponse {
  return { result: undefined };
}

export const QueryResponse = {
  encode(message: QueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result?.$case === "selectResult") {
      SelectQueryResult.encode(message.result.selectResult, writer.uint32(10).fork()).ldelim();
    }
    if (message.result?.$case === "insertResult") {
      InsertQueryResult.encode(message.result.insertResult, writer.uint32(18).fork()).ldelim();
    }
    if (message.result?.$case === "updateResult") {
      UpdateQueryResult.encode(message.result.updateResult, writer.uint32(26).fork()).ldelim();
    }
    if (message.result?.$case === "deleteResult") {
      DeleteQueryResult.encode(message.result.deleteResult, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = { $case: "selectResult", selectResult: SelectQueryResult.decode(reader, reader.uint32()) };
          break;
        case 2:
          message.result = { $case: "insertResult", insertResult: InsertQueryResult.decode(reader, reader.uint32()) };
          break;
        case 3:
          message.result = { $case: "updateResult", updateResult: UpdateQueryResult.decode(reader, reader.uint32()) };
          break;
        case 4:
          message.result = { $case: "deleteResult", deleteResult: DeleteQueryResult.decode(reader, reader.uint32()) };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResponse {
    return {
      result: isSet(object.selectResult)
        ? { $case: "selectResult", selectResult: SelectQueryResult.fromJSON(object.selectResult) }
        : isSet(object.insertResult)
        ? { $case: "insertResult", insertResult: InsertQueryResult.fromJSON(object.insertResult) }
        : isSet(object.updateResult)
        ? { $case: "updateResult", updateResult: UpdateQueryResult.fromJSON(object.updateResult) }
        : isSet(object.deleteResult)
        ? { $case: "deleteResult", deleteResult: DeleteQueryResult.fromJSON(object.deleteResult) }
        : undefined,
    };
  },

  toJSON(message: QueryResponse): unknown {
    const obj: any = {};
    message.result?.$case === "selectResult" && (obj.selectResult = message.result?.selectResult
      ? SelectQueryResult.toJSON(message.result?.selectResult)
      : undefined);
    message.result?.$case === "insertResult" && (obj.insertResult = message.result?.insertResult
      ? InsertQueryResult.toJSON(message.result?.insertResult)
      : undefined);
    message.result?.$case === "updateResult" && (obj.updateResult = message.result?.updateResult
      ? UpdateQueryResult.toJSON(message.result?.updateResult)
      : undefined);
    message.result?.$case === "deleteResult" && (obj.deleteResult = message.result?.deleteResult
      ? DeleteQueryResult.toJSON(message.result?.deleteResult)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryResponse>, I>>(base?: I): QueryResponse {
    return QueryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueryResponse>, I>>(object: I): QueryResponse {
    const message = createBaseQueryResponse();
    if (
      object.result?.$case === "selectResult" &&
      object.result?.selectResult !== undefined &&
      object.result?.selectResult !== null
    ) {
      message.result = {
        $case: "selectResult",
        selectResult: SelectQueryResult.fromPartial(object.result.selectResult),
      };
    }
    if (
      object.result?.$case === "insertResult" &&
      object.result?.insertResult !== undefined &&
      object.result?.insertResult !== null
    ) {
      message.result = {
        $case: "insertResult",
        insertResult: InsertQueryResult.fromPartial(object.result.insertResult),
      };
    }
    if (
      object.result?.$case === "updateResult" &&
      object.result?.updateResult !== undefined &&
      object.result?.updateResult !== null
    ) {
      message.result = {
        $case: "updateResult",
        updateResult: UpdateQueryResult.fromPartial(object.result.updateResult),
      };
    }
    if (
      object.result?.$case === "deleteResult" &&
      object.result?.deleteResult !== undefined &&
      object.result?.deleteResult !== null
    ) {
      message.result = {
        $case: "deleteResult",
        deleteResult: DeleteQueryResult.fromPartial(object.result.deleteResult),
      };
    }
    return message;
  },
};

export type QueryServiceService = typeof QueryServiceService;
export const QueryServiceService = {
  query: {
    path: "/topcoder.dal.rdb.QueryService/Query",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: QueryRequest) => Buffer.from(QueryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => QueryRequest.decode(value),
    responseSerialize: (value: QueryResponse) => Buffer.from(QueryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => QueryResponse.decode(value),
  },
} as const;

export interface QueryServiceServer extends UntypedServiceImplementation {
  query: handleUnaryCall<QueryRequest, QueryResponse>;
}

export interface QueryServiceClient extends Client {
  query(
    request: QueryRequest,
    callback: (error: ServiceError | null, response: QueryResponse) => void,
  ): ClientUnaryCall;
  query(
    request: QueryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: QueryResponse) => void,
  ): ClientUnaryCall;
  query(
    request: QueryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: QueryResponse) => void,
  ): ClientUnaryCall;
}

export const QueryServiceClient = makeGenericClientConstructor(
  QueryServiceService,
  "topcoder.dal.rdb.QueryService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): QueryServiceClient;
  service: typeof QueryServiceService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
