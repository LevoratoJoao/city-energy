import Device from '../models/device.js';
import technicianService from './technicianService.js';

const devices = [];
let id = 0;

const addDevice = (device) => {
    const newDevice = new Device(device.type, id, device.name, device.description, device.status, device.energy);
    id+=1;
    devices.push(newDevice);
    console.log('Device added:', newDevice);
    return newDevice;
}

const getDevices = () => {
    return devices;
}

const getDevice = (id) => {
    const device = devices.find((device) => {
        if (device.id === Number(id)) {
            return device;
        }
    });
    if (device) {
        console.log('Device found:', device);
        return device;
    }
    console.log('Device not found:', id);
    return null;
}

const updateDevice = (id, status) => {
    const device = getDevice(id);
    if (device) {
        device.status = status;
        if (device.status === 'Off') {
            console.log('In updateDevice: ', id);
            const technician = technicianService.callTechnician(id);

            device.technician.push({ id: technician.id, name: technician.name });
        }
        return device;
    }
    return null;
}

// const addTechnician = (deviceId, techId) => {
//     const device = getDevice(deviceId);
//     if (device) {
//         console.log('Technician added:', techId, '\nDevice:', deviceId);
//         return device;
//     }
//     return null;
// }

export default {
    addDevice,
    getDevice,
    getDevices,
    updateDevice,
    // addTechnician
};