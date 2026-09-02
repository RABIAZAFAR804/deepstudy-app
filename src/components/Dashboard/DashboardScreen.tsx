import React from 'react';
import { Clock, CheckCircle2, FlaskConical, Terminal, Calculator, Sparkles, ChevronRight, Play } from 'lucide-react';
import { UserProfile, Lecture, NavTab } from '../../types';

interface DashboardScreenProps {
  user: UserProfile;
  lectures: Lecture[];
  onJoinLecture: (lecture: Lecture) => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenFocusMode: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  lectures,
  onJoinLecture,
  onNavigateTab,
  onOpenFocusMode
}) => {
  // Calculate SVG circular stroke offset for user progress (circumference ~ 339.292)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.studyGoalProgress / 100) * circumference;

  const getLectureIcon = (iconType: string) => {
    switch (iconType) {
      case 'science':
        return <FlaskConical className="w-5 h-5 text-[#cdc2d7]" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-[#cdc2d7]" />;
      case 'calculate':
        return <Calculator className="w-5 h-5 text-[#cdc2d7]" />;
      default:
        return <FlaskConical className="w-5 h-5 text-[#cdc2d7]" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-300">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h1 className="font-geist text-2xl md:text-3xl font-bold text-[#e1e3e4] tracking-tight">
            Welcome back, {user.name.split(' ')[0]}.
          </h1>
        </div>
        <p className="font-inter text-[#cdc2d7] text-sm md:text-base leading-relaxed">
          Your deep work session awaits. Let's conquer today's goals.
        </p>
      </div>

      {/* Bento Grid: Daily Study Goal & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        {/* Progress Card (Bento Left: 8 cols on desktop) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden group">
          {/* Subtle glowing background ambient effect */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#9D5CFF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex-1 w-full text-center sm:text-left z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <h2 className="font-geist text-xl md:text-2xl font-bold text-[#d6baff]">
                Daily Study Goal
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                On Track
              </span>
            </div>

            <p className="text-[#cdc2d7] text-sm leading-relaxed mb-5 max-w-md">
              You are on track to complete your primary objectives for this session. Maintain focus.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-5">
              <span className="bg-[#1E1E22] border border-[#2C2C30] px-3.5 py-1.5 rounded-full text-xs text-[#d6baff] font-semibold tracking-wide uppercase shadow-sm">
                DEEP WORK
              </span>
              <span className="bg-[#1E1E22] border border-[#2C2C30] px-3.5 py-1.5 rounded-full text-xs text-[#c8c5cb] font-medium tracking-wide uppercase">
                {user.studyGoalRemainingTime}
              </span>
            </div>

            <button
              onClick={onOpenFocusMode}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9D5CFF]/20 hover:bg-[#9D5CFF] text-[#d6baff] hover:text-[#0F0F12] border border-[#9D5CFF]/40 text-xs font-semibold transition-all active:scale-95 group/btn"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Study Session</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* SVG Circular Progress Gauge */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 flex items-center justify-center z-10">
            <svg
              className="w-full h-full drop-shadow-[0_0_16px_rgba(157,92,255,0.4)]"
              viewBox="0 0 120 120"
            >
              <circle
                className="text-[#2C2C30] stroke-current"
                cx="60"
                cy="60"
                fill="transparent"
                r={radius}
                strokeWidth="8"
              />
              <circle
                className="progress-ring__circle text-[#d6baff] stroke-current"
                cx="60"
                cy="60"
                fill="transparent"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-geist text-3xl md:text-4xl font-extrabold text-[#d6baff] glow-text">
                {user.studyGoalProgress}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#968da0] mt-0.5">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats (Bento Right: 4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 md:gap-5">
          {/* Stat 1: Focus Hours */}
          <div className="glass-panel rounded-2xl p-5 flex-1 flex items-center gap-4 border border-white/10 hover:border-[#aa73ff]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#9D5CFF]/15 border border-[#9D5CFF]/30 flex items-center justify-center text-[#d6baff] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#cdc2d7] mb-1">Focus Hours</p>
              <p className="font-geist text-2xl font-bold text-[#e1e3e4]">
                {user.focusHoursThisWeek}{' '}
                <span className="text-xs text-[#968da0] font-normal">hrs this week</span>
              </p>
            </div>
          </div>

          {/* Stat 2: Quizzes Mastered */}
          <div
            onClick={() => onNavigateTab('quizzes')}
            className="glass-panel rounded-2xl p-5 flex-1 flex items-center gap-4 border border-white/10 hover:border-[#aa73ff]/40 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#9D5CFF]/15 border border-[#9D5CFF]/30 flex items-center justify-center text-[#d6baff] shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#cdc2d7] mb-1">Quizzes Mastered</p>
              <p className="font-geist text-2xl font-bold text-[#e1e3e4]">
                {user.quizzesMasteredCount}{' '}
                <span className="text-xs text-[#968da0] font-normal">completed</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Lectures */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-geist text-xl font-bold text-[#e1e3e4]">
              Upcoming Lectures
            </h3>
            <p className="text-xs text-[#968da0] mt-0.5">Live sessions & schedule for your enrolled courses</p>
          </div>
          <button
            onClick={() => onNavigateTab('summaries')}
            className="text-xs font-semibold text-[#d6baff] hover:text-[#ecdcff] transition-colors flex items-center gap-1"
          >
            <span>View All Summaries</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Scroll List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
          {lectures.map((lecture) => {
            const isLive = lecture.status === 'active_now';
            return (
              <div
                key={lecture.id}
                className={`glass-panel rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 ${
                  isLive
                    ? 'border-[#9D5CFF]/40 shadow-[0_0_20px_rgba(157,92,255,0.12)] ring-1 ring-[#9D5CFF]/30'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase border ${
                        isLive
                          ? 'bg-[#280057]/70 text-[#d6baff] border-[#9D5CFF]/40'
                          : 'bg-[#1E1E22] text-[#cdc2d7] border-[#2C2C30]'
                      }`}
                    >
                      {lecture.code}
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#111415]/60 border border-[#2C2C30]">
                      {getLectureIcon(lecture.icon)}
                    </div>
                  </div>

                  <h4 className="font-geist text-base font-semibold text-[#e1e3e4] mb-1.5 line-clamp-1">
                    {lecture.title}
                  </h4>
                  <p className="text-xs text-[#968da0] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#cdc2d7]" />
                    <span>{lecture.time}</span>
                  </p>
                  <p className="text-[11px] text-[#cdc2d7]/80 mt-2 line-clamp-2 leading-relaxed">
                    {lecture.description}
                  </p>
                </div>

                <div className="mt-2 pt-3 border-t border-white/5">
                  {isLive ? (
                    <button
                      id={`join-lecture-${lecture.id}`}
                      onClick={() => onJoinLecture(lecture)}
                      className="w-full bg-[#1E1E22] hover:bg-[#9D5CFF] text-[#e1e3e4] hover:text-[#0F0F12] border border-[#2C2C30] hover:border-[#9D5CFF] text-xs font-semibold py-2.5 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Join Session</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-[#191c1d] border border-[#2C2C30] text-[#968da0] text-xs font-medium py-2.5 rounded-xl cursor-not-allowed opacity-75"
                    >
                      Scheduled
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
