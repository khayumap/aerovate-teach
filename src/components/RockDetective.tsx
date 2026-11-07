import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Search, HelpCircle, CheckCircle, RefreshCw, Trophy } from 'lucide-react';
import { Language } from '../types';

interface DetectiveCase {
  id: string;
  name: string;
  nameMl: string;
  family: 'Igneous' | 'Sedimentary' | 'Metamorphic';
  clues: { en: string; ml: string }[];
  yesNoQuestions: {
    question: { en: string; ml: string };
    answer: boolean;
    reason: { en: string; ml: string };
  }[];
  revealedInfo: { en: string; ml: string };
}

const CASES: DetectiveCase[] = [
  {
    id: 'case_pumice',
    name: 'Pumice',
    nameMl: 'പ്യൂമിസ് കല്ല്',
    family: 'Igneous',
    clues: [
      { en: 'I am formed from frothy volcanic lava that cooled in a flash.', ml: 'അഗ്നിപർവ്വത ലാവ അതിവേഗം തണുത്തുറഞ്ഞാണ് ഞാൻ ഉണ്ടാകുന്നത്.' },
      { en: 'I am filled with thousands of tiny gas bubbles and feel like a lightweight sponge.', ml: 'എന്റെ ഉള്ളിൽ ആയിരക്കണക്കിന് ചെറിയ വായുകുമിളകളുണ്ട്. ഭാരം വളരെ കുറവാണ്.' },
      { en: 'I possess a magical superpower: I can easily FLOAT on water!', ml: 'എനിക്ക് ഒരു പ്രത്യേകതയുണ്ട്: എനിക്ക് വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കാൻ കഴിയും!' }
    ],
    yesNoQuestions: [
      {
        question: { en: 'Do you sink when thrown into a bucket of water?', ml: 'വെള്ളത്തിൽ ഇട്ടാൽ താഴ്ന്നു പോകുമോ?' },
        answer: false,
        reason: { en: 'No! Because of my trapped air holes, I float like a cork.', ml: 'ഇല്ല! വായുകുമിളകൾ ഉള്ളതുകൊണ്ട് ഞാൻ വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കും.' }
      },
      {
        question: { en: 'Are you an Igneous rock born from volcanic fire?', ml: 'നിങ്ങൾ അഗ്നിപർവ്വതത്തിൽ നിന്ന് ഉണ്ടായ ആഗ്നേയ ശിലയാണോ?' },
        answer: true,
        reason: { en: 'Yes! Formed from boiling lava blown into the air.', ml: 'അതെ! വായുവിൽ തെറിച്ചുവീണ ചൂടുള്ള ലാവയിൽ നിന്നാണ് ഉണ്ടായത്.' }
      },
      {
        question: { en: 'Are you used in bathrooms to scrub feet?', ml: 'ശരീരവും കാലും ഉരച്ച് കഴുകാൻ ഉപയോഗിക്കാറുണ്ടോ?' },
        answer: true,
        reason: { en: 'Yes! My rough porous surface is great for exfoliating.', ml: 'അതെ! സ്ക്രബ്ബറായി ഉപയോഗിക്കുന്നു.' }
      }
    ],
    revealedInfo: {
      en: 'Pumice is an igneous rock formed when gas-rich lava erupts and cools so quickly that the bubbles are frozen in time!',
      ml: 'വായുകുമിളകൾ നിറഞ്ഞ ലാവ അതിവേഗം തണുത്തുറഞ്ഞുണ്ടാകുന്ന ആഗ്നേയ ശിലയാണ് പ്യൂമിസ്.'
    }
  },
  {
    id: 'case_obsidian',
    name: 'Obsidian',
    nameMl: 'ഒബ്സീഡിയൻ',
    family: 'Igneous',
    clues: [
      { en: 'I am also known as "nature\'s dark volcanic glass".', ml: 'പ്രകൃതിദത്ത അഗ്നിപർവ്വത ഗ്ലാസ് എന്നാണ് ഞാൻ അറിയപ്പെടുന്നത്.' },
      { en: 'I cool so rapidly that no mineral crystals have time to grow.', ml: 'അതിവേഗം തണുക്കുന്നതിനാൽ പരലുകൾ രൂപപ്പെടാൻ സമയം ലഭിക്കാറില്ല.' },
      { en: 'When fractured, I have razor-sharp curved edges used in ancient arrowheads and modern surgery scalpels.', ml: 'മുറിച്ചുമാറ്റുമ്പോൾ മൂർച്ചയേറിയ അരികുകൾ ഉള്ളതിനാൽ ശസ്ത്രക്രിയയ്ക്കും ആയുധങ്ങൾക്കും ഉപയോഗിക്കുന്നു.' }
    ],
    yesNoQuestions: [
      {
        question: { en: 'Are you shiny and black like tinted glass?', ml: 'നിങ്ങൾ കറുത്ത തിളക്കമുള്ള ഗ്ലാസ് പോലെയാണോ?' },
        answer: true,
        reason: { en: 'Yes! Smooth, jet-black, and glossy.', ml: 'അതെ! കറുത്ത ഗ്ലാസ് പോലെ തിളക്കമുള്ളതാണ്.' }
      },
      {
        question: { en: 'Are you formed deep under the ground over millions of years?', ml: 'ഭൂമിക്കടിയിൽ ദശലക്ഷക്കണക്കിന് വർഷം കൊണ്ടാണ് നിങ്ങൾ ഉണ്ടായത്?' },
        answer: false,
        reason: { en: 'No, I cool in mere minutes on the surface!', ml: 'അല്ല, ഉപരിതലത്തിൽ നിമിഷങ്ങൾ കൊണ്ടാണ് തണുക്കുന്നത്!' }
      },
      {
        question: { en: 'Do you have sharp edges capable of cutting?', ml: 'മുറിക്കാൻ തക്ക മൂർച്ചയുള്ള അരികുകൾ ഉണ്ടോ?' },
        answer: true,
        reason: { en: 'Yes! Sharper than many surgical blades.', ml: 'അതെ! വളരെ മൂർച്ചയുള്ളതാണ്.' }
      }
    ],
    revealedInfo: {
      en: 'Obsidian forms when lava cools with high silica content and virtually zero crystal growth, producing smooth volcanic glass.',
      ml: 'സിലിക്ക അടങ്ങിയ ലാവ അതിവേഗം തണുക്കുമ്പോൾ പരലുകൾ ഇല്ലാതെ ഗ്ലാസ് പോലെ ഉണ്ടാകുന്നതാണ് ഒബ്സീഡിയൻ.'
    }
  },
  {
    id: 'case_marble',
    name: 'Marble',
    nameMl: 'മാർബിൾ (വെണ്ണക്കല്ല്)',
    family: 'Metamorphic',
    clues: [
      { en: 'I used to be ordinary limestone at the bottom of the sea.', ml: 'പണ്ട് ഞാൻ കടലിന്റെ അടിത്തട്ടിലെ സാധാരണ ചുണ്ണാമ്പുകല്ല് ആയിരുന്നു.' },
      { en: 'Immense subterranean heat and pressure transformed me into a crystalline stone.', ml: 'ഭൂമിക്കടിയിലെ കൊടും ചൂടും മർദ്ദവും എന്നെ മനോഹരമായ കല്ലാക്കി മാറ്റി.' },
      { en: 'Emperor Shah Jahan selected me to build the majestic white Taj Mahal in Agra!', ml: 'ആഗ്രയിലെ പ്രസിദ്ധമായ താജ്മഹൽ നിർമ്മിക്കാൻ ഷാജഹാൻ ചക്രവർത്തി തിരഞ്ഞെടുത്തത് എന്നെയാണ്!' }
    ],
    yesNoQuestions: [
      {
        question: { en: 'Can you be polished to a mirror-like royal shine?', ml: 'നിങ്ങളെ കണ്ണാടി പോലെ തിളക്കമുള്ളതാക്കി മാറ്റാൻ കഴിയുമോ?' },
        answer: true,
        reason: { en: 'Yes! That is why luxury palaces and temples use me.', ml: 'അതെ! കൊട്ടാരങ്ങളിലും ക്ഷേത്രങ്ങളിലും എന്നെ ഉപയോഗിക്കുന്നു.' }
      },
      {
        question: { en: 'Are you an Igneous rock directly made of lava?', ml: 'നിങ്ങൾ ലാവയിൽ നിന്ന് നേരിട്ടുണ്ടായ ആഗ്നേയ ശിലയാണോ?' },
        answer: false,
        reason: { en: 'No, I am Metamorphic—transformed from sedimentary limestone!', ml: 'അല്ല, ഞാൻ ചുണ്ണാമ്പുകല്ല് മാറിയുണ്ടായ കായാന്തരിത ശിലയാണ്!' }
      },
      {
        question: { en: 'Are statues and monuments carved out of you?', ml: 'ശിൽപ്പങ്ങളും സ്മാരകങ്ങളും നിങ്ങളിൽ കൊത്തിയുണ്ടാക്കാറുണ്ടോ?' },
        answer: true,
        reason: { en: 'Yes, I am a favorite stone for sculptors worldwide.', ml: 'അതെ, ശിൽപ്പികൾക്ക് പ്രിയപ്പെട്ട കല്ലാണ്.' }
      }
    ],
    revealedInfo: {
      en: 'Marble is a metamorphic rock composed of recrystallized calcite minerals, transformed from limestone under deep tectonic pressures.',
      ml: 'ചുണ്ണാമ്പുകല്ലിന് ഭൂമിക്കടിയിലെ മർദ്ദവും ചൂടും കാരണം ഉണ്ടാകുന്ന കായാന്തരിത ശിലയാണ് മാർബിൾ.'
    }
  }
];

const ALL_ROCK_OPTIONS = [
  'Granite', 'Pumice', 'Basalt', 'Obsidian',
  'Sandstone', 'Limestone', 'Shale', 'Marble', 'Slate', 'Quartzite'
];

export const RockDetective: React.FC<{ lang: Language }> = ({ lang }) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState<number[]>([]);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [score, setScore] = useState(0);

  const currentCase = CASES[caseIndex];

  const handleAsk = (idx: number) => {
    if (!askedQuestions.includes(idx)) {
      setAskedQuestions(prev => [...prev, idx]);
    }
  };

  const handleGuess = (guess: string) => {
    setSelectedGuess(guess);
    if (guess.toLowerCase() === currentCase.name.toLowerCase()) {
      setIsSolved(true);
      setScore(s => s + 10);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleNextCase = () => {
    const nextIdx = (caseIndex + 1) % CASES.length;
    setCaseIndex(nextIdx);
    setAskedQuestions([]);
    setSelectedGuess(null);
    setIsSolved(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <Search className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'en' ? 'Learn Actively 1: Rock Detective Challenge' : 'റോക്ക് ഡിറ്റക്ടീവ് ചലഞ്ച്'}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {lang === 'en'
              ? 'Can you identify the mysterious rock from your textbook clues? Ask up to 3 Yes/No questions!'
              : 'രഹസ്യ പാറയെ കണ്ടെത്തൂ! 3 അതെ/അല്ല ചോദ്യങ്ങൾ ചോദിക്കാൻ സാധിക്കും.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-900">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Detective Score: {score} pts</span>
          </div>
          <button
            onClick={handleNextCase}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{lang === 'en' ? 'Next Mystery Rock' : 'അടുത്ത പാറ'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Clues and Yes/No Investigation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'en' ? 'Case File Clues:' : 'കേസ് ഫയൽ സൂചനകൾ:'}
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {currentCase.clues.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">#{i + 1}</span>
                  <span>{lang === 'en' ? c.en : c.ml}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 Yes/No Questions */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
              <span>{lang === 'en' ? 'Ask Detective Yes/No Questions:' : 'ചോദ്യങ്ങൾ ചോദിക്കുക:'}</span>
              <span className="text-[11px] text-slate-500">{askedQuestions.length}/3 asked</span>
            </div>

            <div className="space-y-2">
              {currentCase.yesNoQuestions.map((q, idx) => {
                const isAsked = askedQuestions.includes(idx);
                return (
                  <div key={idx} className="border border-slate-200 rounded-lg p-2.5 bg-white">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs font-semibold text-slate-800">
                        ❓ {lang === 'en' ? q.question.en : q.question.ml}
                      </div>
                      {!isAsked ? (
                        <button
                          onClick={() => handleAsk(idx)}
                          className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white rounded transition-colors shrink-0"
                        >
                          {lang === 'en' ? 'Ask This' : 'ചോദിക്കൂ'}
                        </button>
                      ) : (
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          q.answer ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {q.answer ? (lang === 'en' ? 'YES ✔' : 'അതെ ✔') : (lang === 'en' ? 'NO ✖' : 'അല്ല ✖')}
                        </span>
                      )}
                    </div>

                    {isAsked && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[11px] text-slate-600 italic">
                        💬 {lang === 'en' ? q.reason.en : q.reason.ml}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Suspect Lineup (Guessing Buttons) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 mb-2">
              {lang === 'en' ? 'Which rock is this? Tap your guess:' : 'ഏതാണ് ഈ പാറ? തിരഞ്ഞെടുക്കുക:'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ALL_ROCK_OPTIONS.map(rock => {
                const isCorrect = isSolved && rock.toLowerCase() === currentCase.name.toLowerCase();
                const isWrong = selectedGuess === rock && !isCorrect;
                return (
                  <button
                    key={rock}
                    disabled={isSolved}
                    onClick={() => handleGuess(rock)}
                    className={`py-2 px-2.5 text-xs font-bold rounded-lg border transition-all text-left flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                        : isWrong
                        ? 'bg-red-50 text-red-700 border-red-300 line-through'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    <span>{rock}</span>
                    {isCorrect && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {isSolved && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
              <div className="font-bold text-xs text-emerald-900 mb-1 flex items-center gap-1.5">
                <span>🎉 Case Solved! It is {currentCase.name}!</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                {lang === 'en' ? currentCase.revealedInfo.en : currentCase.revealedInfo.ml}
              </p>
              <button
                onClick={handleNextCase}
                className="mt-2.5 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                {lang === 'en' ? 'Play Next Case' : 'അടുത്ത കേസ് കളിക്കുക'}
              </button>
            </div>
          )}

          {selectedGuess && !isSolved && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
              {lang === 'en'
                ? `Not quite ${selectedGuess}! Try asking another question or reviewing clues.`
                : 'ശരിയല്ല, വീണ്ടും ശ്രമിക്കൂ!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
