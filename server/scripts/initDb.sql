-- College ERP System - MySQL Database Initialization Script
-- Creates the database and students table, and populates initial student records

CREATE DATABASE IF NOT EXISTS college_erp;
USE college_erp;

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

-- Seed Initial Students
INSERT INTO students (
  id, reg_no, name, email, phone, dept, department_short, semester, batch,
  status, cgpa, sgpa, attendance_overall, avatar, hostel, father_name, dob,
  address, admission_date, fee_status, pending_fee, attendance_details, results
) VALUES
(
  '2501445307', '2501445307', 'Tanishka', 'tanishka.cse@gec.edu.in', '+91 98765 43210',
  'B.Tech CSE', 'CSE', 4, '2025-2029', 'Active Student', 8.92,
  '[8.8, 9.0, 8.9, 9.0]', 91.5,
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'Shakuntala Devi - Room 304', 'Rajesh Kumar', '2005-04-12', 'Bhubaneswar, Odisha', '2025-08-10',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":41,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":37,"faculty":"Prof. S. Samal"},{"code":"CS403","subject":"Artificial Intelligence","total":36,"attended":35,"faculty":"Dr. P. Dash"},{"code":"CS404","subject":"Microprocessor","total":40,"attended":39,"faculty":"Prof. R. Mohanty"},{"code":"CS405","subject":"Discrete Mathematics","total":34,"attended":32,"faculty":"Dr. M. Mishra"},{"code":"CS406","subject":"Advanced Java","total":20,"attended":20,"faculty":"Prof. S. Patnaik"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":99},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"O","marks":96},{"code":"CS403","subject":"Artificial intelligence","credit":3,"grade":"O","marks":94},{"code":"CS404","subject":"Microprocessor","credit":4,"grade":"O","marks":97},{"code":"CS405","subject":"Discrete Mathematics","credit":3,"grade":"O","marks":95},{"code":"CS406","subject":"Advanced Java","credit":2,"grade":"O","marks":100}]'
),
(
  '2501445597', '2501445597', 'Rishika Tiwary', 'rishika.aiml@gec.edu.in', '+91 98765 43211',
  'B.Tech CSE-AI/ML', 'CSE-AI/ML', 4, '2025-2029', 'Active Student', 9.45,
  '[9.3, 9.5, 9.4, 9.6]', 94.8,
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  'Shakuntala Devi Hostel - Room 208', 'Sunil Tiwary', '2005-07-22', 'Cuttack, Odisha', '2025-08-11',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":41,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":37,"faculty":"Prof. S. Samal"},{"code":"CS403","subject":"Artificial Intelligence","total":36,"attended":35,"faculty":"Dr. P. Dash"},{"code":"CS404","subject":"Microprocessor","total":40,"attended":39,"faculty":"Prof. R. Mohanty"},{"code":"CS405","subject":"Discrete Mathematics","total":34,"attended":32,"faculty":"Dr. M. Mishra"},{"code":"CS406","subject":"Advanced Java","total":20,"attended":20,"faculty":"Prof. S. Patnaik"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":99},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"O","marks":96},{"code":"CS403","subject":"Artificial intelligence","credit":3,"grade":"O","marks":94},{"code":"CS404","subject":"Microprocessor","credit":4,"grade":"O","marks":97},{"code":"CS405","subject":"Discrete Mathematics","credit":3,"grade":"O","marks":95},{"code":"CS406","subject":"Advanced Java","credit":2,"grade":"O","marks":100}]'
),
(
  '2501445457', '2501445457', 'Arpit Mohapatra', 'arpit.aiml@gec.edu.in', '+91 98765 43212',
  'B.Tech CSE-AI/ML', 'CSE-AI/ML', 4, '2025-2029', 'Active Student', 8.65,
  '[8.4, 8.6, 8.7, 8.9]', 84.2,
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  'Ramanujan Hostel - Room 214', 'Sanjay Kumar Mohapatra', '2007-04-20', 'Rourkela, Odisha', '2025-08-12',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":41,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":37,"faculty":"Prof. S. Samal"},{"code":"CS403","subject":"Artificial Intelligence","total":36,"attended":35,"faculty":"Dr. P. Dash"},{"code":"CS404","subject":"Microprocessor","total":40,"attended":39,"faculty":"Prof. R. Mohanty"},{"code":"CS405","subject":"Discrete Mathematics","total":34,"attended":32,"faculty":"Dr. M. Mishra"},{"code":"CS406","subject":"Advanced Java","total":20,"attended":20,"faculty":"Prof. S. Patnaik"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":99},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"O","marks":96},{"code":"CS403","subject":"Artificial intelligence","credit":3,"grade":"O","marks":94},{"code":"CS404","subject":"Microprocessor","credit":4,"grade":"O","marks":97},{"code":"CS405","subject":"Discrete Mathematics","credit":3,"grade":"O","marks":95},{"code":"CS406","subject":"Advanced Java","credit":2,"grade":"O","marks":100}]'
),
(
  '2501445229', '2501445229', 'Satya Sundar Nayak', 'satya.cse@gec.edu.in', '+91 98765 43213',
  'B.Tech CSE', 'CSE', 4, '2025-2029', 'Active Student', 9.68,
  '[9.6, 9.7, 9.6, 9.8]', 96.5,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'Ramanujan Hostel - Room 314', 'Prabhakar Nayak', '2005-11-15', 'Jajapur, Odisha', '2025-08-08',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":41,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":37,"faculty":"Prof. S. Samal"},{"code":"CS403","subject":"Artificial Intelligence","total":36,"attended":35,"faculty":"Dr. P. Dash"},{"code":"CS404","subject":"Microprocessor","total":40,"attended":39,"faculty":"Prof. R. Mohanty"},{"code":"CS405","subject":"Discrete Mathematics","total":34,"attended":32,"faculty":"Dr. M. Mishra"},{"code":"CS406","subject":"Advanced Java","total":20,"attended":20,"faculty":"Prof. S. Patnaik"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":99},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"O","marks":96},{"code":"CS403","subject":"Artificial intelligence","credit":3,"grade":"O","marks":94},{"code":"CS404","subject":"Microprocessor","credit":4,"grade":"O","marks":97},{"code":"CS405","subject":"Discrete Mathematics","credit":3,"grade":"O","marks":95},{"code":"CS406","subject":"Advanced Java","credit":2,"grade":"O","marks":100}]'
),
(
  '2501445506', '2501445506', 'Divyam Prasad', 'divyam.aiml@gec.edu.in', '+91 98765 43214',
  'B.Tech CSE-AI/ML', 'CSE-AI/ML', 4, '2025-2029', 'Active Student', 8.85,
  '[8.7, 8.8, 8.9, 9.0]', 88.0,
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'APJ Abdul Kalam Hall - Room 310', 'Santosh Prasad', '2005-09-05', 'Sambalpur, Odisha', '2025-08-14',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":41,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":37,"faculty":"Prof. S. Samal"},{"code":"CS403","subject":"Artificial Intelligence","total":36,"attended":35,"faculty":"Dr. P. Dash"},{"code":"CS404","subject":"Microprocessor","total":40,"attended":39,"faculty":"Prof. R. Mohanty"},{"code":"CS405","subject":"Discrete Mathematics","total":34,"attended":32,"faculty":"Dr. M. Mishra"},{"code":"CS406","subject":"Advanced Java","total":20,"attended":20,"faculty":"Prof. S. Patnaik"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":99},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"O","marks":96},{"code":"CS403","subject":"Artificial intelligence","credit":3,"grade":"O","marks":94},{"code":"CS404","subject":"Microprocessor","credit":4,"grade":"O","marks":97},{"code":"CS405","subject":"Discrete Mathematics","credit":3,"grade":"O","marks":95},{"code":"CS406","subject":"Advanced Java","credit":2,"grade":"O","marks":100}]'
),
(
  '2501445005', '2501445005', 'Abhinandan Kumar Kushwaha', 'abhinandan.cse@gec.edu.in', '+91 98765 43215',
  'B.Tech CSE', 'CSE', 4, '2025-2029', 'Active Student', 9.15,
  '[9.0, 9.1, 9.2, 9.3]', 92.4,
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  'CV Raman Hall - Room 202', 'Rameshwar Kushwaha', '2005-03-18', 'Brahmapur, Odisha', '2025-08-09',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":41,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":37,"faculty":"Prof. S. Samal"},{"code":"CS403","subject":"Artificial Intelligence","total":36,"attended":35,"faculty":"Dr. P. Dash"},{"code":"CS404","subject":"Microprocessor","total":40,"attended":39,"faculty":"Prof. R. Mohanty"},{"code":"CS405","subject":"Discrete Mathematics","total":34,"attended":32,"faculty":"Dr. M. Mishra"},{"code":"CS406","subject":"Advanced Java","total":20,"attended":20,"faculty":"Prof. S. Patnaik"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":99},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"O","marks":96},{"code":"CS403","subject":"Artificial intelligence","credit":3,"grade":"O","marks":94},{"code":"CS404","subject":"Microprocessor","credit":4,"grade":"O","marks":97},{"code":"CS405","subject":"Discrete Mathematics","credit":3,"grade":"O","marks":95},{"code":"CS406","subject":"Advanced Java","credit":2,"grade":"O","marks":100}]'
),
(
  '2501445001', '2501445001', 'Rohan Kumar', 'rohan.cse@gec.ac.in', '+91 98765 43210',
  'B.Tech CSE', 'CSE', 4, '2025-2029', 'Active Student', 9.10,
  '[9.0, 9.1, 9.2, 9.1]', 92.5,
  NULL,
  'CV Raman Hall - Room 302', 'Rajesh Kumar', '2005-04-12', 'Bhubaneswar, Odisha', '2025-08-10',
  'Paid', 0.00,
  '[{"code":"CS401","subject":"Data Structures & Algorithms","total":42,"attended":39,"faculty":"Dr. A. K. Nayak"},{"code":"CS402","subject":"Database Management Systems","total":38,"attended":35,"faculty":"Prof. S. Samal"},{"code":"CS404","subject":"Operating Systems","total":40,"attended":37,"faculty":"Prof. R. Mohanty"}]',
  '[{"code":"CS401","subject":"Data Structures & Algorithms","credit":4,"grade":"O","marks":95},{"code":"CS402","subject":"Database Management Systems","credit":4,"grade":"E","marks":88},{"code":"CS404","subject":"Operating Systems","credit":4,"grade":"O","marks":92}]'
)
ON DUPLICATE KEY UPDATE name=VALUES(name);
