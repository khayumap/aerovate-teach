import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Phone,
  LogOut,
  UserCheck,
  Languages,
  School,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  FileText,
  FileDown
} from 'lucide-react';
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
  onOpenGuide: () => void;
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
  onOpenWhatsApp,
  onOpenGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 lg:gap-6">
          
          {/* Brand Wordmark (Responsive for mobile, tablet, and desktop) */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
              <School className="w-5 h-5 text-amber-300" />
            </div>
            <div className="truncate">
              <span className="text-base sm:text-lg font-bold tracking-tight text-blue-900 block leading-tight truncate">
                Aerovate <span className="text-amber-500">Class 5</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 hidden md:block truncate">
                {lang === 'en' ? 'Kerala Teaching Platform' : 'കേരള ടീച്ചിംഗ് പ്ലാറ്റ്‌ഫോം'}
              </span>
            </div>
          </button>

          {/* Desktop & Tablet Landscape Navigation Links (1024px+) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleTabClick('home')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'home' ? 'text-blue-600 border-blue-600' : 'border-transparent'
              }`}
            >
              {lang === 'en' ? 'Lessons & Chapters' : 'പാഠങ്ങൾ'}
            </button>
            <button
              onClick={() => handleTabClick('rock-lab')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'rock-lab' ? 'text-blue-600 border-blue-600' : 'border-transparent'
              }`}
            >
              {lang === 'en' ? 'Interactive Rock Lab' : 'റോക്ക് ലാബ്'}
            </button>
            <button
              onClick={() => handleTabClick('quizzes')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'quizzes' ? 'text-blue-600 border-blue-600' : 'border-transparent'
              }`}
            >
              {lang === 'en' ? 'Quizzes & Badges' : 'ക്വിസ് & ബാഡ്ജുകൾ'}
            </button>
            {currentUser.role === 'teacher' ? (
              <button
                onClick={() => handleTabClick('teacher-dashboard')}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                  currentTab === 'teacher-dashboard' ? 'text-blue-600 border-blue-600' : 'border-transparent'
                }`}
              >
                {lang === 'en' ? 'Teacher Dashboard' : 'ടീച്ചർ ഡാഷ്‌ബോർഡ്'}
              </button>
            ) : null}
          </nav>

          {/* Action Zone: Desktop + Tablet + Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Download/View PDF User Guide Button (Always visible on tablet and desktop) */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-95"
              title="View and Download PDF User Guide for Students & Teachers"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">User Guide (PDF)</span>
              <span className="sm:hidden">Guide</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50 text-[11px] sm:text-xs font-semibold text-slate-700 hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="hidden md:inline">{lang === 'en' ? 'മലയാളം' : 'English'}</span>
              <span className="md:hidden">{lang === 'en' ? 'ML' : 'EN'}</span>
            </button>

            {/* Direct Teacher Helpline (Large screens & Tablets) */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
              title="Teacher Mrs. Jesni: 7736419753"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'Ask Teacher' : 'ടീച്ചറോട് ചോദിക്കാം'}</span>
            </button>

            {/* Desktop / Tablet User Login / Profile status */}
            <div className="hidden sm:flex items-center gap-1.5 lg:gap-2">
              {currentUser.role === 'guest' && (
                <>
                  <button
                    onClick={onOpenStudentLogin}
                    className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
                  >
                    {lang === 'en' ? 'Student Login' : 'കുട്ടികളുടെ ലോഗിൻ'}
                  </button>
                  <button
                    onClick={onOpenTeacherLogin}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
                  >
                    {lang === 'en' ? 'Teacher Room' : 'ടീച്ചർ'}
                  </button>
                </>
              )}

              {currentUser.role === 'student' && currentUser.student && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900 max-w-[140px] md:max-w-[180px] truncate">
                    <span className="text-sm shrink-0">{currentUser.student.avatarEmoji || '🎒'}</span>
                    <span className="truncate">{currentUser.student.name}</span>
                    <span className="text-amber-500 font-bold ml-1 shrink-0">★ {currentUser.student.stars || 0}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {currentUser.role === 'teacher' && currentUser.teacher && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTabClick('teacher-dashboard')}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-900 hover:bg-blue-100 transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="max-w-[100px] truncate">{currentUser.teacher.name}</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                    title="Teacher Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Compact Student Badge (Mobile Only when logged in) */}
            {currentUser.role === 'student' && currentUser.student && (
              <div className="sm:hidden flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg text-xs font-bold text-amber-900">
                <span>{currentUser.student.avatarEmoji || '🎒'}</span>
                <span className="text-amber-500">★ {currentUser.student.stars || 0}</span>
              </div>
            )}

            {/* Mobile Compact Teacher Badge (Mobile Only when logged in) */}
            {currentUser.role === 'teacher' && currentUser.teacher && (
              <button
                onClick={() => handleTabClick('teacher-dashboard')}
                className="sm:hidden flex items-center gap-1 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg text-xs font-bold text-blue-900"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate max-w-[70px]">Mrs. Jesni</span>
              </button>
            )}

            {/* Tablet & Mobile Hamburger Menu Toggle Button (Visible on screens < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Slide-Down Navigation & Actions Drawer (For Mobile & Tablet Portrait) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          
          {/* User Status Strip */}
          {currentUser.role === 'student' && currentUser.student ? (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentUser.student.avatarEmoji || '🎒'}</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {currentUser.student.name}
                  </div>
                  <div className="text-[10px] text-amber-800">
                    Roll No: {currentUser.student.rollNumber} · Class {currentUser.student.division || '5A'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-600">★ {currentUser.student.stars || 0}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : currentUser.role === 'teacher' && currentUser.teacher ? (
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-xs font-bold text-blue-950">{currentUser.teacher.name}</div>
                  <div className="text-[10px] text-blue-700">Teacher · Class 5A & 5B</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  onOpenStudentLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors text-center"
              >
                🎒 {lang === 'en' ? 'Student Login' : 'കുട്ടികളുടെ ലോഗിൻ'}
              </button>
              <button
                onClick={() => {
                  onOpenTeacherLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors text-center"
              >
                👩‍🏫 {lang === 'en' ? 'Teacher Room' : 'ടീച്ചർ റൂം'}
              </button>
            </div>
          )}

          {/* Navigation Links List */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleTabClick('home')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'home'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-800 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'en' ? 'Lessons & Chapters (Science)' : 'സയൻസ് പാഠങ്ങൾ'}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabClick('rock-lab')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'rock-lab'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-800 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Interactive Rock Lab' : 'റോക്ക് ലാബ് (പരീക്ഷണങ്ങൾ)'}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabClick('quizzes')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'quizzes'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-800 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Quizzes & Badges (Earn Stars)' : 'ക്വിസ് & ബാഡ്ജുകൾ'}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            {currentUser.role === 'teacher' ? (
              <button
                onClick={() => handleTabClick('teacher-dashboard')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'teacher-dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-800 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-blue-500" />
                  <span>{lang === 'en' ? 'Teacher Dashboard' : 'ടീച്ചർ ഡാഷ്‌ബോർഡ്'}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            ) : null}

            {/* Direct Link to PDF User Guide */}
            <button
              onClick={() => {
                onOpenGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>{lang === 'en' ? 'User Guide & Download PDF' : 'യൂസർ ഗൈഡ് & PDF ഡൗൺലോഡ്'}</span>
              </div>
              <FileDown className="w-4 h-4 text-indigo-500" />
            </button>
          </div>

          {/* Teacher Helpline Quick Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Ask Mrs. Jesni on WhatsApp: 7736419753</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
