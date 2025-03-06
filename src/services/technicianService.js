import deviceService from "../services/devicesService.js";
import Technician from "../models/technician.js";

const technicians = [];
let id = 0;

const addTechnician = (technician) => {
    const newTechnician = new Technician(id, technician.name, technician.devices);
    id+=1;
    technicians.push(newTechnician);
    console.log('Technician added:', newTechnician);
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
        const device = deviceService.getDevice(deviceId);
        technician.devices.push({ id: device.id, name: device.name, status: device.status });
        console.log('Technician called:', technician.id, '\nDevice:', deviceId);
        return technician;
    }
    console.log('Technician not available');
    return null;
}

export default {
    addTechnician,
    getTechnician,
    getTechnicians,
    callTechnician,
};