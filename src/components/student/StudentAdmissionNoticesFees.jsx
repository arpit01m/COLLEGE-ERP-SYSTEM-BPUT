import React, { useState } from 'react';
import { UserCheck, FileText, CreditCard, CheckCircle2, AlertCircle, Download, DollarSign, ShieldCheck } from 'lucide-react';
import { NOTICE_ITEMS } from '../../data/mockData';

export default function StudentAdmissionNoticesFees({ student, activeTabType }) {
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setPaymentDone(true);
    setTimeout(() => {
      setPaymentDone(false);
      setShowPayModal(false);
      alert(`Fee payment of ₹ 65,000 for Autumn Semester 2026 successful! Receipt generated.`);
    }, 1500);
  };

  if (activeTabType === 'admission') {
    return (
      <div className="space-y-6">
        <div className="pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" />
            <span>ADMISSION & ENROLLMENT RECORDS</span>
          </div>
          <h2 className="text-2xl font-black text-white">Student Academic Admission Record</h2>
        </div>

        <div className="glass-card p-6 border border-white/10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0b132b] border border-white/10">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Admission Registration No</span>
              <div className="text-lg font-mono font-bold text-[#ccff00] mt-1">{student.regNo}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b132b] border border-white/10">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Date of Admission</span>
              <div className="text-base font-bold text-white mt-1">{student.admissionDate}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b132b] border border-white/10">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Document Verification</span>
              <div className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Verified & Approved
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>INSTITUTIONAL NOTICES & FEE ACCOUNT</span>
          </div>
          <h2 className="text-2xl font-black text-white">Notices & Semester Fee Queries</h2>
        </div>

        <button
          onClick={() => setShowPayModal(true)}
          className="neon-btn text-xs px-4 py-2.5 flex items-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Semester Dues / Receipt</span>
        </button>
      </div>

      {/* Fee Status Summary Card */}
      <div className="glass-card p-6 border border-[#ccff00]/30 bg-gradient-to-r from-[#111d3d] to-[#070d1e]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase">Autumn Semester 2026 Tuition & Hostel Dues</span>
            <div className="text-3xl font-black text-emerald-400 mt-1 flex items-center gap-2">
              <span>₹ 65,000 (PAID)</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                Zero Pending Dues
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Transaction Ref: GEC-ONLINE-2026-88194</p>
          </div>

          <button
            onClick={() => alert(`Downloading Official Payment Receipt for ${student.name}...`)}
            className="neon-btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#ccff00]" />
            <span>Download Fee Receipt</span>
          </button>
        </div>
      </div>

      {/* Official Notice Board */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          <span>Campus Bulletin Board & Notices</span>
        </h3>

        <div className="space-y-3">
          {NOTICE_ITEMS.map((n) => (
            <div key={n.id} className="glass-panel p-4 flex items-center justify-between hover:border-[#ccff00]/30 transition-all">
              <div className="flex items-center gap-3.5">
                <div className={`w-3 h-3 rounded-full ${n.urgent ? 'bg-red-500 animate-ping' : 'bg-[#ccff00]'}`}></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">{n.date}</span>
                    <span className="badge-neon">{n.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{n.title}</h4>
                </div>
              </div>

              <button
                onClick={() => alert(`Viewing details for notice: ${n.title}`)}
                className="text-xs font-bold text-[#ccff00] hover:underline"
              >
                Read Notice &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 border border-[#ccff00]/40 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#ccff00]" /> GEC Online Fee Gateway
            </h3>

            <form onSubmit={handlePay} className="space-y-4 text-xs">
              <div className="p-3 bg-[#0b132b] rounded-xl border border-white/10 space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Student Name:</span>
                  <span className="font-bold text-white">{student.name}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Registration No:</span>
                  <span className="font-mono text-[#ccff00]">{student.regNo}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Semester Tuition Fee:</span>
                  <span className="font-bold text-white">₹ 50,000</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Hostel & Mess Fee:</span>
                  <span className="font-bold text-white">₹ 15,000</span>
                </div>
                <div className="flex justify-between text-white font-extrabold pt-2 border-t border-white/10 text-sm">
                  <span>Total Payable:</span>
                  <span className="text-[#ccff00]">₹ 65,000</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Payment Method</label>
                <select className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/15">
                  <option>UPI / QR Payment (GPay, PhonePe, Paytm)</option>
                  <option>Net Banking (SBI, HDFC, ICICI, Axis)</option>
                  <option>Credit / Debit Card</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" disabled={paymentDone} className="neon-btn text-xs px-5 py-2.5">
                  {paymentDone ? 'Processing Payment...' : 'Proceed to Pay ₹ 65,000'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
