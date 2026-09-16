import { getPool, isDbConnected, insertOrUpdateStudent, DEFAULT_STUDENTS } from '../config/db.js';

// Helper to normalize MySQL snake_case row to frontend camelCase object
function formatStudentRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    regNo: row.reg_no,
    name: row.name,
    email: row.email,
    phone: row.phone,
    dept: row.dept,
    departmentShort: row.department_short,
    semester: Number(row.semester),
    batch: row.batch,
    status: row.status,
    cgpa: row.cgpa !== null ? Number(row.cgpa) : 0,
    sgpa: typeof row.sgpa === 'string' ? JSON.parse(row.sgpa || '[]') : (row.sgpa || []),
    attendanceOverall: row.attendance_overall !== null ? Number(row.attendance_overall) : 0,
    avatar: row.avatar,
    hostel: row.hostel,
    fatherName: row.father_name,
    dob: row.dob,
    address: row.address,
    admissionDate: row.admission_date,
    feeStatus: row.fee_status,
    pendingFee: row.pending_fee !== null ? Number(row.pending_fee) : 0,
    attendanceDetails: typeof row.attendance_details === 'string' ? JSON.parse(row.attendance_details || '[]') : (row.attendance_details || []),
    results: typeof row.results === 'string' ? JSON.parse(row.results || '[]') : (row.results || [])
  };
}

// 1. GET /api/students - List all students
export async function getAllStudents(req, res) {
  try {
    const pool = getPool();
    if (!pool || !isDbConnected()) {
      return res.status(200).json({
        success: true,
        source: 'fallback',
        message: 'MySQL is not connected; serving default records.',
        data: DEFAULT_STUDENTS
      });
    }

    const [rows] = await pool.query('SELECT * FROM students ORDER BY name ASC');
    const formatted = rows.map(formatStudentRow);

    return res.status(200).json({
      success: true,
      source: 'database',
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve students from database',
      error: error.message
    });
  }
}

// 2. GET /api/students/:idOrRegNo - Retrieve a single student
export async function getStudentById(req, res) {
  try {
    const { idOrRegNo } = req.params;
    const pool = getPool();

    if (!pool || !isDbConnected()) {
      const found = DEFAULT_STUDENTS.find(s => s.id === idOrRegNo || s.regNo === idOrRegNo);
      if (!found) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      return res.status(200).json({ success: true, source: 'fallback', data: found });
    }

    const [rows] = await pool.query(
      'SELECT * FROM students WHERE id = ? OR reg_no = ? LIMIT 1',
      [idOrRegNo, idOrRegNo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found in database' });
    }

    return res.status(200).json({
      success: true,
      source: 'database',
      data: formatStudentRow(rows[0])
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      error: error.message
    });
  }
}

// 3. POST /api/students - Register or insert a new student
export async function createStudent(req, res) {
  try {
    const studentData = req.body;
    if (!studentData.regNo && !studentData.reg_no) {
      return res.status(400).json({
        success: false,
        message: 'Registration Number (regNo) is required.'
      });
    }

    const pool = getPool();
    if (!pool || !isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'MySQL is not connected. Unable to persist record to database.'
      });
    }

    const studentToInsert = {
      id: studentData.id || studentData.regNo || studentData.reg_no,
      regNo: studentData.regNo || studentData.reg_no,
      name: studentData.name || 'Student User',
      email: studentData.email || `${(studentData.name || 'student').toLowerCase().replace(/\s+/g, '')}@gec.ac.in`,
      phone: studentData.phone || '+91 98765 43210',
      dept: studentData.dept || 'B.Tech CSE',
      departmentShort: studentData.departmentShort || studentData.department_short || (studentData.dept?.includes('AI/ML') ? 'CSE-AI/ML' : 'CSE'),
      semester: studentData.semester || 4,
      batch: studentData.batch || '2025-2029',
      status: studentData.status || 'Active Student',
      cgpa: studentData.cgpa || 8.50,
      sgpa: studentData.sgpa || [8.5, 8.5, 8.5, 8.5],
      attendanceOverall: studentData.attendanceOverall || studentData.attendance_overall || 85.0,
      avatar: studentData.avatar || null,
      hostel: studentData.hostel || 'CV Raman Hall - Room 101',
      fatherName: studentData.fatherName || studentData.father_name || 'Parent Name',
      dob: studentData.dob || '2005-01-01',
      address: studentData.address || 'Bhubaneswar, Odisha',
      admissionDate: studentData.admissionDate || studentData.admission_date || new Date().toISOString().split('T')[0],
      feeStatus: studentData.feeStatus || studentData.fee_status || 'Paid',
      pendingFee: studentData.pendingFee || studentData.pending_fee || 0,
      attendanceDetails: studentData.attendanceDetails || studentData.attendance_details || [
        { code: 'CS401', subject: 'Data Structures & Algorithms', total: 40, attended: 35, faculty: 'Dr. A. K. Nayak' }
      ],
      results: studentData.results || [
        { code: 'CS401', subject: 'Data Structures & Algorithms', credit: 4, grade: 'E', marks: 85 }
      ]
    };

    await insertOrUpdateStudent(pool, studentToInsert);

    return res.status(201).json({
      success: true,
      message: 'Student registered and persisted successfully in MySQL.',
      data: studentToInsert
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to insert student into database',
      error: error.message
    });
  }
}

// 4. PUT /api/students/:idOrRegNo - Update student
export async function updateStudent(req, res) {
  try {
    const { idOrRegNo } = req.params;
    const updateFields = req.body;
    const pool = getPool();

    if (!pool || !isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'MySQL is not connected.'
      });
    }

    // Check existing
    const [existing] = await pool.query(
      'SELECT * FROM students WHERE id = ? OR reg_no = ? LIMIT 1',
      [idOrRegNo, idOrRegNo]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Student record not found.' });
    }

    const current = formatStudentRow(existing[0]);
    const merged = { ...current, ...updateFields };

    await insertOrUpdateStudent(pool, merged);

    return res.status(200).json({
      success: true,
      message: 'Student record updated successfully.',
      data: merged
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
}

// 5. DELETE /api/students/:idOrRegNo - Delete student
export async function deleteStudent(req, res) {
  try {
    const { idOrRegNo } = req.params;
    const pool = getPool();

    if (!pool || !isDbConnected()) {
      return res.status(503).json({ success: false, message: 'MySQL is not connected.' });
    }

    const [result] = await pool.query(
      'DELETE FROM students WHERE id = ? OR reg_no = ?',
      [idOrRegNo, idOrRegNo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    return res.status(200).json({
      success: true,
      message: `Student with ID/RegNo ${idOrRegNo} deleted successfully.`
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
}

// 6. POST /api/students/seed - Re-seed initial dataset
export async function seedStudents(req, res) {
  try {
    const pool = getPool();
    if (!pool || !isDbConnected()) {
      return res.status(503).json({ success: false, message: 'MySQL is not connected.' });
    }

    for (const stu of DEFAULT_STUDENTS) {
      await insertOrUpdateStudent(pool, stu);
    }

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${DEFAULT_STUDENTS.length} students into MySQL database.`
    });
  } catch (error) {
    console.error('Error seeding students:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error.message
    });
  }
}
