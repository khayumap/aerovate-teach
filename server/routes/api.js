import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { Chapter } from '../models/Chapter.js';
import { Quiz } from '../models/Quiz.js';
import { Student } from '../models/Student.js';
import { Submission } from '../models/Submission.js';
import { getDBStatus } from '../db.js';
import { seedChapters, seedQuizzes, seedStudents, seedSubmissions } from '../seedData.js';

const router = express.Router();

// Memory store fallback in case MongoDB Atlas is still connecting
let memChapters = JSON.parse(JSON.stringify(seedChapters));
let memQuizzes = JSON.parse(JSON.stringify(seedQuizzes));
let memStudents = JSON.parse(JSON.stringify(seedStudents));
let memSubmissions = JSON.parse(JSON.stringify(seedSubmissions));

// Health & System Info
router.get('/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'ok',
    platform: "Teacher's Teaching Platform by Aerovate",
    teacherName: "Mrs. Jesni",
    teacherPhone: "7736419753",
    school: "YAMANIYYA ENGLISH MEDIUM SCHOOL",
    classes: ["5A", "5B"],
    subject: "Science",
    db: dbStatus,
    hasGeminiKey: Boolean(process.env.MY_GEMINI_KEY || process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Teacher Login
router.post('/auth/teacher-login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter Teacher Email and Password' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanEmail === 'teacher@aerovate.org' && cleanPass === 'jesni@teacher') {
    return res.json({
      success: true,
      role: 'teacher',
      token: 'jesni_jwt_token_' + Date.now(),
      teacher: {
        name: 'Mrs. Jesni',
        email: 'teacher@aerovate.org',
        phone: '7736419753',
        designation: 'Senior Science Teacher (Class 5A & 5B)',
        school: 'YAMANIYYA ENGLISH MEDIUM SCHOOL',
        institution: 'Aerovate Teaching Platform'
      }
    });
  }

  return res.status(401).json({
    error: 'Invalid credentials. Please enter the correct teacher email and password.'
  });
});

// Student Sign Up / Registration (Real Students of 5A & 5B)
router.post('/auth/student-register', async (req, res) => {
  const { name, rollNumber, division, avatarEmoji } = req.body;
  const roll = parseInt(rollNumber, 10);
  const cleanDivision = division === '5B' ? '5B' : '5A';

  if (!name || !name.trim() || isNaN(roll)) {
    return res.status(400).json({ error: 'Please provide full Name and Roll Number' });
  }

  const cleanName = name.trim();
  const dbStatus = getDBStatus();

  if (dbStatus.connected) {
    try {
      const existing = await Student.findOne({ rollNumber: roll, division: cleanDivision });
      if (existing) {
        return res.status(409).json({
          error: `Roll Number ${roll} is already registered in Class ${cleanDivision} (${existing.name}). Please use Sign In instead.`
        });
      }

      const newStudent = await Student.create({
        name: cleanName,
        rollNumber: roll,
        division: cleanDivision,
        school: 'YAMANIYYA ENGLISH MEDIUM SCHOOL',
        avatarEmoji: avatarEmoji || '🦁',
        stars: 10,
        badges: [{ badgeId: 'welcome', title: 'Curious Scientist', icon: '🔬', earnedAt: new Date() }],
        lastActive: new Date()
      });

      return res.status(201).json({ success: true, role: 'student', student: newStudent });
    } catch (err) {
      console.warn('DB student register error:', err.message);
    }
  }

  // Memory fallback
  const existingMem = memStudents.find(s => s.rollNumber === roll && s.division === cleanDivision);
  if (existingMem) {
    return res.status(409).json({
      error: `Roll Number ${roll} is already registered in Class ${cleanDivision} (${existingMem.name}). Please use Sign In instead.`
    });
  }

  const memStudent = {
    _id: 'std_' + Date.now(),
    name: cleanName,
    rollNumber: roll,
    division: cleanDivision,
    school: 'YAMANIYYA ENGLISH MEDIUM SCHOOL',
    avatarEmoji: avatarEmoji || '🦁',
    stars: 10,
    badges: [{ badgeId: 'welcome', title: 'Curious Scientist', icon: '🔬', earnedAt: new Date() }],
    lastActive: new Date(),
    createdAt: new Date()
  };
  memStudents.push(memStudent);

  return res.status(201).json({ success: true, role: 'student', student: memStudent });
});

// Student Sign In (By Roll Number + Division)
router.post('/auth/student-login', async (req, res) => {
  const { rollNumber, division, name } = req.body;
  const roll = parseInt(rollNumber, 10);
  const cleanDivision = division === '5B' ? '5B' : '5A';

  if (isNaN(roll)) {
    return res.status(400).json({ error: 'Please enter your Roll Number' });
  }

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      let query = { rollNumber: roll, division: cleanDivision };
      let student = await Student.findOne(query);

      if (!student && name) {
        // Fallback by name match
        student = await Student.findOne({
          name: new RegExp(`^${name.trim()}$`, 'i'),
          division: cleanDivision
        });
      }

      if (student) {
        student.lastActive = new Date();
        await student.save();
        return res.json({ success: true, role: 'student', student });
      }
    } catch (err) {
      console.warn('DB student login error:', err.message);
    }
  }

  // Memory fallback lookup
  let memStd = memStudents.find(s => s.rollNumber === roll && s.division === cleanDivision);
  if (!memStd && name) {
    memStd = memStudents.find(s => s.name.toLowerCase() === name.trim().toLowerCase() && s.division === cleanDivision);
  }

  if (memStd) {
    memStd.lastActive = new Date();
    return res.json({ success: true, role: 'student', student: memStd });
  }

  return res.status(404).json({
    error: `No registered student found with Roll No ${roll} in Class ${cleanDivision}. Please click 'New Student? Sign Up' to register first!`
  });
});

// GET Chapters (Science for Class 5A & 5B)
router.get('/chapters', async (req, res) => {
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const chapters = await Chapter.find({ subject: 'Science' }).sort({ chapterNumber: 1 });
      if (chapters.length > 0) return res.json(chapters);
    } catch (err) {
      console.warn('DB fetch chapters error:', err.message);
    }
  }
  return res.json(memChapters.filter(c => c.subject === 'Science'));
});

// GET Single Chapter
router.get('/chapters/:id', async (req, res) => {
  const { id } = req.params;
  const dbStatus = getDBStatus();

  if (dbStatus.connected) {
    try {
      const ch = await Chapter.findById(id);
      if (ch) return res.json(ch);
    } catch {}
  }

  const ch = memChapters.find(c => c._id === id || c.chapterNumber === parseInt(id, 10));
  if (ch) return res.json(ch);
  return res.status(404).json({ error: 'Chapter not found' });
});

// POST Add Chapter (Teacher only)
router.post('/chapters', async (req, res) => {
  const { title, titleMl, chapterNumber, summary, summaryMl, sections } = req.body;
  if (!title || !chapterNumber) {
    return res.status(400).json({ error: 'Title and Chapter Number are required' });
  }

  const newChapterData = {
    chapterNumber: Number(chapterNumber),
    title,
    titleMl: titleMl || title,
    subject: 'Science',
    grade: 'Class 5 (5A & 5B)',
    state: 'Kerala Syllabus · YAMANIYYA ENGLISH MEDIUM SCHOOL',
    summary: summary || 'Class 5 Science module',
    summaryMl: summaryMl || summary || 'സയൻസ് പാഠഭാഗം',
    teacherPhone: '7736419753',
    teacherName: 'Mrs. Jesni',
    estimatedReadTimeMinutes: 15,
    sections: sections || []
  };

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const saved = await Chapter.create(newChapterData);
      return res.status(201).json(saved);
    } catch (err) {
      console.warn('DB create chapter failed:', err.message);
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
      const quizzes = await Quiz.find({ subject: 'Science' });
      if (quizzes.length > 0) return res.json(quizzes);
    } catch (err) {
      console.warn('DB fetch quizzes error:', err.message);
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
    } catch {}
  }

  const q = memQuizzes.find(qz => qz._id === id || qz.chapterId === id);
  if (q) return res.json(q);
  return res.status(404).json({ error: 'Quiz not found' });
});

// POST Quiz Submission
router.post('/quizzes/:id/submit', async (req, res) => {
  const { id } = req.params;
  const { studentName, rollNumber, division, answers } = req.body;

  const roll = parseInt(rollNumber, 10);
  const cleanDivision = division === '5B' ? '5B' : '5A';

  if (!studentName || isNaN(roll) || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'studentName, rollNumber, and answers array required' });
  }

  let quiz = memQuizzes.find(q => q._id === id || q.chapterId === id);
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const found = await Quiz.findById(id);
      if (found) quiz = found;
    } catch {}
  }

  if (!quiz) quiz = memQuizzes[0];

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
    division: cleanDivision,
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
      const std = await Student.findOne({ rollNumber: roll, division: cleanDivision });
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
      console.warn('DB submission error:', err.message);
    }
  }

  // Memory fallback update
  memSubmissions.push({ _id: 'sub_' + Date.now(), ...submissionData });
  const memStd = memStudents.find(s => s.rollNumber === roll && s.division === cleanDivision);
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

// GET Students Roster (Filtered by 5A / 5B if query provided)
router.get('/students', async (req, res) => {
  const { division } = req.query;
  const filter = division ? { division: division.toString().toUpperCase() } : {};

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const students = await Student.find(filter).sort({ division: 1, rollNumber: 1 });
      return res.json(students);
    } catch (err) {
      console.warn('DB fetch students error:', err.message);
    }
  }

  let result = memStudents;
  if (division) {
    result = memStudents.filter(s => s.division === division.toString().toUpperCase());
  }
  return res.json(result.sort((a, b) => a.rollNumber - b.rollNumber));
});

// GET Submissions (Gradebook)
router.get('/submissions', async (req, res) => {
  const { division } = req.query;
  const filter = division ? { division: division.toString().toUpperCase() } : {};

  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      const subs = await Submission.find(filter).sort({ submittedAt: -1 });
      return res.json(subs);
    } catch (err) {
      console.warn('DB fetch submissions error:', err.message);
    }
  }

  let result = memSubmissions;
  if (division) {
    result = memSubmissions.filter(s => s.division === division.toString().toUpperCase());
  }
  return res.json(result.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
});

// GET Teacher Dashboard Stats
router.get('/stats', async (req, res) => {
  const dbStatus = getDBStatus();
  let chaptersCount = memChapters.filter(c => c.subject === 'Science').length;
  let quizzesCount = memQuizzes.length;
  let studentsCount = memStudents.length;
  let submissionsList = memSubmissions;

  if (dbStatus.connected) {
    try {
      chaptersCount = await Chapter.countDocuments({ subject: 'Science' });
      quizzesCount = await Quiz.countDocuments();
      studentsCount = await Student.countDocuments();
      submissionsList = await Submission.find();
    } catch (err) {
      console.warn('DB stats error:', err.message);
    }
  }

  const totalScore = submissionsList.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
  const avgScore = submissionsList.length > 0 ? Math.round(totalScore / submissionsList.length) : 0;

  // Breakdown by 5A and 5B
  const count5A = memStudents.filter(s => s.division === '5A').length;
  const count5B = memStudents.filter(s => s.division === '5B').length;

  res.json({
    totalChapters: chaptersCount,
    totalQuizzes: quizzesCount,
    totalStudents: studentsCount,
    students5A: count5A,
    students5B: count5B,
    totalSubmissions: submissionsList.length,
    averageScore: avgScore,
    teacherPhone: "7736419753",
    teacherName: "Mrs. Jesni",
    school: "YAMANIYYA ENGLISH MEDIUM SCHOOL",
    classGrade: "Class 5A & 5B Science"
  });
});

// POST Reset Curriculum
router.post('/seed/reset', async (req, res) => {
  memChapters = JSON.parse(JSON.stringify(seedChapters));
  memQuizzes = JSON.parse(JSON.stringify(seedQuizzes));
  // keep students intact or empty as requested
  const dbStatus = getDBStatus();
  if (dbStatus.connected) {
    try {
      await Chapter.deleteMany({});
      await Quiz.deleteMany({});
      await Chapter.insertMany(seedChapters);
      await Quiz.insertMany(seedQuizzes);
      return res.json({ success: true, message: 'Science syllabus reseeded successfully for Class 5A & 5B.' });
    } catch (err) {
      console.warn('DB re-seed error:', err.message);
    }
  }

  return res.json({ success: true, message: 'Science syllabus reset to defaults.' });
});

// AI Science Doubt Helper (uses MY_GEMINI_KEY or GEMINI_API_KEY)
router.post('/ai/ask-doubt', async (req, res) => {
  const { question, lang = 'en' } = req.body;
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Please enter your question.' });
  }

  const apiKey = process.env.MY_GEMINI_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_KEY' || apiKey === 'MY_GEMINI_API_KEY') {
    return res.json({
      answer: lang === 'en'
        ? `Great question about Science! Mrs. Jesni is ready to explain this directly to you. Send her a quick WhatsApp message at +91 7736419753 or ask in Class 5A/5B tomorrow!`
        : `നല്ല ചോദ്യം! ടീച്ചർ മിസ്സിസ് ജെസ്നി ഇതിന് മറുപടി നൽകും. വാട്സ്ആപ്പിൽ ചോദിക്കൂ: +91 7736419753!`
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are an encouraging, friendly, and expert elementary school Science teacher assistant for Mrs. Jesni at YAMANIYYA ENGLISH MEDIUM SCHOOL in Kerala, teaching Class 5A and Class 5B students.
A Class 5 child is asking this Science question: "${question}".
Answer in a clear, warm, kid-friendly way (around 3-4 short paragraphs or bullet points). If the student language is Malayalam ('${lang}' === 'ml'), answer in simple, warm Malayalam. Otherwise, answer in clear English with key terms explained. End with a cheerful phrase encouraging the student to explore science with Teacher Mrs. Jesni!`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || 'Keep asking questions and exploring Science with Teacher Mrs. Jesni!';
    return res.json({ answer: text });
  } catch (err) {
    console.warn('Gemini AI error:', err.message);
    return res.json({
      answer: `Mrs. Jesni recommends exploring your Class 5 textbook section or sending a direct message to her WhatsApp at +91 7736419753!`
    });
  }
});

export default router;
