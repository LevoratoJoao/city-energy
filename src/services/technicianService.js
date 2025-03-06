const technicians = [];

const addTechnician = (technician) => {
    technicians.push(technician);
    console.log('Technician added:', technician.id);
    return technician;
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
    const techId = Math.floor(Math.random() * technicians.length);
    const technician = getTechnician(techId);
    if (technician) {
        technician.devices.push(deviceId);
        deviceService.addTechnician(deviceId, technician.id);
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
    callTechnician
};