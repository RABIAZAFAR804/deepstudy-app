import React, { useState } from 'react';
import { X, Sparkles, Wand2, FileText, Check, Copy, RefreshCw, Layers } from 'lucide-react';
import { LectureSummary } from '../../types';

interface TextProcessorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAsSummary: (newSummary: LectureSummary) => void;
}

const PRESET_SNIPPETS = [
  {
    title: 'Computer Systems: Memory Hierarchy & Caches',
    subject: 'Computer Science',
    text: `The memory hierarchy exploits temporal and spatial locality to bridge the CPU-DRAM speed gap. L1, L2, and L3 SRAM caches store frequently referenced data. When a CPU executes a load instruction, it first queries L1; on a cache miss, it checks lower levels until DRAM. Cache placement policies include Direct-Mapped, Set-Associative, and Fully-Associative. Cache line replacement algorithms like LRU (Least Recently Used) optimize hit rates.`
  },
  {
    title: 'Thermodynamics & Carnot Efficiency',
    subject: 'Physics',
    text: `The Second Law of Thermodynamics establishes that total entropy in an isolated system always increases over time. The Carnot cycle represents the theoretical maximum efficiency achievable by any heat engine operating between two temperatures T_hot and T_cold. Efficiency eta is strictly equal to 1 - (T_cold / T_hot). Real engines incur irreversibilities due to friction, turbulence, and finite-rate heat transfer.`
  },
  {
    title: 'Cellular Mitosis & Checkpoints',
    subject: 'Biology',
    text: `Mitosis is the nuclear division process comprising Prophase, Metaphase, Anaphase, and Telophase. Strict cell cycle checkpoints (G1/S, G2/M, and the Spindle Assembly Checkpoint) monitor DNA integrity and chromosomal alignment via Cyclin-CDK complexes and tumor suppressor p53. Failures at these control checkpoints can lead to aneuploidy and oncogenesis.`
  }
];

export const TextProcessorDrawer: React.FC<TextProcessorDrawerProps> = ({
  isOpen,
  onClose,
  onSaveAsSummary
}) => {
  const [inputText, setInputText] = useState(PRESET_SNIPPETS[0].text);
  const [subject, setSubject] = useState('Computer Science');
  const [title, setTitle] = useState(PRESET_SNIPPETS[0].title);
  const [processingFormat, setProcessingFormat] = useState<'brief' | 'takeaways' | 'flashcards'>('takeaways');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResult, setProcessedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleProcessText = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setProcessedResult(null);

    setTimeout(() => {
      let result = '';
      const lines = inputText.split('.').filter((s) => s.trim().length > 0);

      if (processingFormat === 'brief') {
        result = `### 📋 Executive Summary\n\n${inputText.trim()}\n\n**Main Synthesis:** This material emphasizes fundamental principles in ${subject}. Understanding the core mechanisms and operational constraints is essential for higher-order problem solving.`;
      } else if (processingFormat === 'takeaways') {
        result = `### ✨ Key Takeaways & Core Concepts\n\n` +
          lines.slice(0, 4).map((line, idx) => `• **Point ${idx + 1}:** ${line.trim()}.`).join('\n') +
          `\n\n### 💡 Recommended Study Action\n• Review core terminology and test self-recall with practice questions within 24 hours.`;
      } else {
        result = `### 🗂️ Generated Flashcards Deck\n\n` +
          `**Card 1 (Core Definition)**\nQ: What is the main subject discussed in this lecture segment?\nA: ${title} (${subject})\n\n` +
          `**Card 2 (Mechanism)**\nQ: Summarize the primary operational rule or theorem.\nA: ${lines[0] ? lines[0].trim() : 'Key foundational principle'}.\n\n` +
          `**Card 3 (Application)**\nQ: What is a critical requirement or constraint?\nA: ${lines[1] ? lines[1].trim() : 'System equilibrium and efficiency constraints'}.`;
      }

      setProcessedResult(result);
      setIsProcessing(false);
    }, 600);
  };

  const handleSaveSummary = () => {
    const newSummary: LectureSummary = {
      id: `sum-custom-${Date.now()}`,
      title: title || 'Processed Lecture Notes',
      subject: subject || 'General',
      subjectTagBg: 'bg-[#280057]/60',
      subjectTagText: 'text-[#d6baff]',
      subjectBorder: 'border-[#aa73ff]/30',
      date: 'Today',
      readTime: '3 min read',
      excerpt: inputText.slice(0, 110) + '...',
      fullContent: processedResult || inputText,
      keyTakeaways: [
        'Critical concept synthesis from student notes.',
        'Primary operational laws and constraints identified.',
        'Ready for active recall and spaced repetition.'
      ],
      glossary: [
        { term: 'Core Concept', definition: 'Main subject matter synthesized from lecture text.' }
      ],
      flashcards: [
        { id: `fc-1-${Date.now()}`, front: `What is the focus of "${title}"?`, back: inputText.slice(0, 90) + '...' }
      ]
    };

    onSaveAsSummary(newSummary);
    onClose();
  };

  const handleCopy = () => {
    if (!processedResult) return;
    navigator.clipboard.writeText(processedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 flex items-center justify-center text-[#d6baff]">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-geist text-base font-bold text-[#e1e3e4]">
                AI Lecture Text Summarizer & Processor
              </h3>
              <p className="text-[11px] text-[#968da0]">
                Paste raw lecture transcripts or notes to generate summaries & flashcards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Presets */}
          <div>
            <label className="text-xs font-semibold text-[#cdc2d7] block mb-2">
              Load Sample Lecture Notes:
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_SNIPPETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTitle(preset.title);
                    setSubject(preset.subject);
                    setInputText(preset.text);
                    setProcessedResult(null);
                  }}
                  className="px-3 py-1 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] hover:border-[#aa73ff]/40 text-xs text-[#cdc2d7] transition-all text-left"
                >
                  {preset.subject}: {preset.title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Subject Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
                Lecture / Topic Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
                placeholder="e.g. Distributed Consensus"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
              Raw Notes or Lecture Excerpt
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl p-3 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF] resize-none leading-relaxed"
              placeholder="Paste raw lecture text here..."
            />
          </div>

          {/* Target Output Format */}
          <div>
            <label className="text-xs font-semibold text-[#cdc2d7] block mb-2">
              Output Transformation Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'takeaways', label: 'Key Takeaways', icon: Sparkles },
                { id: 'brief', label: 'Executive Brief', icon: FileText },
                { id: 'flashcards', label: 'Flashcards', icon: Layers }
              ].map((fmt) => {
                const Icon = fmt.icon;
                const isSelected = processingFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setProcessingFormat(fmt.id as any)}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#9D5CFF]/20 border-[#9D5CFF] text-[#d6baff] shadow-[0_0_10px_rgba(157,92,255,0.2)]'
                        : 'bg-[#1E1E22] border-[#2C2C30] text-[#968da0] hover:text-[#cdc2d7]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Process Button */}
          <button
            disabled={isProcessing || !inputText.trim()}
            onClick={handleProcessText}
            className="w-full py-2.5 rounded-xl bg-[#9D5CFF] hover:bg-[#aa73ff] disabled:opacity-50 text-[#0F0F12] font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Academic Notes...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Process & Generate Summary</span>
              </>
            )}
          </button>

          {/* Processed Results Output */}
          {processedResult && (
            <div className="p-4 rounded-xl bg-[#1E1E22] border border-[#aa73ff]/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d6baff]">
                  Synthesized Output
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-[#cdc2d7] hover:text-[#d6baff]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xs text-[#e1e3e4] leading-relaxed whitespace-pre-line font-inter">
                {processedResult}
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSummary}
                  className="px-3.5 py-1.5 rounded-lg bg-[#9D5CFF]/20 hover:bg-[#9D5CFF] text-[#d6baff] hover:text-[#0F0F12] border border-[#9D5CFF]/40 text-xs font-semibold transition-all"
                >
                  Save to My Summaries
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
