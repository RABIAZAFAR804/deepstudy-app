import React, { useState } from 'react';
import {
  Stethoscope,
  Download,
  Dna,
  FlaskConical,
  Atom,
  BookOpenCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  ChevronRight,
  FileText
} from 'lucide-react';
import { MDCATSubject, MDCATPastPaper } from '../../types';

interface MDCATHubScreenProps {
  subjects: MDCATSubject[];
  pastPapers: MDCATPastPaper[];
  onOpenPdfModal?: (fileName: string) => void;
}

export const MDCATHubScreen: React.FC<MDCATHubScreenProps> = ({
  subjects,
  pastPapers,
  onOpenPdfModal
}) => {
  const [activeTab, setActiveTab] = useState<'past_papers' | 'practice_test' | 'formula_sheet'>('past_papers');
  const [selectedSubject, setSelectedSubject] = useState<MDCATSubject>(subjects[0]);
  const [selectedPaper, setSelectedPaper] = useState<MDCATPastPaper>(pastPapers[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Practice Test State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const sampleQuestions = selectedPaper.sampleQuestions || [];

  const handleSelectAnswer = (qId: string, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleCalculateScore = () => {
    setShowResults(true);
  };

  const handleResetTest = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const handleDownloadPaper = (paper: MDCATPastPaper) => {
    setDownloadSuccess(`Downloaded "${paper.downloadablePdf.fileName}"`);
    setTimeout(() => setDownloadSuccess(null), 3000);
    if (onOpenPdfModal) {
      onOpenPdfModal(paper.downloadablePdf.fileName);
    }
  };

  // Score Calculation
  const totalAttempted = Object.keys(userAnswers).length;
  let correctCount = 0;
  sampleQuestions.forEach((q) => {
    if (userAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0d2319] via-[#12242b] to-[#111415] border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.15)]">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>National MDCAT Medical Entrance Portal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-[#e1e3e4]">PMDC / UHS Syllabus</span>
            </div>
            <h1 className="font-geist text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              MDCAT Past Papers, Quizzes &amp; High-Yield Cheats
            </h1>
            <p className="text-xs sm:text-sm text-[#cdc2d7] mt-2 max-w-2xl leading-relaxed">
              Official past papers from 2020 through 2025, interactive timed MCQ simulations with negative marking calculation, step-by-step biological rationale, and formula reference sheets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleDownloadPaper(selectedPaper)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-geist text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download 5-Yr Solved Booklet</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#191c1d] rounded-2xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('past_papers')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'past_papers'
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'text-[#968da0] hover:text-white'
          }`}
        >
          Past Papers (2020 - 2025)
        </button>
        <button
          onClick={() => setActiveTab('practice_test')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'practice_test'
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'text-[#968da0] hover:text-white'
          }`}
        >
          <span>MCQ Test Simulator</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20 font-mono">Live</span>
        </button>
        <button
          onClick={() => setActiveTab('formula_sheet')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'formula_sheet'
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'text-[#968da0] hover:text-white'
          }`}
        >
          High-Yield Formula &amp; Mnemonics
        </button>
      </div>

      {/* TAB 1: PAST PAPERS LIST */}
      {activeTab === 'past_papers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastPapers.map((paper) => (
            <div
              key={paper.id}
              className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col justify-between gap-4 hover:border-emerald-500/40 transition-all hover:shadow-[0_0_24px_rgba(16,185,129,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-extrabold px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    MDCAT {paper.year}
                  </span>
                  <span className="text-[11px] text-[#968da0] font-mono">{paper.durationMinutes} Mins</span>
                </div>

                <h3 className="font-geist text-base font-bold text-white mb-1">
                  {paper.conductingBody}
                </h3>
                <p className="text-xs text-[#cdc2d7] mb-3">
                  Full standard paper containing {paper.totalQuestions} questions with step-by-step verified answer keys.
                </p>

                {/* Subject count badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {paper.subjectsBreakdown.map((sb, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#cdc2d7] border border-white/5"
                    >
                      {sb.subject}: {sb.count} Qs
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedPaper(paper);
                    setActiveTab('practice_test');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-white/10 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Solve Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDownloadPaper(paper)}
                  className="py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: MCQ PRACTICE TEST SIMULATOR */}
      {activeTab === 'practice_test' && (
        <div className="flex flex-col gap-5">
          {/* Header info */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedPaper.year} Test Simulation
                </span>
                <span className="text-xs text-[#968da0]">{sampleQuestions.length} Questions</span>
              </div>
              <h3 className="font-geist text-lg font-bold text-white">
                MDCAT Real-Time Interactive Simulator
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {showResults ? (
                <button
                  onClick={handleResetTest}
                  className="px-4 py-2 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              ) : (
                <button
                  onClick={handleCalculateScore}
                  disabled={totalAttempted === 0}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-geist text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submit &amp; View Rationale</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary if submitted */}
          {showResults && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-[#111415] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Test Completed</span>
                <h4 className="font-geist text-2xl font-bold text-white mt-1">
                  Your Score: {correctCount} / {sampleQuestions.length} ({Math.round((correctCount / sampleQuestions.length) * 100)}%)
                </h4>
                <p className="text-xs text-[#cdc2d7] mt-1">
                  Review the detailed medical and scientific rationales below for every option.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-[#968da0]">Correct</p>
                  <p className="text-lg font-bold text-emerald-400">{correctCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#968da0]">Incorrect</p>
                  <p className="text-lg font-bold text-red-400">{totalAttempted - correctCount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="flex flex-col gap-4">
            {sampleQuestions.map((q, idx) => {
              const selectedOption = userAnswers[q.id];
              const isCorrect = selectedOption === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`glass-panel p-5 sm:p-6 rounded-3xl border transition-all ${
                    showResults
                      ? isCorrect
                        ? 'border-emerald-500/50 bg-emerald-950/10'
                        : 'border-red-500/40 bg-red-950/10'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-white/5 text-[#cdc2d7]">
                      Q{idx + 1} • {q.subject}
                    </span>
                    {showResults && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {isCorrect ? 'Correct +1' : 'Incorrect 0'}
                      </span>
                    )}
                  </div>

                  <h4 className="font-geist text-sm sm:text-base font-semibold text-white leading-relaxed mb-4">
                    {q.question}
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOption === optIdx;
                      const isCorrectChoice = optIdx === q.correctIndex;

                      let btnStyle = 'bg-[#191c1d] border-white/5 text-[#cdc2d7] hover:border-white/20';

                      if (isChosen && !showResults) {
                        btnStyle = 'bg-emerald-500/15 border-emerald-500/50 text-white font-semibold ring-1 ring-emerald-500/40';
                      } else if (showResults) {
                        if (isCorrectChoice) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isChosen && !isCorrectChoice) {
                          btnStyle = 'bg-red-500/20 border-red-500 text-red-300 font-bold';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {showResults && isCorrectChoice && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {showResults && isChosen && !isCorrectChoice && (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Rationale explanation */}
                  {showResults && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-[#111415] border border-white/10 text-xs text-[#cdc2d7] leading-relaxed">
                      <strong className="text-emerald-300 font-semibold block mb-1">
                        High-Yield MDCAT Rationale:
                      </strong>
                      {q.rationale}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FORMULA SHEET & HIGH-YIELD TOPICS */}
      {activeTab === 'formula_sheet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Subject Pills Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {subjects.map((subj) => {
              const isSelected = subj.id === selectedSubject.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => setSelectedSubject(subj)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1E1E22] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40'
                      : 'bg-[#15181a]/80 hover:bg-[#1c1f21] border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Dna className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-geist text-sm font-bold text-white">{subj.name}</h4>
                      <p className="text-[11px] text-[#968da0]">{subj.weightage}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#968da0]" />
                </button>
              );
            })}
          </div>

          {/* Formula & High Yield Cards */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* High-Yield Topics List */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-3">
              <h3 className="font-geist text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {selectedSubject.name} High-Yield Exam Topics
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {selectedSubject.highYieldTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#111415]/60 border border-white/5 text-xs text-[#cdc2d7]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formula Cards */}
            <div className="flex flex-col gap-3">
              <h3 className="font-geist text-sm font-bold text-white uppercase tracking-wider">
                Key Formulas &amp; Equations
              </h3>
              {selectedSubject.formulaSheet.map((item, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-geist text-sm font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                      Formula
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0b0d0e] border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <code>${item.formula}$</code>
                  </div>
                  <p className="text-xs text-[#cdc2d7] leading-relaxed mt-1">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
