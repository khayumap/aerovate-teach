import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface MineralItem {
  id: string;
  name: string;
  nameMl: string;
  correctType: 'Metallic' | 'Non-Metallic';
  hint: string;
  hintMl: string;
  icon: string;
  sourceTextbook: string;
}

const MINERALS_LIST: MineralItem[] = [
  { id: 'iron', name: 'Iron (from Haematite)', nameMl: 'ഇരുമ്പ് (ഹേമറ്റൈറ്റ്)', correctType: 'Metallic', hint: 'Used to make steel bridges and vehicle frames.', hintMl: 'സ്റ്റീൽ, പാലങ്ങൾ, വാഹനങ്ങൾ എന്നിവയ്ക്ക് ഉപയോഗിക്കുന്നു.', icon: '🏗️', sourceTextbook: 'Textbook Page 2' },
  { id: 'copper', name: 'Copper', nameMl: 'ചെമ്പ്', correctType: 'Metallic', hint: 'Super electric conductor used in wires & coins.', hintMl: 'വൈദ്യുത കമ്പികളിലും നാണയങ്ങളിലും ഉപയോഗിക്കുന്നു.', icon: '⚡', sourceTextbook: 'Textbook Page 2' },
  { id: 'gold', name: 'Gold & Silver', nameMl: 'സ്വർണ്ണവും വെള്ളിയും', correctType: 'Metallic', hint: 'Precious shiny metals that do not rust.', hintMl: 'തുരുമ്പെടുക്കാത്ത അമൂല്യ തിളങ്ങുന്ന ലോഹം.', icon: '💍', sourceTextbook: 'Textbook Page 2' },
  { id: 'aluminium', name: 'Aluminium (from Bauxite)', nameMl: 'അലുമിനിയം (ബോക്സൈറ്റ്)', correctType: 'Metallic', hint: 'Lightweight metal extracted from bauxite for aeroplanes and utensils.', hintMl: 'ബോക്സൈറ്റിൽ നിന്ന് ലഭിക്കുന്ന ഭാരം കുറഞ്ഞ ലോഹം.', icon: '✈️', sourceTextbook: 'Textbook Page 2' },
  { id: 'diamond', name: 'Diamond', nameMl: 'വജ്രം (ഡയമണ്ട്)', correctType: 'Non-Metallic', hint: 'The hardest known natural mineral on Earth, carbon crystal.', hintMl: 'ഭൂമിയിലെ ഏറ്റവും കഠിനമായ പ്രകൃതിദത്ത ധാതു.', icon: '💎', sourceTextbook: 'Textbook Page 2' },
  { id: 'quartz', name: 'Quartz', nameMl: 'ക്വാർട്സ്', correctType: 'Non-Metallic', hint: 'Used inside clocks and watches for precision time.', hintMl: 'ക്ലോക്കുകളിലും വാച്ചുകളിലും കൃത്യമായ സമയം നൽകുന്നു.', icon: '⌚', sourceTextbook: 'Textbook Page 2' },
  { id: 'talc', name: 'Talc', nameMl: 'ടാൽക്', correctType: 'Non-Metallic', hint: 'The softest mineral, used to make soothing body powder.', hintMl: 'ഏറ്റവും മൃദുവായ ധാതു, ടാൽക്കം പൗഡറിന് ഉപയോഗിക്കുന്നു.', icon: '🌸', sourceTextbook: 'Textbook Page 2' },
  { id: 'salt', name: 'Salt (Halite)', nameMl: 'ഉപ്പ് (ഹാലൈറ്റ്)', correctType: 'Non-Metallic', hint: 'Essential mineral for cooking and preserving foods.', hintMl: 'പാചകത്തിനും അച്ചാറുകൾ സൂക്ഷിക്കുന്നതിനും ഉപയോഗിക്കുന്നു.', icon: '🧂', sourceTextbook: 'Textbook Page 2' },
  { id: 'limestone', name: 'Limestone (Chalk)', nameMl: 'ചുണ്ണാമ്പുകല്ല് (ചോക്ക്)', correctType: 'Non-Metallic', hint: 'Made from calcite sea shells, raw material for cement & school chalk.', hintMl: 'സിമന്റും സ്കൂൾ ചോക്കും നിർമ്മിക്കാൻ ഉപയോഗിക്കുന്നു.', icon: '🏭', sourceTextbook: 'Textbook Page 2 & 4' }
];

export const MineralClassifier: React.FC<{ lang: Language }> = ({ lang }) => {
  const [metallicBox, setMetallicBox] = useState<MineralItem[]>([]);
  const [nonMetallicBox, setNonMetallicBox] = useState<MineralItem[]>([]);
  const [unassigned, setUnassigned] = useState<MineralItem[]>(MINERALS_LIST);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeHint, setActiveHint] = useState<MineralItem | null>(null);

  const handleAssign = (item: MineralItem, targetType: 'Metallic' | 'Non-Metallic') => {
    setUnassigned(prev => prev.filter(m => m.id !== item.id));
    if (targetType === 'Metallic') {
      setMetallicBox(prev => [...prev.filter(m => m.id !== item.id), item]);
      setNonMetallicBox(prev => prev.filter(m => m.id !== item.id));
    } else {
      setNonMetallicBox(prev => [...prev.filter(m => m.id !== item.id), item]);
      setMetallicBox(prev => prev.filter(m => m.id !== item.id));
    }
  };

  const checkAnswers = () => {
    let wrongCount = 0;
    metallicBox.forEach(m => {
      if (m.correctType !== 'Metallic') wrongCount++;
    });
    nonMetallicBox.forEach(m => {
      if (m.correctType !== 'Non-Metallic') wrongCount++;
    });

    if (unassigned.length > 0) {
      setFeedback(lang === 'en' ? `Please sort all ${MINERALS_LIST.length} minerals!` : 'എല്ലാ ധാതുക്കളെയും പെട്ടികളിലേക്ക് തരംതിരിക്കൂ!');
      return;
    }

    if (wrongCount === 0) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setFeedback(lang === 'en' ? '🎉 Perfect Score! All minerals correctly classified!' : '🎉 അഭിനന്ദനങ്ങൾ! എല്ലാ ധാതുക്കളെയും കൃത്യമായി തരംതിരിച്ചു!');
    } else {
      setFeedback(lang === 'en' ? `Almost there! ${wrongCount} mineral(s) need another look.` : `ശ്രമിക്കൂ! ${wrongCount} ധാതുക്കൾ മാറിയിട്ടുണ്ട്.`);
    }
  };

  const handleReset = () => {
    setMetallicBox([]);
    setNonMetallicBox([]);
    setUnassigned(MINERALS_LIST);
    setFeedback(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-5 border border-blue-100 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔬</span>
            <h3 className="text-base font-bold text-blue-950">
              {lang === 'en' ? 'Quick Check 1: Mineral Sorting Game' : 'ക്വിക്ക് ചെക്ക് 1: ധാതു തരംതിരിക്കൽ കളി'}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {lang === 'en'
              ? 'Tap "Metallic" or "Non-Metallic" to classify each mineral from your Class 5 textbook!'
              : 'ഓരോ ധാതുവിനെയും ലോഹ ധാതുവിലോ അലോഹ ധാതുവിലോ ഉൾപ്പെടുത്താൻ താഴെയുള്ള ബട്ടണുകൾ അമർത്തുക!'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={checkAnswers}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Check Answers' : 'ശരിയാണോ എന്ന് നോക്കാം'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-center justify-between ${
          feedback.includes('Perfect') || feedback.includes('അഭിനന്ദനങ്ങൾ')
            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            : 'bg-amber-100 text-amber-900 border border-amber-300'
        }`}>
          <span>{feedback}</span>
        </div>
      )}

      {/* Unsorted Minerals Tray */}
      {unassigned.length > 0 && (
        <div className="mb-5 bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span>{lang === 'en' ? 'Minerals to Classify:' : 'തരംതിരിക്കാനുള്ള ധാതുക്കൾ:'}</span>
            <span className="text-[11px] font-normal text-slate-500">{unassigned.length} remaining</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {unassigned.map(item => (
              <div
                key={item.id}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50/50 transition-colors flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{lang === 'en' ? item.name : item.nameMl}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{lang === 'en' ? item.hint : item.hintMl}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveHint(activeHint?.id === item.id ? null : item)}
                    className="text-slate-400 hover:text-blue-600 p-0.5"
                    title="View hint"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => handleAssign(item, 'Metallic')}
                    className="py-1 px-2 text-[11px] font-medium rounded bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-800 transition-colors"
                  >
                    {lang === 'en' ? '● Metallic' : 'ലോഹം'}
                  </button>
                  <button
                    onClick={() => handleAssign(item, 'Non-Metallic')}
                    className="py-1 px-2 text-[11px] font-medium rounded bg-amber-100 hover:bg-amber-600 hover:text-white text-amber-900 transition-colors"
                  >
                    {lang === 'en' ? '▲ Non-Metallic' : 'അലോഹം'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sorting Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metallic Bucket */}
        <div className="bg-white rounded-xl p-3.5 border-2 border-blue-300 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              <h4 className="font-bold text-xs text-blue-900">
                {lang === 'en' ? 'Metallic Minerals (ലോഹ ധാതുക്കൾ)' : 'ലോഹ ധാതുക്കൾ (Metallic Minerals)'}
              </h4>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              {metallicBox.length} items
            </span>
          </div>

          <div className="min-h-[110px] space-y-1.5">
            {metallicBox.length === 0 ? (
              <div className="h-24 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                {lang === 'en' ? 'Tap "+ Metallic" above to place minerals here' : 'ധാതുക്കളെ ഇവിടെ ചേർക്കുക'}
              </div>
            ) : (
              metallicBox.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-blue-50/70 border border-blue-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="font-semibold text-blue-950">{lang === 'en' ? item.name : item.nameMl}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMetallicBox(prev => prev.filter(m => m.id !== item.id));
                      setUnassigned(prev => [...prev, item]);
                    }}
                    className="text-[11px] text-slate-400 hover:text-red-500 font-bold px-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Non-Metallic Bucket */}
        <div className="bg-white rounded-xl p-3.5 border-2 border-amber-300 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <h4 className="font-bold text-xs text-amber-950">
                {lang === 'en' ? 'Non-Metallic Minerals (അലോഹ ധാതുക്കൾ)' : 'അലോഹ ധാതുക്കൾ (Non-Metallic)'}
              </h4>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
              {nonMetallicBox.length} items
            </span>
          </div>

          <div className="min-h-[110px] space-y-1.5">
            {nonMetallicBox.length === 0 ? (
              <div className="h-24 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                {lang === 'en' ? 'Tap "+ Non-Metallic" above to place minerals here' : 'ധാതുക്കളെ ഇവിടെ ചേർക്കുക'}
              </div>
            ) : (
              nonMetallicBox.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-amber-50/70 border border-amber-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="font-semibold text-amber-950">{lang === 'en' ? item.name : item.nameMl}</span>
                  </div>
                  <button
                    onClick={() => {
                      setNonMetallicBox(prev => prev.filter(m => m.id !== item.id));
                      setUnassigned(prev => [...prev, item]);
                    }}
                    className="text-[11px] text-slate-400 hover:text-red-500 font-bold px-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
