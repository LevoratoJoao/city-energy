const Device = require('../models/device').default;
const devicesService = require('../services/devicesService');

exports.addDevice = (req, res) => {
    const device = devicesService.addDevice(req.body);
    res.status(201).json({ message: 'Device added', device: device });
};

exports.getDevices = (req, res) => {
    const devices = devicesService.getDevices();
    res.status(200).json(devices);
};

exports.getDevice = (req, res) => {
    const id = req.params;
    const device = devicesService.getDevice(id.id);
    if (device) {
        res.status(200).json(device);
    } else {
        res.status(404).json({ message: 'Device not found' });
    }
};

exports.updateDevice = (req, res) => {
    const id = req.params;
    const status = req.body.status;
    const device = devicesService.updateDevice(id, status);
    if (device) {
        res.status(200).json({ message: 'Device updated', data: device });
    } else {
        res.status(404).json({ message: 'Device not found' });
    }
};
