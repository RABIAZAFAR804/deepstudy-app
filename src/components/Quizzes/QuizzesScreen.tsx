import React, { useState } from 'react';
import { Timer, Flame, Award, FlaskConical, Calculator, BookOpen, Lock, CheckCircle2, RotateCcw, Play } from 'lucide-react';
import { Quiz, UserProfile } from '../../types';
import { ActiveQuizModal } from './ActiveQuizModal';

interface QuizzesScreenProps {
  quizzes: Quiz[];
  user: UserProfile;
  onUpdateQuizScore: (quizId: string, score: number) => void;
}

export const QuizzesScreen: React.FC<QuizzesScreenProps> = ({
  quizzes,
  user,
  onUpdateQuizScore
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Science' | 'Math' | 'Humanities'>('All');

  const dailyChallenges = quizzes.filter((q) => q.isDailyChallenge);
  const availableQuizzes = quizzes.filter((q) => !q.isDailyChallenge);

  const filteredAvailableQuizzes = availableQuizzes.filter((quiz) => {
    if (selectedFilter === 'All') return true;
    return quiz.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  const getQuizIcon = (iconType: string) => {
    switch (iconType) {
      case 'science':
        return <FlaskConical className="w-5 h-5 text-[#d6baff]" />;
      case 'calculate':
        return <Calculator className="w-5 h-5 text-[#d6baff]" />;
      case 'menu_book':
        return <BookOpen className="w-5 h-5 text-[#968da0]" />;
      default:
        return <FlaskConical className="w-5 h-5 text-[#d6baff]" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-geist text-2xl md:text-3xl font-bold text-[#e1e3e4] tracking-tight">
          Knowledge Check
        </h1>
        <p className="text-xs md:text-sm text-[#cdc2d7] leading-relaxed max-w-2xl">
          Test your understanding and reinforce memory with adaptive daily challenges and topic-specific quizzes.
        </p>
      </div>

      {/* Bento Grid: Daily Challenges & Weekly Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        {/* Daily Challenges (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h2 className="font-geist text-lg md:text-xl font-bold text-[#e1e3e4]">
              Daily Challenges
            </h2>
            <span className="font-geist text-xs font-semibold text-[#d6baff] bg-[#9D5CFF]/15 px-2.5 py-1 rounded-full border border-[#9D5CFF]/30">
              2 left today
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dailyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => setActiveQuiz(challenge)}
                className="glass-panel rounded-2xl p-5 flex flex-col justify-between h-48 cursor-pointer group relative overflow-hidden border border-white/10 hover:border-[#aa73ff]/50 transition-all shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9D5CFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start z-10">
                  <span className="bg-[#282a2b] text-[#e1e3e4] font-geist text-[11px] font-semibold px-3 py-1 rounded-full border border-white/5">
                    {challenge.subject}
                  </span>
                  <div className="flex items-center gap-1 text-[#d6baff] font-mono text-xs font-semibold">
                    <Timer className="w-3.5 h-3.5" />
                    <span>{challenge.durationMinutes}m</span>
                  </div>
                </div>

                <div className="z-10 mt-auto">
                  <h3 className="font-geist text-base md:text-lg font-bold text-[#e1e3e4] mb-2 group-hover:text-[#d6baff] transition-colors line-clamp-1">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#cdc2d7]">
                      {challenge.questionsCount} Questions
                    </span>
                    <button className="bg-[#9D5CFF]/20 text-[#d6baff] group-hover:bg-[#9D5CFF] group-hover:text-[#0F0F12] font-semibold text-xs px-4 py-1.5 rounded-xl transition-all border border-[#9D5CFF]/40 shadow-sm flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Mastery (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="font-geist text-lg md:text-xl font-bold text-[#e1e3e4]">
            Weekly Mastery
          </h2>

          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-5 border border-white/10">
            {/* Subject Progress 1 */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs font-geist">
                <span className="text-[#e1e3e4] font-medium">Cognitive Psychology</span>
                <span className="text-[#d6baff] font-bold">85%</span>
              </div>
              <div className="glow-track h-2 w-full">
                <div className="glow-fill h-full w-[85%]" />
              </div>
            </div>

            {/* Subject Progress 2 */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs font-geist">
                <span className="text-[#e1e3e4] font-medium">Calculus III</span>
                <span className="text-[#d6baff] font-bold">62%</span>
              </div>
              <div className="glow-track h-2 w-full">
                <div className="glow-fill h-full w-[62%]" />
              </div>
            </div>

            {/* Subject Progress 3 */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs font-geist">
                <span className="text-[#e1e3e4] font-medium">World History</span>
                <span className="text-[#d6baff] font-bold">92%</span>
              </div>
              <div className="glow-track h-2 w-full">
                <div className="glow-fill h-full w-[92%]" />
              </div>
            </div>

            {/* Badges footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Flame className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-xs font-semibold text-[#e1e3e4]">{user.streakDays} Day Streak</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#9D5CFF]/15 flex items-center justify-center text-[#d6baff]">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#e1e3e4]">{user.rankPercentile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Quizzes List */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-geist text-xl font-bold text-[#e1e3e4]">
              Available Quizzes
            </h2>
            <p className="text-xs text-[#968da0] mt-0.5">Comprehensive topic tests with instant answer rationale</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {(['All', 'Science', 'Math', 'Humanities'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-geist transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#9D5CFF]/25 text-[#d6baff] border border-[#9D5CFF]/60 font-semibold shadow-sm'
                    : 'bg-[#1E1E22] text-[#cdc2d7] hover:text-[#e1e3e4] border border-[#2C2C30]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Items */}
        <div className="flex flex-col gap-3">
          {filteredAvailableQuizzes.map((quiz) => {
            const isLocked = quiz.isLocked;
            const hasScore = quiz.bestScore !== null;

            return (
              <div
                key={quiz.id}
                className={`glass-panel rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                  isLocked ? 'opacity-65 cursor-not-allowed' : 'hover:border-[#aa73ff]/40 hover:bg-[#1E1E22]/90'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1D2021] flex items-center justify-center border border-[#2C2C30] shrink-0">
                    {getQuizIcon(quiz.icon)}
                  </div>
                  <div>
                    <h3 className="font-geist text-sm md:text-base font-semibold text-[#e1e3e4] leading-snug">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-[#cdc2d7] mt-0.5">
                      {quiz.moduleInfo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-[11px] text-[#968da0] font-medium">
                      {isLocked ? 'Status' : 'Best Score'}
                    </span>
                    <span className={`text-xs md:text-sm font-geist font-bold ${isLocked ? 'text-[#968da0] flex items-center gap-1' : 'text-[#d6baff]'}`}>
                      {isLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </>
                      ) : hasScore ? (
                        `${quiz.bestScore} / ${quiz.maxScore}`
                      ) : (
                        '-- / 100'
                      )}
                    </span>
                  </div>

                  {isLocked ? (
                    <button
                      disabled
                      className="bg-[#191c1d] text-[#968da0] text-xs font-medium px-4 py-2 rounded-xl border border-[#2C2C30] cursor-not-allowed opacity-75"
                    >
                      Prereq Required
                    </button>
                  ) : hasScore ? (
                    <button
                      id={`retake-quiz-${quiz.id}`}
                      onClick={() => setActiveQuiz(quiz)}
                      className="bg-[#1E1E22] text-[#e1e3e4] hover:bg-[#9D5CFF] hover:text-[#0F0F12] text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-[#2C2C30] hover:border-[#9D5CFF] flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  ) : (
                    <button
                      id={`take-quiz-${quiz.id}`}
                      onClick={() => setActiveQuiz(quiz)}
                      className="bg-[#9D5CFF]/20 text-[#d6baff] hover:bg-[#9D5CFF] hover:text-[#0F0F12] text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-[#9D5CFF]/40 hover:border-[#9D5CFF] flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Take Quiz</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Quiz Interactive Modal */}
      <ActiveQuizModal
        quiz={activeQuiz}
        onClose={() => setActiveQuiz(null)}
        onCompleteQuiz={onUpdateQuizScore}
      />
    </div>
  );
};
