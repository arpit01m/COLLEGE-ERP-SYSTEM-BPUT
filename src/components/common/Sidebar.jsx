import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Calendar,
  Clock,
  GraduationCap,
  Sparkles,
  Award,
  AlertTriangle,
  FileText,
  Bot,
  Users,
  Building,
  Settings,
  ShieldAlert,
  CreditCard,
  QrCode,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export const STUDENT_NAV_TREE = [
  { id: 'overview', label: 'Overview & Profile', icon: LayoutDashboard },
  { id: 'admission', label: 'Admission & Enrollment', icon: UserCheck },
  { id: 'attendance_timetable', label: 'Attendance & Timetable', icon: Clock },
  { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
  { id: 'exams_results', label: 'Exams & Results', icon: GraduationCap },
  { id: 'events_gatepass', label: 'Events & Gate Pass', icon: Sparkles },
  { id: 'certificates_hostel', label: 'Certificates & Hostel', icon: Award },
  { id: 'complaints', label: 'Complaints / Grievance', icon: AlertTriangle },
  { id: 'notices_fees', label: 'Notices & Fee Queries', icon: FileText },
  { id: 'assistant_settings', label: 'Campus Assistant & Settings', icon: Bot },
];

export const FACULTY_NAV_TREE = [
  { id: 'overview', label: 'Overview & Profile', icon: LayoutDashboard },
  { id: 'attendance_timetable', label: 'Attendance Marker & Timetable', icon: Clock },
  { id: 'grades_exams', label: 'Grade Entry & Exams', icon: GraduationCap },
  { id: 'event_approvals', label: 'Event Approvals & Gate Pass', icon: Sparkles },
  { id: 'students_directory', label: 'Student Directory & Search', icon: Users },
];

export const ADMIN_NAV_TREE = [
  { id: 'overview', label: 'Overview & Admissions', icon: LayoutDashboard },
  { id: 'students_faculty', label: 'Students & Faculty', icon: Users },
  { id: 'departments_attendance', label: 'Departments & Attendance', icon: Building },
  { id: 'timetable_calendar', label: 'Timetable & Calendar', icon: Calendar },
  { id: 'exams_results', label: 'Exams & Results', icon: GraduationCap },
  { id: 'events_management', label: 'Events Management', icon: Sparkles },
  { id: 'requests_complaints', label: 'Requests & Complaints', icon: AlertTriangle },
  { id: 'certificates_hostel', label: 'Certificates & Hostel', icon: Award },
  { id: 'fees_reports', label: 'Fees & Reports', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ role, activeTab, setActiveTab, currentUser, onNavigateLanding }) {
  const navTree =
    role === 'student'
      ? STUDENT_NAV_TREE
      : role === 'faculty'
      ? FACULTY_NAV_TREE
      : ADMIN_NAV_TREE;

  return (
    <aside className="w-64 bg-[#0b132b] border-r border-white/10 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div 
          onClick={onNavigateLanding} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#ccff00] text-[#0b132b] font-black text-sm flex items-center justify-center shadow-[0_0_12px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-transform">
            GEC
          </div>
          <div>
            <h1 className="text-xs font-black text-white tracking-wider uppercase">
              GEC AUTONOMOUS
            </h1>
            <span className="text-[9px] text-[#ccff00] font-bold uppercase tracking-widest block">
              {role} PANEL
            </span>
          </div>
        </div>
      </div>

      {/* Profile Mini Summary Card */}
      <div className="p-3 mx-3 my-3 bg-[#111d3d] border border-white/10 rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center text-xs font-black text-[#ccff00]">{(currentUser?.name || 'SYS').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-white truncate">{currentUser?.name || "System Admin"}</p>
          <p className="text-[10px] text-gray-400 truncate">
            {role === 'student' ? currentUser?.regNo : role === 'admin' ? 'SuperAdmin' : currentUser?.dept}
          </p>
        </div>
      </div>

      {/* Nav Menu Items */}
      <div className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
          Navigation Tree
        </div>

        {navTree.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#ccff00] to-[#b5e600] text-[#0b132b] shadow-[0_0_15px_rgba(204,255,0,0.3)] font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0b132b]' : 'text-gray-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#0b132b]" />}
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-white/10 text-[10px] text-gray-500 text-center">
        GEC Autonomous College Bhubaneswar ERP v4.2
      </div>
    </aside>
  );
}
