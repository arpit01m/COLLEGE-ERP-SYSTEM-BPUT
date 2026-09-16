import React, { useState } from 'react';
import { GraduationCap, Award, Download, CheckCircle2, FileText, Calculator } from 'lucide-react';

export default function StudentExamsResults({ student }) {
  const [selectedSem, setSelectedSem] = useState(4);

  const handleDownloadMarksheet = () => {
    alert(`Downloading Official GEC Grade Marksheet for ${student.name} (Reg: ${student.regNo}) - Semester ${selectedSem}...`);
  };

  const handleDownloadAdmitCard = () => {
    alert(`Downloading Autumn 2026 Examination Hall Ticket for ${student.name}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>EXAMINATIONS & ACADEMIC EVALUATION</span>
          </div>
          <h2 className="text-2xl font-black text-white">Semester Marksheets & CGPA Tracker</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadAdmitCard}
            className="neon-btn-secondary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Exam Admit Card</span>
          </button>
          
          <button
            onClick={handleDownloadMarksheet}
            className="neon-btn text-xs px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Digital Marksheet</span>
          </button>
        </div>
      </div>

      {/* GPA Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-[#ccff00]/30 bg-gradient-to-br from-[#111d3d] to-[#070d1e]">
          <div className="text-xs font-bold text-gray-400 uppercase">Cumulative CGPA</div>
          <div className="text-3xl font-black text-[#ccff00] mt-1">{student.cgpa}</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">First Class with Distinction</div>
        </div>

        {student.sgpa.map((sgpaVal, idx) => (
          <div key={idx} className="glass-panel p-5 border border-white/10">
            <div className="text-xs font-bold text-gray-400 uppercase">Semester {idx + 1} SGPA</div>
            <div className="text-2xl font-extrabold text-white mt-1">{sgpaVal}</div>
            <div className="text-[10px] text-gray-400 mt-1">Credits Earned: 24.0</div>
          </div>
        ))}
      </div>

      {/* Semester Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ccff00]" />
            <span>Grade Card Breakdown - Semester {selectedSem}</span>
          </h3>

          <div className="flex items-center gap-2 bg-[#111d3d] p-1 rounded-xl border border-white/10">
            {[1, 2, 3, 4].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSem(sem)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedSem === sem
                    ? 'bg-[#ccff00] text-[#0b132b]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sem {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Grades Table */}
        <div className="glass-card overflow-x-auto border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0b132b] text-gray-400 text-[11px] uppercase tracking-wider border-b border-white/10">
                <th className="p-3.5 font-bold">Course Code & Name</th>
                <th className="p-3.5 font-bold">Credits</th>
                <th className="p-3.5 font-bold">Marks Secured</th>
                <th className="p-3.5 font-bold">Grade Awarded</th>
                <th className="p-3.5 font-bold">Grade Point</th>
                <th className="p-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {student.results.map((res, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 font-bold text-white">
                    <div>{res.subject}</div>
                    <span className="text-[10px] text-gray-400 font-mono">{res.code}</span>
                  </td>
                  <td className="p-3.5 font-bold text-gray-300">{res.credit}</td>
                  <td className="p-3.5 font-bold text-emerald-400">{res.marks} / 100</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30">
                      {res.grade}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    {res.grade === 'O' ? '10' : res.grade === 'E' ? '9' : '8'}
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      PASSED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
