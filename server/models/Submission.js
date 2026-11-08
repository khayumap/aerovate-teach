import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  quizTitle: { type: String, required: true },
  studentName: { type: String, required: true },
  rollNumber: { type: Number, required: true },
  division: { type: String, enum: ['5A', '5B'], default: '5A' },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  answers: [{
    questionIndex: Number,
    selectedOption: Number,
    correctOption: Number,
    isCorrect: Boolean
  }],
  submittedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
