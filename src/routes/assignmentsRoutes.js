import { Router } from 'express';
import { addAssignment, getAssignment, getAssignments, updateAssignment } from '../controllers/assignmentsController.js';

const router = Router();

router.post('/', addAssignment);
router.get('/:id', getAssignment);
router.get('/', getAssignments);
router.put('/:id', updateAssignment);

export default router;