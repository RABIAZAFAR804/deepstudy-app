import React, { useState } from 'react';
import { X, Sparkles, Wand2, FileText, Check, Copy, RefreshCw, Layers, ArrowRight } from 'lucide-react';
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
  const [processingFormat, setProcessingFormat] = useState<'takeaways' | 'brief' | 'flashcards'>('takeaways');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTextProcessing = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setAiResult('');

    try {
      // Clean synthesis logic
      await new Promise((resolve) => setTimeout(resolve, 600));

      const sentences = inputText
        .split(/(?<=[.?!])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 5);

      let summary = '';
      if (processingFormat === 'takeaways') {
        summary = `### ✨ Key Takeaways & Core Concepts\n\n` +
          sentences.slice(0, 4).map((s, idx) => `• **Key Point ${idx + 1}:** ${s}`).join('\n\n') +
          `\n\n### 💡 Critical Examination Note\n• Master the core mechanisms and boundary conditions for this topic in ${subject}.`;
      } else if (processingFormat === 'brief') {
        summary = `### 📋 Executive Synthesis: ${title}\n\n` +
          `${inputText.trim()}\n\n` +
          `**Core Takeaway:** This topic in ${subject} establishes foundational paradigms essential for advanced problem-solving, theoretical proofs, and practical exams.`;
      } else {
        summary = `### 🗂️ Active-Recall Flashcard Deck\n\n` +
          `**Card 1 (Core Concept)**\nQ: What is the main subject discussed in this segment?\nA: ${title} (${subject})\n\n` +
          `**Card 2 (Mechanism)**\nQ: What is the primary operational rule or mechanism?\nA: ${sentences[0] || 'Core fundamental principle'}\n\n` +
          `**Card 3 (Application / Constraint)**\nQ: What is a critical condition or consequence?\nA: ${sentences[1] || 'Ensures theoretical consistency and system stability'}`;
      }

      setAiResult(summary);
    } catch (err) {
      console.error('Processing error:', err);
      setAiResult('Synthesis encountered an issue. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!aiResult && !inputText.trim()) return;

    const sentences = (aiResult || inputText)
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim().replace(/^•\s*\*\*.*?\*\*:\s*/, ''))
      .filter((s) => s.length > 10);

    const newSummary: LectureSummary = {
      id: `sum-ai-${Date.now()}`,
      title: title || 'AI Generated Lecture Summary',
      subject: subject || 'Computer Science',
      subjectTagBg: subject.toLowerCase().includes('bio') ? 'bg-[#00574B]/40' : subject.toLowerCase().includes('phys') ? 'bg-[#572E00]/40' : 'bg-[#280057]/60',
      subjectTagText: subject.toLowerCase().includes('bio') ? 'text-[#A3F2E3]' : subject.toLowerCase().includes('phys') ? 'text-[#F2CFA3]' : 'text-[#d6baff]',
      subjectBorder: subject.toLowerCase().includes('bio') ? 'border-[#00574B]/50' : subject.toLowerCase().includes('phys') ? 'border-[#572E00]/50' : 'border-[#aa73ff]/30',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '4 min read',
      excerpt: inputText.slice(0, 110) + '...',
      fullContent: aiResult || inputText,
      keyTakeaways: sentences.slice(0, 3).length > 0 ? sentences.slice(0, 3) : [
        'Fundamental mechanism and system architecture analyzed.',
        'Asymptotic efficiency and equilibrium constraints identified.',
        'High-yield concepts ready for spaced repetition.'
      ],
      glossary: [
        { term: title || 'Core Concept', definition: `Key academic topic in ${subject} synthesized for study review.` }
      ],
      flashcards: [
        { id: `fc-${Date.now()}-1`, front: `What is the core premise of ${title}?`, back: sentences[0] || inputText.slice(0, 100) },
        { id: `fc-${Date.now()}-2`, front: `What is the primary constraint or application in ${subject}?`, back: sentences[1] || 'Ensures system correctness, optimal performance, and stability.' }
      ]
    };

    onSaveAsSummary(newSummary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 flex items-center justify-center text-[#d6baff]">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-geist text-base font-bold text-[#e1e3e4]">
                AI Lecture Text Summarizer & Processor
              </h3>
              <p className="text-[11px] text-[#968da0]">
                Transform complex lectures into structured summaries, key takeaways & flashcards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#cdc2d7] block">
              Load Sample Lecture Excerpts:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_SNIPPETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTitle(preset.title);
                    setSubject(preset.subject);
                    setInputText(preset.text);
                    setAiResult('');
                  }}
                  className="p-2.5 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] hover:border-[#9D5CFF]/50 text-left transition-all group"
                >
                  <span className="text-[10px] font-bold text-[#d6baff] uppercase tracking-wider block mb-0.5">
                    {preset.subject}
                  </span>
                  <span className="text-xs text-[#cdc2d7] group-hover:text-white line-clamp-1">
                    {preset.title.split(':')[0]}
                  </span>
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
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3.5 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF] transition-colors"
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
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3.5 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF] transition-colors"
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
              className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl p-3.5 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF] resize-none leading-relaxed transition-colors"
              placeholder="Paste raw lecture notes, text transcript, or textbook excerpt here..."
            />
          </div>

          {/* Target Output Format */}
          <div>
            <label className="text-xs font-semibold text-[#cdc2d7] block mb-2">
              Output Transformation Format
            </label>
            <div className="grid grid-cols-3 gap-2.5">
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
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#9D5CFF]/20 border-[#9D5CFF] text-[#d6baff] shadow-[0_0_12px_rgba(157,92,255,0.2)]'
                        : 'bg-[#1E1E22] border-[#2C2C30] text-[#968da0] hover:text-[#cdc2d7] hover:bg-[#282a2b]'
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
            disabled={isLoading || !inputText.trim()}
            onClick={handleTextProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#7928CA] hover:from-[#aa73ff] hover:to-[#8a33e3] disabled:opacity-50 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Academic Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Intelligent Summary</span>
              </>
            )}
          </button>

          {/* Processed Results Output */}
          {aiResult && (
            <div className="p-4 rounded-xl bg-[#1E1E22] border border-[#aa73ff]/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-[#d6baff]">
                  <FileText className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Synthesized Academic Output
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#cdc2d7] hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xs text-[#e1e3e4] leading-relaxed whitespace-pre-line font-inter">
                {aiResult}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-[#968da0]">
                  Ready to add to your study library
                </span>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9D5CFF] hover:bg-[#aa73ff] text-[#0F0F12] text-xs font-bold transition-all active:scale-95 shadow-md"
                >
                  <span>Save to My Summaries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
