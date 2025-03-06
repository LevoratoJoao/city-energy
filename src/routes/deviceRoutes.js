const express = require('express');
const devicesController = require('../controllers/devicesController');
const router = express.Router();

router.post('/', devicesController.addDevice);
router.get('/:id', devicesController.getDevice);
router.get('/', devicesController.getDevices);
router.put('/:id/status', devicesController.updateDevice);

module.exports = router;
