import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface VocabCard {
  word: string;
  wordMl: string;
  pronunciation: string;
  definition: string;
  definitionMl: string;
  example: string;
  exampleMl: string;
  emoji: string;
}

const VOCAB_CARDS: VocabCard[] = [
  {
    word: 'Magma',
    wordMl: 'മാഗ്മ',
    pronunciation: 'MAG-muh',
    definition: 'Molten liquid rock stored deep under high temperature inside the Earth’s mantle.',
    definitionMl: 'ഭൂമിയുടെ മാന്റിലിനുള്ളിൽ കാണപ്പെടുന്ന അതിചൂടുള്ള ഉരുകിയ പാറ.',
    example: 'Magma stays under extreme pressure until a volcano allows it to escape.',
    exampleMl: 'അഗ്നിപർവ്വത വിസ്ഫോടനത്തിലൂടെ പുറത്തേക്ക് വരുന്നത് വരെ മാഗ്മ ഭൂമിക്കടിയിൽ തങ്ങിനിൽക്കുന്നു.',
    emoji: '🌋'
  },
  {
    word: 'Lava',
    wordMl: 'ലാവ',
    pronunciation: 'LAH-vuh',
    definition: 'Molten rock that has broken through the surface of Earth during a volcanic eruption.',
    definitionMl: 'അഗ്നിപർവ്വത വിസ്ഫോടനത്തിലൂടെ ഭൂമിയുടെ ഉപരിതലത്തിലേക്ക് ഒഴുകിയെത്തുന്ന ഉരുകിയ പാറ.',
    example: 'Red hot lava cools into dark basalt and glossy obsidian rocks.',
    exampleMl: 'ചുവന്ന ലാവ തണുത്തുറയുമ്പോൾ ബസാൾട്ട്, ഒബ്സീഡിയൻ പാറകൾ ഉണ്ടാകുന്നു.',
    emoji: '🔥'
  },
  {
    word: 'Minerals',
    wordMl: 'ധാതുക്കൾ',
    pronunciation: 'MIN-er-ulz',
    definition: 'Naturally occurring inorganic solid substances that are the building blocks of rocks.',
    definitionMl: 'പാറകൾ നിർമ്മിച്ചിരിക്കുന്ന പ്രകൃതിദത്ത ഘടകങ്ങൾ.',
    example: 'Quartz, haematite, diamond, and gold are all natural minerals.',
    exampleMl: 'ക്വാർട്സ്, വജ്രം, സ്വർണ്ണം എന്നിവയെല്ലാം ധാതുക്കളാണ്.',
    emoji: '💎'
  },
  {
    word: 'Ores',
    wordMl: 'അയിരുകൾ',
    pronunciation: 'ORZ',
    definition: 'Rocks that contain high, profitable quantities of valuable metals.',
    definitionMl: 'വിലപിടിപ്പുള്ള ലോഹങ്ങൾ ഉയർന്ന അളവിൽ അടങ്ങിയിട്ടുള്ള പാറകൾ.',
    example: 'Haematite is the ore of iron, and bauxite is the ore of aluminium.',
    exampleMl: 'ഇരുമ്പിന്റെ അയിരാണ് ഹേമറ്റൈറ്റ്, അലുമിനിയത്തിന്റെ അയിരാണ് ബോക്സൈറ്റ്.',
    emoji: '⛏️'
  },
  {
    word: 'Sediments',
    wordMl: 'അവസാദങ്ങൾ',
    pronunciation: 'SED-uh-muhnts',
    definition: 'Small pieces of weathered rock, sand, and mud carried and deposited by water and wind.',
    definitionMl: 'കാറ്റും മഴയും കാരണം പാറകൾ പൊടിഞ്ഞ് നദികളിലൂടെ അടിഞ്ഞുകൂടുന്ന തരികൾ.',
    example: 'River sediments slowly press together over millions of years to make sandstone.',
    exampleMl: 'നദീതീരത്തെ അവസാദങ്ങൾ ഉറഞ്ഞുകൂടി മണൽക്കല്ലായി മാറുന്നു.',
    emoji: '🌊'
  },
  {
    word: 'Fossil Fuels',
    wordMl: 'ഫോസിൽ ഇന്ധനങ്ങൾ',
    pronunciation: 'FOSS-il FYOO-elz',
    definition: 'Energy fuels like coal and petroleum formed from remains of ancient prehistoric plants and animals.',
    definitionMl: 'ദശലക്ഷക്കണക്കിന് വർഷങ്ങൾക്ക് മുൻപ് മണ്ണടിഞ്ഞുപോയ സസ്യങ്ങളിൽ നിന്നും ജീവികളിൽ നിന്നും ഉണ്ടായ ഇന്ധനങ്ങൾ.',
    example: 'Coal produces thermal electricity, while petroleum gives petrol and diesel.',
    exampleMl: 'കൽക്കരി വൈദ്യുതി നൽകുന്നു, പെട്രോളിയം പെട്രോളും ഡീസലും നൽകുന്നു.',
    emoji: '⛽'
  }
];

export const VocabularyDeck: React.FC<{ lang: Language }> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = VOCAB_CARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % VOCAB_CARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + VOCAB_CARDS.length) % VOCAB_CARDS.length);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/60 to-yellow-50 rounded-2xl border border-amber-200/80 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200/60">
        <div className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              {lang === 'en' ? 'New Words & Geological Glossary' : 'പുതിയ പദങ്ങൾ (Glossary)'}
            </h4>
            <span className="text-[11px] text-amber-800">
              {lang === 'en' ? 'From Textbook Page 7 · Tap card to flip!' : 'പാഠപുസ്തകത്തിലെ പ്രധാന വാക്കുകൾ'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1.5 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 text-amber-900 transition-colors"
            title="Previous"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-bold text-amber-900 px-1">
            {currentIndex + 1} / {VOCAB_CARDS.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 text-amber-900 transition-colors"
            title="Next"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer bg-white rounded-xl p-5 border-2 border-amber-300 shadow-md hover:border-amber-400 transition-all min-h-[160px] flex flex-col justify-between"
      >
        {!isFlipped ? (
          <div>
            <div className="flex items-center justify-between text-xs text-amber-600 font-semibold mb-2">
              <span>{current.pronunciation}</span>
              <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                {lang === 'en' ? 'Tap to see definition ↻' : 'അർത്ഥം കാണാൻ തൊടുക ↻'}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-4xl">{current.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{current.word}</h3>
                <div className="text-sm font-semibold text-blue-600">{current.wordMl}</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 italic">
              {lang === 'en' ? `Example: "${current.example}"` : `ഉദാഹരണം: "${current.exampleMl}"`}
            </p>
          </div>
        ) : (
          <div className="bg-amber-50/50 p-2 rounded-lg">
            <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Definition / ശാസ്ത്രീയ അർത്ഥം:' : 'ശാസ്ത്രീയ അർത്ഥം:'}
            </div>
            <p className="text-xs font-medium text-slate-800 leading-relaxed">
              {lang === 'en' ? current.definition : current.definitionMl}
            </p>
            <div className="mt-3 pt-2 border-t border-amber-200/60 text-[11px] text-blue-700 font-medium">
              Malayalam: {current.definitionMl}
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-400 text-right mt-2">
          {lang === 'en' ? 'Card ' + (currentIndex + 1) + ' of ' + VOCAB_CARDS.length : 'കാർഡ് ' + (currentIndex + 1)}
        </div>
      </div>
    </div>
  );
};
