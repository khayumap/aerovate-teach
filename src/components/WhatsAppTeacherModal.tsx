import React, { useState } from 'react';
import { X, Phone, MessageSquare, Send, School, Check } from 'lucide-react';
import { Language, Student } from '../types';

interface WhatsAppTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentStudent?: Student;
}

const COMMON_QUESTIONS = [
  {
    en: 'Namaskaram Teacher, could you explain the difference between Magma and Lava once more?',
    ml: 'നമസ്കാരം ടീച്ചർ, മാഗ്മയും ലാവയും തമ്മിലുള്ള വ്യത്യാസം ഒന്നുകൂടി പറഞ്ഞുതരാമോ?'
  },
  {
    en: 'Namaskaram Teacher, how does Pumice rock float on water while Granite sinks?',
    ml: 'നമസ്കാരം ടീച്ചർ, പ്യൂമിസ് കല്ല് എന്തുകൊണ്ടാണ് വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കുന്നത്?'
  },
  {
    en: 'Namaskaram Teacher, I completed the Rocks & Minerals Quiz and got my score!',
    ml: 'നമസ്കാരം ടീച്ചർ, ഞാൻ പാറകളും ധാതുക്കളും ക്വിസ് പൂർത്തിയാക്കി!'
  },
  {
    en: 'Namaskaram Teacher, which rock is used for the Taj Mahal and Red Fort?',
    ml: 'നമസ്കാരം ടീച്ചർ, താജ്മഹലും ചെങ്കോട്ടയും നിർമ്മിക്കാൻ ഉപയോഗിച്ച പാറകൾ ഏതെല്ലാമാണ്?'
  }
];

export const WhatsAppTeacherModal: React.FC<WhatsAppTeacherModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentStudent
}) => {
  const teacherPhone = '7736419753';
  const formattedPhone = '+91 77364 19753';
  const [customMsg, setCustomMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSendWhatsApp = (text: string) => {
    const studentPrefix = currentStudent
      ? `[Student: ${currentStudent.name}, Roll: ${currentStudent.rollNumber}, Class 5A] `
      : '[Class 5 Student] ';
    const fullText = encodeURIComponent(`${studentPrefix}${text}`);
    const whatsappUrl = `https://wa.me/91${teacherPhone}?text=${fullText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(teacherPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Teacher Profile Card */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold shadow-inner">
            👩‍🏫
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Mrs. Jesni</h3>
            <div className="text-xs text-slate-500">
              Science Teacher (Class 5A & 5B) · YAMANIYYA ENGLISH MEDIUM SCHOOL
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              <span>{formattedPhone}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-slate-600 mb-3">
          {lang === 'en'
            ? 'Have a doubt in Science or your homework? Send a message directly to Mrs. Jesni on WhatsApp or phone!'
            : 'സയൻസ് പാഠഭാഗങ്ങളിലോ ക്വിസ്സിലോ സംശയമുണ്ടോ? ടീച്ചർ മിസ്സിസ് ജെസ്നിക്ക് വാട്‌സാപ്പിൽ സന്ദേശം അയക്കാം!'}
        </p>

        {/* Quick Suggestion Chips */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            {lang === 'en' ? 'Quick Questions (Tap to Send):' : 'വേഗത്തിൽ ചോദിക്കാനുള്ള ചോദ്യങ്ങൾ:'}
          </div>
          <div className="space-y-1.5">
            {COMMON_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendWhatsApp(lang === 'en' ? q.en : q.ml)}
                className="w-full text-left p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-950 font-medium transition-colors flex items-center justify-between gap-2"
              >
                <span className="line-clamp-1">{lang === 'en' ? q.en : q.ml}</span>
                <Send className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Message Field */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            {lang === 'en' ? 'Or Type Your Own Question:' : 'അല്ലെങ്കിൽ സ്വന്തം ചോദ്യം ടൈപ്പ് ചെയ്യുക:'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder={lang === 'en' ? 'Ask Mrs. Jesni anything...' : 'ടീച്ചറോട് സംശയം ചോദിക്കൂ...'}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => {
                if (customMsg.trim()) {
                  handleSendWhatsApp(customMsg);
                  setCustomMsg('');
                }
              }}
              disabled={!customMsg.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>{lang === 'en' ? 'Send' : 'അയക്കൂ'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Open WhatsApp, Call Phone, Copy */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => handleSendWhatsApp('Hello Teacher, I need help with Class 5 Science lesson.')}
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </button>
          <a
            href={`tel:${teacherPhone}`}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Call Teacher Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
};
