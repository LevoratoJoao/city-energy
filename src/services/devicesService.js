const devices = [];

const addDevice = (device) => {
    devices.push(device);
    console.log('Device added:', device.id);
    return device;
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
        console.log('Device found:', device.id);
        return device;
    }
    console.log('Device not found:', id);
    return null;
}

const updateDevice = (id, status) => {
    const device = getDevice(id);
    if (device) {
        device.status = status;
        console.log('Device updated:', device.id);
        return device;
    }
    return null;
}

const addTechnician = (deviceId, techId) => {
    const device = getDevice(deviceId);
    if (device) {
        device.technician.push(techId);
        console.log('Technician added:', techId, '\nDevice:', deviceId);
        return device;
    }
    return null;
}


module.exports = {
    addDevice,
    getDevice,
    getDevices,
    updateDevice,
    addTechnician
};