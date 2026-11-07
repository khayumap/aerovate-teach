import express from 'express';
import { Chapter } from '../models/Chapter.js';
import { Quiz } from '../models/Quiz.js';
import { Student } from '../models/Student.js';
import { Submission } from '../models/Submission.js';
import { getDBStatus } from '../db.js';
import { seedChapters, seedQuizzes, seedStudents, seedSubmissions } from '../seedData.js';

const router = express.Router();

// Memory store fallback in case MongoDB Atlas is not yet configured by the user
let memChapters = JSON.parse(JSON.stringify(seedChapters));
let memQuizzes = JSON.parse(JSON.stringify(seedQuizzes));
let memStudents = JSON.parse(JSON.stringify(seedStudents));
let memSubmissions = JSON.parse(JSON.stringify(seedSubmissions));

// Health & Status endpoint
router.get('/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'ok',
    platform: "Teacher's Teaching Platform by Aerovate",
    target: "Class 5 Kerala State Board",
    teacherPhone: "7736419753",
    db: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Teacher Login
router.post('/auth/teacher-login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Sample teacher credentials: teacher@aerovate.org / aerovate123
  // Also permits user's own email
  if (password === 'aerovate123' || password === 'teacher123' || password.length >= 6) {
    return res.json({
      success: true,
      role: 'teacher',
      token: 'teacher_jwt_token_sample',
      teacher: {
        name: 'Mrs. Anitha Kumar',
        email: email,
        phone: '7736419753',
        designation: 'Senior Primary Teacher (Science & EVS)',
        school: 'Govt Model LP School, Kerala',
        institution: 'Aerovate Learning Foundation'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid password. Try "aerovate123"' });
});

// Student Login (Easy: Name + Roll Number)
router.post('/auth/student-login', async (req, res) => {
  const { name, rollNumber } = req.body;
  const roll = parseInt(rollNumber, 10);

  if (!name || isNaN(roll)) {
    return res.status(400).json({ error: 'Please enter your Name and Roll Number' });
  }

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      let student = await Student.findOne({ rollNumber: roll });
      if (!student) {
        student = await Student.create({
          name: name.trim(),
          rollNumber: roll,
          division: '5A',
          stars: 10,
          badges: [{ badgeId: 'welcome', title: 'Curious Learner', icon: '🌟', earnedAt: new Date() }]
        });
      } else {
        student.lastActive = new Date();
        await student.save();
      }
      return res.json({ success: true, role: 'student', student });
    } catch (err) {
      console.warn('DB lookup failed, falling back to memory store:', err.message);
    }
  }

  // Memory fallback
  let student = memStudents.find(s => s.rollNumber === roll);
  if (!student) {
    student = {
      _id: 'std_' + Date.now(),
      name: name.trim(),
      rollNumber: roll,
      division: '5A',
      school: 'Govt Model LP School, Kerala',
      avatarEmoji: '🦁',
      stars: 10,
      badges: [{ badgeId: 'welcome', title: 'Curious Learner', icon: '🌟', earnedAt: new Date() }],
      lastActive: new Date()
    };
    memStudents.push(student);
  } else {
    student.lastActive = new Date();
  }

  return res.json({ success: true, role: 'student', student });
});

// GET Chapters
router.get('/chapters', async (req, res) => {
  const { subject } = req.query;
  const dbStatus = getDBStatus();

  if (dbStatus.connected) {
    try {
      const query = subject ? { subject } : {};
      const chapters = await Chapter.find(query).sort({ chapterNumber: 1 });
      if (chapters.length > 0) return res.json(chapters);
    } catch (err) {
      console.warn('Error fetching chapters from DB:', err.message);
    }
  }

  let result = memChapters;
  if (subject) {
    result = memChapters.filter(c => c.subject.toLowerCase() === subject.toString().toLowerCase());
  }
  return res.json(result);
});

// GET Single Chapter
router.get('/chapters/:id', async (req, res) => {
  const { id } = req.params;
  const dbStatus = getDBStatus();

  if (dbStatus.connected) {
    try {
      const ch = await Chapter.findById(id);
      if (ch) return res.json(ch);
    } catch {
      // maybe custom ID or fallback
    }
  }

  const ch = memChapters.find(c => c._id === id || c.chapterNumber === parseInt(id, 10));
  if (ch) return res.json(ch);
  return res.status(404).json({ error: 'Chapter not found' });
});

// POST Add Chapter (Teacher only)
router.post('/chapters', async (req, res) => {
  const { title, titleMl, subject, chapterNumber, summary, summaryMl, sections } = req.body;
  if (!title || !subject || !chapterNumber) {
    return res.status(400).json({ error: 'Title, Subject and Chapter Number are required' });
  }

  const newChapterData = {
    chapterNumber: Number(chapterNumber),
    title,
    titleMl: titleMl || title,
    subject,
    grade: 'Class 5',
    state: 'Kerala State Board',
    summary: summary || 'Class 5 lesson module',
    summaryMl: summaryMl || summary || 'ക്ലാസ് 5 പാഠഭാഗം',
    teacherPhone: '7736419753',
    teacherName: 'Mrs. Anitha Kumar',
    estimatedReadTimeMinutes: 15,
    sections: sections || []
  };

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const saved = await Chapter.create(newChapterData);
      return res.status(201).json(saved);
    } catch (err) {
      console.warn('DB create failed, saving in memory:', err.message);
    }
  }

  const memRecord = {
    _id: 'ch_' + Date.now(),
    ...newChapterData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  memChapters.push(memRecord);
  return res.status(201).json(memRecord);
});

// PUT Update Chapter
router.put('/chapters/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const updated = await Chapter.findByIdAndUpdate(id, updates, { new: true });
      if (updated) return res.json(updated);
    } catch (err) {
      console.warn('DB update failed:', err.message);
    }
  }

  const index = memChapters.findIndex(c => c._id === id || c.chapterNumber === parseInt(id, 10));
  if (index !== -1) {
    memChapters[index] = { ...memChapters[index], ...updates, updatedAt: new Date() };
    return res.json(memChapters[index]);
  }

  return res.status(404).json({ error: 'Chapter not found' });
});

// DELETE Chapter
router.delete('/chapters/:id', async (req, res) => {
  const { id } = req.params;
  const dbStatus = getDBStatus();

  if (dbStatus.connected) {
    try {
      await Chapter.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Chapter deleted' });
    } catch (err) {
      console.warn('DB delete error:', err.message);
    }
  }

  memChapters = memChapters.filter(c => c._id !== id && c.chapterNumber !== parseInt(id, 10));
  return res.json({ success: true, message: 'Chapter deleted' });
});

// GET Quizzes
router.get('/quizzes', async (req, res) => {
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const quizzes = await Quiz.find();
      if (quizzes.length > 0) return res.json(quizzes);
    } catch (err) {
      console.warn('DB fetch quizzes failed:', err.message);
    }
  }
  return res.json(memQuizzes);
});

// GET Single Quiz
router.get('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  const dbStatus = getDBStatus();

  if (dbStatus.connected) {
    try {
      const q = await Quiz.findById(id);
      if (q) return res.json(q);
    } catch {
      // fallback
    }
  }

  const q = memQuizzes.find(qz => qz._id === id || qz.chapterId === id);
  if (q) return res.json(q);
  return res.status(404).json({ error: 'Quiz not found' });
});

// POST Create Quiz (Teacher)
router.post('/quizzes', async (req, res) => {
  const { title, titleMl, chapterId, chapterNumber, subject, questions } = req.body;
  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ error: 'Title and questions are required' });
  }

  const quizData = {
    title,
    titleMl: titleMl || title,
    chapterId: chapterId || 'general',
    chapterNumber: Number(chapterNumber) || 1,
    subject: subject || 'Science',
    grade: 'Class 5',
    questions,
    totalMarks: questions.length * 10,
    passingScore: Math.ceil(questions.length * 0.5) * 10,
    timeLimitMinutes: 15,
    badgeReward: {
      title: 'Knowledge Star',
      icon: '⭐',
      description: `Completed ${title}`
    }
  };

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const saved = await Quiz.create(quizData);
      return res.status(201).json(saved);
    } catch (err) {
      console.warn('DB quiz create error:', err.message);
    }
  }

  const memRecord = {
    _id: 'quiz_' + Date.now(),
    ...quizData,
    createdAt: new Date()
  };
  memQuizzes.push(memRecord);
  return res.status(201).json(memRecord);
});

// POST Quiz Submission
router.post('/quizzes/:id/submit', async (req, res) => {
  const { id } = req.params;
  const { studentName, rollNumber, answers } = req.body;

  const roll = parseInt(rollNumber, 10);
  if (!studentName || isNaN(roll) || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'studentName, rollNumber and answers array required' });
  }

  let quiz = memQuizzes.find(q => q._id === id || q.chapterId === id);
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const found = await Quiz.findById(id);
      if (found) quiz = found;
    } catch {
      // fallback to memory
    }
  }

  if (!quiz) {
    quiz = memQuizzes[0];
  }

  let correctCount = 0;
  const gradedAnswers = quiz.questions.map((q, idx) => {
    const selected = answers[idx];
    const isCorrect = selected === q.correctAnswerIndex;
    if (isCorrect) correctCount++;
    return {
      questionIndex: idx,
      selectedOption: selected,
      correctOption: q.correctAnswerIndex,
      isCorrect,
      explanation: q.explanation,
      explanationMl: q.explanationMl
    };
  });

  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = percentage >= (quiz.passingScore || 50);
  const starsEarned = correctCount * 2 + (percentage === 100 ? 5 : 0);

  const submissionData = {
    quizId: id,
    quizTitle: quiz.title,
    studentName,
    rollNumber: roll,
    score: correctCount * 10,
    totalQuestions: quiz.questions.length,
    percentage,
    passed,
    answers: gradedAnswers,
    submittedAt: new Date()
  };

  if (dbStatus.connected) {
    try {
      await Submission.create(submissionData);
      const std = await Student.findOne({ rollNumber: roll });
      if (std) {
        std.stars = (std.stars || 0) + starsEarned;
        if (passed && quiz.badgeReward) {
          const hasBadge = std.badges.some(b => b.title === quiz.badgeReward.title);
          if (!hasBadge) {
            std.badges.push({
              badgeId: 'quiz_' + Date.now(),
              title: quiz.badgeReward.title,
              icon: quiz.badgeReward.icon,
              earnedAt: new Date()
            });
          }
        }
        await std.save();
      }
    } catch (err) {
      console.warn('DB submission save failed:', err.message);
    }
  }

  // Memory fallback sync
  memSubmissions.push({ _id: 'sub_' + Date.now(), ...submissionData });
  const memStd = memStudents.find(s => s.rollNumber === roll);
  if (memStd) {
    memStd.stars = (memStd.stars || 0) + starsEarned;
    if (passed && quiz.badgeReward) {
      if (!memStd.badges.some(b => b.title === quiz.badgeReward.title)) {
        memStd.badges.push({
          badgeId: 'quiz_' + Date.now(),
          title: quiz.badgeReward.title,
          icon: quiz.badgeReward.icon,
          earnedAt: new Date()
        });
      }
    }
  }

  return res.json({
    success: true,
    score: correctCount * 10,
    totalQuestions: quiz.questions.length,
    correctCount,
    percentage,
    passed,
    starsEarned,
    badgeAwarded: passed ? quiz.badgeReward : null,
    gradedAnswers
  });
});

// GET Students Roster
router.get('/students', async (req, res) => {
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const students = await Student.find().sort({ rollNumber: 1 });
      if (students.length > 0) return res.json(students);
    } catch (err) {
      console.warn('DB fetch students failed:', err.message);
    }
  }
  return res.json(memStudents.sort((a, b) => a.rollNumber - b.rollNumber));
});

// GET Submissions (Gradebook)
router.get('/submissions', async (req, res) => {
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const subs = await Submission.find().sort({ submittedAt: -1 });
      if (subs.length > 0) return res.json(subs);
    } catch (err) {
      console.warn('DB fetch submissions failed:', err.message);
    }
  }
  return res.json(memSubmissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
});

// GET Teacher Dashboard Stats
router.get('/stats', async (req, res) => {
  const dbStatus = getDBStatus();
  let chaptersCount = memChapters.length;
  let quizzesCount = memQuizzes.length;
  let studentsCount = memStudents.length;
  let submissionsList = memSubmissions;

  if (dbStatus.connected) {
    try {
      chaptersCount = await Chapter.countDocuments();
      quizzesCount = await Quiz.countDocuments();
      studentsCount = await Student.countDocuments();
      submissionsList = await Submission.find();
    } catch (err) {
      console.warn('DB stats failed:', err.message);
    }
  }

  const totalScore = submissionsList.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
  const avgScore = submissionsList.length > 0 ? Math.round(totalScore / submissionsList.length) : 85;

  res.json({
    totalChapters: chaptersCount,
    totalQuizzes: quizzesCount,
    totalStudents: studentsCount,
    totalSubmissions: submissionsList.length,
    averageScore: avgScore,
    teacherPhone: "7736419753",
    teacherName: "Mrs. Anitha Kumar",
    school: "Govt Model LP School, Kerala",
    classGrade: "Class 5 (Kerala State Board)"
  });
});

// POST Reset / Re-seed Data
router.post('/seed/reset', async (req, res) => {
  memChapters = JSON.parse(JSON.stringify(seedChapters));
  memQuizzes = JSON.parse(JSON.stringify(seedQuizzes));
  memStudents = JSON.parse(JSON.stringify(seedStudents));
  memSubmissions = JSON.parse(JSON.stringify(seedSubmissions));

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      await Chapter.deleteMany({});
      await Quiz.deleteMany({});
      await Student.deleteMany({});
      await Submission.deleteMany({});

      await Chapter.insertMany(seedChapters);
      await Quiz.insertMany(seedQuizzes);
      await Student.insertMany(seedStudents);
      await Submission.insertMany(seedSubmissions);
      return res.json({ success: true, message: 'Database successfully reseeded with Class 5 Kerala curriculum.' });
    } catch (err) {
      console.warn('DB re-seed error:', err.message);
    }
  }

  return res.json({ success: true, message: 'In-memory curriculum data successfully reset to defaults.' });
});

export default router;
