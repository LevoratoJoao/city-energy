import assignmentsService from '../services/assignmentsService.js';
import techniciansService from '../services/technicianService.js';

export const addAssignment = async (req, res) => {
    try {
        const assignment = await assignmentsService.addAssignment(req.body);
        res.status(201).json({ message: 'Assignment added', data: assignment });
    } catch (error) {
        res.status(500).json({ message: 'Error adding assignment', error: error.message });
    }
}

export const getAssignments = async (req, res) => {
    const assignments = await assignmentsService.getAssignments();
    res.status(200).json(assignments);
}

/**
 * Get an assignment by id
 * This endpoint was substituted by the getFilteredAssignments endpoint
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const getAssignment = async (req, res) => {
    const id = req.params;
    const assignment = await assignmentsService.getAssignment(id.id);

    if (assignment) {
        res.status(200).json({ message: 'Assignment found', data: assignment });
    } else {
        res.status(404).json({ message: 'Assignment not found' });
    }
}

export const updateAssignment = async (req, res) => {
    try {
        const id = req.params;
        const status = req.body.status;
        const assignment = await assignmentsService.updateAssignment(id.id, status);

        res.status(200).json({
            message: 'Assignment updated',
            data: assignment
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating assignment',
            error: error.message
        });
    }
}

export const getFilteredAssignments = async (req, res) => {
    const id = req.query.id ? req.query.id : null;
    const deviceId = req.query.deviceId ? req.query.deviceId : null;
    const status = req.query.status ? req.query.status : '';
    const technicianId = req.query.technicianId ? req.query.technicianId : null;
    const assignments = await assignmentsService.getFilteredAssignments(id, deviceId, status, technicianId);
    if (assignments) {
        res.status(200).json({ message: 'Assignments found', data: assignments });
    } else {
        res.status(404).json({ message: 'Assignments not found' });
    }
}

export const getLastActiveAssignmentByDeviceId = async (req, res) => {
    const deviceId = req.params;
    const assignment = await assignmentsService.getLastActiveAssignmentByDeviceId(deviceId.id);
    console.log(assignment);
    const technician = await techniciansService.getTechnician(assignment.technicianId);
    res.status(200).json({ message: 'Last assignment found', assignment: assignment, technician: technician });
}