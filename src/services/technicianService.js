import deviceService from "../services/devicesService.js";
import Technician from "../models/technician.js";

import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const addTechnician = async (technician) => {
    const newTechnician = await prisma.technician.create({
        data: {
            name: technician.name,
            devices: technician.devices
        }
    });
    console.log('Technician added:', newTechnician);
    return newTechnician;
}

const getTechnicians = async () => {
    const technicians = await prisma.technician.findMany();
    return technicians;
}

const getTechnician = async (id) => {
    const technician = await prisma.technician.findFirst({
        where: {
            id: Number(id)
        }
    });
    return technician;
}

const callTechnician = async (deviceId) => {
    console.log('Calling technician...');
    const [technician] = await prisma.$queryRaw`
        SELECT * FROM technician
        ORDER BY RANDOM()
        LIMIT 1
    `;
    console.log('Technician:', technician);
    console.log('Device:', deviceId);
    const updatedTechnician = await prisma.technician.update({
        where: {
            id: technician.id
        },
        data: {
            assignments: {
                create: {
                    device: {
                        connect: { id: Number(deviceId) }
                    }
                }
            }
        }
    });
    console.log('Technician called:', updatedTechnician, '\nDevice:', deviceId);
    return updatedTechnician;
}

const markCallComplete = async (assignmentId) => {
    const assignment = await prisma.assignment.update({
        where: {
            id: Number(assignmentId)
        },
        data: {
            status: "COMPLETED"
        }
    });
    await deviceService.updateDevice(assignment.deviceId, "On");
    return "Device repaired";
}

export default {
    addTechnician,
    getTechnician,
    getTechnicians,
    callTechnician,
    markCallComplete
};