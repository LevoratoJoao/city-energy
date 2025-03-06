const { getDevice } = require("../controllers/devicesController");
const Technician = require("../models/technician");

const technicians = [];
let id = 0;

const addTechnician = (technician) => {
    const newTechnician = new Technician(id, technician.name, technician.devices);
    id+=1;
    technicians.push(newTechnician);
    console.log('Technician added:', newTechnician.id);
    return newTechnician;
}

const getTechnicians = () => {
    return technicians;
}

const getTechnician = (id) => {
    const technician = technicians.find((technician) => {
        if (technician.id === Number(id)) {
            return technician;
        }
    });
    if (technician) {
        console.log('Technician found:', technician.id);
        return technician;
    }
    console.log('Technician not found:', id);
    return null;
}

const callTechnician = (deviceId) => {
    console.log('Calling technician...');
    const techId = Math.floor(Math.random() * technicians.length);
    const technician = getTechnician(techId);
    if (technician) {
        const device = getDevice(deviceId);
        technician.devices.push(device);
        console.log('Technician called:', technician.id, '\nDevice:', deviceId);
        return technician;
    }
    console.log('Technician not available');
    return null;
}

module.exports = {
    addTechnician,
    getTechnician,
    getTechnicians,
    callTechnician,
};