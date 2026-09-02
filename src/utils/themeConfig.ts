import { AppTheme } from '../types';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  accentHex: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  glowColor: string;
  badgeBg: string;
}

export const THEMES: Record<AppTheme, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    accentHex: '#9D5CFF',
    accentBg: 'bg-[#9D5CFF]/15',
    accentText: 'text-[#d6baff]',
    accentBorder: 'border-[#9D5CFF]/40',
    glowColor: 'rgba(157,92,255,0.25)',
    badgeBg: 'bg-[#9D5CFF]/20 text-[#ecdcff] border-[#aa73ff]/40',
  },
  light: {
    id: 'light',
    name: 'Light Mode',
    accentHex: '#7C3AED',
    accentBg: 'bg-purple-100',
    accentText: 'text-purple-700',
    accentBorder: 'border-purple-300',
    glowColor: 'rgba(124,58,237,0.15)',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
  },
};


