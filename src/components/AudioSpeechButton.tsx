import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Language } from '../types';

interface AudioSpeechButtonProps {
  textToRead: string;
  lang: Language;
  label?: string;
}

export const AudioSpeechButton: React.FC<AudioSpeechButtonProps> = ({
  textToRead,
  lang,
  label
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeak = () => {
    if (!isSupported) return;

    const synth = window.speechSynthesis;
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    synth.cancel(); // clear existing
    const cleanText = textToRead.replace(/[#*•_]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'ml' ? 'ml-IN' : 'en-IN';
    utterance.rate = 0.95; // slightly slower for Class 5 students

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synth.speak(utterance);
    setIsPlaying(true);
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleToggleSpeak}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
        isPlaying
          ? 'bg-amber-500 text-white animate-pulse'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
      }`}
      title={isPlaying ? 'Pause Read-Aloud' : 'Read Aloud with Audio'}
    >
      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
      <span>
        {isPlaying
          ? (lang === 'en' ? 'Stop Audio' : 'ഓഡിയോ നിർത്തൂ')
          : label || (lang === 'en' ? 'Listen to Lesson' : 'പാഠം കേൾക്കാം')}
      </span>
    </button>
  );
};
