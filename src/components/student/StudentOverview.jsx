import React from 'react';
import { User, GraduationCap, Clock, Award, Building, Phone, Mail, Calendar, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function StudentOverview({ student, onNavigateTab }) {
  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Info */}
      <div className="glass-card p-6 border border-[#ccff00]/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#ccff00]/20 border-2 border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center text-2xl font-black text-[#ccff00]">{student.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{student.name}</h1>
                <span className="badge-neon">{student.status}</span>
              </div>
              <p className="text-xs text-[#ccff00] font-mono mt-0.5">Registration No: {student.regNo}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mt-2">
                <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-blue-400" /> {student.dept}</span>
                <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-purple-400" /> Semester {student.semester}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-400" /> Batch: {student.batch}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('attendance_timetable')}
              className="neon-btn text-xs px-4 py-2.5"
            >
              <span>View Timetable & Attendance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 border border-white/10">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cumulative GPA</div>
          <div className="text-3xl font-black text-[#ccff00] mt-1">{student.cgpa}</div>
          <p className="text-[10px] text-gray-400 mt-1">Based on Semesters 1 - 4 evaluation</p>
        </div>

        <div className="glass-panel p-5 border border-white/10">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Attendance</div>
          <div className="text-3xl font-black text-blue-400 mt-1">{student.attendanceOverall}%</div>
          <p className="text-[10px] text-emerald-400 font-bold mt-1">Above minimum 75% requirement</p>
        </div>

        <div className="glass-panel p-5 border border-white/10">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hostel Allocation</div>
          <div className="text-sm font-bold text-white mt-1 truncate">{student.hostel}</div>
          <p className="text-[10px] text-gray-400 mt-1">Allotment verified</p>
        </div>

        <div className="glass-panel p-5 border border-white/10">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fee Clearance</div>
          <div className="text-xl font-black text-emerald-400 mt-1">PAID (₹ 65,000)</div>
          <p className="text-[10px] text-gray-400 mt-1">Zero pending dues for Sem 4</p>
        </div>
      </div>

      {/* Profile Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-white/10">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
            <User className="w-4 h-4 text-[#ccff00]" /> Personal & Guardian Details
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Father's Name:</span>
              <span className="font-bold text-white">{student.fatherName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Date of Birth:</span>
              <span className="font-bold text-white">{student.dob}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Email ID:</span>
              <span className="font-bold text-[#ccff00]">{student.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Mobile Phone:</span>
              <span className="font-bold text-white">{student.phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Permanent Address:</span>
              <span className="font-bold text-white">{student.address}</span>
            </div>
          </div>
        </div>

        {/* Digital Campus Smart ID Card */}
        <div className="glass-card p-6 border border-[#ccff00]/30 bg-gradient-to-br from-[#111d3d] to-[#070d1e] relative">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#ccff00]/20">
            <span className="text-xs font-black text-[#ccff00] uppercase tracking-widest">DIGITAL SMART ID CARD</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">RFID ACTIVE</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded-xl bg-[#ccff00]/20 border border-[#ccff00] flex items-center justify-center text-xl font-black text-[#ccff00]">{student.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
            <div className="space-y-1 text-xs">
              <div className="font-black text-white text-base">{student.name}</div>
              <div className="text-[11px] text-[#ccff00] font-mono">{student.regNo}</div>
              <div className="text-gray-300 text-[11px]">{student.dept}</div>
              <div className="text-[10px] text-gray-400">Valid Till: July 2029</div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>BARCODE: GEC-{student.regNo}</span>
            <span className="text-[#ccff00]">GEC AUTONOMOUS COLLEGE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
