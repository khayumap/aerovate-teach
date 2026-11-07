import React, { useState } from 'react';
import { Flame, Sun, ThumbsUp, Users, Sparkles } from 'lucide-react';
import { Language } from '../types';

export const FossilFuelDebate: React.FC<{ lang: Language }> = ({ lang }) => {
  const [votesA, setVotesA] = useState(14);
  const [votesB, setVotesB] = useState(11);
  const [hasVoted, setHasVoted] = useState<'A' | 'B' | null>(null);

  const handleVote = (side: 'A' | 'B') => {
    if (hasVoted === side) return;
    if (side === 'A') {
      setVotesA(v => v + 1);
      if (hasVoted === 'B') setVotesB(v => v - 1);
    } else {
      setVotesB(v => v + 1);
      if (hasVoted === 'A') setVotesA(v => v - 1);
    }
    setHasVoted(side);
  };

  const total = votesA + votesB;
  const pctA = Math.round((votesA / total) * 100);
  const pctB = Math.round((votesB / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 bg-green-100 text-green-800 rounded-lg">
          <Users className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {lang === 'en' ? 'Learn Actively 2: Fuel for Thought (Mini Debate)' : 'മിനി ഡിബേറ്റ്: ഫോസിൽ ഇന്ധനങ്ങൾ'}
          </h4>
          <span className="text-[11px] text-slate-500">
            {lang === 'en' ? 'From Textbook Page 7 · Class 5 Discussion' : 'ക്ലാസ് 5 ചർച്ചാ വേദി'}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        {lang === 'en'
          ? 'Organize a classroom debate! Which group viewpoint do you agree with? Tap to cast your Class 5 vote.'
          : 'ക്ലാസിൽ രണ്ടു ഗ്രൂപ്പുകളായി ചർച്ച ചെയ്യാം. നിങ്ങളുടെ അഭിപ്രായം വോട്ട് ചെയ്യുക!'}
      </p>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Group A: Reduce Fossil Fuels */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          hasVoted === 'A' ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
              <Sun className="w-4 h-4 text-emerald-600" />
              <span>Group A: Switch to Green Energy</span>
            </div>
            <span className="text-xs font-bold text-emerald-700">{pctA}% ({votesA})</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-1 mb-3">
            <li>• Fossil fuels take millions of years to form and will run out.</li>
            <li>• Smoke from burning coal and petrol causes air pollution & smog.</li>
            <li>• Kerala has abundant sunshine and wind for clean solar power!</li>
          </ul>
          <button
            onClick={() => handleVote('A')}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
              hasVoted === 'A'
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{hasVoted === 'A' ? 'You Voted Group A' : 'Vote for Group A'}</span>
          </button>
        </div>

        {/* Group B: Need Fossil Fuels for Daily Life */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          hasVoted === 'B' ? 'border-amber-500 bg-amber-50/50 shadow-md' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-950">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Group B: Essential for Modern Life</span>
            </div>
            <span className="text-xs font-bold text-amber-800">{pctB}% ({votesB})</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-1 mb-3">
            <li>• Cooking gas (LPG) feeds our families every morning cleanly.</li>
            <li>• Aeroplanes, cargo ships, and buses currently need jet fuel and diesel.</li>
            <li>• Steel mills and heavy industries still rely on coal heat.</li>
          </ul>
          <button
            onClick={() => handleVote('B')}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
              hasVoted === 'B'
                ? 'bg-amber-600 text-white'
                : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{hasVoted === 'B' ? 'You Voted Group B' : 'Vote for Group B'}</span>
          </button>
        </div>
      </div>

      {/* Balanced Resolution */}
      <div className="mt-3 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
        <strong>Teacher Anitha’s Golden Rule:</strong>{' '}
        {lang === 'en'
          ? 'Both sides are right! While we currently need fossil fuels to power vehicles and cooking, we must strictly avoid wasting energy, walk short distances, and actively transition our homes to solar power!'
          : 'രണ്ടു വാദങ്ങളും പ്രധാനമാണ്! ഇന്ധനങ്ങൾ പാഴാക്കാതെ ഉപയോഗിക്കുകയും ക്രമേണ സൗരോർജ്ജത്തിലേക്ക് മാറുകയും വേണം.'}
      </div>
    </div>
  );
};
