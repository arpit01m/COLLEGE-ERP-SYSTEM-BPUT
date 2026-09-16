import React from 'react';
import { Shield, Clock, GraduationCap, Award, AlertTriangle, FileText, QrCode, Bot, Users, Layers } from 'lucide-react';

export default function LandingFeatures({ onScrollToLogin }) {
  const features = [
    {
      icon: Users,
      title: '6 Pre-Loaded Student Database',
      desc: 'Seamlessly test lifecycle data for Tanishka, Rishika Tiwary, Arpit Mohapatra, Satya Sundar Nayak, Divyam Prasad, and Abhinandan Kumar Kushwaha.',
      color: 'text-[#ccff00]',
      bgColor: 'bg-[#ccff00]/10'
    },
    {
      icon: Clock,
      title: 'Attendance & Timetable Tracker',
      desc: 'Real-time subject-wise percentage monitoring, timetable slot view, daily roll call, and warning alerts for low attendance.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: GraduationCap,
      title: 'Exams & Results GPA Portal',
      desc: 'Comprehensive semester-wise SGPA and CGPA marksheets, internal evaluations, and downloadable exam hall tickets.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: AlertTriangle,
      title: 'Complaint & Grievance Portal',
      desc: 'Integrated with Google Forms iframe embed, new-tab fallbacks, category analytics dashboard, and direct ticket submission.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: QrCode,
      title: 'Digital Gate Pass Generator',
      desc: 'Generate instant digital out-passes with dynamic QR codes for hostel security verification and warden approvals.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Award,
      title: 'Automated Certificate Issuance',
      desc: 'Request digital Provisional, Bonafide Student, Conduct, and Hostel Allotment Certificates with instant validation.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    }
  ];

  return (
    <section id="features" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>FULL LIFECYCLE ERP FUNCTIONALITY</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white">Built for Complete Campus Excellence</h2>
        <p className="text-gray-400 text-sm mt-2">
          From admission and course enrollment to academic calendar, attendance, examinations, certificates, events, and graduation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass-card p-6 flex flex-col justify-between hover:border-[#ccff00]/40 transition-all">
              <div>
                <div className={`w-12 h-12 rounded-2xl ${f.bgColor} ${f.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={onScrollToLogin}
                  className="text-xs font-bold text-[#ccff00] hover:underline flex items-center gap-1"
                >
                  <span>Explore Feature in Portal</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
