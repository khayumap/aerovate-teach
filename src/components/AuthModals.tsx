import React, { useState } from 'react';
import { X, Lock, User, School, ArrowRight, Sparkles, UserPlus, LogIn } from 'lucide-react';
import { Language, Student, TeacherProfile } from '../types';

interface AuthModalsProps {
  showTeacherModal: boolean;
  showStudentModal: boolean;
  onCloseTeacherModal: () => void;
  onCloseStudentModal: () => void;
  lang: Language;
  onTeacherLoginSuccess: (teacher: TeacherProfile) => void;
  onStudentLoginSuccess: (student: Student) => void;
}

const AVATAR_OPTIONS = ['🦁', '🐯', '🦋', '🚀', '🐬', '🌸', '⚡', '💎', '🦉', '⭐'];

export const AuthModals: React.FC<AuthModalsProps> = ({
  showTeacherModal,
  showStudentModal,
  onCloseTeacherModal,
  onCloseStudentModal,
  lang,
  onTeacherLoginSuccess,
  onStudentLoginSuccess
}) => {
  // Teacher form state: EMPTY by default so teacher types manually as requested!
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherError, setTeacherError] = useState<string | null>(null);
  const [loadingTeacher, setLoadingTeacher] = useState(false);

  // Student form state: tab can be 'signup' or 'signin'
  const [studentMode, setStudentMode] = useState<'signup' | 'signin'>('signup');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [division, setDivision] = useState<'5A' | '5B'>('5A');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [studentError, setStudentError] = useState<string | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(false);

  // Teacher Login
  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherError(null);

    if (!teacherEmail.trim() || !teacherPassword.trim()) {
      setTeacherError('Please enter both email and password.');
      return;
    }

    setLoadingTeacher(true);
    try {
      const res = await fetch('/api/auth/teacher-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: teacherEmail, password: teacherPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onTeacherLoginSuccess(data.teacher);
        onCloseTeacherModal();
        setTeacherEmail('');
        setTeacherPassword('');
      } else {
        setTeacherError(data.error || 'Incorrect email or password.');
      }
    } catch {
      setTeacherError('Network connection error.');
    } finally {
      setLoadingTeacher(false);
    }
  };

  // Student Sign Up
  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError(null);
    const roll = parseInt(rollNumber, 10);

    if (!studentName.trim()) {
      setStudentError(lang === 'en' ? 'Please enter your real full name.' : 'നിങ്ങളുടെ മുഴുവൻ പേര് നൽകുക.');
      return;
    }
    if (isNaN(roll) || roll <= 0) {
      setStudentError(lang === 'en' ? 'Please enter a valid roll number.' : 'ശരിയായ റോൾ നമ്പർ നൽകുക.');
      return;
    }

    setLoadingStudent(true);
    try {
      const res = await fetch('/api/auth/student-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentName.trim(),
          rollNumber: roll,
          division: division,
          avatarEmoji: selectedAvatar
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onStudentLoginSuccess(data.student);
        onCloseStudentModal();
        setStudentName('');
        setRollNumber('');
      } else {
        setStudentError(data.error || 'Registration failed.');
      }
    } catch {
      setStudentError('Network connection error.');
    } finally {
      setLoadingStudent(false);
    }
  };

  // Student Sign In
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError(null);
    const roll = parseInt(rollNumber, 10);

    if (isNaN(roll) || roll <= 0) {
      setStudentError(lang === 'en' ? 'Please enter your roll number.' : 'റോൾ നമ്പർ നൽകുക.');
      return;
    }

    setLoadingStudent(true);
    try {
      const res = await fetch('/api/auth/student-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNumber: roll,
          division: division,
          name: studentName.trim() || undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onStudentLoginSuccess(data.student);
        onCloseStudentModal();
        setStudentName('');
        setRollNumber('');
      } else {
        setStudentError(data.error || 'Student not found.');
      }
    } catch {
      setStudentError('Network connection error.');
    } finally {
      setLoadingStudent(false);
    }
  };

  return (
    <>
      {/* Teacher Login Modal (Inputs are strictly blank, manual typing required) */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={onCloseTeacherModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              👩‍🏫
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-0.5">Teacher Sign In</h3>
            <p className="text-xs text-slate-500 mb-4">
              Mrs. Jesni's Teacher Room · YAMANIYYA ENGLISH MEDIUM SCHOOL
            </p>

            {teacherError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold mb-3">
                {teacherError}
              </div>
            )}

            <form onSubmit={handleTeacherSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teacher Email</label>
                <input
                  type="email"
                  placeholder="Enter teacher email"
                  value={teacherEmail}
                  onChange={e => setTeacherEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter teacher password"
                  value={teacherPassword}
                  onChange={e => setTeacherPassword(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoComplete="off"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loadingTeacher}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>{loadingTeacher ? 'Verifying...' : 'Sign In to Teacher Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Student Sign Up / Sign In Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseStudentModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* School Header Badge */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg w-fit mb-3">
              <School className="w-3.5 h-3.5" />
              <span>YAMANIYYA ENGLISH MEDIUM SCHOOL</span>
            </div>

            {/* Mode Switch Tabs: Sign Up vs Sign In */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => { setStudentMode('signup'); setStudentError(null); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  studentMode === 'signup'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'New Student? Sign Up' : 'രജിസ്ട്രേഷൻ (Sign Up)'}</span>
              </button>
              <button
                type="button"
                onClick={() => { setStudentMode('signin'); setStudentError(null); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  studentMode === 'signin'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Already Registered? Sign In' : 'ലോഗിൻ (Sign In)'}</span>
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-0.5">
              {studentMode === 'signup'
                ? (lang === 'en' ? 'Student Registration (Class 5A & 5B)' : 'കുട്ടികളുടെ രജിസ്ട്രേഷൻ')
                : (lang === 'en' ? 'Student Sign In' : 'കുട്ടികളുടെ ലോഗിൻ')}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {studentMode === 'signup'
                ? (lang === 'en' ? 'Enter your real name and roll number to join Mrs. Jesni\'s science class!' : 'നിങ്ങളുടെ യഥാർത്ഥ പേരും റോൾ നമ്പറും നൽകുക.')
                : (lang === 'en' ? 'Select your class division and enter roll number.' : 'ക്ലാസും റോൾ നമ്പറും നൽകി പ്രവേശിക്കുക.')}
            </p>

            {studentError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold mb-3 leading-relaxed">
                {studentError}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={studentMode === 'signup' ? handleStudentRegister : handleStudentLogin} className="space-y-3 text-xs">
              
              {/* Class Division Selection (5A vs 5B) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'Class Division' : 'ക്ലാസ് ഡിവിഷൻ'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDivision('5A')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      division === '5A'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Class 5A (Science)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDivision('5B')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      division === '5B'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Class 5B (Science)
                  </button>
                </div>
              </div>

              {/* Real Full Name (Mandatory for Sign Up) */}
              {studentMode === 'signup' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'en' ? 'Your Real Full Name' : 'യഥാർത്ഥ പേര്'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammed Bilal / Fathima Rida"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {lang === 'en' ? 'This name will appear on teacher Mrs. Jesni\'s gradebook.' : 'ഈ പേര് ടീച്ചറുടെ ലിസ്റ്റിൽ കാണിക്കും.'}
                  </span>
                </div>
              )}

              {/* Roll Number */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'School Roll Number' : 'സ്കൂൾ റോൾ നമ്പർ'}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1, 2, 14, 25..."
                  value={rollNumber}
                  onChange={e => setRollNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  min="1"
                  required
                />
              </div>

              {/* Avatar Picker (Sign Up mode) */}
              {studentMode === 'signup' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Pick Your Learning Avatar' : 'അവതാർ തിരഞ്ഞെടുക്കൂ'}
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {AVATAR_OPTIONS.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedAvatar(emoji)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                          selectedAvatar === emoji
                            ? 'bg-amber-100 ring-2 ring-amber-400 scale-110 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loadingStudent}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2 mt-4 text-sm"
              >
                <span>
                  {loadingStudent
                    ? 'Processing...'
                    : studentMode === 'signup'
                    ? (lang === 'en' ? 'Complete Sign Up & Join Class' : 'രജിസ്ട്രേഷൻ പൂർത്തിയാക്കൂ')
                    : (lang === 'en' ? 'Sign In to Science Desk' : 'പ്രവേശിക്കുക')}
                </span>
                <Sparkles className="w-4 h-4 text-amber-900" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
