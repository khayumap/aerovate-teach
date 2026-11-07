import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface MatchPair {
  id: string;
  rock: string;
  rockMl: string;
  use: string;
  useMl: string;
  correctRockId: string;
}

const ROCK_ITEMS = [
  { id: 'granite', name: 'Granite', nameMl: 'ഗ്രാനൈറ്റ്' },
  { id: 'pumice', name: 'Pumice', nameMl: 'പ്യൂമിസ് കല്ല്' },
  { id: 'limestone', name: 'Limestone', nameMl: 'ചുണ്ണാമ്പുകല്ല്' },
  { id: 'shale', name: 'Shale', nameMl: 'ഷെയ്ൽ' },
  { id: 'marble', name: 'Marble', nameMl: 'മാർബിൾ' },
  { id: 'quartzite', name: 'Quartzite', nameMl: 'ക്വാർട്സൈറ്റ്' },
];

const USE_ITEMS = [
  { id: 'pumice', text: 'Body scrubber and cosmetics', textMl: 'ശരീരം ഉരച്ചു കഴുകുന്ന സ്ക്രബ്ബർ, ക്രീമുകൾ' },
  { id: 'shale', text: 'Roof tiles and clay bricks', textMl: 'മേൽക്കൂര ടൈലുകൾ, ഇഷ്ടിക' },
  { id: 'granite', text: 'Kitchen counters and strong flooring', textMl: 'അടുക്കള സ്ലാബുകൾ, കഠിനമായ തറകൾ' },
  { id: 'quartzite', text: 'Glass and ceramic manufacturing', textMl: 'ഗ്ലാസ്, സിറാമിക് നിർമ്മാണം' },
  { id: 'limestone', text: 'School chalk and building cement', textMl: 'സ്കൂൾ ചോക്ക്, സിമന്റ്' },
  { id: 'marble', text: 'Taj Mahal, statues, and royal flooring', textMl: 'താജ്മഹൽ, ശിൽപ്പങ്ങൾ, മാർബിൾ തറ' },
];

export const UseMatcher: React.FC<{ lang: Language }> = ({ lang }) => {
  const [selectedRock, setSelectedRock] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [rockId: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectRock = (rockId: string) => {
    setSelectedRock(rockId);
  };

  const handleSelectUse = (useTargetId: string) => {
    if (!selectedRock) return;

    const newMatches = { ...matches, [selectedRock]: useTargetId };
    setMatches(newMatches);
    setSelectedRock(null);

    // Check if all 6 matched
    if (Object.keys(newMatches).length === ROCK_ITEMS.length) {
      const allCorrect = Object.entries(newMatches).every(([rockId, matchedUseId]) => rockId === matchedUseId);
      if (allCorrect) {
        setIsCompleted(true);
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedRock(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-amber-950">
            {lang === 'en' ? 'Quick Check 2: Match Rocks with Their Real Uses' : 'ക്വിക്ക് ചെക്ക് 2: പാറകളെ അവയുടെ ഉപയോഗങ്ങളുമായി യോജിപ്പിക്കൂ'}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            {lang === 'en'
              ? 'Select a rock on the left, then tap its correct real-world application on the right.'
              : 'ഇടതുവശത്തുനിന്ന് ഒരു പാറ തിരഞ്ഞെടുത്ത ശേഷം വലതുവശത്ത് അതിന്റെ ഉപയോഗത്തിൽ തൊടുക.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Reset Matches' : 'വീണ്ടും ചെയ്യുക'}</span>
        </button>
      </div>

      {isCompleted && (
        <div className="p-3 mb-4 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {lang === 'en'
              ? '🎉 Excellent! All 6 rock applications matched with 100% textbook precision!'
              : '🎉 അഭിനന്ദനങ്ങൾ! എല്ലാ പാറകളെയും ശരിയായ ഉപയോഗങ്ങളുമായി യോജിപ്പിച്ചു!'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Rocks */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Step 1: Choose Rock' : '1. പാറ തിരഞ്ഞെടുക്കൂ'}
          </div>
          {ROCK_ITEMS.map((rock, idx) => {
            const isSelected = selectedRock === rock.id;
            const matchedUseId = matches[rock.id];
            const isMatched = Boolean(matchedUseId);
            const isCorrect = isMatched && matchedUseId === rock.id;

            return (
              <button
                key={rock.id}
                onClick={() => handleSelectRock(rock.id)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                    : isMatched
                    ? isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-red-50 text-red-900 border-red-300'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{lang === 'en' ? rock.name : rock.nameMl}</span>
                </div>
                {isMatched && (
                  <span className="text-[10px] font-bold">
                    {isCorrect ? '✔ Matched' : '✖ Check'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Uses */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Step 2: Tap Matching Use' : '2. ഉപയോഗം തിരഞ്ഞെടുക്കൂ'}
          </div>
          {USE_ITEMS.map((useItem, idx) => {
            // Find which rock matched this use
            const matchedRockId = Object.keys(matches).find(k => matches[k] === useItem.id);
            const matchedRock = ROCK_ITEMS.find(r => r.id === matchedRockId);
            const isCorrect = matchedRockId === useItem.id;

            return (
              <button
                key={useItem.id}
                disabled={!selectedRock && !matchedRockId}
                onClick={() => handleSelectUse(useItem.id)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                  matchedRock
                    ? isCorrect
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-medium'
                      : 'bg-red-50 text-red-950 border-red-300 font-medium'
                    : selectedRock
                    ? 'bg-white text-slate-800 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer'
                    : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-900">
                    {lang === 'en' ? useItem.text : useItem.textMl}
                  </div>
                  {matchedRock && (
                    <div className="text-[10px] text-emerald-700 mt-0.5">
                      ↳ Connected to: {lang === 'en' ? matchedRock.name : matchedRock.nameMl}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
