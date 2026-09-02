import React from 'react';
import { LayoutGrid, FileText, HelpCircle, Users, Flame, Clock } from 'lucide-react';
import { NavTab } from '../../types';

interface SideNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  streakDays: number;
}

export const SideNav: React.FC<SideNavProps> = ({
  activeTab,
  onTabChange,
  streakDays
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutGrid },
    { id: 'summaries' as NavTab, label: 'Summaries', icon: FileText },
    { id: 'quizzes' as NavTab, label: 'Quizzes', icon: HelpCircle },
    { id: 'community' as NavTab, label: 'Community', icon: Users }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 gap-3 sticky top-24 h-[calc(100vh-8rem)] shrink-0">
      <div className="flex flex-col gap-1.5 glass-panel p-3 rounded-2xl border border-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-geist text-sm font-medium transition-all active:scale-98 text-left ${
                isActive
                  ? 'bg-[#9D5CFF]/15 text-[#d6baff] border border-[#9D5CFF]/40 shadow-[0_0_16px_rgba(157,92,255,0.15)] font-semibold'
                  : 'text-[#cdc2d7] hover:text-[#e1e3e4] hover:bg-[#282a2b]/70 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#d6baff]' : 'text-[#968da0]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Study Buddy / Status Widget */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 mt-auto flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#cdc2d7] font-medium">Session Status</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </span>
        </div>

        <div className="p-3 bg-[#111415]/60 rounded-xl border border-[#2C2C30] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <p className="text-[11px] text-[#968da0]">Daily Streak</p>
              <p className="text-xs font-bold text-[#e1e3e4]">{streakDays} Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#9D5CFF]/10 flex items-center justify-center text-[#d6baff]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-[#968da0]">Target</p>
              <p className="text-xs font-bold text-[#d6baff]">3.5h</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
