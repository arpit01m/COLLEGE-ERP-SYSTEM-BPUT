import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import ReminderModal from './components/common/ReminderModal';

// Landing Page Components
import LandingHero from './components/landing/LandingHero';
import FeaturedEventsCarousel from './components/landing/FeaturedEventsCarousel';
import LandingAcademicCalendar from './components/landing/LandingAcademicCalendar';
import LandingFeatures from './components/landing/LandingFeatures';
import LandingFooter from './components/landing/LandingFooter';

// Student Portal Components
import StudentOverview from './components/student/StudentOverview';
import StudentAttendanceTimetable from './components/student/StudentAttendanceTimetable';
import StudentExamsResults from './components/student/StudentExamsResults';
import StudentEventsGatePass from './components/student/StudentEventsGatePass';
import StudentCertificatesHostel from './components/student/StudentCertificatesHostel';
import StudentComplaints from './components/student/StudentComplaints';
import StudentAdmissionNoticesFees from './components/student/StudentAdmissionNoticesFees';
import StudentAIConsole from './components/student/StudentAIConsole';

// Faculty Portal Components
import FacultyDashboard from './components/faculty/FacultyDashboard';
import FacultyGrades from './components/faculty/FacultyGrades';
import FacultyStudentsDirectory from './components/faculty/FacultyStudentsDirectory';

// Admin Portal Components
import AdminOverview from './components/admin/AdminOverview';
import AdminEvents from './components/admin/AdminEvents';
import AdminCalendar from './components/admin/AdminCalendar';
import AdminComplaints from './components/admin/AdminComplaints';
import AdminStudents from './components/admin/AdminStudents';
import AdminSettings from './components/admin/AdminSettings';

// Seed Datasets
import {
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_EVENTS,
  INITIAL_ACADEMIC_CALENDAR,
  INITIAL_COMPLAINTS,
  INITIAL_GATE_PASSES
} from './data/mockData';

// API Services
import { fetchStudents, createStudentApi } from './services/studentService';

export default function App() {
  // Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState('dark');

  // Navigation & Role State
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'portal'
  const [role, setRole] = useState('student'); // 'student' | 'faculty' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);

  // Active Tabs
  const [activeLandingSection, setActiveLandingSection] = useState('home');
  const [activeStudentTab, setActiveStudentTab] = useState('overview');
  const [activeFacultyTab, setActiveFacultyTab] = useState('overview');
  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  // Master Data State
  const [studentsList, setStudentsList] = useState(INITIAL_STUDENTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [registeredEventIds, setRegisteredEventIds] = useState(['EVT-101', 'EVT-104']);
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_ACADEMIC_CALENDAR);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [gatePasses, setGatePasses] = useState(INITIAL_GATE_PASSES);
  
  // Admin Google Form Config Field
  const [googleFormUrl, setGoogleFormUrl] = useState('');

  // Reminder Modal State
  const [reminderModalItem, setReminderModalItem] = useState(null);

  // Apply Theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load students from MySQL Database on component mount
  useEffect(() => {
    let isMounted = true;
    async function loadStudentsFromDb() {
      try {
        const res = await fetchStudents();
        if (isMounted && res && res.data && res.data.length > 0) {
          setStudentsList(res.data);
        }
      } catch (err) {
        console.warn('Failed to load students from database, keeping default state:', err);
      }
    }
    loadStudentsFromDb();
    return () => { isMounted = false; };
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Login Handlers
  const handleLoginStudent = (studentObj) => {
    const selected = studentObj || {
      id: '2501445001',
      regNo: '2501445001',
      name: 'Rohan Kumar',
      email: 'rohan.cse@gec.ac.in',
      phone: '+91 98765 43210',
      dept: 'B.Tech CSE',
      departmentShort: 'CSE',
      semester: 4,
      batch: '2025-2029',
      status: 'Active Student',
      cgpa: 9.10,
      sgpa: [9.0, 9.1, 9.2, 9.1],
      attendanceOverall: 92.5,
      avatar: null,
      hostel: 'CV Raman Hall - Room 302',
      fatherName: 'Rajesh Kumar',
      dob: '2005-04-12',
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
    setCurrentUser(selected);
    setRole('student');
    setViewMode('portal');
    setActiveStudentTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginFaculty = () => {
    setCurrentUser(INITIAL_FACULTY[0]);
    setRole('faculty');
    setViewMode('portal');
    setActiveFacultyTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginAdmin = () => {
    setCurrentUser({
      id: 'ADMIN-001',
      name: 'Dr. System SuperAdmin',
      email: 'admin@gec.ac.in',
      avatar: null,
      dept: 'University Controller Cell'
    });
    setRole('admin');
    setViewMode('portal');
    setActiveAdminTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setViewMode('landing');
    setActiveLandingSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToLogin = () => {
    setActiveLandingSection('home');
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Event Registration Handler
  const handleRegisterEvent = (eventId) => {
    if (registeredEventIds.includes(eventId)) {
      setRegisteredEventIds((prev) => prev.filter((id) => id !== eventId));
    } else {
      setRegisteredEventIds((prev) => [...prev, eventId]);
    }
  };

  // Admin Events CRUD Handlers
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // Admin Academic Calendar Handlers
  const handleAddCalendarEvent = (newCal) => {
    setCalendarEvents((prev) => [...prev, newCal]);
  };

  const handleDeleteCalendarEvent = (calId) => {
    setCalendarEvents((prev) => prev.filter((c) => c.id !== calId));
  };

  // Complaint Handlers
  const handleAddComplaint = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const handleUpdateComplaintStatus = (ticketId, statusVal) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === ticketId ? { ...c, status: statusVal, updatedDate: new Date().toISOString().split('T')[0] } : c))
    );
  };

  // Gate Pass Handler
  const handleApplyGatePass = (newPass) => {
    setGatePasses((prev) => [newPass, ...prev]);
  };

  // Student Record Creator Handler with Database Persistence
  const handleAddStudent = async (newStudent) => {
    // 1. Optimistically update local React state so UI reflects the new student instantly
    setStudentsList((prev) => {
      const exists = prev.some((s) => s.regNo === newStudent.regNo || s.id === newStudent.id);
      return exists ? prev : [newStudent, ...prev];
    });

    // 2. Persist to MySQL database via API
    try {
      await createStudentApi(newStudent);
    } catch (err) {
      console.error('Error persisting new student to database:', err);
    }
  };

  const activeStudent = currentUser || {
    id: '2501445001',
    regNo: '2501445001',
    name: 'Student User',
    email: 'student@gec.ac.in',
    phone: '+91 98765 43210',
    dept: 'B.Tech CSE',
    semester: 4,
    batch: '2025-2029',
    status: 'Active Student',
    cgpa: 9.10,
    sgpa: [9.0, 9.1, 9.2, 9.1],
    attendanceOverall: 92.5,
    avatar: null,
    hostel: 'CV Raman Hall - Room 302',
    fatherName: 'Rajesh Kumar',
    dob: '2005-04-12',
    address: 'Bhubaneswar, Odisha',
    admissionDate: '2025-08-10',
    feeStatus: 'Paid',
    pendingFee: 0,
    attendanceDetails: [
      { code: 'CS401', subject: 'Data Structures & Algorithms', total: 42, attended: 39, faculty: 'Dr. A. K. Nayak' },
      { code: 'CS402', subject: 'Database Management Systems', total: 38, attended: 35, faculty: 'Prof. S. Samal' }
    ],
    results: [
      { code: 'CS401', subject: 'Data Structures & Algorithms', credit: 4, grade: 'O', marks: 95 }
    ]
  };

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans antialiased">
      
      {/* 1. LANDING PAGE VIEW */}
      {viewMode === 'landing' && (
        <div className="min-h-screen flex flex-col">
          <Navbar
            onNavigateToLogin={handleScrollToLogin}
            activeSection={activeLandingSection}
            setActiveSection={setActiveLandingSection}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          <main className="flex-1">
            <LandingHero
              studentsList={studentsList}
              onLoginStudent={handleLoginStudent}
              onLoginFaculty={handleLoginFaculty}
              onLoginAdmin={handleLoginAdmin}
              onAddStudent={handleAddStudent}
            />

            <FeaturedEventsCarousel
              events={events}
              registeredEventIds={registeredEventIds}
              onRegister={handleRegisterEvent}
              onOpenReminderModal={(item) => setReminderModalItem(item)}
            />

            <LandingAcademicCalendar
              calendarEvents={calendarEvents}
              onAddReminder={(item) => setReminderModalItem(item)}
            />

            <LandingFeatures onScrollToLogin={handleScrollToLogin} />
          </main>

          <LandingFooter onScrollToLogin={handleScrollToLogin} />
        </div>
      )}

      {/* 2. LOGGED-IN PORTAL VIEW (STUDENT / FACULTY / ADMIN) */}
      {viewMode === 'portal' && (
        <div className="flex min-h-screen">
          <Sidebar
            role={role}
            activeTab={
              role === 'student'
                ? activeStudentTab
                : role === 'faculty'
                ? activeFacultyTab
                : activeAdminTab
            }
            setActiveTab={
              role === 'student'
                ? setActiveStudentTab
                : role === 'faculty'
                ? setActiveFacultyTab
                : setActiveAdminTab
            }
            currentUser={currentUser || activeStudent}
            onNavigateLanding={handleLogout}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <Header
              currentUser={currentUser || activeStudent}
              role={role}
              onLogout={handleLogout}
              onChangeUser={setCurrentUser}
              studentsList={studentsList}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />

            <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
              {/* A. STUDENT PORTAL TAB CONTENT */}
              {role === 'student' && (
                <>
                  {activeStudentTab === 'overview' && (
                    <StudentOverview student={activeStudent} onNavigateTab={setActiveStudentTab} />
                  )}
                  {activeStudentTab === 'admission' && (
                    <StudentAdmissionNoticesFees student={activeStudent} activeTabType="admission" />
                  )}
                  {activeStudentTab === 'attendance_timetable' && (
                    <StudentAttendanceTimetable student={activeStudent} />
                  )}
                  {activeStudentTab === 'calendar' && (
                    <LandingAcademicCalendar
                      calendarEvents={calendarEvents}
                      onAddReminder={(item) => setReminderModalItem(item)}
                    />
                  )}
                  {activeStudentTab === 'exams_results' && (
                    <StudentExamsResults student={activeStudent} />
                  )}
                  {activeStudentTab === 'events_gatepass' && (
                    <StudentEventsGatePass
                      student={activeStudent}
                      events={events}
                      registeredEventIds={registeredEventIds}
                      onRegisterEvent={handleRegisterEvent}
                      gatePasses={gatePasses}
                      onApplyGatePass={handleApplyGatePass}
                      onOpenReminderModal={(item) => setReminderModalItem(item)}
                    />
                  )}
                  {activeStudentTab === 'certificates_hostel' && (
                    <StudentCertificatesHostel student={activeStudent} />
                  )}
                  {activeStudentTab === 'complaints' && (
                    <StudentComplaints
                      student={activeStudent}
                      complaints={complaints}
                      onAddComplaint={handleAddComplaint}
                      googleFormUrl={googleFormUrl}
                    />
                  )}
                  {activeStudentTab === 'notices_fees' && (
                    <StudentAdmissionNoticesFees student={activeStudent} activeTabType="notices_fees" />
                  )}
                  {activeStudentTab === 'assistant_settings' && (
                    <StudentAIConsole student={activeStudent} />
                  )}
                </>
              )}

              {/* B. FACULTY PORTAL TAB CONTENT */}
              {role === 'faculty' && (
                <>
                  {(activeFacultyTab === 'overview' || activeFacultyTab === 'attendance_timetable') && (
                    <FacultyDashboard studentsList={studentsList} />
                  )}
                  {activeFacultyTab === 'grades_exams' && (
                    <FacultyGrades studentsList={studentsList} />
                  )}
                  {activeFacultyTab === 'event_approvals' && (
                    <StudentEventsGatePass
                      student={activeStudent}
                      events={events}
                      registeredEventIds={registeredEventIds}
                      onRegisterEvent={handleRegisterEvent}
                      gatePasses={gatePasses}
                      onApplyGatePass={handleApplyGatePass}
                      onOpenReminderModal={(item) => setReminderModalItem(item)}
                    />
                  )}
                  {activeFacultyTab === 'students_directory' && (
                    <FacultyStudentsDirectory studentsList={studentsList} />
                  )}
                </>
              )}

              {/* C. ADMIN PORTAL TAB CONTENT */}
              {role === 'admin' && (
                <>
                  {activeAdminTab === 'overview' && (
                    <AdminOverview
                      studentsCount={studentsList.length}
                      eventsCount={events.length}
                      complaintsList={complaints}
                      onNavigateTab={setActiveAdminTab}
                    />
                  )}
                  {activeAdminTab === 'students_faculty' && (
                    <AdminStudents studentsList={studentsList} onAddStudent={handleAddStudent} />
                  )}
                  {activeAdminTab === 'departments_attendance' && (
                    <FacultyDashboard studentsList={studentsList} />
                  )}
                  {activeAdminTab === 'timetable_calendar' && (
                    <AdminCalendar
                      calendarEvents={calendarEvents}
                      onAddCalendarEvent={handleAddCalendarEvent}
                      onDeleteCalendarEvent={handleDeleteCalendarEvent}
                    />
                  )}
                  {activeAdminTab === 'exams_results' && (
                    <FacultyGrades studentsList={studentsList} />
                  )}
                  {activeAdminTab === 'events_management' && (
                    <AdminEvents
                      events={events}
                      onAddEvent={handleAddEvent}
                      onUpdateEvent={handleUpdateEvent}
                      onDeleteEvent={handleDeleteEvent}
                      studentsList={studentsList}
                    />
                  )}
                  {activeAdminTab === 'requests_complaints' && (
                    <AdminComplaints
                      complaints={complaints}
                      googleFormUrl={googleFormUrl}
                      onSaveGoogleFormUrl={setGoogleFormUrl}
                      onUpdateComplaintStatus={handleUpdateComplaintStatus}
                    />
                  )}
                  {activeAdminTab === 'certificates_hostel' && (
                    <StudentCertificatesHostel student={activeStudent} />
                  )}
                  {activeAdminTab === 'fees_reports' && (
                    <StudentAdmissionNoticesFees student={activeStudent} activeTabType="notices_fees" />
                  )}
                  {activeAdminTab === 'settings' && (
                    <AdminSettings
                      googleFormUrl={googleFormUrl}
                      onSaveGoogleFormUrl={setGoogleFormUrl}
                    />
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global Reminder Notification Modal */}
      {reminderModalItem && (
        <ReminderModal
          item={reminderModalItem}
          onClose={() => setReminderModalItem(null)}
        />
      )}

    </div>
  );
}
