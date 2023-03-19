export const PhaseStatusIds = {
  Scheduled: 1,
  Open: 2,
  Closed: 3,
};

export const PhaseTypeIds = {
  Registration: 1,
  Submission: 2,
  Review: 4,
  CheckpointSubmission: 15,
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

export const ChallengeStatusMap = {
  1: "Active",
  2: "Draft",
  3: "Deleted",
  4: "Cancelled - Failed Review",
  5: "Cancelled - Failed Screening",
  6: "Cancelled - Zero Submissions",
  7: "Completed",
  8: "Cancelled - Winner Unresponsive",
  9: "Cancelled - Client Request",
  10: "Cancelled - Requirements Infeasible",
  11: "Cancelled - Zero Registrations",
};

export type ChallengeStatusIds = keyof typeof ChallengeStatusMap;

export const PHASE_NAME_MAPPINGS = [
  {
    name: "Registration",
    phaseId: "a93544bc-c165-4af4-b55e-18f3593b457a",
  },
  {
    name: "Submission",
    phaseId: "6950164f-3c5e-4bdc-abc8-22aaf5a1bd49",
  },
  {
    name: "Screening",
    phaseId: "2d7d3d85-0b29-4989-b3b4-be7f2b1d0aa6",
  },
  {
    name: "Review",
    phaseId: "aa5a3f78-79e0-4bf7-93ff-b11e8f5b398b",
  },
  {
    name: "Appeals",
    phaseId: "1c24cfb3-5b0a-4dbd-b6bd-4b0dff5349c6",
  },
  {
    name: "Appeals Response",
    phaseId: "797a6af7-cd3f-4436-9fca-9679f773bee9",
  },
  {
    name: "Aggregation",
    phaseId: "2691ed2b-8574-4f16-929a-35ac94e1c3ee",
  },
  {
    name: "Aggregation Review",
    phaseId: "a290be40-02eb-48df-822b-71971c00403f",
  },
  {
    name: "Final Fix",
    phaseId: "3e2afca6-9542-4763-a135-96b33f12c082",
  },
  {
    name: "Final Review",
    phaseId: "f3acaf26-1dd5-42ae-9f0d-8eb0fd24ae59",
  },
  {
    name: "Approval",
    phaseId: "ad985cff-ad3e-44de-b54e-3992505ba0ae",
  },
  {
    name: "Post-Mortem",
    phaseId: "f308bdb4-d3da-43d8-942b-134dfbaf5c45",
  },
  {
    name: "Specification Submission",
    phaseId: "fb21431c-119e-4bc7-b447-d0af3f2be6b4",
  },
  {
    name: "Specification Review",
    phaseId: "2752454b-0952-4a42-a4f0-f3fb88a9b065",
  },
  {
    name: "Checkpoint Submission",
    phaseId: "d8a2cdbe-84d1-4687-ab75-78a6a7efdcc8",
  },
  {
    name: "Checkpoint Screening",
    phaseId: "ce1afb4c-74f9-496b-9e4b-087ae73ab032",
  },
  {
    name: "Checkpoint Review",
    phaseId: "84b43897-2aab-44d6-a95a-42c433657eed",
  },
  {
    name: "Iterative Review",
    phaseId: "003a4b14-de5d-43fc-9e35-835dbeb6af1f",
  },
];

export const IFX_TIMEZONE = "America/New_York";

export const dateFormatIfx = "YYYY-MM-DD HH:mm:ss";

export const TCWEBSERVICE = 22838965;
