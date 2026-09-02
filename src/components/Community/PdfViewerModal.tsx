import React from 'react';
import { X, FileText, Download, Check, Sparkles, Layers, BookOpen } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  fileName
}) => {
  const [downloaded, setDownloaded] = React.useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 flex items-center justify-center text-[#d6baff]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-geist text-base font-bold text-[#e1e3e4] line-clamp-1">
                {fileName}
              </h3>
              <p className="text-xs text-[#968da0]">2.4 MB • 15 Pages • Comprehensive Notes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#9D5CFF] text-[#0F0F12] font-semibold text-xs hover:bg-[#aa73ff] transition-all"
            >
              {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'Downloaded' : 'Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Document Previewer */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#0c0f10]">
          {/* Document Header Page */}
          <div className="p-6 rounded-xl bg-[#191c1d] border border-[#2C2C30] shadow-inner space-y-4">
            <div className="border-b border-[#2C2C30] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d6baff] bg-[#9D5CFF]/15 px-2.5 py-0.5 rounded-full border border-[#9D5CFF]/30">
                CS 301 Final Review Sheet
              </span>
              <h4 className="font-geist text-lg font-bold text-[#e1e3e4] mt-2">
                Data Structures & Graph Algorithms Summary
              </h4>
              <p className="text-xs text-[#968da0]">Author: Rabia Zafar • DeepStudy Academic Hub</p>
            </div>

            {/* Complexity Cheat Table */}
            <div>
              <h5 className="font-geist text-xs font-bold text-[#d6baff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Time & Space Complexity Reference
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#2C2C30] text-[#968da0]">
                      <th className="py-2">Structure</th>
                      <th className="py-2">Access</th>
                      <th className="py-2">Search</th>
                      <th className="py-2">Insertion</th>
                      <th className="py-2">Deletion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C2C30] text-[#cdc2d7]">
                    <tr>
                      <td className="py-2 font-semibold text-[#e1e3e4]">Hash Map</td>
                      <td>O(1)</td>
                      <td>O(1)</td>
                      <td>O(1)</td>
                      <td>O(1)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#e1e3e4]">Red-Black Tree</td>
                      <td>O(log n)</td>
                      <td>O(log n)</td>
                      <td>O(log n)</td>
                      <td>O(log n)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#e1e3e4]">Binary Heap</td>
                      <td>O(1) min</td>
                      <td>O(n)</td>
                      <td>O(log n)</td>
                      <td>O(log n)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#e1e3e4]">Trie (Prefix Tree)</td>
                      <td>O(L)</td>
                      <td>O(L)</td>
                      <td>O(L)</td>
                      <td>O(L)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Algorithms */}
            <div className="pt-2 border-t border-[#2C2C30]">
              <h5 className="font-geist text-xs font-bold text-[#d6baff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Core Graph Algorithms Breakdown
              </h5>
              <ul className="space-y-1.5 text-xs text-[#cdc2d7] leading-relaxed font-inter">
                <li>• <strong className="text-[#e1e3e4]">Dijkstra:</strong> Single-source shortest path for non-negative weights using Min-Heap ($O((V+E)\log V)$).</li>
                <li>• <strong className="text-[#e1e3e4]">Bellman-Ford:</strong> Handles negative weights & detects negative cycles ($O(V \cdot E)$).</li>
                <li>• <strong className="text-[#e1e3e4]">Floyd-Warshall:</strong> All-pairs shortest path via dynamic programming ($O(V^3)$).</li>
                <li>• <strong className="text-[#e1e3e4]">Kruskal MST:</strong> Greedy edge selection with Disjoint Set Union ($O(E \log E)$).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
