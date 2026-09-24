import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema(
  {
    candidateId:    { type: String, required: true, unique: true },
    fullName:       { type: String, required: true },
    appliedRole:    { type: String, required: true },
    status:         { type: String, required: true, default: 'New' },
    rating:         { type: Number, required: true, min: 1, max: 5 },
    skills:         { type: String, required: true },
    experienceYears:{ type: String, required: true },
    expectedSalary: { type: String, required: true },
    noticePeriod:   { type: String, required: true },
    notes:          { type: String, default: '' },
  },
  { timestamps: true }
);

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;
