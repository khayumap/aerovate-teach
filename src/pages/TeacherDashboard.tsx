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
  ExternalLink
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

  // Form State for Adding Chapter
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    subject: 'Science',
    chapterNumber: 2,
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
        subject: formData.subject,
        chapterNumber: Number(formData.chapterNumber),
        summary: formData.summary || 'Class 5 chapter lesson.',
        summaryMl: formData.summaryMl || formData.summary || 'പാഠഭാഗം',
        sections: [
          {
            title: formData.sectionTitle || 'Section 1',
            titleMl: formData.sectionTitle || 'ഭാഗം 1',
            content: formData.sectionContent || formData.summary,
            contentMl: formData.summaryMl || formData.summary,
            bulletPoints: ['Introduction to core concepts', 'Classroom discussion'],
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
        setActionMessage('Chapter created successfully!');
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
    if (!confirm('Reset curriculum to default Class 5 Rocks & Minerals syllabus?')) return;
    try {
      await fetch('/api/seed/reset', { method: 'POST' });
      setActionMessage('Curriculum reset to defaults.');
      fetchDashboardData();
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

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
                {teacher?.name || 'Mrs. Anitha Kumar'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                Teacher Lead
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Class 5 (Science & EVS) · Govt Model LP School, Kerala · Aerovate Teaching Platform
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
            <span>Add New Chapter</span>
          </button>

          <button
            onClick={onOpenWhatsApp}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>Open WhatsApp Helpline</span>
          </button>

          <button
            onClick={handleResetData}
            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
            title="Reset curriculum to default state"
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

      {/* Database & Hosting Status Bar (Replit & MongoDB Atlas) */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="font-bold text-white">Database Status: </span>
            <span className={dbInfo?.connected ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {dbInfo?.connected
                ? `Connected to MongoDB Atlas (${dbInfo?.mongoHost})`
                : 'In-Memory Store Active (Replit Ready with MONGO_URI in Secrets)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Stack: MERN (React 19, Express, Mongoose)</span>
          <span>·</span>
          <span>Port: 5000 / 3000</span>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Chapters</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stats?.totalChapters ?? chapters.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Class 5 curriculum modules</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Quizzes</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stats?.totalQuizzes ?? 1}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Interactive quizzes with badges</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enrolled Students</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stats?.totalStudents ?? students.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Class 5A students active</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Class Score</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {stats?.averageScore ?? 88}%
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Pass rate: 94%</div>
        </div>
      </div>

      {/* Chapters Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Manage Syllabus Chapters</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click to view lesson or manage courseware</p>
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
                <th className="py-2.5 px-3">Teacher Contact</th>
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
                    <div className="text-[11px] text-blue-600 font-medium">{ch.titleMl} · {ch.subject}</div>
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
                      View
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

      {/* Two Column Layout: Student Roster & Recent Quiz Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Roster */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Class 5A Student Roster</h2>
              <p className="text-xs text-slate-500 mt-0.5">Students enrolled in Govt Model LP School</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              {students.length} Learners
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {students.map(s => (
              <div key={s._id || s.rollNumber} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{s.avatarEmoji || '🎒'}</span>
                  <div>
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-[11px] text-slate-500">Roll No: {s.rollNumber} · Class 5A</div>
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
        </div>

        {/* Recent Quiz Gradebook */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Quiz Performance</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live submissions from Rocks & Minerals quiz</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {submissions.length} Submissions
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {submissions.map((sub, i) => (
              <div key={sub._id || i} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{sub.studentName}</div>
                  <div className="text-[11px] text-slate-500">
                    Roll #{sub.rollNumber} · {new Date(sub.submittedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-black text-sm tabular-nums ${
                    sub.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'
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
        </div>
      </div>

      {/* Add Chapter Modal */}
      {showAddChapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Chapter (Class 5)</h3>
            <p className="text-xs text-slate-500 mb-4">
              Expand the teaching curriculum with a new subject module.
            </p>

            <form onSubmit={handleCreateChapter} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
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
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Science">Science (EVS)</option>
                    <option value="Maths">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Malayalam">Malayalam</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (English)</label>
                <input
                  type="text"
                  placeholder="e.g. Living World & Plants"
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
                  placeholder="e.g. ജീവികളുടെ ലോകം"
                  value={formData.titleMl}
                  onChange={e => setFormData({ ...formData, titleMl: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-['Noto_Sans_Malayalam',sans-serif]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary / Objective</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of what Class 5 kids will discover..."
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Section Content</label>
                <textarea
                  rows={3}
                  placeholder="Core lesson text for kids to read..."
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
                  Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
