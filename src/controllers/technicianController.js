const Technician = require('../models/technician');
const technicianService = require('../services/technicianService');

exports.addTechnician = (req, res) => {
    const technician = new Technician(req.body.id, req.body.name, req.body.devices);
    technicianService.addTechnician(technician);
    console.log('Technician added:', technician.id);
    res.status(201).json({ message: 'Technician added', technician: technician });
};

exports.getTechnicians = (req, res) => {
    const technicians = technicianService.getTechnicians();
    return res.status(200).json(technicians);
};

exports.getTechnician = (req, res) => {
    const id = req.params;
    const technician = technicianService.getTechnician(id.id);
    if (technician) {
        res.status(200).json(technician);
    } else {
        res.status(404).json({ message: 'Technician not found' });
    }
};