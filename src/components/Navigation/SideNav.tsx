import React from 'react';
import {
  LayoutGrid,
  Sparkles,
  FileText,
  HelpCircle,
  Users,
  Flame,
  Clock,
  Binary,
  GraduationCap,
  Stethoscope,
  Youtube,
  Download,
  BookOpen
} from 'lucide-react';
import { NavTab } from '../../types';

interface SideNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  streakDays: number;
  onOpenDownloadModal?: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  activeTab,
  onTabChange,
  streakDays,
  onOpenDownloadModal
}) => {
  const mainNavItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutGrid, badge: '' },
    { id: 'ai_tools' as NavTab, label: 'AI Study Tools', icon: Sparkles, badge: '5 Tools' },
    { id: 'bscs' as NavTab, label: 'BSCS Core Hub', icon: Binary, badge: '10 Subj' },
    { id: 'masters_phd' as NavTab, label: 'MS & PhD Notes', icon: GraduationCap, badge: 'Doctoral' },
    { id: 'mdcat' as NavTab, label: 'MDCAT Portal', icon: Stethoscope, badge: '2020-25' },
    { id: 'summaries' as NavTab, label: 'Summaries', icon: FileText, badge: '' },
    { id: 'quizzes' as NavTab, label: 'Quizzes', icon: HelpCircle, badge: 'Live' },
    { id: 'youtube' as NavTab, label: 'YouTube Hub', icon: Youtube, badge: 'Verified' },
    { id: 'community' as NavTab, label: 'Community', icon: Users, badge: '' }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 gap-3 sticky top-20 h-[calc(100vh-6rem)] shrink-0 overflow-y-auto pr-1">
      {/* Navigation List */}
      <div className="flex flex-col gap-1 glass-panel p-2.5 rounded-2xl border border-white/10">
        <span className="text-[10px] font-bold text-[#968da0] uppercase tracking-wider px-3 py-1.5">
          Academic Modules
        </span>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-geist text-xs font-medium transition-all active:scale-98 text-left ${
                isActive
                  ? 'bg-[#9D5CFF]/15 text-[#d6baff] border border-[#9D5CFF]/40 shadow-[0_0_16px_rgba(157,92,255,0.15)] font-bold'
                  : 'text-[#cdc2d7] hover:text-[#e1e3e4] hover:bg-[#282a2b]/70 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#d6baff]' : 'text-[#968da0]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-[#9D5CFF]/20 text-[#ecdcff] border border-[#9D5CFF]/40'
                      : 'bg-white/5 text-[#968da0]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* PWA Download Banner Button in Sidebar */}
      {onOpenDownloadModal && (
        <button
          onClick={onOpenDownloadModal}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-[#19152b] to-[#121c24] border border-[#9D5CFF]/30 hover:border-[#9D5CFF]/60 text-left transition-all group active:scale-98"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
            <Download className="w-4 h-4 text-[#d6baff] group-hover:animate-bounce" />
            <span>Install Offline App</span>
          </div>
          <p className="text-[11px] text-[#cdc2d7] leading-tight">
            Install DeepStudy on Chrome/Desktop for zero latency.
          </p>
        </button>
      )}

      {/* Daily Streak & Session Widget */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 mt-auto flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#cdc2d7] font-medium">Session Status</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>

        <div className="p-2.5 bg-[#111415]/60 rounded-xl border border-[#2C2C30] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-[#968da0]">Daily Streak</p>
              <p className="text-xs font-bold text-[#e1e3e4]">{streakDays} Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#9D5CFF]/10 flex items-center justify-center text-[#d6baff]">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[10px] text-[#968da0]">Target</p>
              <p className="text-xs font-bold text-[#d6baff]">3.5h</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
