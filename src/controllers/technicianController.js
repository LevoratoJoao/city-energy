import technicianService from '../services/technicianService.js';

export const addTechnician = (req, res) => {
    const technician = technicianService.addTechnician(req.body);
    res.status(201).json({ message: 'Technician added', technician: technician });
};

export const getTechnicians = (req, res) => {
    const technicians = technicianService.getTechnicians();
    return res.status(200).json(technicians);
};

export const getTechnician = (req, res) => {
    const id = req.params;
    const technician = technicianService.getTechnician(id.id);
    if (technician) {
        res.status(200).json(technician);
    } else {
        res.status(404).json({ message: 'Technician not found' });
    }
};

export const markCallComplete = (req, res) => {
    const techId = req.params;
    const deviceId = req.body;

    const message = technicianService.markCallComplete(techId.id, deviceId.id);
    if (message) {
        res.status(200).json(message);
    } else {
        res.status(404).json({ message: 'Something went wrong' });
    }
}