import React from 'react';
import { ShieldCheck, GraduationCap, Heart, Code2, Sparkles, BookCheck, Lock } from 'lucide-react';

interface AppFooterProps {
  onNavigateTab?: (tab: string) => void;
  onOpenDownloadModal?: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  onNavigateTab,
  onOpenDownloadModal
}) => {
  return (
    <footer className="w-full mt-12 border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-[#111415]/80 dark:bg-[#111415]/80 backdrop-blur-xl transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Author */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9D5CFF] to-[#38BDF8] flex items-center justify-center text-white shadow-[0_0_15px_rgba(157,92,255,0.4)]">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-geist text-xl font-black text-white tracking-tight">
                DeepStudy <span className="text-[#d6baff] text-sm font-semibold">Academic Portal</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#cdc2d7] leading-relaxed max-w-lg">
              Pakistan&apos;s unified higher-education and competitive exam portal. Curating 10 BSCS Core Subjects, PMDC/UHS MDCAT 5-Year Solved Papers, Doctoral Research Monographs, and Smart AI Learning Tools.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#cdc2d7]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified PMDC &amp; HEC Curricula
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#9D5CFF]/15 border border-[#9D5CFF]/30 text-[11px] text-[#ecdcff]">
                <Sparkles className="w-3.5 h-3.5 text-[#d6baff]" />
                AI-Powered Study Engine
              </span>
            </div>
          </div>

          {/* Quick Academic Navigation */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Academic Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-[#cdc2d7]">
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('bscs')}
                  className="hover:text-[#d6baff] hover:underline text-left transition-colors"
                >
                  BSCS 10 Core Modules (DSA, OS, DB)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('masters_phd')}
                  className="hover:text-[#d6baff] hover:underline text-left transition-colors"
                >
                  MS &amp; PhD Research Monographs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('mdcat')}
                  className="hover:text-[#d6baff] hover:underline text-left transition-colors"
                >
                  MDCAT 2020-2025 Solved Past Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('ai_tools')}
                  className="hover:text-[#d6baff] hover:underline text-left transition-colors font-medium text-[#ecdcff]"
                >
                  AI Academic Tool Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('youtube')}
                  className="hover:text-[#d6baff] hover:underline text-left transition-colors"
                >
                  Curated YouTube Educational Channels
                </button>
              </li>
            </ul>
          </div>

          {/* License & Attribution Details */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              License &amp; Verification
            </h4>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#cdc2d7] space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Academic Learning License
              </div>
              <p className="text-[11px] text-[#968da0] leading-normal">
                Authorized for educational, research, and non-commercial academic preparation.
              </p>
              <div className="text-[11px] text-[#cdc2d7] pt-1 border-t border-white/10">
                Lead Creator &amp; Maintainer: <strong className="text-white">Rabia Zafar</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#968da0]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#e1e3e4] tracking-wide">
              &copy; All Rights Reserved 2026 Rabia Zafar
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Version 2026.1 LTS</span>
            <span>&bull;</span>
            <span>Rabia Zafar Portfolio &amp; Portal</span>
            <span>&bull;</span>
            <span className="text-[#d6baff] flex items-center gap-1">
              Built with precision for Students <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
