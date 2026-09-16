import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'college_erp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;
let isConnected = false;

// Default Seed Students Array (from mockData)
export const DEFAULT_STUDENTS = [
  {
    id: "2501445307",
    regNo: "2501445307",
    name: "Tanishka",
    email: "tanishka.cse@gec.edu.in",
    phone: "+91 98765 43210",
    dept: "B.Tech CSE",
    departmentShort: "CSE",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 8.92,
    sgpa: [8.8, 9.0, 8.9, 9.0],
    attendanceOverall: 91.5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    hostel: "Shakuntala Devi - Room 304",
    fatherName: "Rajesh Kumar",
    dob: "2005-04-12",
    address: "Bhubaneswar, Odisha",
    admissionDate: "2025-08-10",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 41, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 37, faculty: "Prof. S. Samal" },
      { code: "CS403", subject: "Artificial Intelligence", total: 36, attended: 35, faculty: "Dr. P. Dash" },
      { code: "CS404", subject: "Microprocessor", total: 40, attended: 39, faculty: "Prof. R. Mohanty" },
      { code: "CS405", subject: "Discrete Mathematics", total: 34, attended: 32, faculty: "Dr. M. Mishra" },
      { code: "CS406", subject: "Advanced Java", total: 20, attended: 20, faculty: "Prof. S. Patnaik" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 99 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "O", marks: 96 },
      { code: "CS403", subject: "Artificial intelligence", credit: 3, grade: "O", marks: 94 },
      { code: "CS404", subject: "Microprocessor", credit: 4, grade: "O", marks: 97 },
      { code: "CS405", subject: "Discrete Mathematics", credit: 3, grade: "O", marks: 95 },
      { code: "CS406", subject: "Advanced Java", credit: 2, grade: "O", marks: 100 }
    ]
  },
  {
    id: "2501445597",
    regNo: "2501445597",
    name: "Rishika Tiwary",
    email: "rishika.aiml@gec.edu.in",
    phone: "+91 98765 43211",
    dept: "B.Tech CSE-AI/ML",
    departmentShort: "CSE-AI/ML",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 9.45,
    sgpa: [9.3, 9.5, 9.4, 9.6],
    attendanceOverall: 94.8,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    hostel: "Shakuntala Devi Hostel - Room 208",
    fatherName: "Sunil Tiwary",
    dob: "2005-07-22",
    address: "Cuttack, Odisha",
    admissionDate: "2025-08-11",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 41, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 37, faculty: "Prof. S. Samal" },
      { code: "CS403", subject: "Artificial Intelligence", total: 36, attended: 35, faculty: "Dr. P. Dash" },
      { code: "CS404", subject: "Microprocessor", total: 40, attended: 39, faculty: "Prof. R. Mohanty" },
      { code: "CS405", subject: "Discrete Mathematics", total: 34, attended: 32, faculty: "Dr. M. Mishra" },
      { code: "CS406", subject: "Advanced Java", total: 20, attended: 20, faculty: "Prof. S. Patnaik" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 99 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "O", marks: 96 },
      { code: "CS403", subject: "Artificial intelligence", credit: 3, grade: "O", marks: 94 },
      { code: "CS404", subject: "Microprocessor", credit: 4, grade: "O", marks: 97 },
      { code: "CS405", subject: "Discrete Mathematics", credit: 3, grade: "O", marks: 95 },
      { code: "CS406", subject: "Advanced Java", credit: 2, grade: "O", marks: 100 }
    ]
  },
  {
    id: "2501445457",
    regNo: "2501445457",
    name: "Arpit Mohapatra",
    email: "arpit.aiml@gec.edu.in",
    phone: "+91 98765 43212",
    dept: "B.Tech CSE-AI/ML",
    departmentShort: "CSE-AI/ML",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 8.65,
    sgpa: [8.4, 8.6, 8.7, 8.9],
    attendanceOverall: 84.2,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    hostel: "Ramanujan Hostel - Room 214",
    fatherName: "Sanjay Kumar Mohapatra",
    dob: "2007-04-20",
    address: "Rourkela, Odisha",
    admissionDate: "2025-08-12",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 41, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 37, faculty: "Prof. S. Samal" },
      { code: "CS403", subject: "Artificial Intelligence", total: 36, attended: 35, faculty: "Dr. P. Dash" },
      { code: "CS404", subject: "Microprocessor", total: 40, attended: 39, faculty: "Prof. R. Mohanty" },
      { code: "CS405", subject: "Discrete Mathematics", total: 34, attended: 32, faculty: "Dr. M. Mishra" },
      { code: "CS406", subject: "Advanced Java", total: 20, attended: 20, faculty: "Prof. S. Patnaik" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 99 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "O", marks: 96 },
      { code: "CS403", subject: "Artificial intelligence", credit: 3, grade: "O", marks: 94 },
      { code: "CS404", subject: "Microprocessor", credit: 4, grade: "O", marks: 97 },
      { code: "CS405", subject: "Discrete Mathematics", credit: 3, grade: "O", marks: 95 },
      { code: "CS406", subject: "Advanced Java", credit: 2, grade: "O", marks: 100 }
    ]
  },
  {
    id: "2501445229",
    regNo: "2501445229",
    name: "Satya Sundar Nayak",
    email: "satya.cse@gec.edu.in",
    phone: "+91 98765 43213",
    dept: "B.Tech CSE",
    departmentShort: "CSE",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 9.68,
    sgpa: [9.6, 9.7, 9.6, 9.8],
    attendanceOverall: 96.5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    hostel: "Ramanujan Hostel - Room 314",
    fatherName: "Prabhakar Nayak",
    dob: "2005-11-15",
    address: "Jajapur, Odisha",
    admissionDate: "2025-08-08",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 41, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 37, faculty: "Prof. S. Samal" },
      { code: "CS403", subject: "Artificial Intelligence", total: 36, attended: 35, faculty: "Dr. P. Dash" },
      { code: "CS404", subject: "Microprocessor", total: 40, attended: 39, faculty: "Prof. R. Mohanty" },
      { code: "CS405", subject: "Discrete Mathematics", total: 34, attended: 32, faculty: "Dr. M. Mishra" },
      { code: "CS406", subject: "Advanced Java", total: 20, attended: 20, faculty: "Prof. S. Patnaik" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 99 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "O", marks: 96 },
      { code: "CS403", subject: "Artificial intelligence", credit: 3, grade: "O", marks: 94 },
      { code: "CS404", subject: "Microprocessor", credit: 4, grade: "O", marks: 97 },
      { code: "CS405", subject: "Discrete Mathematics", credit: 3, grade: "O", marks: 95 },
      { code: "CS406", subject: "Advanced Java", credit: 2, grade: "O", marks: 100 }
    ]
  },
  {
    id: "2501445506",
    regNo: "2501445506",
    name: "Divyam Prasad",
    email: "divyam.aiml@gec.edu.in",
    phone: "+91 98765 43214",
    dept: "B.Tech CSE-AI/ML",
    departmentShort: "CSE-AI/ML",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 8.85,
    sgpa: [8.7, 8.8, 8.9, 9.0],
    attendanceOverall: 88.0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    hostel: "APJ Abdul Kalam Hall - Room 310",
    fatherName: "Santosh Prasad",
    dob: "2005-09-05",
    address: "Sambalpur, Odisha",
    admissionDate: "2025-08-14",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 41, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 37, faculty: "Prof. S. Samal" },
      { code: "CS403", subject: "Artificial Intelligence", total: 36, attended: 35, faculty: "Dr. P. Dash" },
      { code: "CS404", subject: "Microprocessor", total: 40, attended: 39, faculty: "Prof. R. Mohanty" },
      { code: "CS405", subject: "Discrete Mathematics", total: 34, attended: 32, faculty: "Dr. M. Mishra" },
      { code: "CS406", subject: "Advanced Java", total: 20, attended: 20, faculty: "Prof. S. Patnaik" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 99 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "O", marks: 96 },
      { code: "CS403", subject: "Artificial intelligence", credit: 3, grade: "O", marks: 94 },
      { code: "CS404", subject: "Microprocessor", credit: 4, grade: "O", marks: 97 },
      { code: "CS405", subject: "Discrete Mathematics", credit: 3, grade: "O", marks: 95 },
      { code: "CS406", subject: "Advanced Java", credit: 2, grade: "O", marks: 100 }
    ]
  },
  {
    id: "2501445005",
    regNo: "2501445005",
    name: "Abhinandan Kumar Kushwaha",
    email: "abhinandan.cse@gec.edu.in",
    phone: "+91 98765 43215",
    dept: "B.Tech CSE",
    departmentShort: "CSE",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 9.15,
    sgpa: [9.0, 9.1, 9.2, 9.3],
    attendanceOverall: 92.4,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    hostel: "CV Raman Hall - Room 202",
    fatherName: "Rameshwar Kushwaha",
    dob: "2005-03-18",
    address: "Brahmapur, Odisha",
    admissionDate: "2025-08-09",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 41, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 37, faculty: "Prof. S. Samal" },
      { code: "CS403", subject: "Artificial Intelligence", total: 36, attended: 35, faculty: "Dr. P. Dash" },
      { code: "CS404", subject: "Microprocessor", total: 40, attended: 39, faculty: "Prof. R. Mohanty" },
      { code: "CS405", subject: "Discrete Mathematics", total: 34, attended: 32, faculty: "Dr. M. Mishra" },
      { code: "CS406", subject: "Advanced Java", total: 20, attended: 20, faculty: "Prof. S. Patnaik" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 99 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "O", marks: 96 },
      { code: "CS403", subject: "Artificial intelligence", credit: 3, grade: "O", marks: 94 },
      { code: "CS404", subject: "Microprocessor", credit: 4, grade: "O", marks: 97 },
      { code: "CS405", subject: "Discrete Mathematics", credit: 3, grade: "O", marks: 95 },
      { code: "CS406", subject: "Advanced Java", credit: 2, grade: "O", marks: 100 }
    ]
  },
  {
    id: "2501445001",
    regNo: "2501445001",
    name: "Rohan Kumar",
    email: "rohan.cse@gec.ac.in",
    phone: "+91 98765 43210",
    dept: "B.Tech CSE",
    departmentShort: "CSE",
    semester: 4,
    batch: "2025-2029",
    status: "Active Student",
    cgpa: 9.10,
    sgpa: [9.0, 9.1, 9.2, 9.1],
    attendanceOverall: 92.5,
    avatar: null,
    hostel: "CV Raman Hall - Room 302",
    fatherName: "Rajesh Kumar",
    dob: "2005-04-12",
    address: "Bhubaneswar, Odisha",
    admissionDate: "2025-08-10",
    feeStatus: "Paid",
    pendingFee: 0,
    attendanceDetails: [
      { code: "CS401", subject: "Data Structures & Algorithms", total: 42, attended: 39, faculty: "Dr. A. K. Nayak" },
      { code: "CS402", subject: "Database Management Systems", total: 38, attended: 35, faculty: "Prof. S. Samal" },
      { code: "CS404", subject: "Operating Systems", total: 40, attended: 37, faculty: "Prof. R. Mohanty" }
    ],
    results: [
      { code: "CS401", subject: "Data Structures & Algorithms", credit: 4, grade: "O", marks: 95 },
      { code: "CS402", subject: "Database Management Systems", credit: 4, grade: "E", marks: 88 },
      { code: "CS404", subject: "Operating Systems", credit: 4, grade: "O", marks: 92 }
    ]
  }
];

export async function initializeDatabase() {
  try {
    // 1. Connect without selecting database to create database if not exists
    const adminConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await adminConnection.end();

    // 2. Create the connection pool with database selected
    pool = mysql.createPool(dbConfig);

    // Test connection
    const connection = await pool.getConnection();
    isConnected = true;
    console.log(`[MySQL] Connected successfully to database: ${dbConfig.database}`);

    // 3. Create students table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id VARCHAR(50) PRIMARY KEY,
        reg_no VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50),
        dept VARCHAR(100) NOT NULL,
        department_short VARCHAR(50),
        semester INT DEFAULT 4,
        batch VARCHAR(50) DEFAULT '2025-2029',
        status VARCHAR(50) DEFAULT 'Active Student',
        cgpa DECIMAL(4, 2) DEFAULT 0.00,
        sgpa JSON,
        attendance_overall DECIMAL(5, 2) DEFAULT 0.00,
        avatar TEXT,
        hostel VARCHAR(150),
        father_name VARCHAR(150),
        dob VARCHAR(50),
        address TEXT,
        admission_date VARCHAR(50),
        fee_status VARCHAR(50) DEFAULT 'Paid',
        pending_fee DECIMAL(10, 2) DEFAULT 0.00,
        attendance_details JSON,
        results JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    await connection.query(createTableQuery);

    // 4. Check if students table is empty; if so, auto-seed with default students
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM students');
    const count = rows[0].count;

    if (count === 0) {
      console.log('[MySQL] Students table is empty. Auto-seeding initial student records...');
      for (const stu of DEFAULT_STUDENTS) {
        await insertOrUpdateStudent(connection, stu);
      }
      console.log(`[MySQL] Auto-seeded ${DEFAULT_STUDENTS.length} students.`);
    }

    connection.release();
    return { success: true };
  } catch (err) {
    isConnected = false;
    console.error('[MySQL Connection Error]:', err.message);
    console.warn('[MySQL Note]: If MySQL is not running or credentials differ, update server/.env with your MySQL root credentials.');
    return { success: false, error: err.message };
  }
}

// Helper to insert or update student using connection or pool
export async function insertOrUpdateStudent(connOrPool, stu) {
  const query = `
    INSERT INTO students (
      id, reg_no, name, email, phone, dept, department_short, semester, batch,
      status, cgpa, sgpa, attendance_overall, avatar, hostel, father_name, dob,
      address, admission_date, fee_status, pending_fee, attendance_details, results
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      email = VALUES(email),
      phone = VALUES(phone),
      dept = VALUES(dept),
      department_short = VALUES(department_short),
      semester = VALUES(semester),
      batch = VALUES(batch),
      status = VALUES(status),
      cgpa = VALUES(cgpa),
      sgpa = VALUES(sgpa),
      attendance_overall = VALUES(attendance_overall),
      avatar = VALUES(avatar),
      hostel = VALUES(hostel),
      father_name = VALUES(father_name),
      dob = VALUES(dob),
      address = VALUES(address),
      admission_date = VALUES(admission_date),
      fee_status = VALUES(fee_status),
      pending_fee = VALUES(pending_fee),
      attendance_details = VALUES(attendance_details),
      results = VALUES(results);
  `;

  const values = [
    stu.id || stu.regNo,
    stu.regNo,
    stu.name,
    stu.email || `${stu.name.toLowerCase().replace(/\s+/g, '')}@gec.ac.in`,
    stu.phone || '+91 98765 43210',
    stu.dept || 'B.Tech CSE',
    stu.departmentShort || (stu.dept?.includes('AI/ML') ? 'CSE-AI/ML' : 'CSE'),
    stu.semester || 4,
    stu.batch || '2025-2029',
    stu.status || 'Active Student',
    stu.cgpa || 8.50,
    JSON.stringify(stu.sgpa || [8.5, 8.5, 8.5, 8.5]),
    stu.attendanceOverall || 85.0,
    stu.avatar || null,
    stu.hostel || 'CV Raman Hall - Room 101',
    stu.fatherName || 'Parent Name',
    stu.dob || '2005-01-01',
    stu.address || 'Bhubaneswar, Odisha',
    stu.admissionDate || '2025-08-10',
    stu.feeStatus || 'Paid',
    stu.pendingFee || 0,
    JSON.stringify(stu.attendanceDetails || []),
    JSON.stringify(stu.results || [])
  ];

  return connOrPool.query(query, values);
}

export function getPool() {
  return pool;
}

export function isDbConnected() {
  return isConnected;
}
