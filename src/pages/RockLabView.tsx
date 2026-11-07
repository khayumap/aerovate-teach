import React, { useState } from 'react';
import { Sparkles, Phone, ArrowLeft, Trophy, Search, CheckCircle } from 'lucide-react';
import { Language, Student } from '../types';
import { MineralClassifier } from '../components/MineralClassifier';
import { RockDetective } from '../components/RockDetective';
import { UseMatcher } from '../components/UseMatcher';
import { RockCardShowcase } from '../components/RockCardShowcase';
import { VocabularyDeck } from '../components/VocabularyDeck';
import { FossilFuelDebate } from '../components/FossilFuelDebate';

interface RockLabViewProps {
  lang: Language;
  currentStudent?: Student;
  onOpenWhatsApp: () => void;
  onOpenQuiz: (quizId: string) => void;
  onBackToHome: () => void;
}

export const RockLabView: React.FC<RockLabViewProps> = ({
  lang,
  currentStudent,
  onOpenWhatsApp,
  onOpenQuiz,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'classifier' | 'detective' | 'matcher' | 'fossil'>('gallery');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Back to Main School Desk' : 'പ്രധാന പേജിലേക്ക് മടങ്ങാം'}</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Class 5 Science Interactive Workshop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'en' ? 'The Geological Rock & Mineral Laboratory' : 'ഭൂമിശാസ്ത്ര റോക്ക് ലാബ്'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'Hands-on experiential learning for Class 5 students in Kerala. Inspect real mineral specimens, test your rock detective instincts, and match ancient stones with monuments!'
              : 'ക്ലാസ് 5 പാഠപുസ്തകത്തിലെ എല്ലാ പ്രവർത്തനങ്ങളും ഇവിടെ നേരിട്ട് ചെയ്തു പഠിക്കാം.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenQuiz('rocks-minerals-ch1')}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-amber-900" />
            <span>Take Grand Quiz</span>
          </button>

          <button
            onClick={onOpenWhatsApp}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Teacher: 7736419753</span>
          </button>
        </div>
      </div>

      {/* Lab Nav Segmented Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'gallery' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? '💎 Specimen Gallery' : '💎 പാറ ഗാലറി'}
        </button>
        <button
          onClick={() => setActiveTab('classifier')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'classifier' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? '🔬 Mineral Sorting Game (Quick Check 1)' : '🔬 ധാതു തരംതിരിക്കൽ'}
        </button>
        <button
          onClick={() => setActiveTab('detective')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'detective' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? '🔍 Rock Detective (Page 6)' : '🔍 റോക്ക് ഡിറ്റക്ടീവ്'}
        </button>
        <button
          onClick={() => setActiveTab('matcher')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'matcher' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? '🧩 Rock Uses Matcher (Quick Check 2)' : '🧩 ഉപയോഗങ്ങൾ യോജിപ്പിക്കാം'}
        </button>
        <button
          onClick={() => setActiveTab('fossil')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'fossil' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? '⛽ Fossil Fuels & Glossary' : '⛽ ഫോസിൽ ഇന്ധനങ്ങൾ'}
        </button>
      </div>

      {/* Lab Station Views */}
      <div>
        {activeTab === 'gallery' && <RockCardShowcase lang={lang} />}
        {activeTab === 'classifier' && <MineralClassifier lang={lang} />}
        {activeTab === 'detective' && <RockDetective lang={lang} />}
        {activeTab === 'matcher' && <UseMatcher lang={lang} />}
        {activeTab === 'fossil' && (
          <div className="space-y-6">
            <FossilFuelDebate lang={lang} />
            <VocabularyDeck lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
};
