import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Award,
  Sparkles,
  Phone,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  GraduationCap,
  Layers,
  Search
} from 'lucide-react';
import { Chapter, Language, Student } from '../types';

interface StudentHomeProps {
  lang: Language;
  currentStudent?: Student;
  onSelectChapter: (chapterId: string | number) => void;
  onOpenQuiz: (quizId: string) => void;
  onOpenRockLab: () => void;
  onOpenWhatsApp: () => void;
  onOpenStudentLogin: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  lang,
  currentStudent,
  onSelectChapter,
  onOpenQuiz,
  onOpenRockLab,
  onOpenWhatsApp,
  onOpenStudentLogin
}) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/chapters');
      if (res.ok) {
        const data = await res.json();
        setChapters(data);
      }
    } catch (err) {
      console.error('Failed to fetch chapters:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredChapters = chapters.filter(ch => {
    const matchesSubj = selectedSubject === 'All' || ch.subject === selectedSubject;
    const matchesSearch = ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ch.titleMl.includes(searchQuery) ||
                          ch.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubj && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Classroom Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_kerala_classroom_1794061036802.jpg"
            alt="Kerala Class 5 science classroom with teacher Mrs. Anitha Kumar and students"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-semibold mb-4 backdrop-blur-sm">
            <span>🎒 Kerala State Board · Class 5 Syllabus</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            {lang === 'en'
              ? 'Learn Science & Beyond with Mrs. Anitha Kumar'
              : 'ശാസ്ത്രവും പാഠങ്ങളും എളുപ്പത്തിൽ പഠിക്കാം!'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
            {lang === 'en'
              ? 'Interactive digital lessons transcribed from your Class 5 textbook. Explore Rocks, Minerals, Fossil Fuels, interactive sorting games, and earn golden knowledge stars!'
              : 'ക്ലാസ് 5 പാഠപുസ്തകത്തിലെ എല്ലാ ആശയങ്ങളും രസകരമായ കളികളിലൂടെയും ശബ്ദത്തിലൂടെയും പഠിക്കാം. പാറകളും ധാതുക്കളും ഇപ്പോൾ വായിക്കാം!'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectChapter(1)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-amber-900" />
              <span>{lang === 'en' ? 'Start Chapter 1: Rocks & Minerals' : 'പാഠം 1 തുടങ്ങാം'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenRockLab}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'en' ? 'Interactive Rock Lab' : 'റോക്ക് ലാബ്'}</span>
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="px-4 py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Teacher: 7736419753</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Profile Strip (if logged in) */}
      {currentStudent ? (
        <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
              {currentStudent.avatarEmoji || '🎒'}
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Welcome back, Class 5 Explorer!</div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {currentStudent.name} (Roll No: {currentStudent.rollNumber})
              </h3>
              <div className="text-[11px] text-slate-500">
                Division 5A · Govt Model LP School, Kerala
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Stars</span>
              <span className="text-lg font-black text-amber-500">★ {currentStudent.stars || 10}</span>
            </div>
            <div className="text-right border-l pl-4 border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Badges</span>
              <span className="text-lg font-bold text-slate-800">
                {currentStudent.badges?.length || 1} 🏅
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎒</span>
            <div>
              <div className="text-xs font-bold text-blue-950">Are you a Class 5 Student?</div>
              <div className="text-[11px] text-slate-600">Enter your name and roll number to save stars and earn badges!</div>
            </div>
          </div>
          <button
            onClick={onOpenStudentLogin}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
          >
            Quick Student Sign-in
          </button>
        </div>
      )}

      {/* Featured Textbook Module Highlight: Rocks and Minerals */}
      <div className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider">
                Featured Lesson
              </span>
              <span className="text-xs text-slate-500">Class 5 Science Textbook (Pages 1–7)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {lang === 'en' ? 'Chapter 1: Rocks and Minerals' : 'പാഠം 1: പാറകളും ധാതുക്കളും'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'en'
                ? 'From slow-cooling granite countertops to floating pumice stones, diamond cutters to fossil fuels—explore the 7 rich textbook sections with interactive sorting labs and bilingual audio.'
                : 'ഭൂമിക്കടിയിലെ മാഗ്മ മുതൽ ഗ്രാനൈറ്റ്, പ്യൂമിസ്, മാർബിൾ, കൽക്കരി, പെട്രോളിയം എന്നിവയെക്കുറിച്ച് സമഗ്രമായി പഠിക്കാം.'}
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base">💎</span>
                <span>Metallic vs Non-Metallic</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base">🪨</span>
                <span>Igneous, Sedimentary & Metamorphic</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base">🔍</span>
                <span>Rock Detective Mystery Game</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base">⛽</span>
                <span>Fossil Fuels Mini Debate</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => onSelectChapter(1)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <span>{lang === 'en' ? 'Open Full Lesson' : 'പാഠം തുറക്കുക'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenQuiz('rocks-minerals-ch1')}
                className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors"
              >
                {lang === 'en' ? 'Attempt Chapter Quiz' : 'ക്വിസ് എഴുതാം'}
              </button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden border border-amber-300 shadow-md bg-white">
              <img
                src="/src/assets/images/rocks_and_minerals_specimens_1794061036722.jpg"
                alt="High-resolution display of polished rock specimens including quartz, obsidian, pumice, and granite"
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover object-center"
              />
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Specimen Collection: Quartz, Obsidian, Pumice & Granite</span>
                <button
                  onClick={onOpenRockLab}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Explore in Lab →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Chapters Section with Subject Filter */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {lang === 'en' ? 'Class 5 Curriculum Modules' : 'ക്ലാസ് 5 പാഠ്യപദ്ധതി'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'en'
                ? 'Curated lessons for Kerala State Board elementary education'
                : 'കേരള സിലബസ് പാഠങ്ങൾ'}
            </p>
          </div>

          {/* Subject Pills / Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {['All', 'Science', 'Maths', 'English', 'Malayalam'].map(subj => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedSubject === subj
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map(ch => (
            <div
              key={ch._id || ch.chapterNumber}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ch.subject === 'Science'
                      ? 'bg-blue-100 text-blue-800'
                      : ch.subject === 'Maths'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ch.subject === 'Malayalam'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {ch.subject}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{ch.estimatedReadTimeMinutes || 15} mins</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  Ch {ch.chapterNumber}: {lang === 'en' ? ch.title : ch.titleMl}
                </h3>
                <div className="text-xs text-blue-600 font-medium mb-2">
                  {lang === 'en' ? ch.titleMl : ch.title}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {lang === 'en' ? ch.summary : ch.summaryMl}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectChapter(ch.chapterNumber)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>{lang === 'en' ? 'Open Chapter' : 'വായിക്കൂ'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onOpenQuiz('rocks-minerals-ch1')}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-900"
                >
                  {lang === 'en' ? 'Take Quiz ★' : 'ക്വിസ് ★'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Help Bar */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow-inner shrink-0">
            👩‍🏫
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Need help with your Class 5 studies?
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Teacher Mrs. Anitha Kumar is available via WhatsApp & Phone at <strong>+91 7736419753</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenWhatsApp}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-2 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Ask Teacher Anitha</span>
        </button>
      </div>
    </div>
  );
};
