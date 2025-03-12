import { Router } from 'express';
import { addTechnician, getTechnicians, getTechnician, callTechnician } from '../controllers/technicianController.js';
const router = Router();

router.post('/', addTechnician);
router.get('/', getTechnicians);
router.get('/:id', getTechnician);
router.get('/call/:deviceId', callTechnician);

export default router;