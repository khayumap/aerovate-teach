import React, { useState } from 'react';
import { Sparkles, Send, Bot, Phone, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface AiDoubtHelperProps {
  lang: Language;
  onOpenWhatsApp: () => void;
}

const COMMON_DOUBTS = [
  { en: 'Why does pumice stone float on water?', ml: 'പ്യൂമിസ് കല്ല് എന്തുകൊണ്ടാണ് വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കുന്നത്?' },
  { en: 'What is the difference between Magma and Lava?', ml: 'മാഗ്മയും ലാവയും തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?' },
  { en: 'Why is diamond so hard compared to talc?', ml: 'വജ്രം ഇത്ര കടുപ്പമുള്ളതും ടാൽക് മൃദുവായതും എന്തുകൊണ്ട്?' },
  { en: 'How are fossils formed in sedimentary rocks?', ml: 'അവസാദ ശിലകളിൽ ഫോസിലുകൾ ഉണ്ടാകുന്നത് എങ്ങനെ?' }
];

export const AiDoubtHelper: React.FC<AiDoubtHelperProps> = ({ lang, onOpenWhatsApp }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (qText: string) => {
    if (!qText.trim()) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch('/api/ai/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: qText, lang })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer(
        lang === 'en'
          ? 'Network error. Please ask Mrs. Jesni directly on WhatsApp at +91 7736419753!'
          : 'ടീച്ചറോട് വാട്സ്ആപ്പിൽ ചോദിക്കാം: +91 7736419753!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/50 rounded-2xl border border-indigo-100 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Science AI Helper for Class 5A & 5B' : 'സയൻസ് എ.ഐ ഹെൽപ്പർ (ക്ലാസ് 5A & 5B)'}
            </h3>
            <span className="text-[11px] text-slate-500">
              Powered by Mrs. Jesni’s Science Curriculum & Gemini
            </span>
          </div>
        </div>

        <button
          onClick={onOpenWhatsApp}
          className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Ask Mrs. Jesni on WhatsApp</span>
        </button>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3">
        {COMMON_DOUBTS.map((d, i) => (
          <button
            key={i}
            onClick={() => {
              const text = lang === 'en' ? d.en : d.ml;
              setQuestion(text);
              handleAsk(text);
            }}
            className="text-[11px] bg-white border border-indigo-200 hover:border-indigo-400 text-slate-700 font-medium px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 transition-all hover:bg-indigo-50/50"
          >
            💬 {lang === 'en' ? d.en : d.ml}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk(question)}
          placeholder={lang === 'en' ? 'Ask any Class 5 Science question...' : 'സയൻസിലെ എന്തും ചോദിക്കൂ...'}
          className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
        />
        <button
          onClick={() => handleAsk(question)}
          disabled={loading || !question.trim()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{loading ? 'Thinking...' : 'Ask AI'}</span>
        </button>
      </div>

      {/* Answer Display */}
      {answer && (
        <div className="mt-4 p-4 rounded-xl bg-white border border-indigo-200 shadow-sm text-xs leading-relaxed text-slate-800 animate-fade-in">
          <div className="flex items-center gap-2 mb-2 font-bold text-indigo-900 border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Answer for Class 5 Student:</span>
          </div>
          <p className="whitespace-pre-line text-slate-700">{answer}</p>
        </div>
      )}
    </div>
  );
};
