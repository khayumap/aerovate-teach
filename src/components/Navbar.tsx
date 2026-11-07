import React from 'react';
import { BookOpen, Award, Phone, LogOut, UserCheck, Languages, School, Sparkles } from 'lucide-react';
import { Language, Student, TeacherProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  currentUser: { role: 'guest' | 'student' | 'teacher'; student?: Student; teacher?: TeacherProfile };
  onLogout: () => void;
  onOpenTeacherLogin: () => void;
  onOpenStudentLogin: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  currentUser,
  onLogout,
  onOpenTeacherLogin,
  onOpenStudentLogin,
  onOpenWhatsApp
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Brand Wordmark (Single line, display face) */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <School className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-blue-900 block leading-tight">
                Aerovate <span className="text-amber-500">Class 5</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 block">
                {lang === 'en' ? 'Kerala Teaching Platform' : 'കേരള ടീച്ചിംഗ് പ്ലാറ്റ്‌ഫോം'}
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => setCurrentTab('home')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'home' ? 'text-blue-600 border-blue-600' : 'border-transparent'
              }`}
            >
              {lang === 'en' ? 'Lessons & Chapters' : 'പാഠങ്ങൾ'}
            </button>
            <button
              onClick={() => setCurrentTab('rock-lab')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'rock-lab' ? 'text-blue-600 border-blue-600' : 'border-transparent'
              }`}
            >
              {lang === 'en' ? 'Interactive Rock Lab' : 'റോക്ക് ലാബ്'}
            </button>
            <button
              onClick={() => setCurrentTab('quizzes')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'quizzes' ? 'text-blue-600 border-blue-600' : 'border-transparent'
              }`}
            >
              {lang === 'en' ? 'Quizzes & Badges' : 'ക്വിസ് & ബാഡ്ജുകൾ'}
            </button>
            {currentUser.role === 'teacher' ? (
              <button
                onClick={() => setCurrentTab('teacher-dashboard')}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                  currentTab === 'teacher-dashboard' ? 'text-blue-600 border-blue-600' : 'border-transparent'
                }`}
              >
                {lang === 'en' ? 'Teacher Dashboard' : 'ടീച്ചർ ഡാഷ്‌ബോർഡ്'}
              </button>
            ) : null}
          </nav>

          {/* Action Zone: Language switch, Teacher Helpline, User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'en' ? 'മലയാളം' : 'English'}</span>
            </button>

            {/* Direct Teacher Helpline */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
              title="Teacher: 7736419753"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'Ask Teacher' : 'ടീച്ചറോട് ചോദിക്കാം'}</span>
            </button>

            {/* User Login / Profile status */}
            {currentUser.role === 'guest' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenStudentLogin}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
                >
                  {lang === 'en' ? 'Student Login' : 'കുട്ടികളുടെ ലോഗിൻ'}
                </button>
                <button
                  onClick={onOpenTeacherLogin}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
                >
                  {lang === 'en' ? 'Teacher Room' : 'ടീച്ചർ'}
                </button>
              </div>
            )}

            {currentUser.role === 'student' && currentUser.student && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900">
                  <span className="text-base">{currentUser.student.avatarEmoji || '🎒'}</span>
                  <span className="max-w-[100px] truncate">{currentUser.student.name}</span>
                  <span className="text-amber-600">· Roll {currentUser.student.rollNumber}</span>
                  <span className="text-amber-500 font-bold ml-1">★ {currentUser.student.stars || 0}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {currentUser.role === 'teacher' && currentUser.teacher && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('teacher-dashboard')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-900 hover:bg-blue-100 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{currentUser.teacher.name}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Teacher Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
