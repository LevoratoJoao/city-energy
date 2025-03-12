import { Router } from 'express';
import { addAssignment, getAssignment, getAssignments, updateAssignment, getFilteredAssignments, getLastActiveAssignmentByDeviceId } from '../controllers/assignmentsController.js';

const router = Router();

router.post('/', addAssignment);
// router.get('/:id', getAssignment);
router.get('/', getAssignments);
router.put('/:id', updateAssignment);
router.get('/filter', getFilteredAssignments);
router.get('/device/:id/last', getLastActiveAssignmentByDeviceId);

export default router;