import { PrismaClient, Prisma } from '@prisma/client'
import devicesService from './devicesService.js';
const prisma = new PrismaClient();

const addAssignment = async (assignment) => {
    const newAssignment = await prisma.assignment.create({
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
    const assignments = await prisma.assignment.findMany();
    return assignments;
}

const getAssignment = async (id) => {
    const assignment = await prisma.assignment.findUnique({
        where: { id: Number(id) }
    });
    return assignment;
}

const updateAssignment = async (id, status) => {
    const updatedAssignment = await prisma.assignment.update({
        where: { id: Number(id) },
        data: { status: status }
    });
    await devicesService.updateDevice(updatedAssignment.deviceId, 'On');
    return updatedAssignment;
}

const getFilteredAssignments = async (assignmentId, deviceId, status, technicianId) => {
    const assignments = await prisma.assignment.findMany({
        where: {
            OR: [
                { id: Number(assignmentId) },
                { deviceId: Number(deviceId) },
                { technicianId: Number(technicianId) },
                { status: status }
            ],
        },
        orderBy: { id: 'desc' }
    });
    return assignments;
}

const getActiveAssignmentsByDeviceId = async (deviceId) => {
    const assignments = await prisma.assignment.findMany({
        where: { deviceId: Number(deviceId), status: 'ACTIVE' },
        orderBy: { id: 'desc' }
    });
    return assignments;
}

const getLastActiveAssignmentByDeviceId = async (deviceId) => {
    const assignment = await prisma.assignment.findFirst({
        where: {
            deviceId: Number(deviceId)
        },
        orderBy: { id: 'desc' }
    });
    return assignment;
}

export default {
    addAssignment,
    getAssignments,
    getAssignment,
    updateAssignment,
    getFilteredAssignments,
    getActiveAssignmentsByDeviceId,
    getLastActiveAssignmentByDeviceId
}

