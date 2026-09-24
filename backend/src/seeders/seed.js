import JobPosting from '../models/JobPosting.model.js';
import Candidate from '../models/Candidate.model.js';

// In-memory fallback data (used when MongoDB is not available)

export const inMemoryJobs = [
  {
    jobPostingId: '1',
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Bangalore',
    jobType: 'Full Time',
    experienceRequired: '4-6 years',
    salaryRange: '18-25 LPA',
    status: 'Active',
    description:
      'We are looking for a Senior React Developer who has strong experience in building rich user interfaces with React, Redux, and modern CSS frameworks.',
    totalCandidates: 2,
  },
  {
    jobPostingId: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    jobType: 'Full Time',
    experienceRequired: '5-8 years',
    salaryRange: '20-30 LPA',
    status: 'Active',
    description:
      'Looking for an experienced Product Manager to lead team strategy, sprint planning, and drive features from concept to production.',
    totalCandidates: 1,
  },
  {
    jobPostingId: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'Mumbai',
    jobType: 'Full Time',
    experienceRequired: '2-4 years',
    salaryRange: '10-15 LPA',
    status: 'Active',
    description:
      'Join our design team to craft beautiful user experiences, build responsive prototypes, and collaborate with frontend engineers.',
    totalCandidates: 0,
  },
];

export const inMemoryCandidates = [
  {
    candidateId: '1',
    fullName: 'Arjun Mehta',
    appliedRole: 'Senior React Developer',
    status: 'Shortlisted',
    rating: 4,
    skills: 'React, TypeScript, Node.js',
    experienceYears: '5 years',
    expectedSalary: '22 LPA',
    noticePeriod: '30 days',
    notes: 'Good communication skills, strong frontend knowledge.',
  },
  {
    candidateId: '2',
    fullName: 'Deepika Nair',
    appliedRole: 'Senior React Developer',
    status: 'Interview Scheduled',
    rating: 5,
    skills: 'React, Redux, GraphQL',
    experienceYears: '6 years',
    expectedSalary: '24 LPA',
    noticePeriod: '60 days',
    notes: 'Excellent architectural understanding, very strong coding test performance.',
  },
  {
    candidateId: '3',
    fullName: 'Rohan Das',
    appliedRole: 'Product Manager',
    status: 'New',
    rating: 3,
    skills: 'Product Management, Agile, Jira',
    experienceYears: '4 years',
    expectedSalary: '18 LPA',
    noticePeriod: '15 days',
    notes: 'Eager to learn, experience in agile frameworks.',
  },
];

// Seed empty collections with initial data
export async function seedDatabase() {
  try {
    const jobsCount = await JobPosting.countDocuments();
    if (jobsCount === 0) {
      await JobPosting.insertMany(inMemoryJobs);
      console.log('[seed] Inserted initial job postings');
    }

    const candidatesCount = await Candidate.countDocuments();
    if (candidatesCount === 0) {
      await Candidate.insertMany(inMemoryCandidates);
      console.log('[seed] Inserted initial candidates');
    }
  } catch (error) {
    console.error('[seed] Failed:', error.message);
  }
}
