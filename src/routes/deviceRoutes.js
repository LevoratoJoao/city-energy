import { Router } from 'express';
import { addDevice, getDevice, getDevices, updateDevice } from '../controllers/devicesController.js';
const router = Router();

router.post('/', addDevice);
router.get('/:id', getDevice);
router.get('/', getDevices);
router.put('/:id/status', updateDevice);

export default router;
