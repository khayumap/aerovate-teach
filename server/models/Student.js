import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: Number, required: true },
  division: { type: String, required: true, enum: ['5A', '5B'], default: '5A' },
  school: { type: String, default: 'YAMANIYYA ENGLISH MEDIUM SCHOOL' },
  avatarEmoji: { type: String, default: '🦁' },
  stars: { type: Number, default: 0 },
  badges: [{
    badgeId: String,
    title: String,
    icon: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  lastActive: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Ensure roll number is unique within each division (5A and 5B)
StudentSchema.index({ rollNumber: 1, division: 1 }, { unique: true });

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
