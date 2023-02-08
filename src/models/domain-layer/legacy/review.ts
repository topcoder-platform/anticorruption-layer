/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Review {
  reviewId: number;
  resourceId: number;
  submissionId: number;
  projectPhaseId: number;
  scorecardId: number;
  committed: number;
  score: number;
  initialScore: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface CreateReviewInput {
  reviewId: number;
  resourceId: number;
  submissionId: number;
  projectPhaseId: number;
  scorecardId: number;
  committed: number;
  score: number;
  initialScore: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface ReviewItem {
  reviewItemId: number;
  reviewId: number;
  scorecardQuestionId: number;
  uploadId: number;
  answer: string;
  sort: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface CreateReviewItemInput {
  reviewItemId: number;
  reviewId: number;
  scorecardQuestionId: number;
  uploadId: number;
  answer: string;
  sort: number;
  createUser: number;
  createDate: number;
  modifyUser: number;
  modifyDate: number;
}

export interface Submission {
  submissionId: number;
  uploadId: number;
}

export interface GetSubmissionInput {
  projectId: number;
  submissionStatusId: number;
  uploadStatusId: number;
}

export interface Upload {
  uploadId: number;
  projectId: number;
  uploadStatusId: number;
}

function createBaseReview(): Review {
  return {
    reviewId: 0,
    resourceId: 0,
    submissionId: 0,
    projectPhaseId: 0,
    scorecardId: 0,
    committed: 0,
    score: 0,
    initialScore: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const Review = {
  encode(message: Review, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewId !== 0) {
      writer.uint32(8).int32(message.reviewId);
    }
    if (message.resourceId !== 0) {
      writer.uint32(16).int32(message.resourceId);
    }
    if (message.submissionId !== 0) {
      writer.uint32(24).int32(message.submissionId);
    }
    if (message.projectPhaseId !== 0) {
      writer.uint32(32).int32(message.projectPhaseId);
    }
    if (message.scorecardId !== 0) {
      writer.uint32(40).int32(message.scorecardId);
    }
    if (message.committed !== 0) {
      writer.uint32(48).int32(message.committed);
    }
    if (message.score !== 0) {
      writer.uint32(61).float(message.score);
    }
    if (message.initialScore !== 0) {
      writer.uint32(69).float(message.initialScore);
    }
    if (message.createUser !== 0) {
      writer.uint32(72).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(80).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(88).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(96).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Review {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReview();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reviewId = reader.int32();
          break;
        case 2:
          message.resourceId = reader.int32();
          break;
        case 3:
          message.submissionId = reader.int32();
          break;
        case 4:
          message.projectPhaseId = reader.int32();
          break;
        case 5:
          message.scorecardId = reader.int32();
          break;
        case 6:
          message.committed = reader.int32();
          break;
        case 7:
          message.score = reader.float();
          break;
        case 8:
          message.initialScore = reader.float();
          break;
        case 9:
          message.createUser = reader.int32();
          break;
        case 10:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.modifyUser = reader.int32();
          break;
        case 12:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Review {
    return {
      reviewId: isSet(object.reviewId) ? Number(object.reviewId) : 0,
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
      projectPhaseId: isSet(object.projectPhaseId) ? Number(object.projectPhaseId) : 0,
      scorecardId: isSet(object.scorecardId) ? Number(object.scorecardId) : 0,
      committed: isSet(object.committed) ? Number(object.committed) : 0,
      score: isSet(object.score) ? Number(object.score) : 0,
      initialScore: isSet(object.initialScore) ? Number(object.initialScore) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: Review): unknown {
    const obj: any = {};
    message.reviewId !== undefined && (obj.reviewId = Math.round(message.reviewId));
    message.resourceId !== undefined && (obj.resourceId = Math.round(message.resourceId));
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    message.projectPhaseId !== undefined && (obj.projectPhaseId = Math.round(message.projectPhaseId));
    message.scorecardId !== undefined && (obj.scorecardId = Math.round(message.scorecardId));
    message.committed !== undefined && (obj.committed = Math.round(message.committed));
    message.score !== undefined && (obj.score = message.score);
    message.initialScore !== undefined && (obj.initialScore = message.initialScore);
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<Review>, I>>(base?: I): Review {
    return Review.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Review>, I>>(object: I): Review {
    const message = createBaseReview();
    message.reviewId = object.reviewId ?? 0;
    message.resourceId = object.resourceId ?? 0;
    message.submissionId = object.submissionId ?? 0;
    message.projectPhaseId = object.projectPhaseId ?? 0;
    message.scorecardId = object.scorecardId ?? 0;
    message.committed = object.committed ?? 0;
    message.score = object.score ?? 0;
    message.initialScore = object.initialScore ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseCreateReviewInput(): CreateReviewInput {
  return {
    reviewId: 0,
    resourceId: 0,
    submissionId: 0,
    projectPhaseId: 0,
    scorecardId: 0,
    committed: 0,
    score: 0,
    initialScore: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const CreateReviewInput = {
  encode(message: CreateReviewInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewId !== 0) {
      writer.uint32(8).int32(message.reviewId);
    }
    if (message.resourceId !== 0) {
      writer.uint32(16).int32(message.resourceId);
    }
    if (message.submissionId !== 0) {
      writer.uint32(24).int32(message.submissionId);
    }
    if (message.projectPhaseId !== 0) {
      writer.uint32(32).int32(message.projectPhaseId);
    }
    if (message.scorecardId !== 0) {
      writer.uint32(40).int32(message.scorecardId);
    }
    if (message.committed !== 0) {
      writer.uint32(48).int32(message.committed);
    }
    if (message.score !== 0) {
      writer.uint32(61).float(message.score);
    }
    if (message.initialScore !== 0) {
      writer.uint32(69).float(message.initialScore);
    }
    if (message.createUser !== 0) {
      writer.uint32(72).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(80).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(88).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(96).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateReviewInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateReviewInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reviewId = reader.int32();
          break;
        case 2:
          message.resourceId = reader.int32();
          break;
        case 3:
          message.submissionId = reader.int32();
          break;
        case 4:
          message.projectPhaseId = reader.int32();
          break;
        case 5:
          message.scorecardId = reader.int32();
          break;
        case 6:
          message.committed = reader.int32();
          break;
        case 7:
          message.score = reader.float();
          break;
        case 8:
          message.initialScore = reader.float();
          break;
        case 9:
          message.createUser = reader.int32();
          break;
        case 10:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.modifyUser = reader.int32();
          break;
        case 12:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateReviewInput {
    return {
      reviewId: isSet(object.reviewId) ? Number(object.reviewId) : 0,
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
      projectPhaseId: isSet(object.projectPhaseId) ? Number(object.projectPhaseId) : 0,
      scorecardId: isSet(object.scorecardId) ? Number(object.scorecardId) : 0,
      committed: isSet(object.committed) ? Number(object.committed) : 0,
      score: isSet(object.score) ? Number(object.score) : 0,
      initialScore: isSet(object.initialScore) ? Number(object.initialScore) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: CreateReviewInput): unknown {
    const obj: any = {};
    message.reviewId !== undefined && (obj.reviewId = Math.round(message.reviewId));
    message.resourceId !== undefined && (obj.resourceId = Math.round(message.resourceId));
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    message.projectPhaseId !== undefined && (obj.projectPhaseId = Math.round(message.projectPhaseId));
    message.scorecardId !== undefined && (obj.scorecardId = Math.round(message.scorecardId));
    message.committed !== undefined && (obj.committed = Math.round(message.committed));
    message.score !== undefined && (obj.score = message.score);
    message.initialScore !== undefined && (obj.initialScore = message.initialScore);
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateReviewInput>, I>>(base?: I): CreateReviewInput {
    return CreateReviewInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateReviewInput>, I>>(object: I): CreateReviewInput {
    const message = createBaseCreateReviewInput();
    message.reviewId = object.reviewId ?? 0;
    message.resourceId = object.resourceId ?? 0;
    message.submissionId = object.submissionId ?? 0;
    message.projectPhaseId = object.projectPhaseId ?? 0;
    message.scorecardId = object.scorecardId ?? 0;
    message.committed = object.committed ?? 0;
    message.score = object.score ?? 0;
    message.initialScore = object.initialScore ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseReviewItem(): ReviewItem {
  return {
    reviewItemId: 0,
    reviewId: 0,
    scorecardQuestionId: 0,
    uploadId: 0,
    answer: "",
    sort: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const ReviewItem = {
  encode(message: ReviewItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewItemId !== 0) {
      writer.uint32(8).int32(message.reviewItemId);
    }
    if (message.reviewId !== 0) {
      writer.uint32(16).int32(message.reviewId);
    }
    if (message.scorecardQuestionId !== 0) {
      writer.uint32(24).int32(message.scorecardQuestionId);
    }
    if (message.uploadId !== 0) {
      writer.uint32(32).int32(message.uploadId);
    }
    if (message.answer !== "") {
      writer.uint32(42).string(message.answer);
    }
    if (message.sort !== 0) {
      writer.uint32(48).int32(message.sort);
    }
    if (message.createUser !== 0) {
      writer.uint32(56).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(64).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(72).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(80).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReviewItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReviewItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reviewItemId = reader.int32();
          break;
        case 2:
          message.reviewId = reader.int32();
          break;
        case 3:
          message.scorecardQuestionId = reader.int32();
          break;
        case 4:
          message.uploadId = reader.int32();
          break;
        case 5:
          message.answer = reader.string();
          break;
        case 6:
          message.sort = reader.int32();
          break;
        case 7:
          message.createUser = reader.int32();
          break;
        case 8:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.modifyUser = reader.int32();
          break;
        case 10:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReviewItem {
    return {
      reviewItemId: isSet(object.reviewItemId) ? Number(object.reviewItemId) : 0,
      reviewId: isSet(object.reviewId) ? Number(object.reviewId) : 0,
      scorecardQuestionId: isSet(object.scorecardQuestionId) ? Number(object.scorecardQuestionId) : 0,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      answer: isSet(object.answer) ? String(object.answer) : "",
      sort: isSet(object.sort) ? Number(object.sort) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: ReviewItem): unknown {
    const obj: any = {};
    message.reviewItemId !== undefined && (obj.reviewItemId = Math.round(message.reviewItemId));
    message.reviewId !== undefined && (obj.reviewId = Math.round(message.reviewId));
    message.scorecardQuestionId !== undefined && (obj.scorecardQuestionId = Math.round(message.scorecardQuestionId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.answer !== undefined && (obj.answer = message.answer);
    message.sort !== undefined && (obj.sort = Math.round(message.sort));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<ReviewItem>, I>>(base?: I): ReviewItem {
    return ReviewItem.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ReviewItem>, I>>(object: I): ReviewItem {
    const message = createBaseReviewItem();
    message.reviewItemId = object.reviewItemId ?? 0;
    message.reviewId = object.reviewId ?? 0;
    message.scorecardQuestionId = object.scorecardQuestionId ?? 0;
    message.uploadId = object.uploadId ?? 0;
    message.answer = object.answer ?? "";
    message.sort = object.sort ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseCreateReviewItemInput(): CreateReviewItemInput {
  return {
    reviewItemId: 0,
    reviewId: 0,
    scorecardQuestionId: 0,
    uploadId: 0,
    answer: "",
    sort: 0,
    createUser: 0,
    createDate: 0,
    modifyUser: 0,
    modifyDate: 0,
  };
}

export const CreateReviewItemInput = {
  encode(message: CreateReviewItemInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reviewItemId !== 0) {
      writer.uint32(8).int32(message.reviewItemId);
    }
    if (message.reviewId !== 0) {
      writer.uint32(16).int32(message.reviewId);
    }
    if (message.scorecardQuestionId !== 0) {
      writer.uint32(24).int32(message.scorecardQuestionId);
    }
    if (message.uploadId !== 0) {
      writer.uint32(32).int32(message.uploadId);
    }
    if (message.answer !== "") {
      writer.uint32(42).string(message.answer);
    }
    if (message.sort !== 0) {
      writer.uint32(48).int32(message.sort);
    }
    if (message.createUser !== 0) {
      writer.uint32(56).int32(message.createUser);
    }
    if (message.createDate !== 0) {
      writer.uint32(64).int64(message.createDate);
    }
    if (message.modifyUser !== 0) {
      writer.uint32(72).int32(message.modifyUser);
    }
    if (message.modifyDate !== 0) {
      writer.uint32(80).int64(message.modifyDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateReviewItemInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateReviewItemInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reviewItemId = reader.int32();
          break;
        case 2:
          message.reviewId = reader.int32();
          break;
        case 3:
          message.scorecardQuestionId = reader.int32();
          break;
        case 4:
          message.uploadId = reader.int32();
          break;
        case 5:
          message.answer = reader.string();
          break;
        case 6:
          message.sort = reader.int32();
          break;
        case 7:
          message.createUser = reader.int32();
          break;
        case 8:
          message.createDate = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.modifyUser = reader.int32();
          break;
        case 10:
          message.modifyDate = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateReviewItemInput {
    return {
      reviewItemId: isSet(object.reviewItemId) ? Number(object.reviewItemId) : 0,
      reviewId: isSet(object.reviewId) ? Number(object.reviewId) : 0,
      scorecardQuestionId: isSet(object.scorecardQuestionId) ? Number(object.scorecardQuestionId) : 0,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
      answer: isSet(object.answer) ? String(object.answer) : "",
      sort: isSet(object.sort) ? Number(object.sort) : 0,
      createUser: isSet(object.createUser) ? Number(object.createUser) : 0,
      createDate: isSet(object.createDate) ? Number(object.createDate) : 0,
      modifyUser: isSet(object.modifyUser) ? Number(object.modifyUser) : 0,
      modifyDate: isSet(object.modifyDate) ? Number(object.modifyDate) : 0,
    };
  },

  toJSON(message: CreateReviewItemInput): unknown {
    const obj: any = {};
    message.reviewItemId !== undefined && (obj.reviewItemId = Math.round(message.reviewItemId));
    message.reviewId !== undefined && (obj.reviewId = Math.round(message.reviewId));
    message.scorecardQuestionId !== undefined && (obj.scorecardQuestionId = Math.round(message.scorecardQuestionId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.answer !== undefined && (obj.answer = message.answer);
    message.sort !== undefined && (obj.sort = Math.round(message.sort));
    message.createUser !== undefined && (obj.createUser = Math.round(message.createUser));
    message.createDate !== undefined && (obj.createDate = Math.round(message.createDate));
    message.modifyUser !== undefined && (obj.modifyUser = Math.round(message.modifyUser));
    message.modifyDate !== undefined && (obj.modifyDate = Math.round(message.modifyDate));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateReviewItemInput>, I>>(base?: I): CreateReviewItemInput {
    return CreateReviewItemInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateReviewItemInput>, I>>(object: I): CreateReviewItemInput {
    const message = createBaseCreateReviewItemInput();
    message.reviewItemId = object.reviewItemId ?? 0;
    message.reviewId = object.reviewId ?? 0;
    message.scorecardQuestionId = object.scorecardQuestionId ?? 0;
    message.uploadId = object.uploadId ?? 0;
    message.answer = object.answer ?? "";
    message.sort = object.sort ?? 0;
    message.createUser = object.createUser ?? 0;
    message.createDate = object.createDate ?? 0;
    message.modifyUser = object.modifyUser ?? 0;
    message.modifyDate = object.modifyDate ?? 0;
    return message;
  },
};

function createBaseSubmission(): Submission {
  return { submissionId: 0, uploadId: 0 };
}

export const Submission = {
  encode(message: Submission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.submissionId !== 0) {
      writer.uint32(8).int32(message.submissionId);
    }
    if (message.uploadId !== 0) {
      writer.uint32(16).int32(message.uploadId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Submission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubmission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submissionId = reader.int32();
          break;
        case 2:
          message.uploadId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Submission {
    return {
      submissionId: isSet(object.submissionId) ? Number(object.submissionId) : 0,
      uploadId: isSet(object.uploadId) ? Number(object.uploadId) : 0,
    };
  },

  toJSON(message: Submission): unknown {
    const obj: any = {};
    message.submissionId !== undefined && (obj.submissionId = Math.round(message.submissionId));
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    return obj;
  },

  create<I extends Exact<DeepPartial<Submission>, I>>(base?: I): Submission {
    return Submission.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Submission>, I>>(object: I): Submission {
    const message = createBaseSubmission();
    message.submissionId = object.submissionId ?? 0;
    message.uploadId = object.uploadId ?? 0;
    return message;
  },
};

function createBaseGetSubmissionInput(): GetSubmissionInput {
  return { projectId: 0, submissionStatusId: 0, uploadStatusId: 0 };
}

export const GetSubmissionInput = {
  encode(message: GetSubmissionInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== 0) {
      writer.uint32(8).int32(message.projectId);
    }
    if (message.submissionStatusId !== 0) {
      writer.uint32(16).int32(message.submissionStatusId);
    }
    if (message.uploadStatusId !== 0) {
      writer.uint32(24).int32(message.uploadStatusId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSubmissionInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSubmissionInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.int32();
          break;
        case 2:
          message.submissionStatusId = reader.int32();
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

  fromJSON(object: any): GetSubmissionInput {
    return {
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      submissionStatusId: isSet(object.submissionStatusId) ? Number(object.submissionStatusId) : 0,
      uploadStatusId: isSet(object.uploadStatusId) ? Number(object.uploadStatusId) : 0,
    };
  },

  toJSON(message: GetSubmissionInput): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.submissionStatusId !== undefined && (obj.submissionStatusId = Math.round(message.submissionStatusId));
    message.uploadStatusId !== undefined && (obj.uploadStatusId = Math.round(message.uploadStatusId));
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSubmissionInput>, I>>(base?: I): GetSubmissionInput {
    return GetSubmissionInput.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetSubmissionInput>, I>>(object: I): GetSubmissionInput {
    const message = createBaseGetSubmissionInput();
    message.projectId = object.projectId ?? 0;
    message.submissionStatusId = object.submissionStatusId ?? 0;
    message.uploadStatusId = object.uploadStatusId ?? 0;
    return message;
  },
};

function createBaseUpload(): Upload {
  return { uploadId: 0, projectId: 0, uploadStatusId: 0 };
}

export const Upload = {
  encode(message: Upload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uploadId !== 0) {
      writer.uint32(8).int32(message.uploadId);
    }
    if (message.projectId !== 0) {
      writer.uint32(16).int32(message.projectId);
    }
    if (message.uploadStatusId !== 0) {
      writer.uint32(24).int32(message.uploadStatusId);
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
          message.uploadStatusId = reader.int32();
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
      uploadStatusId: isSet(object.uploadStatusId) ? Number(object.uploadStatusId) : 0,
    };
  },

  toJSON(message: Upload): unknown {
    const obj: any = {};
    message.uploadId !== undefined && (obj.uploadId = Math.round(message.uploadId));
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.uploadStatusId !== undefined && (obj.uploadStatusId = Math.round(message.uploadStatusId));
    return obj;
  },

  create<I extends Exact<DeepPartial<Upload>, I>>(base?: I): Upload {
    return Upload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Upload>, I>>(object: I): Upload {
    const message = createBaseUpload();
    message.uploadId = object.uploadId ?? 0;
    message.projectId = object.projectId ?? 0;
    message.uploadStatusId = object.uploadStatusId ?? 0;
    return message;
  },
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
