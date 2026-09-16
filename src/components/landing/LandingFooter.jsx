import React from 'react';
import { Shield, Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';

export default function LandingFooter({ onScrollToLogin }) {
  return (
    <footer id="about" className="bg-[#070d1e] border-t border-white/10 pt-16 pb-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ccff00] text-[#0b132b] font-black flex items-center justify-center text-base">
              GEC
            </div>
            <span className="font-extrabold text-white text-base">GEC AUTONOMOUS COLLEGE</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            GEC Autonomous College Bhubaneswar Unified Smart ERP Platform. Multi-tenant role-based system designed for students, faculty, and college administration.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#home" className="hover:text-[#ccff00]">Home & Quick Login</a></li>
            <li><a href="#features" className="hover:text-[#ccff00]">ERP Modules</a></li>
            <li><a href="#events" className="hover:text-[#ccff00]">Upcoming Events</a></li>
            <li><a href="#calendar" className="hover:text-[#ccff00]">Academic Calendar</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">ERP Capabilities</h4>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>Attendance & Timetable</li>
            <li>Exams & SGPA/CGPA Marksheets</li>
            <li>Events CRUD Management</li>
            <li>Google Form Grievances Portal</li>
            <li>Digital Gate Pass Generator</li>
            <li>Light & Dark Mode Switcher</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Campus Helpdesk</h4>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>GEC Campus, Janla, Bhubaneswar, Odisha</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 (0674) 2384556</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>support.erp@gec.ac.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <div>© 2026 GEC AUTONOMOUS COLLEGE BHUBANESWAR • All Rights Reserved.</div>
        <div className="mt-2 sm:mt-0 font-mono text-[#ccff00]">GEC Smart ERP Platform</div>
      </div>
    </footer>
  );
}
