import technicianService from '../services/technicianService.js';

export const addTechnician = async (req, res) => {
    const technician = await technicianService.addTechnician(req.body);
    res.status(201).json({ message: 'Technician added', technician: technician });
};

export const getTechnicians = async (req, res) => {
    const technicians = await technicianService.getTechnicians();
    res.status(200).json(technicians);
};

export const getTechnician = async (req, res) => {
    const id = req.params;
    const technician = await technicianService.getTechnician(id.id);
    if (technician) {
        res.status(200).json(technician);
    } else {
        res.status(404).json({ message: 'Technician not found' });
    }
};

export const markCallComplete = async (req, res) => {
    const techId = req.params;
    const deviceId = req.body;

    const message = await technicianService.markCallComplete(techId.id, deviceId.id);
    if (message) {
        res.status(200).json(message);
    } else {
        res.status(404).json({ message: 'Something went wrong' });
    }
}