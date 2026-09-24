import mongoose from 'mongoose';

const JobPostingSchema = new mongoose.Schema(
  {
    jobPostingId: { type: String, required: true, unique: true },
    title:              { type: String, required: true },
    department:         { type: String, required: true },
    location:           { type: String, required: true },
    jobType:            { type: String, required: true },
    experienceRequired: { type: String, required: true },
    salaryRange:        { type: String, required: true },
    status:             { type: String, required: true, default: 'Active' },
    description:        { type: String, required: true },
    totalCandidates:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

const JobPosting = mongoose.model('JobPosting', JobPostingSchema);

export default JobPosting;
