import React, { useState } from 'react';
import { Calendar, Filter, Download, Bell, Plus, CheckCircle2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LandingAcademicCalendar({ calendarEvents, onAddReminder }) {
  const [selectedYear, setSelectedYear] = useState('2026-2027');
  const [selectedSem, setSelectedSem] = useState('Autumn Semester (Sem 4/6/8)');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Academic',
    'Exams',
    'Holiday',
    'Deadline',
    'Event',
    'Vacation'
  ];

  const categoryBadges = {
    Academic: 'badge-academic',
    Exams: 'badge-exams',
    Holiday: 'badge-holiday',
    Deadline: 'badge-deadline',
    Event: 'badge-event',
    Vacation: 'badge-vacation'
  };

  const filteredEvents = calendarEvents.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section id="calendar" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>MODULE 2: ACADEMIC CALENDAR</span>
          </div>
          <h2 className="text-3xl font-black text-white">Institutional Academic Schedule</h2>
          <p className="text-gray-400 text-sm mt-1">
            Track key academic milestones, examination dates, registration deadlines, and gazetted holidays.
          </p>
        </div>

        {/* Action Controls & PDF Download */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[#111d3d] text-xs font-bold text-white rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-[#ccff00]"
          >
            <option value="2026-2027">AY 2026 - 2027</option>
            <option value="2025-2026">AY 2025 - 2026</option>
          </select>

          <select
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
            className="bg-[#111d3d] text-xs font-bold text-white rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-[#ccff00]"
          >
            <option value="Autumn Semester (Sem 4/6/8)">Autumn Semester (Sem 4/6/8)</option>
            <option value="Spring Semester (Sem 3/5/7)">Spring Semester (Sem 3/5/7)</option>
          </select>

          <a
            href="#pdf-download"
            onClick={(e) => {
              e.preventDefault();
              alert("Downloading Official GEC Academic Calendar PDF 2026-27...");
            }}
            className="neon-btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#ccff00]" />
            <span>Download Official PDF</span>
          </a>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-[#ccff00] text-[#0b132b] shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                : 'bg-[#111d3d] text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline List of Calendar Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Grid View */}
        <div className="lg:col-span-2 space-y-3">
          {filteredEvents.map((item) => {
            const badgeClass = categoryBadges[item.category] || 'badge-neon';
            return (
              <div
                key={item.id}
                className="glass-panel p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#ccff00]/30 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#0b132b] border border-white/10 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{item.date.split('-')[1]}</span>
                    <span className="text-base font-extrabold text-[#ccff00]">{item.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeClass}`}>
                        {item.category}
                      </span>
                      <span className="text-[11px] text-gray-400">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onAddReminder(item)}
                  className="px-3 py-1.5 rounded-xl bg-[#111d3d] hover:bg-[#ccff00]/10 border border-white/10 hover:border-[#ccff00]/30 text-xs font-semibold text-gray-300 hover:text-[#ccff00] transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Set Reminder</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Sidebar Summary Card */}
        <div className="space-y-4">
          <div className="glass-card p-5 border border-white/10">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#ccff00]" />
              <span>Upcoming Exam Schedule</span>
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="text-xs font-bold text-red-300">Autumn Mid-Semester Theory Exams</div>
                <div className="text-[11px] text-gray-300 mt-1">Oct 12, 2026 - Oct 18, 2026</div>
                <div className="text-[10px] text-red-400 font-bold mt-1">Slot: 10:00 AM to 01:00 PM</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-xs font-bold text-amber-300">Practical & Viva Evaluation</div>
                <div className="text-[11px] text-gray-300 mt-1">Dec 01, 2026 - Dec 05, 2026</div>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-xs font-bold text-blue-300">GEC End-Semester Theory Papers</div>
                <div className="text-[11px] text-gray-300 mt-1">Dec 15, 2026 Onwards</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
