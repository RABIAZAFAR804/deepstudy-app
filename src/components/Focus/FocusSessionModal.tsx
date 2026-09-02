import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, CheckCircle2, Flame, Bell } from 'lucide-react';

interface FocusSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogFocusMinutes: (minutes: number) => void;
}

export const FocusSessionModal: React.FC<FocusSessionModalProps> = ({
  isOpen,
  onClose,
  onLogFocusMinutes
}) => {
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [soundMode, setSoundMode] = useState<'binaural' | 'rain' | 'silent'>('binaural');
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    setSecondsLeft(sessionMinutes * 60);
  }, [sessionMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setCompletedSessions((prev) => prev + 1);
      onLogFocusMinutes(sessionMinutes);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, sessionMinutes, onLogFocusMinutes]);

  if (!isOpen) return null;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(sessionMinutes * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 flex items-center justify-center text-[#d6baff]">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-geist text-base font-bold text-[#e1e3e4]">
                Deep Work Focus Engine
              </h3>
              <p className="text-[11px] text-[#968da0]">Maintain uninterrupted concentration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timer Body */}
        <div className="p-8 flex flex-col items-center justify-center space-y-6">
          {/* Preset Buttons */}
          <div className="flex gap-2">
            {[15, 25, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setIsActive(false);
                  setSessionMinutes(mins);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-geist font-semibold transition-all ${
                  sessionMinutes === mins
                    ? 'bg-[#9D5CFF] text-[#0F0F12]'
                    : 'bg-[#1E1E22] text-[#cdc2d7] hover:bg-[#282a2b] border border-[#2C2C30]'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Large Countdown */}
          <div className="relative w-64 h-64 rounded-full border-4 border-[#2C2C30] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(157,92,255,0.15)] bg-[#111415]">
            <span className="font-geist text-5xl font-extrabold text-[#d6baff] tracking-tight glow-text font-mono">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-xs text-[#968da0] mt-1 uppercase font-semibold tracking-wider">
              {isActive ? 'Session Active' : 'Paused'}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="p-3 rounded-xl bg-[#1E1E22] border border-[#2C2C30] hover:border-[#aa73ff] text-[#cdc2d7] hover:text-white transition-all"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsActive(!isActive)}
              className="px-8 py-3 rounded-2xl bg-[#9D5CFF] hover:bg-[#aa73ff] text-[#0F0F12] font-geist font-bold text-sm transition-all shadow-lg shadow-[#9D5CFF]/20 flex items-center gap-2 active:scale-95"
            >
              {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              <span>{isActive ? 'Pause Session' : 'Start Focus'}</span>
            </button>
          </div>

          {/* Sound Synthesizer Mode */}
          <div className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl p-3 flex items-center justify-between text-xs text-[#cdc2d7]">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#d6baff]" />
              <span className="font-medium">Ambient Audio:</span>
            </div>
            <div className="flex gap-1.5">
              {(['binaural', 'rain', 'silent'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSoundMode(mode)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] capitalize font-medium transition-all ${
                    soundMode === mode
                      ? 'bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/50'
                      : 'text-[#968da0] hover:text-[#cdc2d7]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
