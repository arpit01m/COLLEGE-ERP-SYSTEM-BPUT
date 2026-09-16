import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  seedStudents
} from '../controllers/studentController.js';

const router = express.Router();

// Routes for /api/students
router.get('/', getAllStudents);
router.get('/:idOrRegNo', getStudentById);
router.post('/', createStudent);
router.put('/:idOrRegNo', updateStudent);
router.delete('/:idOrRegNo', deleteStudent);
router.post('/seed', seedStudents);

export default router;
