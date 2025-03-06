const express = require('express');
const devicesConstroller = require('../controllers/devicesController');
const router = express.Router();

router.post('/', devicesConstroller.addDevice);
router.get('/:id', devicesConstroller.getDevice);
router.get('/', devicesConstroller.getDevices);
router.put('/:id/status', devicesConstroller.updateDevice);

module.exports = router;
