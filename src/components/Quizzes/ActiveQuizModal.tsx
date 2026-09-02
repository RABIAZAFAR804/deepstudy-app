import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, AlertCircle, Sparkles, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { Quiz, QuizQuestion } from '../../types';

interface ActiveQuizModalProps {
  quiz: Quiz | null;
  onClose: () => void;
  onCompleteQuiz: (quizId: string, score: number) => void;
}

export const ActiveQuizModal: React.FC<ActiveQuizModalProps> = ({
  quiz,
  onClose,
  onCompleteQuiz
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (quiz) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setShowExplanation(false);
      setSecondsLeft(quiz.durationMinutes * 60);
    }
  }, [quiz]);

  useEffect(() => {
    if (!quiz || isSubmitted || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, isSubmitted, secondsLeft]);

  if (!quiz) return null;

  const currentQuestion: QuizQuestion | undefined = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
    setShowExplanation(true);
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onCompleteQuiz(quiz.id, score);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const finalScore = isSubmitted ? calculateScore() : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/40">
              {quiz.subject}
            </span>
            <h3 className="font-geist text-base md:text-lg font-bold text-[#e1e3e4] line-clamp-1">
              {quiz.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1E1E22] border border-[#2C2C30] text-xs font-mono font-medium text-[#d6baff]">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiz Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isSubmitted ? (
            currentQuestion ? (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#968da0] font-geist">
                    <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2C2C30] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#9D5CFF] to-[#C084FC] transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h4 className="font-geist text-base md:text-lg font-medium text-[#e1e3e4] leading-relaxed">
                  {currentQuestion.question}
                </h4>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

                    let optionStyle = 'bg-[#1E1E22] border-[#2C2C30] text-[#e1e3e4] hover:border-[#aa73ff]/50';

                    if (hasAnswered) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-red-950/40 border-red-500/60 text-red-200 ring-1 ring-red-500/30';
                      } else {
                        optionStyle = 'bg-[#191c1d] border-[#2C2C30] text-[#968da0] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={hasAnswered}
                        className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm font-inter transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#111415] border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-[#d6baff] shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {hasAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-[#1E1E22] border border-[#aa73ff]/30 text-xs text-[#cdc2d7] leading-relaxed animate-in fade-in duration-200">
                    <p className="font-bold text-[#d6baff] uppercase text-[10px] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Academic Rationale
                    </p>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-[#968da0]">Quiz questions loading...</p>
            )
          ) : (
            /* Result Screen */
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="relative w-24 h-24 rounded-full bg-[#9D5CFF]/15 border border-[#9D5CFF]/40 flex items-center justify-center shadow-[0_0_30px_rgba(157,92,255,0.3)]">
                <Award className="w-12 h-12 text-[#d6baff]" />
              </div>

              <div>
                <h4 className="font-geist text-2xl font-bold text-[#e1e3e4] mb-1">
                  Quiz Completed!
                </h4>
                <p className="text-sm text-[#cdc2d7]">
                  {finalScore >= 80 ? 'Exceptional mastery demonstrated!' : 'Good effort! Review your key rationale.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="p-4 rounded-xl bg-[#1E1E22] border border-[#2C2C30]">
                  <p className="text-[11px] text-[#968da0] uppercase font-medium mb-1">Score</p>
                  <p className="font-geist text-3xl font-extrabold text-[#d6baff]">{finalScore}%</p>
                </div>
                <div className="p-4 rounded-xl bg-[#1E1E22] border border-[#2C2C30]">
                  <p className="text-[11px] text-[#968da0] uppercase font-medium mb-1">Accuracy</p>
                  <p className="font-geist text-3xl font-extrabold text-emerald-400">
                    {Object.values(selectedAnswers).filter((ans, idx) => ans === quiz.questions[idx]?.correctIndex).length} / {quiz.questions.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 md:p-5 border-t border-white/10 bg-[#111415]/90 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  setCurrentQuestionIndex((prev) => prev - 1);
                  setShowExplanation(selectedAnswers[currentQuestionIndex - 1] !== undefined);
                }}
                className="px-4 py-2 rounded-xl bg-[#1E1E22] border border-[#2C2C30] hover:border-[#aa73ff] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-[#e1e3e4]"
              >
                Previous
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setShowExplanation(selectedAnswers[currentQuestionIndex + 1] !== undefined);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#9D5CFF] hover:bg-[#aa73ff] text-[#0F0F12] font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0F0F12] font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <span>Submit Quiz</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setIsSubmitted(false);
                  setShowExplanation(false);
                  setSecondsLeft(quiz.durationMinutes * 60);
                }}
                className="px-4 py-2 rounded-xl bg-[#1E1E22] border border-[#2C2C30] hover:border-[#aa73ff] text-xs font-semibold text-[#e1e3e4] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-[#9D5CFF] hover:bg-[#aa73ff] text-[#0F0F12] font-semibold text-xs transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
