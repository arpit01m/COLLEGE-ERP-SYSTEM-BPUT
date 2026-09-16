import React, { useState } from 'react';
import { Clock, Calendar, BookOpen, Send } from 'lucide-react';
import { TIMETABLE_SLOTS } from '../../data/mockData';

export default function StudentAttendanceTimetable({ student }) {
  const [activeDay, setActiveDay] = useState('Monday');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDays, setLeaveDays] = useState('1');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const currentDaySlots = TIMETABLE_SLOTS.find((d) => d.day === activeDay)?.slots || [];

  const handleApplyLeave = (e) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setShowLeaveModal(false);
      setLeaveReason('');
      alert("Leave Application submitted to HOD & Chief Warden successfully!");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>ATTENDANCE & TIMETABLE MODULE</span>
          </div>
          <h2 className="text-2xl font-black text-white">Class Timetable & Attendance Log</h2>
        </div>

        <button
          onClick={() => setShowLeaveModal(true)}
          className="neon-btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Apply Academic Leave</span>
        </button>
      </div>

      {/* Attendance Summary Banner */}
      <div className="glass-card p-6 border border-[#ccff00]/30 bg-gradient-to-r from-[#111d3d] to-[#070d1e]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs text-gray-400 font-bold uppercase">Overall Cumulative Attendance</span>
            <div className="text-4xl font-black text-[#ccff00] flex items-center justify-center md:justify-start gap-2">
              <span>{student.attendanceOverall}%</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Safe (75%+ Criteria Met)
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Total Conducted Classes: 214 • Attended: 196 • Eligible for GEC Autumn Semester Examinations.
            </p>
          </div>

          <div className="w-full md:w-64 bg-[#0b132b] p-4 rounded-xl border border-white/10 text-xs space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Required for Exam:</span>
              <span className="font-bold text-white">75.0%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#ccff00]" style={{ width: `${student.attendanceOverall}%` }}></div>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold text-right">+16.5% Margin Available</div>
          </div>
        </div>
      </div>

      {/* Interactive Timetable Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#ccff00]" />
          <span>Weekly Academic Timetable Schedule</span>
        </h3>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeDay === d
                  ? 'bg-[#ccff00] text-[#0b132b] shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                  : 'bg-[#111d3d] text-gray-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Day Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentDaySlots.map((slot, idx) => (
            <div key={idx} className="glass-panel p-4 border border-white/10 hover:border-[#ccff00]/30 transition-all">
              <div className="flex items-center justify-between text-[11px] text-[#ccff00] font-bold mb-2">
                <span>{slot.time}</span>
                <span className="bg-[#0b132b] px-2 py-0.5 rounded border border-white/10 text-white">{slot.room}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{slot.subject}</h4>
              <div className="text-xs text-gray-400 font-mono mb-2">Code: {slot.code}</div>
              <div className="text-[11px] text-gray-300 font-medium pt-2 border-t border-white/5">
                Faculty: {slot.faculty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span>Subject-Wise Attendance Breakdown</span>
        </h3>

        <div className="glass-card overflow-x-auto border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0b132b] text-gray-400 text-[11px] uppercase tracking-wider border-b border-white/10">
                <th className="p-3.5 font-bold">Subject Code & Name</th>
                <th className="p-3.5 font-bold">Faculty Name</th>
                <th className="p-3.5 font-bold">Classes Held</th>
                <th className="p-3.5 font-bold">Attended</th>
                <th className="p-3.5 font-bold">Percentage</th>
                <th className="p-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {student.attendanceDetails.map((sub, i) => {
                const pct = Math.round((sub.attended / sub.total) * 100);
                const isSafe = pct >= 75;
                return (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      <div>{sub.subject}</div>
                      <span className="text-[10px] text-gray-400 font-mono">{sub.code}</span>
                    </td>
                    <td className="p-3.5 text-gray-300">{sub.faculty}</td>
                    <td className="p-3.5 font-bold text-gray-300">{sub.total}</td>
                    <td className="p-3.5 font-bold text-emerald-400">{sub.attended}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white w-10">{pct}%</span>
                        <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isSafe ? 'bg-[#ccff00]' : 'bg-red-500'}`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      {isSafe ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Eligible
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          Shortage Warning
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 border border-[#ccff00]/40 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-[#ccff00]" /> Submit Academic Leave Request
            </h3>
            
            <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Number of Days</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={leaveDays}
                  onChange={(e) => setLeaveDays(e.target.value)}
                  className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#ccff00]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Reason for Leave</label>
                <textarea
                  rows="3"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="State medical or personal leave details..."
                  className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#ccff00]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={leaveSubmitted}
                  className="neon-btn text-xs px-5 py-2.5"
                >
                  {leaveSubmitted ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
