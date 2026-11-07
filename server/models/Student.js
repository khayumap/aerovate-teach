import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: Number, required: true, unique: true },
  division: { type: String, default: '5A' },
  school: { type: String, default: 'Govt Model LP School, Kerala' },
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

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
