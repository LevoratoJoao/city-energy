import devicesService from '../services/devicesService.js';

export const addDevice = async (req, res) => {
    try {
        const device = await devicesService.addDevice(req.body);
        res.status(201).json({ message: 'Device added', device: device });
    } catch (error) {
        res.status(500).json({ message: 'Error adding device', error: error.message });
    }
};

export const getDevices = (req, res) => {
    const devices = devicesService.getDevices();
    res.status(200).json(devices);
};

export const getDevice = (req, res) => {
    const id = req.params;
    console.log('In getDevice', id);
    const device = devicesService.getDevice(id.id);
    if (device) {
        res.status(200).json(device);
    } else {
        res.status(404).json({ message: 'Device not found' });
    }
};

export const updateDevice = (req, res) => {
    const id = req.params;
    const status = req.body.status;
    const device = devicesService.updateDevice(id, status);
    if (device) {
        res.status(200).json({ message: 'Device updated', data: device });
    } else {
        res.status(404).json({ message: 'Device not found' });
    }
};