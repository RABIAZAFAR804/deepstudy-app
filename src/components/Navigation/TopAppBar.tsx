import React, { useState } from 'react';
import { Bell, Check, Sparkles, X, Flame, Clock } from 'lucide-react';
import { UserProfile, AppNotification } from '../../types';

interface TopAppBarProps {
  user: UserProfile;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onOpenFocusMode: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  user,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  onOpenFocusMode
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-[#111415]/85 backdrop-blur-xl flex justify-between items-center w-full px-5 md:px-10 h-16 sticky top-0 z-40 border-b border-white/10">
      {/* Brand & User Profile */}
      <div className="flex items-center gap-3.5">
        <div className="relative group cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#968da0]/40 ring-2 ring-[#9D5CFF]/20 group-hover:ring-[#9D5CFF]/60 transition-all">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#111415] rounded-full" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-geist text-2xl font-bold tracking-tight text-[#d6baff] drop-shadow-[0_0_12px_rgba(214,186,255,0.4)]">
              DeepStudy
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9D5CFF]/15 text-[#ecdcff] border border-[#aa73ff]/30">
              <Sparkles className="w-2.5 h-2.5 text-[#d6baff]" />
              Pro
            </span>
          </div>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
        {/* Quick Focus Mode Launcher */}
        <button
          onClick={onOpenFocusMode}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] hover:border-[#aa73ff]/50 text-xs font-medium text-[#e1e3e4] transition-all active:scale-95"
          title="Start Deep Focus Session"
        >
          <Clock className="w-3.5 h-3.5 text-[#d6baff]" />
          <span>Deep Focus</span>
          <span className="flex items-center gap-0.5 text-[11px] text-amber-400 font-semibold ml-1">
            <Flame className="w-3 h-3 fill-amber-400" />
            {user.streakDays}d
          </span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            id="notifications-button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#cdc2d7] hover:text-[#d6baff] hover:bg-[#1E1E22] border border-transparent hover:border-[#2C2C30] transition-all active:scale-95"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d6baff] shadow-[0_0_8px_#d6baff]" />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 border border-white/15">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className="font-geist text-sm font-semibold text-[#e1e3e4]">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/40">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={onClearAllNotifications}
                      className="text-[11px] text-[#cdc2d7] hover:text-[#d6baff] px-2 py-1 rounded transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#968da0] hover:text-white p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-3 max-h-72 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#968da0] text-center py-6">No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        notif.read
                          ? 'bg-[#191c1d]/50 border-[#2C2C30]/50 text-[#cdc2d7]'
                          : 'bg-[#1E1E22] border-[#9D5CFF]/30 text-[#e1e3e4] shadow-[0_0_12px_rgba(157,92,255,0.06)]'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold">{notif.title}</p>
                          <span className="text-[10px] text-[#968da0]">{notif.timeAgo}</span>
                        </div>
                        <p className="text-xs text-[#cdc2d7] mt-1 leading-relaxed">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#9D5CFF] shrink-0 mt-1" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
