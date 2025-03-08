import technicianService from './technicianService.js';
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const addDevice = async (device) => {
    const newDevice = await prisma.device.create({
        data: {
            type: device.type,
            name: device.name,
            description: device.description,
            status: device.status,
        },
        include: {
            assignments: {
                include: {
                    technician: true
                }
            }
        }
    })
    console.log('Device added:', newDevice);
    return newDevice;
}

const getDevices = async () => {
    const devices = await prisma.device.findMany({
        include: {
            assignments: {
                include: {
                    technician: true
                }
            }
        }
    });
    return devices;
}

const getDevice = async (id) => {
    const device = await prisma.device.findFirst({
        where: {
            id: Number(id)
        }
    });
    return device;
}

const updateDevice = async (id, status) => {
    const device = await getDevice(id);
    device.status = status;
    if (device.status === 'Off') {
        technicianService.callTechnician(id);
        const updatedDevice = await prisma.device.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            },
            include: {
                assignments: {
                    include: {
                        technician: true
                    }
                }
            }
        });
        return updatedDevice;
    }
    const updatedDevice = await prisma.device.update({
        where: {
            id: device.id
        },
        data: {
            status: device.status
        }
    });
    return updatedDevice;
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