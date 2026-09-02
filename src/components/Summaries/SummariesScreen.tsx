import React, { useState } from 'react';
import { Search, Sparkles, Wand2, BookOpen, Plus } from 'lucide-react';
import { LectureSummary } from '../../types';
import { SummaryDetailModal } from './SummaryDetailModal';
import { TextProcessorDrawer } from './TextProcessorDrawer';

interface SummariesScreenProps {
  summaries: LectureSummary[];
  onAddSummary: (summary: LectureSummary) => void;
  onTakeQuizForSubject?: (subject: string) => void;
}

export const SummariesScreen: React.FC<SummariesScreenProps> = ({
  summaries,
  onAddSummary,
  onTakeQuizForSubject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSummary, setActiveSummary] = useState<LectureSummary | null>(null);
  const [isProcessorOpen, setIsProcessorOpen] = useState(false);

  const categories = ['All', 'Computer Science', 'Biology', 'Physics', 'Literature'];

  const filteredSummaries = summaries.filter((summary) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      summary.subject.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-geist text-2xl md:text-3xl font-bold text-[#e1e3e4] tracking-tight">
              Lecture Summaries
            </h1>
            <p className="text-xs md:text-sm text-[#cdc2d7] mt-0.5">
              AI-generated synthesis, active recall flashcards, and conceptual glossaries
            </p>
          </div>

          <button
            onClick={() => setIsProcessorOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9D5CFF] hover:bg-[#aa73ff] text-[#0F0F12] font-semibold text-xs transition-all shadow-md active:scale-95"
          >
            <Wand2 className="w-4 h-4" />
            <span>Process Lecture Notes</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#968da0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search summaries, subjects, or keywords..."
            className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl py-3 pl-12 pr-4 text-sm text-[#e1e3e4] placeholder:text-[#968da0] focus:outline-none focus:border-[#9D5CFF] focus:ring-1 focus:ring-[#9D5CFF] transition-all shadow-sm"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-geist font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d6baff] text-[#420089] font-semibold shadow-sm'
                  : 'bg-[#1E1E22] text-[#cdc2d7] hover:bg-[#282a2b] border border-[#2C2C30]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Summaries */}
      {filteredSummaries.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-[#968da0]" />
          <p className="text-sm text-[#cdc2d7] font-medium">No lecture summaries found matching your filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-[#d6baff] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSummaries.map((summary) => (
            <div
              key={summary.id}
              className="glass-panel rounded-2xl p-5 flex flex-col justify-between h-full group hover:border-[#aa73ff]/40 transition-all duration-300 relative"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${summary.subjectTagBg} ${summary.subjectTagText} border ${summary.subjectBorder}`}
                  >
                    {summary.subject}
                  </span>
                  <span className="text-[#968da0] text-[11px] font-medium">{summary.date}</span>
                </div>

                <h3 className="font-geist text-base md:text-lg font-semibold text-[#e1e3e4] mb-2 leading-snug group-hover:text-[#d6baff] transition-colors">
                  {summary.title}
                </h3>

                <p className="text-[#cdc2d7] text-xs md:text-sm line-clamp-3 leading-relaxed">
                  {summary.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5">
                <button
                  id={`preview-summary-${summary.id}`}
                  onClick={() => setActiveSummary(summary)}
                  className="w-full py-2.5 rounded-xl bg-[#1E1E22] border border-[#2C2C30] text-[#e1e3e4] text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#9D5CFF]/15 hover:border-[#9D5CFF]/50 hover:text-[#d6baff] transition-all active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#d6baff]" />
                  <span>AI Summary Preview</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Detail & Flashcards Modal */}
      <SummaryDetailModal
        summary={activeSummary}
        onClose={() => setActiveSummary(null)}
        onTakeQuizForSubject={onTakeQuizForSubject}
      />

      {/* Text Processing Drawer */}
      <TextProcessorDrawer
        isOpen={isProcessorOpen}
        onClose={() => setIsProcessorOpen(false)}
        onSaveAsSummary={onAddSummary}
      />
    </div>
  );
};
