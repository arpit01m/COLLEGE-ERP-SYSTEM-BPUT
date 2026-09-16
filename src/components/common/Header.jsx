import React, { useState } from 'react';
import { Bell, Search, LogOut, ChevronDown, UserCheck, ShieldCheck, Sparkles, AlertCircle, Calendar, Sun, Moon } from 'lucide-react';

export default function Header({ currentUser, role, onLogout, onChangeUser, studentsList, theme, onToggleTheme }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Exam Registration open', time: '10m ago', unread: true },
    { id: 2, title: 'Technovate 2026 Hackathon tomorrow', time: '1h ago', unread: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b132b]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Search & Academic Term info */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-[#111d3d] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300">
          <Calendar className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>Academic Term: <strong className="text-white">Autumn 2026</strong></span>
        </div>

        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, subjects, events..."
            className="w-64 bg-[#111d3d] text-xs text-white placeholder-gray-400 rounded-xl pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
        </div>
      </div>

      {/* User Actions, Theme Toggle & Profile */}
      <div className="flex items-center gap-3">
        {/* Light Mode / Dark Mode Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-[#111d3d] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-[#ccff00] transition-colors flex items-center gap-1.5 text-xs font-bold"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-[#ccff00]" />
              <span className="hidden sm:inline text-[11px]">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline text-[11px]">Dark Mode</span>
            </>
          )}
        </button>

        {/* Quick Role Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
          role === 'student'
            ? 'bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30'
            : role === 'faculty'
            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
            : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
        }`}>
          {role === 'student' && <UserCheck className="w-3.5 h-3.5" />}
          {role === 'faculty' && <Sparkles className="w-3.5 h-3.5" />}
          {role === 'admin' && <ShieldCheck className="w-3.5 h-3.5" />}
          <span className="capitalize">{role} Portal</span>
        </span>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#111d3d] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white relative transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111d3d] border border-white/15 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#ccff00]" /> Notifications
                </span>
                <span className="text-[10px] bg-[#ccff00]/20 text-[#ccff00] px-2 py-0.5 rounded-full font-bold">2 New</span>
              </div>
              <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 flex items-start gap-2.5 hover:bg-white/5 px-2 rounded-lg transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${n.unread ? 'bg-[#ccff00]' : 'bg-gray-600'}`}></div>
                    <div>
                      <p className="text-xs font-medium text-white">{n.title}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2.5 bg-[#111d3d] hover:bg-[#172750] border border-white/10 rounded-xl px-3 py-1.5 text-left transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center text-xs font-black text-[#ccff00]">{(currentUser?.name || 'US').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white leading-tight">
                {currentUser?.name || (role === 'admin' ? 'Administrator' : 'Faculty User')}
              </div>
              <div className="text-[10px] text-gray-400">
                {role === 'student' ? (currentUser?.regNo || 'Registered Student') : role === 'admin' ? 'SuperAdmin' : currentUser?.dept}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-[#111d3d] border border-white/15 rounded-2xl shadow-2xl p-3 z-50">
              <div className="px-2 py-2 mb-2 border-b border-white/10">
                <p className="text-xs font-bold text-white">{currentUser?.name || "User Account"}</p>
                <p className="text-[10px] text-[#ccff00]">{currentUser?.email || "user@gec.ac.in"}</p>
              </div>

              {role === 'student' && studentsList && studentsList.length > 0 && (
                <div className="mb-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1 flex items-center justify-between">
                    <span>Registered Students</span>
                    <span className="text-[#ccff00]">{studentsList.length} Active</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {studentsList.map((stu) => (
                      <button
                        key={stu.id}
                        onClick={() => {
                          onChangeUser(stu);
                          setShowUserDropdown(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          currentUser?.id === stu.id
                            ? 'bg-[#ccff00]/15 text-[#ccff00] font-bold border border-[#ccff00]/30'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{stu.name}</span>
                        <span className="text-[9px] text-gray-400">{stu.regNo.slice(-4)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  onLogout();
                }}
                className="w-full mt-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout to Landing Page</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
