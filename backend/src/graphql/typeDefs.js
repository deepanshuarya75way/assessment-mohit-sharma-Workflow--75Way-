const typeDefs = `#graphql
  type JobPosting {
    jobPostingId: ID!
    title: String!
    department: String!
    location: String!
    jobType: String!
    experienceRequired: String!
    salaryRange: String!
    status: String!
    description: String!
    totalCandidates: Int
  }

  type Candidate {
    candidateId: ID!
    fullName: String!
    appliedRole: String!
    status: String!
    rating: Int!
    skills: String!
    experienceYears: String!
    expectedSalary: String!
    noticePeriod: String!
    notes: String!
  }

  type JobPostingsData {
    jobPostings: [JobPosting!]!
  }

  type CandidatesData {
    candidates: [Candidate!]!
  }

  type GetAllJobPostingsResponse {
    data: JobPostingsData!
  }

  type GetAllCandidatesResponse {
    data: CandidatesData!
  }

  type UpdateCandidateStageData {
    candidateId: ID!
  }

  type UpdateCandidateStageResponse {
    data: UpdateCandidateStageData
    success: Boolean!
    message: String
  }

  input UpdateCandidateStageRequestInput {
    candidateId: ID!
    status: String!
  }

  input GetAllJobPostingsRequestInput {
    dummy: String
  }

  input GetAllCandidatesRequestInput {
    dummy: String
  }

  type Query {
    getAllJobPostings(request: GetAllJobPostingsRequestInput): GetAllJobPostingsResponse!
    getAllCandidates(request: GetAllCandidatesRequestInput): GetAllCandidatesResponse!
  }

  type Mutation {
    updateCandidateStage(request: UpdateCandidateStageRequestInput!): UpdateCandidateStageResponse!
  }
`;

export default typeDefs;
