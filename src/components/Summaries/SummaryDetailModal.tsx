import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Layers, CheckSquare, Square, Copy, Check, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { LectureSummary } from '../../types';

interface SummaryDetailModalProps {
  summary: LectureSummary | null;
  onClose: () => void;
  onTakeQuizForSubject?: (subject: string) => void;
}

export const SummaryDetailModal: React.FC<SummaryDetailModalProps> = ({
  summary,
  onClose,
  onTakeQuizForSubject
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'flashcards' | 'glossary'>('summary');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!summary) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${summary.title}\n\n${summary.fullContent}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const currentCard = summary.flashcards[currentFlashcardIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[#111415]/80">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${summary.subjectTagBg} ${summary.subjectTagText} border ${summary.subjectBorder}`}>
                {summary.subject}
              </span>
              <span className="text-xs text-[#968da0]">• {summary.date}</span>
              <span className="text-xs text-[#968da0]">• {summary.readTime}</span>
            </div>
            <h2 className="font-geist text-xl md:text-2xl font-bold text-[#e1e3e4] leading-tight">
              {summary.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-[#d6baff] transition-colors"
              title="Copy notes"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#111415]/50 px-6 gap-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 px-4 text-xs font-semibold font-geist border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'border-[#9D5CFF] text-[#d6baff]'
                : 'border-transparent text-[#968da0] hover:text-[#cdc2d7]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Executive Summary</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('flashcards');
              setIsFlipped(false);
            }}
            className={`py-3 px-4 text-xs font-semibold font-geist border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'flashcards'
                ? 'border-[#9D5CFF] text-[#d6baff]'
                : 'border-transparent text-[#968da0] hover:text-[#cdc2d7]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards ({summary.flashcards.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`py-3 px-4 text-xs font-semibold font-geist border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'glossary'
                ? 'border-[#9D5CFF] text-[#d6baff]'
                : 'border-transparent text-[#968da0] hover:text-[#cdc2d7]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Glossary ({summary.glossary.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Key Takeaways Section */}
              <div className="bg-[#1E1E22]/90 rounded-xl p-5 border border-[#aa73ff]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#d6baff]" />
                  <h3 className="font-geist text-sm font-bold text-[#d6baff] uppercase tracking-wider">
                    Core Key Takeaways
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {summary.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#282a2b]/60 transition-colors cursor-pointer"
                    >
                      <button className="mt-0.5 text-[#d6baff]">
                        {checkedItems[idx] ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-[#968da0]" />
                        )}
                      </button>
                      <span className={`text-xs md:text-sm leading-relaxed ${checkedItems[idx] ? 'line-through text-[#968da0]' : 'text-[#e1e3e4]'}`}>
                        {takeaway}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Content Notes */}
              <div className="space-y-4 text-[#e1e3e4] text-sm md:text-base leading-relaxed whitespace-pre-line font-inter">
                {summary.fullContent}
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="flex flex-col items-center justify-center py-4 space-y-6">
              {currentCard ? (
                <>
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full max-w-md h-64 glass-panel rounded-2xl p-6 flex flex-col justify-between items-center text-center cursor-pointer border border-[#aa73ff]/30 shadow-xl hover:border-[#aa73ff] transition-all transform perspective-1000 group relative"
                  >
                    <div className="w-full flex justify-between items-center text-xs text-[#968da0]">
                      <span className="uppercase font-semibold tracking-wider text-[#d6baff]">
                        Card {currentFlashcardIndex + 1} of {summary.flashcards.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        Click to Flip
                      </span>
                    </div>

                    <div className="my-auto px-4">
                      {isFlipped ? (
                        <div className="animate-in fade-in duration-200">
                          <p className="text-xs uppercase font-bold text-emerald-400 mb-2">Answer</p>
                          <p className="font-geist text-base md:text-lg font-medium text-[#e1e3e4] leading-relaxed">
                            {currentCard.back}
                          </p>
                        </div>
                      ) : (
                        <div className="animate-in fade-in duration-200">
                          <p className="text-xs uppercase font-bold text-[#d6baff] mb-2">Question</p>
                          <p className="font-geist text-base md:text-lg font-semibold text-[#e1e3e4] leading-relaxed">
                            {currentCard.front}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-[#968da0]">
                      {isFlipped ? 'Tap to review question' : 'Tap to reveal answer'}
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center gap-4">
                    <button
                      disabled={currentFlashcardIndex === 0}
                      onClick={() => {
                        setCurrentFlashcardIndex((prev) => prev - 1);
                        setIsFlipped(false);
                      }}
                      className="p-3 rounded-xl bg-[#1E1E22] border border-[#2C2C30] hover:border-[#aa73ff] disabled:opacity-40 disabled:cursor-not-allowed text-[#e1e3e4] transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-semibold text-[#cdc2d7]">
                      {currentFlashcardIndex + 1} / {summary.flashcards.length}
                    </span>
                    <button
                      disabled={currentFlashcardIndex === summary.flashcards.length - 1}
                      onClick={() => {
                        setCurrentFlashcardIndex((prev) => prev + 1);
                        setIsFlipped(false);
                      }}
                      className="p-3 rounded-xl bg-[#1E1E22] border border-[#2C2C30] hover:border-[#aa73ff] disabled:opacity-40 disabled:cursor-not-allowed text-[#e1e3e4] transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[#968da0]">No flashcards generated for this lecture yet.</p>
              )}
            </div>
          )}

          {activeTab === 'glossary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {summary.glossary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#1E1E22]/80 border border-[#2C2C30] hover:border-[#aa73ff]/40 transition-all"
                >
                  <h4 className="font-geist text-sm font-bold text-[#d6baff] mb-1">
                    {item.term}
                  </h4>
                  <p className="text-xs text-[#cdc2d7] leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:p-5 border-t border-white/10 bg-[#111415]/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#968da0]">
            AI summary generated from live audio transcript & syllabus.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onTakeQuizForSubject && (
              <button
                onClick={() => {
                  onClose();
                  onTakeQuizForSubject(summary.subject);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#9D5CFF] text-[#0F0F12] font-semibold text-xs hover:bg-[#aa73ff] transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Test Knowledge on {summary.subject}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
