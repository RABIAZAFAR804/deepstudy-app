import React, { useState } from 'react';
import {
  Youtube,
  ExternalLink,
  Play,
  Sparkles,
  BookOpen,
  Search,
  CheckCircle2,
  Tv,
  ListVideo,
  Users
} from 'lucide-react';
import { YouTubeEducationalChannel } from '../../types';

interface YouTubeHubScreenProps {
  channels: YouTubeEducationalChannel[];
}

export const YouTubeHubScreen: React.FC<YouTubeHubScreenProps> = ({ channels }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'BSCS & Coding',
    'MDCAT & Medical',
    'Master & PhD Research',
    'Math & AI Foundations'
  ];

  const filteredChannels = channels.filter((ch) => {
    const matchCat = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchSearch =
      ch.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#281116] via-[#1a1528] to-[#111415] border border-red-500/30 shadow-[0_0_35px_rgba(239,68,68,0.15)]">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold mb-3">
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>Verified Educational Channels &amp; Playlists</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-[10px] text-[#e1e3e4]">Curated for Students</span>
            </div>
            <h1 className="font-geist text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Curated Academic YouTube Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#cdc2d7] mt-2 max-w-2xl leading-relaxed">
              Handpicked top video lecture series for BSCS (Abdul Bari, MIT OCW, CS50), MDCAT &amp; Medical Sciences (Dr. Najeeb, Khan Academy), PhD Research (Yannic Kilcher, Two Minute Papers), and Math (3Blue1Brown).
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills & Search Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-red-500/20 text-red-300 border border-red-500/50 font-semibold shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                  : 'bg-[#191c1d] text-[#968da0] hover:text-[#cdc2d7] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-[#968da0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search channels, topics, or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#191c1d] border border-white/10 rounded-xl text-xs text-white placeholder-[#968da0] focus:outline-none focus:border-red-500/60"
          />
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between gap-5 hover:border-red-500/40 transition-all hover:shadow-[0_0_24px_rgba(239,68,68,0.1)]"
          >
            {/* Top Row: Avatar & Info */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#1E1E22]">
                <img
                  src={channel.avatar}
                  alt={channel.channelName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-500/15 text-red-300 border border-red-500/30">
                    {channel.category}
                  </span>
                  <span className="text-[10px] text-[#968da0] font-mono">{channel.subscribers}</span>
                </div>

                <h3 className="font-geist text-base font-bold text-white mt-1 truncate">
                  {channel.channelName}
                </h3>
                <p className="text-xs text-[#968da0]">{channel.creator}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#cdc2d7] leading-relaxed line-clamp-3">
              {channel.description}
            </p>

            {/* Featured Video Highlight Card */}
            <div className="p-3.5 rounded-2xl bg-[#111415] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <Play className="w-4 h-4 fill-red-400 ml-0.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">Featured Masterclass</span>
                  <p className="text-xs font-semibold text-white truncate">{channel.featuredVideoTitle}</p>
                </div>
              </div>

              <a
                href={channel.featuredVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold shrink-0 flex items-center gap-1 transition-all"
              >
                <span>Watch</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Curated Playlists */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#968da0] uppercase tracking-wider flex items-center gap-1.5">
                <ListVideo className="w-3.5 h-3.5 text-red-400" />
                Top Recommended Playlists
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {channel.bestPlaylists.map((pl, idx) => (
                  <a
                    key={idx}
                    href={pl.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#191c1d] hover:bg-[#202426] border border-white/5 text-xs text-[#cdc2d7] hover:text-white flex items-center justify-between transition-all group"
                  >
                    <span className="truncate pr-1 group-hover:text-red-300">{pl.title}</span>
                    <span className="text-[10px] font-mono text-[#968da0] shrink-0">{pl.videoCount}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom: Tags & Channel Visit Link */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1">
                {channel.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#968da0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={channel.channelUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-red-500/30 text-xs font-semibold text-red-300 flex items-center gap-1.5 transition-all self-end"
              >
                <span>Visit Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
