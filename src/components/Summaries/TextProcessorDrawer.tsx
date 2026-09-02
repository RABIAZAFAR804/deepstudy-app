import React, { useState } from 'react';
import { X, Sparkles, Wand2, FileText, Check, Copy, RefreshCw } from 'lucide-react';
import { LectureSummary } from '../../types';

// 1. Corrected Gemini API fetch URL and response mapping logic
const generateAISummary = async (inputText: string) => {
  const apiKey = "AQ.Ab8RN6KnowZxW3T2cOwaPRBDqfxfyST0VWMIavrBrbvYne45tg";
  try {
    const response = await fetch(`https://googleapis.com{apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: `Summarize this study note concisely for a student: ${inputText}` }] }] })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Error:", error);
    return "AI generation failed. Please try again.";
  }
};

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
  // 2. All state hooks organized properly inside the function body
  const [inputText, setInputText] = useState(PRESET_SNIPPETS[0].text);
  const [subject, setSubject] = useState('Computer Science');
  const [title, setTitle] = useState(PRESET_SNIPPETS[0].title);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [copied, setCopied] = useState(false);

  // 3. Complete dynamic click integration handler
  const handleTextProcessing = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setAiResult("");
    try {
      const summary = await generateAISummary(inputText);
      setAiResult(summary);
    } catch (err) {
      console.error(err);
      setAiResult("Something went wrong during generation.");
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
    if (!aiResult) return;
    onSaveAsSummary({
      id: String(Date.now()),
      title: title || 'AI Generated Summary',
      subject: subject || 'General',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: aiResult,
      keyPoints: aiResult.split('\n').filter(p => p.trim().length > 0).slice(0, 4)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#0a051b] border-l border-purple-900/40 shadow-2xl flex flex-col text-gray-100">
      {/* Drawer Header */}
      <div className="p-6 border-b border-purple-900/30 flex items-center justify-between bg-purple-950/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <Wand2 size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">AI Study Processor</h2>
            <p className="text-xs text-purple-400">Transform complex lectures into clean notes instantly</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition">
          <X size={20} />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Snippets buttons */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-purple-300 tracking-wider uppercase">Sample Quick Snippets</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRESET_SNIPPETS.map((snippet, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(snippet.text);
                  setSubject(snippet.subject);
                  setTitle(snippet.title);
                }}
                className="p-3 text-left bg-purple-950/10 hover:bg-purple-950/30 border border-purple-900/20 rounded-xl transition duration-200 group flex flex-col justify-between"
              >
                <span className="text-xs font-medium text-purple-400 block mb-1">{snippet.subject}</span>
                <span className="text-xs text-gray-300 line-clamp-2 group-hover:text-white font-light">{snippet.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title and Category Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-purple-300 tracking-wider uppercase">Topic Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cellular Mitosis Review"
              className="w-full bg-[#120b28] border border-purple-900/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-purple-800"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-purple-300 tracking-wider uppercase">Category</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Biology"
              className="w-full bg-[#120b28] border border-purple-900/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-purple-800"
            />
          </div>
        </div>

        {/* Text Area Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-purple-300 tracking-wider uppercase">Raw Text or Lecture Dump</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste raw lecture audio transcripts or notes here..."
            className="w-full h-44 bg-[#120b28] border border-purple-900/30 rounded-xl p-4 text-sm focus:outline-none focus:border-purple-500 font-light text-gray-200 resize-none leading-relaxed placeholder-purple-800/60"
          />
        </div>

        {/* AI Action Execution Trigger Button */}
        <button
          onClick={handleTextProcessing}
          disabled={isLoading || !inputText.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-950 disabled:to-indigo-950 disabled:text-purple-800 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg transition duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="animate-spin text-purple-400" size={18} />
              <span className="tracking-wide">Gemini AI is processing your content...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="tracking-wide">Generate Intelligent Summary</span>
            </>
          )}
        </button>

        {/* Output Panel Layout Display View */}
        {(aiResult || isLoading) && (
          <div className="border border-purple-500/20 rounded-2xl bg-[#0f092b] p-5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-purple-400">
                <FileText size={18} />
                <span className="text-xs font-semibold tracking-wider uppercase">Gemini Production Output</span>
              </div>
              {aiResult && (
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
