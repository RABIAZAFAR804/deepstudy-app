import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, Sparkles, MessageSquare, BookOpen, Clock, Users, Play, Pause, Save, Check } from 'lucide-react';
import { Lecture } from '../../types';

interface LiveLectureSessionModalProps {
  lecture: Lecture | null;
  onClose: () => void;
  onSaveLectureNotes?: (notes: string) => void;
}

export const LiveLectureSessionModal: React.FC<LiveLectureSessionModalProps> = ({
  lecture,
  onClose,
  onSaveLectureNotes
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [studentNotes, setStudentNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'live' | 'transcript' | 'notes'>('live');

  useEffect(() => {
    if (lecture) {
      setStudentNotes(`Notes for ${lecture.code}: ${lecture.title}\n\n- Key equation: H|psi> = E|psi>\n- Observed collapse occurs upon Hermitian projection.\n- Homework 4 due this Friday.`);
    }
  }, [lecture]);

  if (!lecture) return null;

  const handleSaveNotes = () => {
    if (onSaveLectureNotes) onSaveLectureNotes(studentNotes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
              LIVE SESSION
            </span>
            <div>
              <h3 className="font-geist text-base md:text-lg font-bold text-[#e1e3e4] line-clamp-1">
                {lecture.code}: {lecture.title}
              </h3>
              <p className="text-xs text-[#968da0]">{lecture.instructor} • {lecture.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1E1E22] text-xs text-[#cdc2d7] border border-[#2C2C30]">
              <Users className="w-3.5 h-3.5 text-[#d6baff]" />
              <span>48 Students Connected</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-[#111415]/50 px-6 gap-2">
          <button
            onClick={() => setActiveTab('live')}
            className={`py-3 px-4 text-xs font-semibold font-geist border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'live'
                ? 'border-[#9D5CFF] text-[#d6baff]'
                : 'border-transparent text-[#968da0] hover:text-[#cdc2d7]'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Live Stream & Audio</span>
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`py-3 px-4 text-xs font-semibold font-geist border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'transcript'
                ? 'border-[#9D5CFF] text-[#d6baff]'
                : 'border-transparent text-[#968da0] hover:text-[#cdc2d7]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-time AI Transcript</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-semibold font-geist border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'notes'
                ? 'border-[#9D5CFF] text-[#d6baff]'
                : 'border-transparent text-[#968da0] hover:text-[#cdc2d7]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Scratchpad</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'live' && (
            <div className="space-y-6">
              {/* Virtual Lecture Stage */}
              <div className="w-full h-60 md:h-72 rounded-2xl bg-[#0c0f10] border border-[#2C2C30] p-6 flex flex-col justify-between relative overflow-hidden group shadow-inner">
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400 font-semibold">HD Audio & Screen Feed</span>
                  </div>
                  <span className="text-xs font-mono text-[#968da0] bg-[#1E1E22] px-2.5 py-1 rounded-md border border-[#2C2C30]">
                    00:42:15 / 01:30:00
                  </span>
                </div>

                {/* Animated Audio Frequency Bars */}
                <div className="my-auto flex items-center justify-center gap-1.5 h-20">
                  {[24, 48, 70, 36, 90, 60, 80, 45, 95, 30, 85, 40, 65, 90, 50, 75, 35, 60].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#9D5CFF] to-[#d6baff] rounded-full transition-all duration-300"
                      style={{
                        height: isPlayingAudio ? `${h}%` : '8px',
                        opacity: isPlayingAudio ? 0.9 : 0.3
                      }}
                    />
                  ))}
                </div>

                {/* Stream Controls */}
                <div className="flex items-center justify-between z-10 pt-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="p-2.5 rounded-xl bg-[#9D5CFF] text-[#0F0F12] hover:bg-[#aa73ff] transition-all font-semibold"
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="text-xs text-[#cdc2d7] font-medium">
                      {isPlayingAudio ? 'Live Audio Streaming' : 'Audio Muted'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {lecture.tags.map((tag, idx) => (
                      <span key={idx} className="hidden sm:inline-block text-[10px] font-semibold bg-[#1E1E22] text-[#d6baff] px-2.5 py-1 rounded-lg border border-[#2C2C30]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Realtime Key Highlights */}
              <div className="p-4 rounded-xl bg-[#1E1E22] border border-[#aa73ff]/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d6baff]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-time Slide Synthesis</span>
                </div>
                <p className="text-xs text-[#cdc2d7] leading-relaxed">
                  Prof. Vance is currently demonstrating the orthogonality of eigenfunctions corresponding to distinct eigenvalues of Hermitian operators.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-[#2C2C30]">
                  <span className="text-[10px] font-mono text-[#d6baff] font-bold">14:15:02</span>
                  <p className="text-xs text-[#e1e3e4] mt-1 leading-relaxed">
                    "...Now notice how when we apply the conjugate transpose to operator A, the expectation value stays strictly real. This is why Hermitian operators are fundamental in describing observable quantum quantities..."
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-[#2C2C30]">
                  <span className="text-[10px] font-mono text-[#d6baff] font-bold">14:18:40</span>
                  <p className="text-xs text-[#e1e3e4] mt-1 leading-relaxed">
                    "...In the infinite square well potential, the boundary conditions enforce quantized energy states proportional to n squared. Let's write this down in your notebook..."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#cdc2d7] block">
                Synchronized Scratchpad (Auto-saved to your study profile):
              </label>
              <textarea
                rows={8}
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl p-4 text-xs md:text-sm text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF] resize-none leading-relaxed font-mono"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-[#9D5CFF] text-[#0F0F12] font-semibold text-xs hover:bg-[#aa73ff] transition-all flex items-center gap-1.5"
                >
                  {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{isSaved ? 'Notes Saved!' : 'Save Notes'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
