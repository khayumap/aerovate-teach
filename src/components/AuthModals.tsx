import React, { useState } from 'react';
import { X, Lock, User, School, ArrowRight, Sparkles } from 'lucide-react';
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

export const AuthModals: React.FC<AuthModalsProps> = ({
  showTeacherModal,
  showStudentModal,
  onCloseTeacherModal,
  onCloseStudentModal,
  lang,
  onTeacherLoginSuccess,
  onStudentLoginSuccess
}) => {
  // Teacher form
  const [teacherEmail, setTeacherEmail] = useState('teacher@aerovate.org');
  const [teacherPassword, setTeacherPassword] = useState('aerovate123');
  const [teacherError, setTeacherError] = useState<string | null>(null);
  const [loadingTeacher, setLoadingTeacher] = useState(false);

  // Student form
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentError, setStudentError] = useState<string | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(false);

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherError(null);
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
      } else {
        setTeacherError(data.error || 'Invalid credentials');
      }
    } catch {
      setTeacherError('Network error connecting to backend server');
    } finally {
      setLoadingTeacher(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError(null);
    const roll = parseInt(rollNumber, 10);
    if (!studentName.trim() || isNaN(roll)) {
      setStudentError(lang === 'en' ? 'Please enter your Name and Roll Number' : 'പേരും റോൾ നമ്പറും നൽകുക');
      return;
    }

    setLoadingStudent(true);
    try {
      const res = await fetch('/api/auth/student-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, rollNumber: roll })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onStudentLoginSuccess(data.student);
        onCloseStudentModal();
      } else {
        setStudentError(data.error || 'Login failed');
      }
    } catch {
      setStudentError('Network error');
    } finally {
      setLoadingStudent(false);
    }
  };

  return (
    <>
      {/* Teacher Login Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={onCloseTeacherModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              👩‍🏫
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-0.5">Teacher Sign In</h3>
            <p className="text-xs text-slate-500 mb-4">
              Access the Class 5 Kerala Teacher Dashboard & Gradebook.
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
                  value={teacherEmail}
                  onChange={e => setTeacherEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={e => setTeacherPassword(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Default credentials pre-filled: <code>teacher@aerovate.org / aerovate123</code>
                </span>
              </div>

              <button
                type="submit"
                disabled={loadingTeacher}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>{loadingTeacher ? 'Signing In...' : 'Open Teacher Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Student Login Modal (Super simple for Class 5 kids!) */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={onCloseStudentModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              🎒
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-0.5">
              {lang === 'en' ? 'Class 5 Student Sign In' : 'കുട്ടികളുടെ ലോഗിൻ'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'en'
                ? 'Enter your name and roll number to start reading & collect stars!'
                : 'പേരും റോൾ നമ്പറും നൽകി പാഠങ്ങൾ പഠിക്കാം!'}
            </p>

            {studentError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold mb-3">
                {studentError}
              </div>
            )}

            <form onSubmit={handleStudentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'Your Name' : 'നിങ്ങളുടെ പേര്'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aadhya Menon"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'Roll Number (Number only)' : 'റോൾ നമ്പർ'}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1"
                  value={rollNumber}
                  onChange={e => setRollNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 5, 12].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setRollNumber(String(num));
                        if (!studentName) {
                          if (num === 1) setStudentName('Aadhya Menon');
                          if (num === 2) setStudentName('Rahul Nair');
                          if (num === 3) setStudentName('Fathima Beevi');
                        }
                      }}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors"
                    >
                      Roll {num}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingStudent}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2 mt-4 text-sm"
              >
                <span>{loadingStudent ? 'Logging In...' : lang === 'en' ? 'Start Learning!' : 'പഠിക്കാൻ തുടങ്ങാം!'}</span>
                <Sparkles className="w-4 h-4 text-amber-900" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
