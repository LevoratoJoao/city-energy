import { PrismaClient, Prisma } from '@prisma/client'
import devicesService from './devicesService.js';
const primas = new PrismaClient();

const addAssignment = async (assignment) => {
    const newAssignment = await primas.assignment.create({
        data: {
            technician: {
                connect: { id: assignment.technicianId }
            },
            device: {
                connect: { id: assignment.deviceId }
            },
            status: 'ACTIVE'
        }
    });
    return newAssignment;
}

const getAssignments = async () => {
    const assignments = await primas.assignment.findMany();
    return assignments;
}

const getAssignment = async (id) => {
    const assignment = await primas.assignment.findUnique({
        where: { id: Number(id) }
    });
    return assignment;
}

const updateAssignment = async (id, status) => {
    const updatedAssignment = await primas.assignment.update({
        where: { id: Number(id) },
        data: { status: 'COMPLETED' }
    });
    await devicesService.updateDevice(updatedAssignment.deviceId, 'On');

    return updatedAssignment;
}

export default {
    addAssignment,
    getAssignments,
    getAssignment,
    updateAssignment
}

