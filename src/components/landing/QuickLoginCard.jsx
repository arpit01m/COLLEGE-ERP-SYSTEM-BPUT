import React, { useState } from 'react';
import { UserCheck, Sparkles, ShieldCheck, LogIn, Calendar, CheckCircle, ArrowRight, User } from 'lucide-react';

export default function QuickLoginCard({ studentsList = [], onLoginStudent, onLoginFaculty, onLoginAdmin, onAddStudent }) {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'faculty' | 'admin'
  const [selectedStudentId, setSelectedStudentId] = useState(studentsList[0]?.id || '');
  
  // Custom Login & Registration Inputs with Date of Birth instead of Password
  const [regNoInput, setRegNoInput] = useState('2501445001');
  const [studentNameInput, setStudentNameInput] = useState('Rohan Kumar');
  const [deptInput, setDeptInput] = useState('B.Tech CSE');
  const [dobInput, setDobInput] = useState('2005-04-12'); // Date of birth replacing password

  const [facultyEmail, setFacultyEmail] = useState('ak.nayak@bput.ac.in');
  const [facultyDob, setFacultyDob] = useState('1982-08-15');

  const [adminEmail, setAdminEmail] = useState('admin@bput.ac.in');
  const [adminDob, setAdminDob] = useState('1978-01-20');

  const handleStudentSelect = (student) => {
    setSelectedStudentId(student.id);
    setRegNoInput(student.regNo);
    setStudentNameInput(student.name);
    setDobInput(student.dob || '2005-04-12');
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    let found = studentsList.find((s) => s.regNo === regNoInput || s.id === selectedStudentId);

    if (!found) {
      // Dynamic New Student Registration
      found = {
        id: regNoInput,
        regNo: regNoInput,
        name: studentNameInput || 'Student User',
        email: `${(studentNameInput || 'student').toLowerCase().replace(/\s+/g, '')}@bput.ac.in`,
        phone: '+91 98765 43210',
        dept: deptInput,
        departmentShort: deptInput.includes('AI/ML') ? 'CSE-AI/ML' : 'CSE',
        semester: 4,
        batch: '2025-2029',
        status: 'Active Student',
        cgpa: 9.10,
        sgpa: [9.0, 9.1, 9.2, 9.1],
        attendanceOverall: 92.5,
        avatar: null,
        hostel: 'CV Raman Hall - Room 302',
        fatherName: 'Rajesh Kumar',
        dob: dobInput,
        address: 'Bhubaneswar, Odisha',
        admissionDate: '2025-08-10',
        feeStatus: 'Paid',
        pendingFee: 0,
        attendanceDetails: [
          { code: 'CS401', subject: 'Data Structures & Algorithms', total: 42, attended: 39, faculty: 'Dr. A. K. Nayak' },
          { code: 'CS402', subject: 'Database Management Systems', total: 38, attended: 35, faculty: 'Prof. S. Samal' },
          { code: 'CS404', subject: 'Operating Systems', total: 40, attended: 37, faculty: 'Prof. R. Mohanty' }
        ],
        results: [
          { code: 'CS401', subject: 'Data Structures & Algorithms', credit: 4, grade: 'O', marks: 95 },
          { code: 'CS402', subject: 'Database Management Systems', credit: 4, grade: 'E', marks: 88 },
          { code: 'CS404', subject: 'Operating Systems', credit: 4, grade: 'O', marks: 92 }
        ]
      };
      if (onAddStudent) {
        onAddStudent(found);
      }
    }
    onLoginStudent(found);
  };

  const handleSubmitFaculty = (e) => {
    e.preventDefault();
    onLoginFaculty();
  };

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    onLoginAdmin();
  };

  return (
    <div id="login-section" className="glass-card p-6 md:p-8 border border-[#ccff00]/30 shadow-[0_0_30px_rgba(204,255,0,0.15)] relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-full border border-[#ccff00]/20">
            PORTAL LOGIN AT LANDING PAGE
          </span>
          <h3 className="text-xl font-extrabold text-white mt-1">Smart ERP Quick Access</h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 flex items-center justify-center">
          <LogIn className="w-5 h-5" />
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#0b132b]/80 border border-white/10 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('student')}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'student'
              ? 'bg-[#ccff00] text-[#0b132b] shadow-[0_0_12px_rgba(204,255,0,0.3)]'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Student</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'faculty'
              ? 'bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Faculty</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'admin'
              ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>

      {/* STUDENT LOGIN TAB */}
      {activeTab === 'student' && (
        <form onSubmit={handleSubmitStudent} className="space-y-4">
          {studentsList.length > 0 && (
            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">
                Registered Students ({studentsList.length}):
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1 mb-2">
                {studentsList.map((stu) => {
                  const isSelected = selectedStudentId === stu.id;
                  return (
                    <button
                      type="button"
                      key={stu.id}
                      onClick={() => handleStudentSelect(stu)}
                      className={`text-left p-2 rounded-xl border text-xs transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#ccff00]/15 border-[#ccff00] text-white'
                          : 'bg-[#111d3d]/60 border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center text-[9px] font-black text-[#ccff00]">{stu.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
                      <div className="truncate">
                        <div className="font-bold truncate text-[11px]">{stu.name}</div>
                        <div className="text-[9px] text-[#ccff00]">{stu.regNo}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Registration No</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regNoInput}
                  onChange={(e) => setRegNoInput(e.target.value)}
                  placeholder="e.g. 2501445001"
                  className="w-full bg-[#0b132b] text-white text-xs font-mono rounded-xl pl-9 pr-3 py-2.5 border border-white/15 focus:outline-none focus:border-[#ccff00]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Student Full Name</label>
              <input
                type="text"
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                placeholder="Enter Student Name"
                className="w-full bg-[#0b132b] text-white text-xs rounded-xl px-3 py-2.5 border border-white/15 focus:outline-none focus:border-[#ccff00]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Department</label>
                <select
                  value={deptInput}
                  onChange={(e) => setDeptInput(e.target.value)}
                  className="w-full bg-[#0b132b] text-white text-xs rounded-xl px-3 py-2.5 border border-white/15"
                >
                  <option value="B.Tech CSE">B.Tech CSE</option>
                  <option value="B.Tech CSE-AI/ML">B.Tech CSE-AI/ML</option>
                </select>
              </div>

              {/* Replaced Password with Date of Birth */}
              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Date of Birth</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={dobInput}
                    onChange={(e) => setDobInput(e.target.value)}
                    className="w-full bg-[#0b132b] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-white/15 focus:outline-none focus:border-[#ccff00]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full neon-btn justify-center py-3 text-sm font-extrabold mt-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)]"
          >
            <span>Login to Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* FACULTY LOGIN TAB */}
      {activeTab === 'faculty' && (
        <form onSubmit={handleSubmitFaculty} className="space-y-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Faculty Account: Dr. Ashok Kumar Nayak (Head of CSE)</span>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Faculty Email ID</label>
            <input
              type="email"
              value={facultyEmail}
              onChange={(e) => setFacultyEmail(e.target.value)}
              className="w-full bg-[#0b132b] text-white text-xs rounded-xl px-3 py-2.5 border border-white/15 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          {/* Replaced Password with Date of Birth */}
          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Date of Birth</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={facultyDob}
                onChange={(e) => setFacultyDob(e.target.value)}
                className="w-full bg-[#0b132b] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-white/15 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2"
          >
            <span>Login to Faculty Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* ADMIN LOGIN TAB */}
      {activeTab === 'admin' && (
        <form onSubmit={handleSubmitAdmin} className="space-y-4">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span>SuperAdmin Access: Events CRUD, Calendar Editor, Form Config & Student Management</span>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Admin Email ID</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full bg-[#0b132b] text-white text-xs rounded-xl px-3 py-2.5 border border-white/15 focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          {/* Replaced Password with Date of Birth */}
          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Date of Birth</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={adminDob}
                onChange={(e) => setAdminDob(e.target.value)}
                className="w-full bg-[#0b132b] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-white/15 focus:outline-none focus:border-purple-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
          >
            <span>Login to Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
