import React, { useState } from 'react';
import {
  Code,
  Download,
  BookOpen,
  Binary,
  Layers,
  Sparkles,
  ChevronRight,
  Terminal,
  FileText,
  Search,
  CheckCircle2,
  Copy,
  Check,
  GraduationCap
} from 'lucide-react';
import { BSCSSubject } from '../../types';

interface BSCSHubScreenProps {
  subjects: BSCSSubject[];
  onOpenPdfModal?: (fileName: string) => void;
}

export const BSCSHubScreen: React.FC<BSCSHubScreenProps> = ({
  subjects,
  onOpenPdfModal
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const categories = ['All', 'Core', 'Software', 'AI & Systems', 'Advanced'];

  const filteredSubjects = subjects.filter((subj) => {
    const matchesCat = activeCategory === 'All' || subj.category === activeCategory;
    const matchesSearch =
      subj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleDownloadNotes = (doc: { fileName: string }) => {
    setDownloadSuccessMsg(`Downloaded "${doc.fileName}" successfully!`);
    setTimeout(() => setDownloadSuccessMsg(null), 3000);
    if (onOpenPdfModal) {
      onOpenPdfModal(doc.fileName);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#19152b] via-[#151824] to-[#111415] border border-[#9D5CFF]/30 shadow-[0_0_35px_rgba(157,92,255,0.15)]">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#9D5CFF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 text-[#d6baff] text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>BS Computer Science Academic Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6baff]" />
              <span className="text-[10px] text-[#e1e3e4]">Curated by Rabia Zafar</span>
            </div>
            <h1 className="font-geist text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              BSCS Core Curriculum &amp; Notes
            </h1>
            <p className="text-xs sm:text-sm text-[#cdc2d7] mt-2 max-w-2xl leading-relaxed">
              Complete semester-by-semester modules covering Data Structures, Operating Systems, DBMS, Networks, AI/ML, Compiler, Automata, and Cryptography with code snippets and downloadable PDF guides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleDownloadNotes(selectedSubject.downloadableDoc)}
              className="px-4 py-2.5 rounded-xl bg-[#9D5CFF] hover:bg-[#8b5cf6] text-white font-geist text-xs font-bold transition-all shadow-[0_0_20px_rgba(157,92,255,0.4)] active:scale-95 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Full BSCS Pack</span>
            </button>
          </div>
        </div>

        {downloadSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/50 font-semibold shadow-[0_0_12px_rgba(157,92,255,0.2)]'
                  : 'bg-[#191c1d] text-[#968da0] hover:text-[#cdc2d7] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-[#968da0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subjects, topics, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#191c1d] border border-white/10 rounded-xl text-xs text-white placeholder-[#968da0] focus:outline-none focus:border-[#9D5CFF]/60"
          />
        </div>
      </div>

      {/* Main Grid: Subject Selector & Subject Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Cards Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredSubjects.map((subj) => {
            const isSelected = subj.id === selectedSubject.id;
            return (
              <div
                key={subj.id}
                onClick={() => setSelectedSubjectId(subj.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-[#1E1E22] border-[#9D5CFF]/60 shadow-[0_0_20px_rgba(157,92,255,0.15)] ring-1 ring-[#9D5CFF]/40'
                    : 'bg-[#15181a]/80 hover:bg-[#1c1f21] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-[#d6baff] border border-white/10">
                    {subj.code}
                  </span>
                  <span className="text-[10px] text-[#968da0]">{subj.semester}</span>
                </div>

                <h3 className="font-geist text-sm font-bold text-white line-clamp-1">
                  {subj.title}
                </h3>

                <p className="text-[11px] text-[#cdc2d7] line-clamp-2 leading-relaxed">
                  {subj.overview}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-[#968da0]">
                  <span>{subj.keyTopics.length} Core Topics</span>
                  <span className="flex items-center gap-1 text-[#d6baff] font-semibold">
                    View Notes <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Subject In-Depth Workspace (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Header Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/40">
                    {selectedSubject.code}
                  </span>
                  <span className="text-xs text-[#968da0]">{selectedSubject.semester} • {selectedSubject.creditHours}</span>
                </div>
                <h2 className="font-geist text-xl sm:text-2xl font-bold text-white">
                  {selectedSubject.title}
                </h2>
              </div>

              <button
                onClick={() => handleDownloadNotes(selectedSubject.downloadableDoc)}
                className="px-4 py-2 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-[#9D5CFF]/40 text-xs font-semibold text-[#d6baff] flex items-center gap-2 transition-all active:scale-95 self-start"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Summary ({selectedSubject.downloadableDoc.fileSize})</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#cdc2d7] mt-4 leading-relaxed">
              {selectedSubject.overview}
            </p>

            {/* Quick Cheat Sheet Banner */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#111415] border border-white/10 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#d6baff] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#d6baff] uppercase tracking-wider">Exam Formula &amp; Cheat Summary</span>
                <p className="text-xs text-[#e1e3e4] font-mono mt-0.5">{selectedSubject.cheatSheetSummary}</p>
              </div>
            </div>
          </div>

          {/* Key Syllabus Topics & Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Topics Checklist */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <h4 className="font-geist text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d6baff]" />
                Key Syllabus Topics
              </h4>
              <ul className="space-y-2">
                {selectedSubject.keyTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#cdc2d7]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d6baff] shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Algorithms / Complexities */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <h4 className="font-geist text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Binary className="w-4 h-4 text-[#38BDF8]" />
                Core Algorithms &amp; Complexities
              </h4>
              <div className="space-y-2.5">
                {selectedSubject.topAlgorithmsOrConcepts.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#111415]/60 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#9D5CFF]/15 text-[#d6baff]">
                        {item.complexityOrFormula}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#968da0] mt-1">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Module Deep-Dive & Code Snippets */}
          {selectedSubject.lectureModules.map((module) => (
            <div key={module.moduleNumber} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="font-geist text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Module {module.moduleNumber}: {module.title}
                </h4>
                <span className="text-[10px] text-[#968da0]">Detailed Note &amp; Code</span>
              </div>

              <p className="text-xs text-[#cdc2d7] leading-relaxed">{module.description}</p>

              <div className="space-y-1.5">
                {module.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#e1e3e4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {module.codeSnippet && (
                <div className="mt-2 rounded-xl bg-[#0b0d0e] border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[#141718] border-b border-white/10">
                    <span className="text-[10px] font-mono text-[#968da0] uppercase">
                      {module.codeLang || 'cpp'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(module.codeSnippet!, `mod-${module.moduleNumber}`)}
                      className="text-[10px] text-[#cdc2d7] hover:text-white flex items-center gap-1"
                    >
                      {copiedCodeId === `mod-${module.moduleNumber}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{module.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}

          {/* Recommended Reference Books */}
          <div className="p-4 rounded-2xl bg-[#191c1d]/60 border border-white/5 flex items-center justify-between text-xs text-[#968da0]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d6baff]" />
              <span>Recommended Standard Texts:</span>
              <span className="text-[#e1e3e4] font-medium">{selectedSubject.recommendedBooks.join(' • ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
