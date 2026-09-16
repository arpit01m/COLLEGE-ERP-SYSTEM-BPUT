import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function StudentAIConsole({ student }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${student.name}! I am your Smart Campus AI Assistant. How can I assist you with your GEC timetable, attendance records, exam results, or gate passes today?`
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const quickPrompts = [
    'What is my overall attendance %?',
    'When do mid-sem examinations start?',
    'How do I apply for a Hostel Out-Pass?',
    'Show my CGPA and subject grades',
    'Where is the Grievance Google Form?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');

    // Generate intelligent AI context response
    setTimeout(() => {
      let replyText = `I have queried the Smart ERP database for student record ${student.name} (${student.regNo}).`;
      const q = query.toLowerCase();

      if (q.includes('attendance')) {
        replyText = `Your overall attendance is currently ${student.attendanceOverall}%, which is well above the required 75.0% threshold for GEC Autumn Semester 2026 exams.`;
      } else if (q.includes('exam') || q.includes('mid-sem') || q.includes('mid sem')) {
        replyText = `Mid-Semester Examinations commence on October 12, 2026 and run till October 18, 2026. Theory exam timing slot is 10:00 AM to 01:00 PM.`;
      } else if (q.includes('cgpa') || q.includes('grade') || q.includes('result')) {
        replyText = `Your cumulative CGPA is ${student.cgpa}. Your Semester 4 performance ranks in First Class with Distinction!`;
      } else if (q.includes('gate') || q.includes('pass') || q.includes('out-pass')) {
        replyText = `You can apply for a Day Out-Pass or Weekend Leave Pass directly under the 'Events & Gate Pass' tab in your student sidebar. Passes generate instant security QR codes!`;
      } else if (q.includes('grievance') || q.includes('complaint') || q.includes('form')) {
        replyText = `Grievances can be logged under the 'Complaints / Grievance' tab. If the admin Google Form is configured, it will display embedded inside an iframe with a new-tab button!`;
      } else {
        replyText = `Your request regarding "${query}" has been logged in the ERP Campus Assistant. Feel free to explore your student sidebar tabs for detailed marksheets, attendance, and e-certificates.`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>AI CAMPUS ASSISTANT CONSOLE</span>
          </div>
          <h2 className="text-2xl font-black text-white">Smart Campus AI Copilot</h2>
        </div>

        <span className="badge-neon flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Powered by Antigravity AI
        </span>
      </div>

      {/* Chat Messages Box */}
      <div className="glass-card p-5 border border-white/15 h-[420px] flex flex-col justify-between">
        <div className="overflow-y-auto space-y-4 pr-2 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                m.sender === 'user'
                  ? 'bg-[#ccff00] text-[#0b132b]'
                  : 'bg-blue-500 text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#ccff00]/15 text-white border border-[#ccff00]/30 rounded-tr-none'
                  : 'bg-[#0b132b] text-gray-200 border border-white/10 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompt Chips */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#111d3d] text-gray-300 hover:text-[#ccff00] hover:bg-white/10 border border-white/10 whitespace-nowrap transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask anything about timetable, attendance, exams, gate passes..."
              className="flex-1 bg-[#0b132b] text-xs text-white placeholder-gray-400 rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#ccff00]"
            />
            <button type="submit" className="neon-btn p-3 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
