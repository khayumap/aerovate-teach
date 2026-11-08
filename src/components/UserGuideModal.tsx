import React, { useState } from 'react';
import {
  X,
  FileDown,
  Printer,
  Share2,
  BookOpen,
  School,
  CheckCircle2,
  Award,
  Phone,
  Sparkles,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { generateUserGuidePdf } from '../utils/generateUserGuidePdf';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    try {
      generateUserGuidePdf();
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      '📖 Aerovate Class 5 Science User Guide (Mrs. Jesni - Yamaniyya English Medium School):\n' +
      'https://aerovate-teach.onrender.com\n\n' +
      '• Student login with Real Name & Roll Number\n' +
      '• Chapter 1: Rocks & Minerals + Malayalam/English Audio\n' +
      '• Interactive Rock Lab & Quizzes\n' +
      '• Teacher Helpline: +91 7736419753'
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          title="Close Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
              <School className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md w-fit mb-0.5">
                YAMANIYYA ENGLISH MEDIUM SCHOOL
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {lang === 'en' ? 'Student Guide · Class 5 Science' : 'വിദ്യാർത്ഥികൾക്കുള്ള ഗൈഡ് · ക്ലാസ് 5 സയൻസ്'}
              </h2>
              <div className="text-xs text-slate-500">
                Teacher: Mrs. Jesni (+91 7736419753) · Copyrights Adnan Ahmad A P
              </div>
            </div>
          </div>

          {/* Action Buttons: Download PDF & Print */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              title="Download 2-Page Official PDF"
            >
              <FileDown className="w-4 h-4" />
              <span>{downloading ? 'Preparing PDF...' : 'Download PDF Guide'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              title="Share via WhatsApp"
            >
              <Share2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Guide Content Body */}
        <div className="flex-1 space-y-4 text-xs text-slate-700 leading-relaxed pr-1">
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                <h3 className="font-bold text-sm text-blue-900 flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  1. How to Sign Up & Sign In
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs pl-1">
                  <li>Click <strong>"Student Login"</strong> in the top header or bottom navigation.</li>
                  <li>Click <strong>"New Student? Sign Up"</strong>: Enter your real Name (e.g. Adnan Ahmad A P), Roll Number, and Class (5A or 5B).</li>
                  <li>Choose your animal avatar (Lion, Rocket, Dolphin, Butterfly).</li>
                  <li>Your real name is recorded in Mrs. Jesni’s class gradebook without fake profiles.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2 mb-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  2. Studying Science Chapter 1: Rocks and Minerals
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-1">
                  <li>Matches textbook pages 1 to 7 taught by Mrs. Jesni.</li>
                  <li>Switch between <strong>English</strong> and <strong>മലയാളം</strong> with the language button.</li>
                  <li>Click <strong>"Listen to Chapter Audio"</strong> to hear the lesson read aloud in clear Malayalam or English.</li>
                  <li>On mobile/tablet, swipe through the horizontal section numbers (1 to 7) to read any part.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                <h3 className="font-bold text-sm text-indigo-950 flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  3. Interactive Rock Lab & Virtual Experiments
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-1">
                  <li><strong>Specimen Deck:</strong> Pumice (floats on water!), Granite (kitchen counters), Obsidian (black volcanic glass), Sandstone (Red Fort).</li>
                  <li><strong>Mineral Classifier:</strong> Drag & drop Metallic minerals (Iron, Gold, Copper) vs Non-Metallic minerals (Talc, Quartz, Diamond).</li>
                  <li><strong>Rock Detective:</strong> Test your knowledge of Igneous, Sedimentary, and Metamorphic rocks.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2 mb-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  4. Taking Quizzes & Earning Gold Stars
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-1">
                  <li>Complete the 10-question Grand Quiz for Chapter 1.</li>
                  <li>Immediate explanations explain the scientific concept after every question.</li>
                  <li>Scoring 70%+ unlocks an official Badge and awards 10 gold stars!</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  5. Contacting Teacher Mrs. Jesni
                </h3>
                <p className="text-slate-600 text-xs">
                  Tap the green <strong>"Ask Mrs. Jesni"</strong> button anytime to send a question directly to teacher’s WhatsApp at <strong>+91 7736419753</strong>.
                </p>
              </div>
            </div>
        </div>

        {/* Footer Credit & PDF Download Banner */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span>Copyrights</span>
            <span className="font-bold text-slate-800">Adnan Ahmad A P</span>
            <span>· All rights reserved</span>
            <Heart className="w-3 h-3 text-red-500 fill-current inline ml-1" />
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Student PDF Guide</span>
          </button>
        </div>

      </div>
    </div>
  );
};
