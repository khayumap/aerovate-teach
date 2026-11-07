import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleMl: { type: String, default: '' },
  content: { type: String, required: true },
  contentMl: { type: String, default: '' },
  bulletPoints: [{ type: String }],
  bulletPointsMl: [{ type: String }],
  keyTerms: [{
    term: String,
    termMl: String,
    meaning: String,
    meaningMl: String,
  }],
  category: { type: String, default: 'General' },
  interactiveType: { type: String, enum: ['none', 'classifier', 'rock-detective', 'use-matcher', 'debate'], default: 'none' },
  items: [{
    name: String,
    nameMl: String,
    type: String,
    description: String,
    descriptionMl: String,
    example: String,
    use: String,
    useMl: String,
    color: String,
    icon: String,
  }]
});

const ChapterSchema = new mongoose.Schema({
  chapterNumber: { type: Number, required: true },
  title: { type: String, required: true },
  titleMl: { type: String, required: true },
  subject: {
    type: String,
    required: true,
    enum: ['Science', 'EVS', 'Maths', 'English', 'Malayalam']
  },
  grade: { type: String, default: 'Class 5' },
  state: { type: String, default: 'Kerala State Board' },
  summary: { type: String, required: true },
  summaryMl: { type: String, required: true },
  sections: [SectionSchema],
  audioSummaryUrl: { type: String, default: '' },
  teacherPhone: { type: String, default: '7736419753' },
  teacherName: { type: String, default: 'Mrs. Anitha Kumar' },
  estimatedReadTimeMinutes: { type: Number, default: 15 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
