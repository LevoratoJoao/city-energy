import { Router } from 'express';
import { addTechnician, getTechnicians, getTechnician } from '../controllers/technicianController.js';
const router = Router();

router.post('/', addTechnician);
router.get('/', getTechnicians);
router.get('/:id', getTechnician);

export default router;