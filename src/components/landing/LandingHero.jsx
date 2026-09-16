import React from 'react';
import QuickLoginCard from './QuickLoginCard';
import { Shield, Sparkles, BookOpen, GraduationCap, CheckCircle2, Award, Users, Calendar } from 'lucide-react';

export default function LandingHero({ studentsList, onLoginStudent, onLoginFaculty, onLoginAdmin, onAddStudent }) {
  return (
    <section id="home" className="pt-28 pb-16 px-4 lg:px-8 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Copy & ERP Stats */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-extrabold tracking-wide">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>GEC AUTONOMOUS COLLEGE BHUBANESWAR ERP</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Unified Smart Campus <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#a3e635] to-emerald-400">
              ERP Management Platform
            </span>
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
            Complete digital lifecycle solution for GEC Autonomous College Bhubaneswar covering Admission, Attendance, Interactive Academic Calendar, Semester Examinations, Gate Passes, Complaints Grievance Portal, and Automated Certificates.
          </p>

          {/* Quick Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111d3d]/60 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
              <span className="text-xs font-semibold text-gray-200">Light & Dark Theme</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111d3d]/60 border border-white/10">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-200">Academic Calendar</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111d3d]/60 border border-white/10">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-200">Events Management</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111d3d]/60 border border-white/10">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-200">Digital Gate Pass & Certs</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111d3d]/60 border border-white/10">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-200">Google Form Complaints</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111d3d]/60 border border-white/10">
              <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-200">Exam Results & GPA</span>
            </div>
          </div>

          {/* Platform Stat Counters */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl font-black text-[#ccff00]">Dynamic</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Student Roster</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Lifecycle</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400">12+</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">24/7</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Grievance Portal</div>
            </div>
          </div>
        </div>

        {/* Right Column: Portal Login Right at Landing Page */}
        <div className="lg:col-span-5">
          <QuickLoginCard
            studentsList={studentsList}
            onLoginStudent={onLoginStudent}
            onLoginFaculty={onLoginFaculty}
            onLoginAdmin={onLoginAdmin}
            onAddStudent={onAddStudent}
          />
        </div>

      </div>
    </section>
  );
}
