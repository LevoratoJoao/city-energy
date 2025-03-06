import { Router } from 'express';
import { addTechnician, getTechnicians, getTechnician, markCallComplete } from '../controllers/technicianController.js';
const router = Router();

router.post('/', addTechnician);
router.get('/', getTechnicians);
router.get('/:id', getTechnician);
router.put('/:id', markCallComplete);

export default router;