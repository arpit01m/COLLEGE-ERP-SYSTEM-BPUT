import React, { useState } from 'react';
import { AlertTriangle, ExternalLink, Plus, Clock, MessageSquare } from 'lucide-react';

export default function StudentComplaints({
  student,
  complaints,
  onAddComplaint,
  googleFormUrl = ''
}) {
  const [showBuiltInForm, setShowBuiltInForm] = useState(false);
  
  // New grievance form state
  const [category, setCategory] = useState('Academic');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const categories = [
    'Academic',
    'Hostel',
    'Mess',
    'Infrastructure',
    'Electricity',
    'Water',
    'Internet',
    'Transport',
    'Cleanliness',
    'Faculty related',
    'Examination',
    'Fees',
    'Other'
  ];

  const studentComplaints = complaints.filter((c) => c.studentRegNo === student.regNo);

  const isFormConfigured = googleFormUrl && googleFormUrl.trim() !== '' && googleFormUrl !== 'PASTE_GOOGLE_FORM_URL_HERE';

  const handleSubmitBuiltIn = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `GRV-${Date.now().toString().slice(-4)}`,
      ticketNo: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentRegNo: student.regNo,
      studentName: student.name,
      category,
      title,
      description,
      priority,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      assignedTo: 'Campus Grievance Committee',
      resolutionNotes: 'Awaiting admin review.'
    };
    onAddComplaint(newTicket);
    setTitle('');
    setDescription('');
    setShowBuiltInForm(false);
    alert(`Grievance Ticket #${newTicket.ticketNo} logged successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>MODULE 3: COMPLAINT / GRIEVANCE MANAGEMENT</span>
          </div>
          <h2 className="text-2xl font-black text-white">Student Grievance Handling Portal</h2>
        </div>

        <div className="flex items-center gap-2">
          {isFormConfigured && (
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Open Complaint Form (New Tab)</span>
            </a>
          )}

          <button
            onClick={() => setShowBuiltInForm(!showBuiltInForm)}
            className="neon-btn text-xs px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Direct Ticket</span>
          </button>
        </div>
      </div>

      {/* Embedded Google Form Section OR Polished Fallback Placeholder */}
      <div className="glass-card p-6 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#ccff00]" />
          <span>Official Institutional Grievance Form</span>
        </h3>

        {isFormConfigured ? (
          <div className="space-y-3">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/15">
              <iframe
                src={googleFormUrl}
                title="Institutional Complaint Google Form"
                className="w-full h-full border-0"
              >
                Loading Google Form...
              </iframe>
            </div>
            <div className="text-right">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#ccff00] hover:underline inline-flex items-center gap-1 font-bold"
              >
                <span>If form fails to load inside frame, click here to Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* PDF Requirement Fallback Placeholder: "Complaint form will be available soon." */
          <div className="p-8 rounded-2xl bg-[#0b132b] border border-amber-500/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Complaint form will be available soon.</h4>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              The administrator has not configured an external Google Form URL yet. You can use the built-in quick grievance portal below to submit direct tickets to campus authorities.
            </p>
          </div>
        )}
      </div>

      {/* Built-In Ticket Form Modal / Toggle */}
      {showBuiltInForm && (
        <div className="glass-card p-6 border border-[#ccff00]/40 space-y-4 animate-in fade-in">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#ccff00]" /> Log a New Grievance Ticket
          </h3>

          <form onSubmit={handleSubmitBuiltIn} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Grievance Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#ccff00]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Ticket Subject / Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of the issue..."
                className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#ccff00]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Detailed Problem Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide location, timestamps, system IDs, or specifics..."
                className="w-full bg-[#0b132b] text-white p-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#ccff00]"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBuiltInForm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button type="submit" className="neon-btn text-xs px-5 py-2.5">
                Submit Grievance Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student Logged Complaints List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span>My Submitted Grievance Status Log ({studentComplaints.length})</span>
        </h3>

        <div className="space-y-3">
          {studentComplaints.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#111d3d] text-center text-gray-400 text-xs">
              No grievance tickets logged yet for your student record.
            </div>
          ) : (
            studentComplaints.map((item) => (
              <div key={item.id} className="glass-panel p-5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#ccff00]">{item.ticketNo}</span>
                    <span className="badge-neon">{item.category}</span>
                    <span className="text-[10px] text-gray-400">Date: {item.date}</span>
                  </div>

                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                    item.status === 'Resolved'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : item.status === 'In-Progress'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Assigned To: <strong className="text-white">{item.assignedTo}</strong></span>
                  <span className="text-emerald-400 italic font-medium">Notes: {item.resolutionNotes}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
