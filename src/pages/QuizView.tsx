import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Clock,
  Award,
  BookOpen
} from 'lucide-react';
import { Language, Quiz, Student } from '../types';

interface QuizViewProps {
  quizId?: string;
  lang: Language;
  currentStudent?: Student;
  onOpenWhatsApp: () => void;
  onBackToLessons: () => void;
  onStarsUpdated?: (newStars: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizId = 'rocks-minerals-ch1',
  lang,
  currentStudent,
  onOpenWhatsApp,
  onBackToLessons,
  onStarsUpdated
}) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [qIdx: number]: boolean }>({});
  const [showHint, setShowHint] = useState<{ [qIdx: number]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/quizzes/${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
      }
    } catch (err) {
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [currentIndex]: true }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setSubmitting(true);

    const answersArray = quiz.questions.map((_, i) => selectedAnswers[i] ?? -1);
    const payload = {
      studentName: currentStudent?.name || 'Class 5 Explorer',
      rollNumber: currentStudent?.rollNumber || 1,
      division: currentStudent?.division || '5A',
      answers: answersArray
    };

    try {
      const res = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const result = await res.json();
        setSubmissionResult(result);
        setIsSubmitted(true);
        if (result.passed) {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        }
        if (onStarsUpdated && result.starsEarned) {
          onStarsUpdated((currentStudent?.stars || 0) + result.starsEarned);
        }
      }
    } catch (err) {
      console.error('Quiz submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setShowHint({});
    setIsSubmitted(false);
    setSubmissionResult(null);
    setCurrentIndex(0);
    setTimeLeft(900);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-sm font-semibold text-slate-600">
          {lang === 'en' ? 'Loading Rocks & Minerals Quiz...' : 'ക്വിസ് ലോഡ് ചെയ്യുന്നു...'}
        </p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <p className="text-sm text-red-600">Quiz not found.</p>
        <button
          onClick={onBackToLessons}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
        >
          Return to Lessons
        </button>
      </div>
    );
  }

  const currentQ = quiz.questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToLessons}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Back to Chapter 1' : 'പാഠത്തിലേക്ക് മടങ്ങാം'}</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'en' ? quiz.title : quiz.titleMl || quiz.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span>Class 5 Science</span>
            <span>·</span>
            <span>{quiz.questions.length} Questions</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">Pass mark: {quiz.passingScore}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="tabular-nums font-mono">
              {minutes}:{seconds < 10 ? '0' : ''}{seconds}
            </span>
          </div>
          <button
            onClick={onOpenWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Teacher Help</span>
          </button>
        </div>
      </div>

      {/* Quiz Progress & Question Indicator Strip */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span>Question {currentIndex + 1} of {quiz.questions.length}</span>
          <span>{answeredCount} / {quiz.questions.length} answered</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Number Bubbles */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1">
          {quiz.questions.map((_, i) => {
            const isAnswered = selectedAnswers[i] !== undefined;
            const isCurrent = currentIndex === i;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center justify-center ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300 shadow-sm'
                    : isAnswered
                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {!isSubmitted ? (
        /* Active Question Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question {currentIndex + 1}
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {lang === 'en' ? currentQ.question : currentQ.questionMl || currentQ.question}
              </h2>
              {lang === 'en' && currentQ.questionMl && (
                <p className="text-xs font-medium text-slate-500 mt-1 italic">
                  {currentQ.questionMl}
                </p>
              )}
            </div>

            {currentQ.hint && (
              <button
                onClick={() => setShowHint(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }))}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'en' ? 'Hint' : 'സൂചന'}</span>
              </button>
            )}
          </div>

          {/* Hint Card */}
          {showHint[currentIndex] && currentQ.hint && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
              💡 <strong>Teacher Mrs. Jesni’s Hint:</strong> {currentQ.hint}
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 my-6">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const hasAnsweredCurrent = selectedAnswers[currentIndex] !== undefined;
              const isCorrect = optIdx === currentQ.correctAnswerIndex;

              let optionStyle = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30';
              if (hasAnsweredCurrent) {
                if (isSelected) {
                  optionStyle = isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300'
                    : 'border-red-400 bg-red-50 text-red-950 ring-2 ring-red-200';
                } else if (isCorrect) {
                  optionStyle = 'border-emerald-300 bg-emerald-50/50 text-emerald-900';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between text-sm font-semibold ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div>
                      <span>{opt}</span>
                      {currentQ.optionsMl && currentQ.optionsMl[optIdx] && (
                        <span className="text-xs text-slate-500 font-normal block">
                          {currentQ.optionsMl[optIdx]}
                        </span>
                      )}
                    </div>
                  </div>

                  {hasAnsweredCurrent && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Explanation */}
          {showExplanation[currentIndex] && (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 mb-6">
              <span className="font-bold block text-blue-800 mb-0.5">
                📖 {lang === 'en' ? 'Explanation & Textbook Context:' : 'വിശദീകരണം:'}
              </span>
              <p className="leading-relaxed">
                {lang === 'en' ? currentQ.explanation : currentQ.explanationMl || currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Previous' : 'മുൻപത്തേത്'}</span>
            </button>

            {currentIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(i => Math.min(quiz.questions.length - 1, i + 1))}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors min-h-[44px]"
              >
                <span>{lang === 'en' ? 'Next Question' : 'അടുത്ത ചോദ്യം'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting || answeredCount === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 min-h-[44px]"
              >
                <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{submitting ? 'Grading...' : lang === 'en' ? 'Submit Quiz' : 'ക്വിസ് പൂർത്തിയാക്കുക'}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg text-center max-w-2xl mx-auto animate-fade-in">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl shadow-md">
            {submissionResult?.percentage >= 70 ? '🏆' : '⭐'}
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-1">
            {submissionResult?.percentage >= 70
              ? 'Outstanding Work, Explorer!'
              : 'Good Effort! Keep Learning!'}
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            {lang === 'en'
              ? `You scored ${submissionResult?.score} out of 100 on Class 5 Rocks & Minerals!`
              : `നിങ്ങൾക്ക് 100-ൽ ${submissionResult?.score} മാർക്ക് ലഭിച്ചു!`}
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="block text-[11px] text-blue-700 font-semibold">Score</span>
              <span className="text-xl font-bold text-blue-950">{submissionResult?.percentage}%</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="block text-[11px] text-emerald-700 font-semibold">Correct</span>
              <span className="text-xl font-bold text-emerald-950">
                {submissionResult?.correctCount} / {quiz.questions.length}
              </span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="block text-[11px] text-amber-700 font-semibold">Stars Earned</span>
              <span className="text-xl font-bold text-amber-950">+{submissionResult?.starsEarned} ★</span>
            </div>
          </div>

          {submissionResult?.badgeAwarded && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl max-w-md mx-auto mb-6 flex items-center gap-3 text-left">
              <span className="text-3xl">{submissionResult.badgeAwarded.icon}</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                  New Badge Unlocked!
                </span>
                <h4 className="text-sm font-bold text-amber-950">{submissionResult.badgeAwarded.title}</h4>
                <p className="text-xs text-amber-800">{submissionResult.badgeAwarded.description}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Retake Quiz' : 'വീണ്ടും എഴുതാം'}</span>
            </button>
            <button
              onClick={onBackToLessons}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Back to Chapters' : 'പാഠത്തിലേക്ക് മടങ്ങാം'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
