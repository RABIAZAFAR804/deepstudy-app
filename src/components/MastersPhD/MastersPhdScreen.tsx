import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  BookOpen,
  Award,
  FileCode,
  GraduationCap,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MastersPhDResource } from '../../types';

interface MastersPhdScreenProps {
  resources: MastersPhDResource[];
  onOpenPdfModal?: (fileName: string) => void;
}

export const MastersPhdScreen: React.FC<MastersPhdScreenProps> = ({
  resources,
  onOpenPdfModal
}) => {
  const [selectedResourceId, setSelectedResourceId] = useState<string>(resources[0]?.id || '');
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const selectedResource = resources.find((r) => r.id === selectedResourceId) || resources[0];

  const handleCopyLatex = (latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleDownloadPaper = (paper: { fileName: string }) => {
    setDownloadSuccessMsg(`Downloaded "${paper.fileName}"`);
    setTimeout(() => setDownloadSuccessMsg(null), 3000);
    if (onOpenPdfModal) {
      onOpenPdfModal(paper.fileName);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#17122b] via-[#161d2d] to-[#111415] border border-[#9D5CFF]/30 shadow-[0_0_35px_rgba(157,92,255,0.15)]">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 text-[#d6baff] text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>MS &amp; PhD Doctoral Research Repository</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[10px] text-[#e1e3e4]">Fellow: Rabia Zafar</span>
            </div>
            <h1 className="font-geist text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Graduate &amp; Doctoral Research Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#cdc2d7] mt-2 max-w-2xl leading-relaxed">
              Advanced monographs and peer-reviewed guides on Transformer Attention Geometries, Distributed Consensus (Raft/Paxos), Quantum Computing, and PhD Thesis Proposal to Defense Roadmaps.
            </p>
          </div>

          <button
            onClick={() => handleDownloadPaper(selectedResource.downloadablePaper)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#38BDF8] text-white font-geist text-xs font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] active:scale-95 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Selected Monograph</span>
          </button>
        </div>

        {downloadSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Resource Selector & In-depth Monograph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Monograph List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {resources.map((res) => {
            const isSelected = res.id === selectedResource.id;
            return (
              <div
                key={res.id}
                onClick={() => setSelectedResourceId(res.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col gap-2.5 ${
                  isSelected
                    ? 'bg-[#1E1E22] border-[#38BDF8]/60 shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-[#38BDF8]/40'
                    : 'bg-[#15181a]/80 hover:bg-[#1c1f21] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                    {res.level}
                  </span>
                  <span className="text-[10px] text-[#968da0]">{res.year}</span>
                </div>

                <h3 className="font-geist text-sm font-bold text-white line-clamp-2 leading-snug">
                  {res.title}
                </h3>

                <p className="text-[11px] text-[#cdc2d7] line-clamp-2 leading-relaxed">
                  {res.abstract}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-[#968da0]">
                  <span className="truncate max-w-[150px]">{res.field}</span>
                  <span className="flex items-center gap-1 text-[#38BDF8] font-semibold">
                    Read Paper <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Monograph In-Depth View (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Paper Header */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/40">
                  {selectedResource.level}
                </span>
                <span className="text-xs text-[#38BDF8] font-medium">{selectedResource.field}</span>
              </div>

              <button
                onClick={() => handleDownloadPaper(selectedResource.downloadablePaper)}
                className="px-3.5 py-1.5 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-[#38BDF8]/40 text-xs font-semibold text-[#38BDF8] flex items-center gap-1.5 transition-all self-start"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF ({selectedResource.downloadablePaper.fileSize})</span>
              </button>
            </div>

            <h2 className="font-geist text-xl sm:text-2xl font-bold text-white leading-tight">
              {selectedResource.title}
            </h2>

            <div className="p-3 bg-[#111415]/70 rounded-xl border border-white/5 text-xs text-[#cdc2d7] font-mono leading-relaxed">
              <strong className="text-white">Citation: </strong>
              {selectedResource.citation}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">Abstract</h4>
              <p className="text-xs sm:text-sm text-[#cdc2d7] leading-relaxed">
                {selectedResource.abstract}
              </p>
            </div>
          </div>

          {/* Mathematical Formulations & Core Contributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Contributions */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <h4 className="font-geist text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d6baff]" />
                Key Novel Contributions
              </h4>
              <ul className="space-y-2">
                {selectedResource.keyContributions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#cdc2d7]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mathematical Foundations */}
            {selectedResource.mathematicalFormulations && (
              <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
                <h4 className="font-geist text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#38BDF8]" />
                  Mathematical Formulations
                </h4>
                <div className="space-y-2">
                  {selectedResource.mathematicalFormulations.map((form, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#0b0d0e] border border-white/10 font-mono text-xs text-[#38BDF8] overflow-x-auto">
                      <code>${form}$</code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Thesis Guidelines & Defense Roadmap if available */}
          {selectedResource.thesisGuidelines && (
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <h4 className="font-geist text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#d6baff]" />
                Doctoral Milestone &amp; Defense Checklist
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {selectedResource.thesisGuidelines.map((stage, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#111415]/80 border border-white/10 flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6baff]">{stage.stage}</span>
                      <h5 className="text-xs font-bold text-white mt-0.5">{stage.milestone}</h5>
                      <ul className="mt-2 space-y-1">
                        {stage.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="text-[11px] text-[#cdc2d7] flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#38BDF8]" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-[10px] text-[#968da0] italic pt-2 border-t border-white/5">
                      💡 {stage.tips}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LaTeX Dissertation Template */}
          {selectedResource.latexTemplateSnippet && (
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="font-geist text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#38BDF8]" />
                  LaTeX Academic Template
                </h4>
                <button
                  onClick={() => handleCopyLatex(selectedResource.latexTemplateSnippet!)}
                  className="text-xs text-[#cdc2d7] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5"
                >
                  {copiedLatex ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy LaTeX</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-[#0b0d0e] border border-white/10 text-xs font-mono text-[#38BDF8] overflow-x-auto">
                <code>{selectedResource.latexTemplateSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
