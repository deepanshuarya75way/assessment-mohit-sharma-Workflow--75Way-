import JobPosting from '../models/JobPosting.model.js';
import Candidate from '../models/Candidate.model.js';
import { getMongoConnectionStatus } from '../config/database.js';
import { inMemoryJobs, inMemoryCandidates } from '../seeders/seed.js';

const resolvers = {
  Query: {
    getAllJobPostings: async () => {
      const jobs = getMongoConnectionStatus()
        ? await JobPosting.find({})
        : inMemoryJobs;

      return { data: { jobPostings: jobs } };
    },

    getAllCandidates: async () => {
      const candidates = getMongoConnectionStatus()
        ? await Candidate.find({})
        : inMemoryCandidates;

      return { data: { candidates } };
    },
  },

  Mutation: {
    updateCandidateStage: async (_, { request }) => {
      const { candidateId, status } = request;

      if (getMongoConnectionStatus()) {
        await Candidate.updateOne({ candidateId }, { status });
      } else {
        const candidate = inMemoryCandidates.find(
          (c) => c.candidateId === candidateId
        );
        if (candidate) {
          candidate.status = status;
        }
      }

      return {
        data: { candidateId },
        success: true,
        message: `Candidate status successfully updated to ${status}`,
      };
    },
  },
};

export default resolvers;
