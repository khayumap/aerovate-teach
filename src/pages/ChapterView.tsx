import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Phone,
  Sparkles,
  ArrowRight,
  Layers,
  Flame,
  CheckCircle2,
  HelpCircle,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import { Chapter, Language, Student } from '../types';
import { AudioSpeechButton } from '../components/AudioSpeechButton';
import { MineralClassifier } from '../components/MineralClassifier';
import { RockDetective } from '../components/RockDetective';
import { UseMatcher } from '../components/UseMatcher';
import { VocabularyDeck } from '../components/VocabularyDeck';
import { FossilFuelDebate } from '../components/FossilFuelDebate';
import { RockCardShowcase } from '../components/RockCardShowcase';

interface ChapterViewProps {
  chapterId: string | number;
  lang: Language;
  currentStudent?: Student;
  onOpenQuiz: (quizId: string) => void;
  onOpenWhatsApp: () => void;
  onBackToChapters: () => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapterId,
  lang,
  currentStudent,
  onOpenQuiz,
  onOpenWhatsApp,
  onBackToChapters
}) => {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  useEffect(() => {
    fetchChapter();
  }, [chapterId]);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chapters/${chapterId}`);
      if (res.ok) {
        const data = await res.json();
        setChapter(data);
      }
    } catch (err) {
      console.error('Failed to load chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-semibold text-slate-500">Opening Kerala Class 5 Lesson...</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <p className="text-sm text-red-600">Chapter not found.</p>
        <button
          onClick={onBackToChapters}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  const activeSection = chapter.sections[activeSectionIdx] || chapter.sections[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Chapter Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onBackToChapters}
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'All Lessons' : 'എല്ലാ പാഠങ്ങളും'}</span>
            </button>
            <span className="text-xs text-blue-200">
              Class 5 · {chapter.subject} · Kerala State Board
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-2">
            Chapter {chapter.chapterNumber}: {lang === 'en' ? chapter.title : chapter.titleMl}
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-6">
            {lang === 'en' ? chapter.summary : chapter.summaryMl}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <AudioSpeechButton
              textToRead={`${chapter.title}. ${chapter.summary}. ${activeSection.content}`}
              lang={lang}
              label={lang === 'en' ? 'Listen to Chapter Audio' : 'പാഠം ഓഡിയോയിൽ കേൾക്കൂ'}
            />

            <button
              onClick={() => onOpenQuiz('rocks-minerals-ch1')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-105"
            >
              <Trophy className="w-4 h-4 text-amber-900" />
              <span>{lang === 'en' ? 'Take Grand Quiz (100 pts)' : 'ക്വിസ് എഴുതാം (100 pts)'}</span>
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mrs. Jesni (+91 7736419753)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Study Zone: Split Layout (Section Navigation vs Interactive Lesson Deck) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Side: Section Directory */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            {lang === 'en' ? 'Lesson Table of Contents:' : 'പാഠഭാഗങ്ങൾ:'}
          </div>

          {chapter.sections.map((sec, idx) => {
            const isActive = activeSectionIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSectionIdx(idx)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/20'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <div className="font-bold text-xs leading-snug">
                    {lang === 'en' ? sec.title : sec.titleMl || sec.title}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {sec.interactiveType && sec.interactiveType !== 'none'
                      ? '⚡ Interactive Game Included'
                      : 'Textbook Lesson Section'}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Teacher Helpline Sidebar Widget */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-xs text-emerald-950 mt-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2 font-bold text-emerald-900">
              <span className="text-lg">👩‍🏫</span>
              <span>Class 5 Science Support</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed mb-3">
              Mrs. Jesni is available to guide Class 5A & 5B students at Yamaniyya English Medium School with personalized help.
            </p>
            <button
              onClick={onOpenWhatsApp}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: 7736419753</span>
            </button>
          </div>
        </div>

        {/* Right Side: Active Section Stage */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {/* Section Header */}
            <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Section {activeSectionIdx + 1} of {chapter.sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {lang === 'en' ? activeSection.title : activeSection.titleMl || activeSection.title}
                </h2>
              </div>
              <AudioSpeechButton
                textToRead={`${activeSection.title}. ${activeSection.content}`}
                lang={lang}
              />
            </div>

            {/* Earth Layers Visual (Shown on Section 3) */}
            {activeSectionIdx === 2 && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
                <img
                  src="/src/assets/images/earth_layers_crust_mantle_1794061036677.jpg"
                  alt="3D diagram of Earth's internal structure showing Crust, Mantle, and Core"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-3 bg-slate-900 text-slate-200 text-xs flex items-center justify-between">
                  <span>3 Layers of Earth: Crust (where we live) · Mantle (magma) · Core (hot metal)</span>
                  <span className="text-amber-400 font-semibold">Textbook Page 3</span>
                </div>
              </div>
            )}

            {/* Core Lesson Text */}
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 mb-6">
              <p className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100/60">
                {lang === 'en' ? activeSection.content : activeSection.contentMl || activeSection.content}
              </p>

              {/* Bullet Points */}
              {activeSection.bulletPoints && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {lang === 'en' ? 'Key Learning Takeaways:' : 'പ്രധാന ആശയങ്ങൾ:'}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                    {(lang === 'en' ? activeSection.bulletPoints : activeSection.bulletPointsMl || activeSection.bulletPoints).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Interactive Embedded Activities according to Section */}
            {activeSection.interactiveType === 'classifier' && (
              <div className="my-6">
                <MineralClassifier lang={lang} />
              </div>
            )}

            {activeSection.interactiveType === 'rock-detective' && (
              <div className="my-6">
                <RockDetective lang={lang} />
              </div>
            )}

            {activeSection.interactiveType === 'use-matcher' && (
              <div className="my-6">
                <UseMatcher lang={lang} />
              </div>
            )}

            {activeSection.interactiveType === 'debate' && (
              <div className="my-6 space-y-6">
                <FossilFuelDebate lang={lang} />
                <VocabularyDeck lang={lang} />
              </div>
            )}

            {/* Bottom Section Navigator */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => setActiveSectionIdx(i => Math.max(0, i - 1))}
                disabled={activeSectionIdx === 0}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Previous Section' : 'മുൻപത്തെ ഭാഗം'}</span>
              </button>

              {activeSectionIdx < chapter.sections.length - 1 ? (
                <button
                  onClick={() => setActiveSectionIdx(i => Math.min(chapter.sections.length - 1, i + 1))}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>{lang === 'en' ? 'Next Section' : 'അടുത്ത ഭാഗം'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenQuiz('rocks-minerals-ch1')}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Trophy className="w-4 h-4 text-white" />
                  <span>{lang === 'en' ? 'Start Chapter Quiz' : 'ക്വിസ് എഴുതാം'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Specimen Gallery Component */}
      <div className="my-12">
        <RockCardShowcase lang={lang} />
      </div>
    </div>
  );
};
