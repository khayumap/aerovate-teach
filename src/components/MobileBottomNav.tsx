import React from 'react';
import { BookOpen, Sparkles, Award, UserCheck, School } from 'lucide-react';
import { Language, Student, TeacherProfile } from '../types';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  currentUser: { role: 'guest' | 'student' | 'teacher'; student?: Student; teacher?: TeacherProfile };
  onOpenTeacherLogin: () => void;
  onOpenStudentLogin: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  currentUser,
  onOpenTeacherLogin,
  onOpenStudentLogin
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pt-1 pb-[env(safe-area-inset-bottom)] shadow-2xl">
      <div className="grid grid-cols-4 items-center justify-around">
        
        {/* Tab 1: Lessons */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === 'home' || currentTab === 'chapter'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'home' || currentTab === 'chapter' ? 'bg-blue-50' : ''}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {lang === 'en' ? 'Lessons' : 'പാഠങ്ങൾ'}
          </span>
        </button>

        {/* Tab 2: Rock Lab */}
        <button
          onClick={() => setCurrentTab('rock-lab')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === 'rock-lab'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'rock-lab' ? 'bg-blue-50' : ''}`}>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {lang === 'en' ? 'Rock Lab' : 'റോക്ക് ലാബ്'}
          </span>
        </button>

        {/* Tab 3: Quizzes */}
        <button
          onClick={() => setCurrentTab('quizzes')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === 'quizzes'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'quizzes' ? 'bg-blue-50' : ''}`}>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {lang === 'en' ? 'Quizzes' : 'ക്വിസ്'}
          </span>
        </button>

        {/* Tab 4: Teacher / Login */}
        <button
          onClick={() => {
            if (currentUser.role === 'teacher') {
              setCurrentTab('teacher-dashboard');
            } else if (currentUser.role === 'student') {
              setCurrentTab('home');
            } else {
              onOpenTeacherLogin();
            }
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === 'teacher-dashboard'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'teacher-dashboard' ? 'bg-blue-50' : ''}`}>
            {currentUser.role === 'teacher' ? (
              <UserCheck className="w-5 h-5 text-blue-600" />
            ) : (
              <School className="w-5 h-5 text-slate-500" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            {currentUser.role === 'teacher'
              ? (lang === 'en' ? 'Dashboard' : 'ഡാഷ്‌ബോർഡ്')
              : (lang === 'en' ? 'Teacher' : 'ടീച്ചർ')}
          </span>
        </button>

      </div>
    </nav>
  );
};
