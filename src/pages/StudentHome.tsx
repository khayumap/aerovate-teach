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
  Search,
  School,
  UserPlus,
  FileText,
  FileDown
} from 'lucide-react';
import { Chapter, Language, Student } from '../types';
import { AiDoubtHelper } from '../components/AiDoubtHelper';

interface StudentHomeProps {
  lang: Language;
  currentStudent?: Student;
  onSelectChapter: (chapterId: string | number) => void;
  onOpenQuiz: (quizId: string) => void;
  onOpenRockLab: () => void;
  onOpenWhatsApp: () => void;
  onOpenStudentLogin: () => void;
  onOpenGuide?: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  lang,
  currentStudent,
  onSelectChapter,
  onOpenQuiz,
  onOpenRockLab,
  onOpenWhatsApp,
  onOpenStudentLogin,
  onOpenGuide
}) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
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
    return ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           ch.titleMl.includes(searchQuery) ||
           ch.summary.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Classroom Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero_kerala_classroom_1794061036802.jpg"
            alt="Classroom with science teacher Mrs. Jesni and Class 5A & 5B students at Yamaniyya English Medium School"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-semibold mb-4 backdrop-blur-sm">
            <School className="w-3.5 h-3.5 text-amber-300" />
            <span>YAMANIYYA ENGLISH MEDIUM SCHOOL · Class 5A & 5B Science</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            {lang === 'en'
              ? 'Class 5 Science Portal with Mrs. Jesni'
              : 'സയൻസ് പഠനം ലളിതവും രസകരവുമാക്കാം!'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
            {lang === 'en'
              ? 'Dedicated to students of Class 5A and Class 5B at Yamaniyya English Medium School. Discover Rocks and Minerals, interactive simulations, and test your knowledge!'
              : 'യമാനിയ്യ ഇംഗ്ലീഷ് മീഡിയം സ്കൂളിലെ 5A, 5B വിദ്യാർത്ഥികൾക്കായി മിസ്സിസ് ജെസ്നി ഒരുക്കിയ സയൻസ് ലേണിംഗ് പ്ലാറ്റ്ഫോം.'}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onSelectChapter(1)}
              className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-amber-900 shrink-0" />
              <span>{lang === 'en' ? 'Start Chapter 1: Rocks & Minerals' : 'പാഠം 1 തുടങ്ങാം'}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={onOpenRockLab}
              className="w-full sm:w-auto justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{lang === 'en' ? 'Interactive Rock Lab' : 'റോക്ക് ലാബ്'}</span>
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="w-full sm:w-auto justify-center px-4 py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Mrs. Jesni: 7736419753</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Profile Strip OR Registration Prompt */}
      {currentStudent ? (
        <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
              {currentStudent.avatarEmoji || '🎒'}
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Welcome back, Young Scientist!</div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {currentStudent.name} (Roll No: {currentStudent.rollNumber})
              </h3>
              <div className="text-[11px] text-blue-700 font-semibold">
                Class {currentStudent.division || '5A'} · YAMANIYYA ENGLISH MEDIUM SCHOOL
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
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎒</span>
            <div>
              <div className="text-xs font-bold text-blue-950">Are you a Student of Class 5A or 5B?</div>
              <div className="text-[11px] text-slate-600">
                Sign up with your real name and roll number to record your scores and earn stars on Mrs. Jesni’s gradebook!
              </div>
            </div>
          </div>
          <button
            onClick={onOpenStudentLogin}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up / Sign In</span>
          </button>
        </div>
      )}

      {/* AI Science Doubt Assistant Component */}
      <AiDoubtHelper lang={lang} onOpenWhatsApp={onOpenWhatsApp} />

      {/* Featured Textbook Module Highlight: Rocks and Minerals */}
      <div className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider">
                Featured Science Lesson
              </span>
              <span className="text-xs text-slate-500">Class 5 Science Textbook (Pages 1–7)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {lang === 'en' ? 'Chapter 1: Rocks and Minerals' : 'പാഠം 1: പാറകളും ധാതുക്കളും'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'en'
                ? 'From slow-cooling granite to floating pumice stones, diamond cutters to fossil fuels—explore the 7 rich textbook sections with interactive sorting labs and bilingual audio.'
                : 'ഭൂമിക്കടിയിലെ മാഗ്മ മുതൽ ഗ്രാനൈറ്റ്, പ്യൂമിസ്, മാർബിൾ, കൽക്കരി, പെട്രോളിയം എന്നിവയെക്കുറിച്ച് സമഗ്രമായി പഠിക്കാം.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base shrink-0">💎</span>
                <span className="truncate">Metallic vs Non-Metallic</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base shrink-0">🪨</span>
                <span className="truncate">Igneous, Sedimentary & Metamorphic</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base shrink-0">🔍</span>
                <span className="truncate">Rock Detective Mystery Game</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-base shrink-0">⛽</span>
                <span className="truncate">Fossil Fuels Mini Debate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-3">
              <button
                onClick={() => onSelectChapter(1)}
                className="w-full sm:w-auto justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2 active:scale-95"
              >
                <span>{lang === 'en' ? 'Open Full Science Lesson' : 'പാഠം തുറക്കുക'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenQuiz('rocks-minerals-ch1')}
                className="w-full sm:w-auto justify-center px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors active:scale-95"
              >
                {lang === 'en' ? 'Take Quiz (100 pts)' : 'ക്വിസ് എഴുതാം'}
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-amber-100 text-amber-800 rounded-md">🔬</span>
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {lang === 'en' ? 'Class 5 Rock Specimens Deck' : 'പാറകളുടെ ശേഖരം'}
                  </span>
                </div>
                <button
                  onClick={onOpenRockLab}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>{lang === 'en' ? 'Open Lab' : 'ലാബ് തുറക്കൂ'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* 4 Crisp Specimen Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">🧼</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Igneous</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Pumice (പ്യൂമിസ്)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Spongy stone with gas bubbles.</div>
                  </div>
                  <div className="text-[10px] font-semibold text-blue-700 mt-2 bg-blue-50/80 px-2 py-0.5 rounded">
                    🌊 Floats on water!
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">🪨</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Igneous</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Granite (ഗ്രാനൈറ്റ്)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Slow-cooled hard magma.</div>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-700 mt-2 bg-slate-100 px-2 py-0.5 rounded">
                    🏠 Kitchen counters
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">🗡️</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Igneous</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Obsidian (ഒബ്സീഡിയൻ)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Volcanic natural glass.</div>
                  </div>
                  <div className="text-[10px] font-semibold text-purple-700 mt-2 bg-purple-50 px-2 py-0.5 rounded">
                    ✨ Sharp surgical glass
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">🏰</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Sedimentary</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Sandstone (മണൽക്കല്ല്)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Pressed grains of sand.</div>
                  </div>
                  <div className="text-[10px] font-semibold text-amber-800 mt-2 bg-amber-50 px-2 py-0.5 rounded">
                    🏛️ Delhi Red Fort
                  </div>
                </div>
              </div>

              {/* Lab Action */}
              <button
                onClick={onOpenRockLab}
                className="mt-3.5 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? 'Launch Interactive Rock & Mineral Lab' : 'റോക്ക് ലാബിൽ പരീക്ഷിക്കാം'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Science Chapters Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {lang === 'en' ? 'Class 5A & 5B Science Modules' : 'ക്ലാസ് 5 സയൻസ് പാഠ്യപദ്ധതി'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Yamaniyya English Medium School · Mrs. Jesni
            </p>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChapters.map(ch => (
            <div
              key={ch._id || ch.chapterNumber}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Science · Class 5A & 5B
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

      {/* Official User Guide & PDF Download Banner (Tablet & Desktop Optimized) */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 text-amber-300 flex items-center justify-center text-2xl shadow-inner shrink-0 mt-0.5">
            <FileText className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              Official PDF Handbook
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              {lang === 'en'
                ? 'Student & Teacher User Guide (Printable PDF)'
                : 'വിദ്യാർത്ഥി & അധ്യാപക യൂസർ ഗൈഡ് (PDF)'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {lang === 'en'
                ? 'Complete 2-page illustrated guide explaining Class 5A & 5B registration, Malayalam/English lessons, Interactive Rock Lab, quizzes, and teacher credentials. Download and share via WhatsApp!'
                : 'ക്ലാസ് 5 ലേണിംഗ് പ്ലാറ്റ്‌ഫോം എങ്ങനെ ഉപയോഗിക്കാം എന്ന് വ്യക്തമാക്കുന്ന സമഗ്രമായ 2 പേജ് PDF ഗൈഡ് ഇപ്പോൾ ഡൗൺലോഡ് ചെയ്യാം.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGuide}
          className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-amber-950 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <FileDown className="w-4 h-4 text-amber-900 shrink-0" />
          <span>{lang === 'en' ? 'Open & Download PDF' : 'ഗൈഡ് തുറക്കൂ (PDF)'}</span>
        </button>
      </div>

      {/* Teacher Help Bar */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow-inner shrink-0">
            👩‍🏫
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Need help with Class 5 Science homework?
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Teacher Mrs. Jesni is available via WhatsApp & Phone at <strong>+91 7736419753</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenWhatsApp}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-2 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Ask Mrs. Jesni</span>
        </button>
      </div>
    </div>
  );
};
