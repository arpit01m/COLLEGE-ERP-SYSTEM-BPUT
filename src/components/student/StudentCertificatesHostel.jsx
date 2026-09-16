import React from 'react';
import { Award, Download, Building, ShieldCheck, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export default function StudentCertificatesHostel({ student }) {
  const certificates = [
    {
      id: 'CERT-1',
      title: 'Bonafide Student Certificate',
      desc: 'Official verification of current enrollment for bank loans, passport, and railway concessions.',
      type: 'Bonafide',
      issuedDate: '2026-09-01'
    },
    {
      id: 'CERT-2',
      title: 'Provisional Grade & Semester Transcript',
      desc: 'Authenticated academic statement of grades obtained up to Semester 4.',
      type: 'Academic',
      issuedDate: '2026-08-15'
    },
    {
      id: 'CERT-3',
      title: 'Character & Conduct Certificate',
      desc: 'Institutional conduct certification signed by Dean of Student Affairs.',
      type: 'Conduct',
      issuedDate: '2026-08-10'
    },
    {
      id: 'CERT-4',
      title: 'Hostel Room Allotment Letter',
      desc: 'Official hall residence allotment document with room number and mess entitlement.',
      type: 'Hostel',
      issuedDate: '2025-08-10'
    }
  ];

  const handleDownloadCert = (cert) => {
    alert(`Generating official digital ${cert.title} PDF for ${student.name} (Reg: ${student.regNo})...\nSecurity Hash: GEC-VERIFIED-2026-OK`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>DIGITAL CERTIFICATES & HOSTEL ALLOTMENT</span>
        </div>
        <h2 className="text-2xl font-black text-white">E-Certificates & Residence Portal</h2>
      </div>

      {/* Hostel Details Card */}
      <div className="glass-card p-6 border border-[#ccff00]/30 bg-gradient-to-r from-[#111d3d] to-[#070d1e]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-full border border-[#ccff00]/20">
                ACTIVE HOSTEL RESIDENT
              </span>
              <span className="text-xs text-gray-400">Academic Year 2026-27</span>
            </div>
            <h3 className="text-2xl font-black text-white">{student.hostel}</h3>
            <p className="text-xs text-gray-300">
              Chief Warden: Dr. P. K. Dash • Mess Contact: +91 98765 00000 • Security Post #2
            </p>
          </div>

          <button
            onClick={() => handleDownloadCert(certificates[3])}
            className="neon-btn text-xs px-5 py-2.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Hostel Letter</span>
          </button>
        </div>
      </div>

      {/* Digital Certificates List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#ccff00]" />
          <span>Official E-Certificates & Documents</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass-panel p-5 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="badge-neon">{cert.type}</span>
                  <span className="text-[10px] text-gray-400 font-mono">Issued: {cert.issuedDate}</span>
                </div>
                <h4 className="text-base font-bold text-white">{cert.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{cert.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Digital Seal Verified
                </span>
                <button
                  onClick={() => handleDownloadCert(cert)}
                  className="neon-btn-secondary text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
