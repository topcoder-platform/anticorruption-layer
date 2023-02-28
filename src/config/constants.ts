export const PhaseStatusIds = {
  Scheduled: 1,
  Open: 2,
  Closed: 3,
};

export const PhaseTypeIds = {
  Submission: 2,
  Review: 4,
  IterativeReview: 18,
  SpecificationSubmission: 13,
};

export const ProjectCategories = {
  First2Finish: 38,
};

export const ResourceRoleTypeIds = {
  Submitter: 1,
  PrimaryScreener: 2,
  Screener: 3,
  Reviewer: 4,
  Approver: 10,
  Designer: 11,
  Observer: 12,
  Manager: 13,
  Copilot: 14,
  ClientManager: 15,
  PostMortemReviewer: 16,
  SpecificationSubmitter: 17,
  SpecificationReviewer: 18,
  CheckpointScreener: 19,
  CheckpointReviewer: 20,
  IterativeReviewer: 21,
};

export const ResourceInfoTypeIds = {
  ExternalReferenceId: 1,
  Handle: 2,
  Email: 3,
  Rating: 4,
  Reliability: 5,
  RegistrationDate: 6,
  Payment: 7,
  PaymentStatus: 8,
  ScreeningScore: 9,
  InitialScore: 10,
  FinalScore: 11,
  Placement: 12,
  AppealsCompletedEarly: 13,
  SVNPermissionAdded: 14,
  ManualPayments: 15,
};

type ResourceInfoTypeIds = keyof typeof ResourceInfoTypeIds;

export const ObserverResourceInfoToAdd: ResourceInfoTypeIds[] = [
  "ExternalReferenceId",
  "Handle",
  "RegistrationDate",
  "PaymentStatus",
  "AppealsCompletedEarly",
];

export const ChallengeStatusOrders = {
  Draft: 1,
  Active: 2,
  Completed: 3,
  Deleted: 3,
  Cancelled: 3,
};

export type ChallengeStatus = keyof typeof ChallengeStatusOrders;

export const ChallengeStatusMap = {
  1: "Active",
  2: "Draft",
  3: "Deleted",
  7: "Completed",
};

export type ChallengeStatusIds = keyof typeof ChallengeStatusMap;
