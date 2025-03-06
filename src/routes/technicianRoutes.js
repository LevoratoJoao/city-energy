const express = require('express');
const technicianController = require('../controllers/technicianController');
const router = express.Router();

router.post('/', technicianController.addTechnician);
router.get('/', technicianController.getTechnicians);
router.get('/:id', technicianController.getTechnician);

module.exports = router;