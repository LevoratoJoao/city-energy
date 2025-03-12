import assignmentsService from '../services/assignmentsService.js';

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
    const id = req.params;
    const status = req.body.status;
    const assignment = await assignmentsService.updateAssignment(id.id, status);
    if (assignment) {
        res.status(200).json({ message: 'Assignment updated', data: assignment });
    } else {
        res.status(404).json({ message: 'Assignment not found' });
    }
}