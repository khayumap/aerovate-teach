export type Language = 'en' | 'ml';

export interface KeyTerm {
  term: string;
  termMl: string;
  meaning: string;
  meaningMl: string;
}

export interface LessonItem {
  name: string;
  nameMl: string;
  type: string;
  description: string;
  descriptionMl: string;
  example?: string;
  use: string;
  useMl: string;
  color?: string;
  icon?: string;
}

export interface Section {
  title: string;
  titleMl: string;
  content: string;
  contentMl: string;
  bulletPoints?: string[];
  bulletPointsMl?: string[];
  keyTerms?: KeyTerm[];
  interactiveType?: 'none' | 'classifier' | 'rock-detective' | 'use-matcher' | 'debate';
  items?: LessonItem[];
}

export interface Chapter {
  _id?: string;
  chapterNumber: number;
  title: string;
  titleMl: string;
  subject: 'Science' | 'EVS' | 'Maths' | 'English' | 'Malayalam';
  grade: string;
  state: string;
  summary: string;
  summaryMl: string;
  sections: Section[];
  teacherPhone: string;
  teacherName: string;
  estimatedReadTimeMinutes: number;
}

export interface Question {
  question: string;
  questionMl: string;
  options: string[];
  optionsMl: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationMl: string;
  hint?: string;
}

export interface Badge {
  badgeId: string;
  title: string;
  icon: string;
  earnedAt?: string | Date;
}

export interface Quiz {
  _id?: string;
  title: string;
  titleMl: string;
  chapterId: string;
  chapterNumber: number;
  subject: string;
  grade: string;
  questions: Question[];
  totalMarks: number;
  passingScore: number;
  timeLimitMinutes: number;
  badgeReward: {
    title: string;
    icon: string;
    description: string;
  };
}

export interface Student {
  _id?: string;
  name: string;
  rollNumber: number;
  division?: string;
  school?: string;
  avatarEmoji?: string;
  stars?: number;
  badges?: Badge[];
}

export interface TeacherProfile {
  name: string;
  email: string;
  phone: string;
  designation: string;
  school: string;
  institution: string;
}

export interface Submission {
  _id?: string;
  quizId: string;
  quizTitle: string;
  studentName: string;
  rollNumber: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}

export interface DashboardStats {
  totalChapters: number;
  totalQuizzes: number;
  totalStudents: number;
  totalSubmissions: number;
  averageScore: number;
  teacherPhone: string;
  teacherName: string;
  school: string;
  classGrade: string;
}
