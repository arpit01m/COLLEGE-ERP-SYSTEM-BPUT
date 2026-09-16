import React, { useState } from 'react';
import { Shield, Calendar, Sparkles, BookOpen, Layers, Info, LogIn, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ onNavigateToLogin, activeSection, setActiveSection, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'features', label: 'Features', icon: Layers },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'calendar', label: 'Academic Calendar', icon: BookOpen },
    { id: 'services', label: 'Services', icon: Shield },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050c1e]/97 backdrop-blur-xl border-b border-white/8 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Branding */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ccff00] to-[#88b800] flex items-center justify-center text-[#0b132b] font-black text-xl shadow-[0_0_20px_rgba(204,255,0,0.3)] group-hover:scale-105 transition-transform">
            GEC
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-wide flex items-center gap-2">
              GEC <span className="text-[#ccff00]">AUTONOMOUS</span>
            </div>
            <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
              GEC Autonomous College Bhubaneswar ERP
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#111d3d]/60 p-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#ccff00] text-[#0b132b] shadow-[0_0_15px_rgba(204,255,0,0.3)] font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Actions & Theme Toggle Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full bg-[#111d3d] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-[#ccff00] transition-colors flex items-center gap-2 text-xs font-bold"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-[#ccff00]" />
                <span className="text-[11px]">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-amber-500" />
                <span className="text-[11px]">Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={onNavigateToLogin}
            className="neon-btn text-xs px-5 py-2.5 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] transition-all flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Portal Login</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-[#ccff00]" /> : <Moon className="w-5 h-5 text-amber-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 bg-[#050c1e] px-2 pb-4 space-y-2 rounded-b-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-[#ccff00] text-[#0b132b] font-bold'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToLogin();
              }}
              className="w-full neon-btn justify-center text-sm py-3"
            >
              <LogIn className="w-4 h-4" />
              <span>Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
