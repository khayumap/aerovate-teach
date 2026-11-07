import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  questionMl: { type: String, default: '' },
  options: [{ type: String, required: true }],
  optionsMl: [{ type: String }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String, default: '' },
  explanationMl: { type: String, default: '' },
  hint: { type: String, default: '' },
  points: { type: Number, default: 10 }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleMl: { type: String, default: '' },
  chapterId: { type: String, required: true },
  chapterNumber: { type: Number, default: 1 },
  subject: { type: String, required: true },
  grade: { type: String, default: 'Class 5' },
  questions: [QuestionSchema],
  totalMarks: { type: Number, default: 100 },
  passingScore: { type: Number, default: 50 },
  timeLimitMinutes: { type: Number, default: 15 },
  badgeReward: {
    title: { type: String, default: 'Rock Star Geologist' },
    icon: { type: String, default: '💎' },
    description: { type: String, default: 'Mastered Rocks & Minerals in Class 5 Science' }
  }
}, {
  timestamps: true
});

export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
