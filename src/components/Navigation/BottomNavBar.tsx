import React from 'react';
import {
  LayoutGrid,
  Sparkles,
  Binary,
  GraduationCap,
  Stethoscope,
  Youtube,
  FileText
} from 'lucide-react';
import { NavTab } from '../../types';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'dashboard' as NavTab, label: 'Home', icon: LayoutGrid },
    { id: 'ai_tools' as NavTab, label: 'AI Tools', icon: Sparkles },
    { id: 'bscs' as NavTab, label: 'BSCS', icon: Binary },
    { id: 'masters_phd' as NavTab, label: 'PhD', icon: GraduationCap },
    { id: 'mdcat' as NavTab, label: 'MDCAT', icon: Stethoscope },
    { id: 'youtube' as NavTab, label: 'YouTube', icon: Youtube }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#111415]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_24px_rgba(157,92,255,0.15)] flex justify-around items-center px-2 py-2 pb-5 rounded-t-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-2 py-1 rounded-xl ${
              isActive
                ? 'text-[#d6baff] bg-[#9D5CFF]/15 border border-[#aa73ff]/30 shadow-[0_0_12px_rgba(157,92,255,0.2)] font-semibold'
                : 'text-[#968da0] hover:text-[#cdc2d7] border border-transparent'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#d6baff]' : 'text-[#968da0]'}`} />
            <span className="font-geist text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
