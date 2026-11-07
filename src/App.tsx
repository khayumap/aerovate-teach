import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentHome } from './pages/StudentHome';
import { ChapterView } from './pages/ChapterView';
import { QuizView } from './pages/QuizView';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { RockLabView } from './pages/RockLabView';
import { WhatsAppTeacherModal } from './components/WhatsAppTeacherModal';
import { AuthModals } from './components/AuthModals';
import { Language, Student, TeacherProfile } from './types';
import { Phone, MessageSquare, BookOpen, Sparkles, School } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedChapterId, setSelectedChapterId] = useState<string | number>(1);
  const [activeQuizId, setActiveQuizId] = useState<string>('rocks-minerals-ch1');

  // Auth State
  const [currentUser, setCurrentUser] = useState<{
    role: 'guest' | 'student' | 'teacher';
    student?: Student;
    teacher?: TeacherProfile;
  }>({
    role: 'student',
    student: {
      name: 'Aadhya Menon',
      rollNumber: 1,
      division: '5A',
      stars: 35,
      badges: [{ badgeId: 'geo-explorer', title: 'Rock Detective', icon: '🔍', earnedAt: new Date() }]
    }
  });

  // Modals
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const handleSelectChapter = (chapterId: string | number) => {
    setSelectedChapterId(chapterId);
    setCurrentTab('chapter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser({ role: 'guest' });
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Poppins','Noto_Sans_Malayalam',sans-serif]">
      {/* Primary Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenTeacherLogin={() => setShowTeacherLogin(true)}
        onOpenStudentLogin={() => setShowStudentLogin(true)}
        onOpenWhatsApp={() => setShowWhatsAppModal(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <StudentHome
            lang={lang}
            currentStudent={currentUser.student}
            onSelectChapter={handleSelectChapter}
            onOpenQuiz={handleOpenQuiz}
            onOpenRockLab={() => setCurrentTab('rock-lab')}
            onOpenWhatsApp={() => setShowWhatsAppModal(true)}
            onOpenStudentLogin={() => setShowStudentLogin(true)}
          />
        )}

        {currentTab === 'chapter' && (
          <ChapterView
            chapterId={selectedChapterId}
            lang={lang}
            currentStudent={currentUser.student}
            onOpenQuiz={handleOpenQuiz}
            onOpenWhatsApp={() => setShowWhatsAppModal(true)}
            onBackToChapters={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'rock-lab' && (
          <RockLabView
            lang={lang}
            currentStudent={currentUser.student}
            onOpenWhatsApp={() => setShowWhatsAppModal(true)}
            onOpenQuiz={handleOpenQuiz}
            onBackToHome={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'quizzes' && (
          <QuizView
            quizId={activeQuizId}
            lang={lang}
            currentStudent={currentUser.student}
            onOpenWhatsApp={() => setShowWhatsAppModal(true)}
            onBackToLessons={() => setCurrentTab('home')}
            onStarsUpdated={(newStars) => {
              if (currentUser.student) {
                setCurrentUser({
                  ...currentUser,
                  student: { ...currentUser.student, stars: newStars }
                });
              }
            }}
          />
        )}

        {currentTab === 'teacher-dashboard' && (
          <TeacherDashboard
            lang={lang}
            teacher={currentUser.teacher}
            onOpenWhatsApp={() => setShowWhatsAppModal(true)}
            onSelectChapter={handleSelectChapter}
          />
        )}
      </main>

      {/* Floating Teacher WhatsApp Help Button */}
      <button
        onClick={() => setShowWhatsAppModal(true)}
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-3 shadow-2xl flex items-center gap-2 font-bold text-xs transition-all hover:scale-105 active:scale-95 border-2 border-white"
        title="Ask Teacher Mrs. Anitha Kumar on WhatsApp (7736419753)"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span className="hidden sm:inline">Ask Teacher: 7736419753</span>
      </button>

      {/* Modals */}
      <WhatsAppTeacherModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        lang={lang}
        currentStudent={currentUser.student}
      />

      <AuthModals
        showTeacherModal={showTeacherLogin}
        showStudentModal={showStudentLogin}
        onCloseTeacherModal={() => setShowTeacherLogin(false)}
        onCloseStudentModal={() => setShowStudentLogin(false)}
        lang={lang}
        onTeacherLoginSuccess={(teacher) => {
          setCurrentUser({ role: 'teacher', teacher });
          setCurrentTab('teacher-dashboard');
        }}
        onStudentLoginSuccess={(student) => {
          setCurrentUser({ role: 'student', student });
        }}
      />

      {/* Minimal, Professional School Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-700">
                Teacher's Teaching Platform by Aerovate
              </span>
              <span>·</span>
              <span>For Class 5 Teacher in Kerala</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>Helpline: +91 7736419753</span>
              </span>
              <span>·</span>
              <span>Teacher: Mrs. Anitha Kumar</span>
              <span>·</span>
              <span>MERN Stack (MongoDB Atlas Ready)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
