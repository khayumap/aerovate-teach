import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  PlusCircle,
  Phone,
  Database,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Search,
  School,
  ExternalLink,
  Filter,
  UserCheck
} from 'lucide-react';
import { Chapter, DashboardStats, Language, Student, Submission, TeacherProfile } from '../types';

interface TeacherDashboardProps {
  lang: Language;
  teacher?: TeacherProfile;
  onOpenWhatsApp: () => void;
  onSelectChapter: (id: string | number) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lang,
  teacher,
  onOpenWhatsApp,
  onSelectChapter
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dbInfo, setDbInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<'All' | '5A' | '5B'>('All');

  // Form State for Adding Chapter
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    chapterNumber: 5,
    summary: '',
    summaryMl: '',
    sectionTitle: 'Lesson Overview',
    sectionContent: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resStats, resChapters, resStudents, resSubs, resHealth] = await Promise.all([
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/chapters').then(r => r.json()),
        fetch('/api/students').then(r => r.json()),
        fetch('/api/submissions').then(r => r.json()),
        fetch('/api/health').then(r => r.json())
      ]);

      setStats(resStats);
      setChapters(resChapters);
      setStudents(resStudents);
      setSubmissions(resSubs);
      setDbInfo(resHealth.db);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.chapterNumber) return;

    try {
      const payload = {
        title: formData.title,
        titleMl: formData.titleMl || formData.title,
        chapterNumber: Number(formData.chapterNumber),
        summary: formData.summary || 'Class 5 Science module.',
        summaryMl: formData.summaryMl || formData.summary || 'സയൻസ് പാഠഭാഗം',
        sections: [
          {
            title: formData.sectionTitle || 'Section 1',
            titleMl: formData.sectionTitle || 'ഭാഗം 1',
            content: formData.sectionContent || formData.summary,
            contentMl: formData.summaryMl || formData.summary,
            bulletPoints: ['Introduction to core science concepts', 'Classroom discussion for 5A & 5B'],
            interactiveType: 'none',
            items: []
          }
        ]
      };

      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowAddChapterModal(false);
        setActionMessage('Science chapter created successfully!');
        fetchDashboardData();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error('Error creating chapter:', err);
    }
  };

  const handleDeleteChapter = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this chapter?')) return;
    try {
      await fetch(`/api/chapters/${id}`, { method: 'DELETE' });
      setActionMessage('Chapter deleted.');
      fetchDashboardData();
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleResetData = async () => {
    if (!confirm('Reset Science syllabus to default Class 5 curriculum?')) return;
    try {
      await fetch('/api/seed/reset', { method: 'POST' });
      setActionMessage('Science curriculum reset to defaults.');
      fetchDashboardData();
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  // Filter students by selected division
  const filteredStudents = students.filter(s => {
    if (selectedDivisionFilter === 'All') return true;
    return s.division === selectedDivisionFilter;
  });

  // Filter submissions by selected division
  const filteredSubmissions = submissions.filter(sub => {
    if (selectedDivisionFilter === 'All') return true;
    return sub.division === selectedDivisionFilter;
  });

  const count5A = students.filter(s => s.division === '5A').length;
  const count5B = students.filter(s => s.division === '5B').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            👩‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {teacher?.name || 'Mrs. Jesni'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                Science Lead (Class 5A & 5B)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              YAMANIYYA ENGLISH MEDIUM SCHOOL · Aerovate Teaching Platform
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
              <span className="text-emerald-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 7736419753</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-blue-600">teacher@aerovate.org</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAddChapterModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Science Chapter</span>
          </button>

          <button
            onClick={onOpenWhatsApp}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>Open WhatsApp (+91 7736419753)</span>
          </button>

          <button
            onClick={handleResetData}
            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
            title="Reset syllabus to default"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Syllabus</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Database & Render Hosting Notice */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="font-bold text-white">Database Status: </span>
            <span className={dbInfo?.connected ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {dbInfo?.connected
                ? `Connected to MongoDB Atlas (${dbInfo?.mongoHost})`
                : 'In-Memory Store Active (MongoDB Atlas MONGO_URI ready for Render)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Host: Render Cloud Service</span>
          <span>·</span>
          <span>School: Yamaniyya English Medium School</span>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Science Chapters</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stats?.totalChapters ?? chapters.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Class 5A & 5B Science modules</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Class 5A Students</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {count5A}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Real registered learners in 5A</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Class 5B Students</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {count5B}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Real registered learners in 5B</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Quiz Score</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stats?.averageScore ?? 0}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Based on {submissions.length} submissions</div>
        </div>
      </div>

      {/* Division Selector Tab Bar for Roster & Submissions */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700">Filter By Class:</span>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['All', '5A', '5B'] as const).map(div => (
            <button
              key={div}
              onClick={() => setSelectedDivisionFilter(div)}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedDivisionFilter === div
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {div === 'All' ? 'All Classes (5A & 5B)' : `Class ${div}`}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Real Student Roster & Recent Quiz Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Real Student Roster (Class 5A & 5B) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Registered Students ({selectedDivisionFilter === 'All' ? '5A & 5B' : `Class ${selectedDivisionFilter}`})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real student names from YAMANIYYA ENGLISH MEDIUM SCHOOL
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              {filteredStudents.length} Students
            </span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl mx-auto mb-2">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 mb-1">
                No students registered yet in {selectedDivisionFilter === 'All' ? 'Class 5A or 5B' : `Class ${selectedDivisionFilter}`}
              </h4>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto mb-3">
                When students from Class 5A and 5B click "Sign Up" on the student login modal, their real names and roll numbers will appear here!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {filteredStudents.map(s => (
                <div key={s._id || `${s.division}_${s.rollNumber}`} className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{s.avatarEmoji || '🎒'}</span>
                    <div>
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-500">
                        Roll No: <strong className="text-slate-800">{s.rollNumber}</strong> · Class: <span className="font-semibold text-blue-700">{s.division}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-500">★ {s.stars || 0}</span>
                    <div className="flex items-center gap-1">
                      {s.badges?.map((b, i) => (
                        <span key={i} title={b.title} className="text-base cursor-help">
                          {b.icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real Quiz Submissions Gradebook */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Quiz Gradebook ({selectedDivisionFilter === 'All' ? '5A & 5B' : `Class ${selectedDivisionFilter}`})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time scores recorded for Class 5 Science quizzes
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {filteredSubmissions.length} Submissions
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 mb-1">
                No quiz submissions yet
              </h4>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Once students complete Chapter 1 "Rocks and Minerals" quiz, their graded scores and answers will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {filteredSubmissions.map((sub, i) => (
                <div key={sub._id || i} className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                  <div>
                    <div className="font-bold text-slate-900">{sub.studentName}</div>
                    <div className="text-[11px] text-slate-500">
                      Roll #{sub.rollNumber} · Class {sub.division || '5A'} · {new Date(sub.submittedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-black text-sm tabular-nums ${
                      sub.percentage >= 60 ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {sub.percentage}%
                    </span>
                    <div className="text-[10px] text-slate-400">
                      {sub.score} / 100 marks
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chapters Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Class 5 Science Chapters</h2>
            <p className="text-xs text-slate-500 mt-0.5">Syllabus modules for Yamaniyya English Medium School</p>
          </div>
          <button
            onClick={() => setShowAddChapterModal(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Chapter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Ch #</th>
                <th className="py-2.5 px-3">Title & Subject</th>
                <th className="py-2.5 px-3">Sections</th>
                <th className="py-2.5 px-3">Teacher</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chapters.map(ch => (
                <tr key={ch._id || ch.chapterNumber} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">
                    {ch.chapterNumber}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{ch.title}</div>
                    <div className="text-[11px] text-blue-600 font-medium">{ch.titleMl} · Science</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {ch.sections?.length || 0} sections
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <span className="font-semibold text-emerald-700">{ch.teacherPhone || '7736419753'}</span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button
                      onClick={() => onSelectChapter(ch.chapterNumber)}
                      className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      View Lesson
                    </button>
                    {ch.chapterNumber !== 1 && (
                      <button
                        onClick={() => handleDeleteChapter(ch._id || ch.chapterNumber)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Chapter Modal */}
      {showAddChapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Science Chapter (Class 5A & 5B)</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add a new Science chapter module for Yamaniyya English Medium School.
            </p>

            <form onSubmit={handleCreateChapter} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chapter Number</label>
                <input
                  type="number"
                  value={formData.chapterNumber}
                  onChange={e => setFormData({ ...formData, chapterNumber: parseInt(e.target.value, 10) || 1 })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (English)</label>
                <input
                  type="text"
                  placeholder="e.g. Light, Shadows and Reflection"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (Malayalam)</label>
                <input
                  type="text"
                  placeholder="e.g. പ്രകാശവും നിഴലും"
                  value={formData.titleMl}
                  onChange={e => setFormData({ ...formData, titleMl: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-['Noto_Sans_Malayalam',sans-serif]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary / Learning Outcome</label>
                <textarea
                  rows={2}
                  placeholder="What Class 5 students in 5A & 5B will discover..."
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">First Section Lesson Content</label>
                <textarea
                  rows={3}
                  placeholder="Core science lesson text..."
                  value={formData.sectionContent}
                  onChange={e => setFormData({ ...formData, sectionContent: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddChapterModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm transition-colors"
                >
                  Save Science Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
