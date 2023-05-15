import express from 'express';
import * as studentController from '../controller/student.js';

const router = express.Router();

router.get('/', studentController.GetStudents)
router.post('/', studentController.CreateStudent)
router.put('/:student_idx', studentController.UpdateStudent)
router.delete('/:student_idx', studentController.DeleteStudent)

export default router;
