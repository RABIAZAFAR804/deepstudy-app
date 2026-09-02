import React from 'react';
import { Download, Monitor, Smartphone, CheckCircle, X, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111415] border border-[#9D5CFF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(157,92,255,0.25)] text-[#e1e3e4] overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#9D5CFF]/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#968da0] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Titles */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9D5CFF] to-[#38BDF8] p-0.5 shadow-[0_0_24px_rgba(157,92,255,0.4)] mb-4">
            <div className="w-full h-full bg-[#0F0F12] rounded-[14px] flex items-center justify-center">
              <Download className="w-8 h-8 text-[#d6baff] animate-bounce" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#9D5CFF]/15 text-[#ecdcff] border border-[#aa73ff]/30 mb-2">
            <Sparkles className="w-3 h-3 text-[#d6baff]" />
            Google Chrome & Mobile Ready
          </span>

          <h2 className="font-geist text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Download DeepStudy App
          </h2>
          <p className="text-xs sm:text-sm text-[#cdc2d7] mt-2 max-w-sm leading-relaxed">
            Install DeepStudy on your device for instant offline access to BSCS notes, PhD research, MDCAT past papers, and AI copilot without opening a browser tab.
          </p>
        </div>

        {/* Features Checklist */}
        <div className="my-6 grid grid-cols-2 gap-3 p-3.5 bg-[#191c1d]/70 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-xs text-[#cdc2d7]">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Offline Access</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#cdc2d7]">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fast Native App Feel</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#cdc2d7]">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Direct Desktop Icon</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#cdc2d7]">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>No App Store Needed</span>
          </div>
        </div>

        {/* Installation Actions */}
        {isInstalled ? (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
            <p className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              App is already installed on this device!
            </p>
          </div>
        ) : isInstallable ? (
          <button
            onClick={handleInstallClick}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#7C3AED] hover:from-[#aa73ff] hover:to-[#8b5cf6] text-white font-geist text-sm font-bold shadow-[0_0_24px_rgba(157,92,255,0.4)] transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Install Now to Chrome / Desktop</span>
          </button>
        ) : isIOS ? (
          <div className="p-4 rounded-xl bg-[#1E1E22] border border-white/10 text-xs text-[#cdc2d7] leading-relaxed space-y-2">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#d6baff]" />
              How to install on iOS / Safari:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Tap the <strong className="text-white">Share</strong> button in Safari toolbar.</li>
              <li>Scroll down and tap <strong className="text-[#d6baff]">Add to Home Screen</strong>.</li>
              <li>Tap <strong className="text-white">Add</strong> in top right corner.</li>
            </ol>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#1E1E22] border border-white/10 text-xs text-[#cdc2d7] leading-relaxed space-y-2">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#d6baff]" />
              How to install on Google Chrome:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Click the <strong className="text-[#d6baff]">Install icon (⊕)</strong> on the right side of Chrome address bar.</li>
              <li>Or click Chrome Menu (⋮) → <strong className="text-white">Save and share</strong> → <strong className="text-[#d6baff]">Install DeepStudy</strong>.</li>
            </ol>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#968da0]">
          <span>Curated by Rabia Zafar</span>
          <span>PWA Version 2.4.0</span>
        </div>
      </div>
    </div>
  );
};
