import * as studentRepository from '../data/student.js';
import * as scoreRepository from '../data/score.js';

export async function GetStudents(req, res, next) {
    try {
        const student_idx = req.query.student_idx;
        const data = await (student_idx
            ? studentRepository.getAllByStudentIdx(student_idx)
            : studentRepository.getAll());
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error: error.message });
    }
}

export async function GetScores(req, res, next) {
    try {
        const scores = await scoreRepository.getAllScores();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve scores', error: error.message });
    }
}

export async function CreateStudent(req, res, next) {
    try {
        const { student_num, student_name, student_ph, student_email, student_address } = req.body;
        const student = await studentRepository.create(student_num, student_name, student_ph, student_email, student_address);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create student', error: error.message });
    }
}

export async function UpdateStudent(req, res, next) {
    try {
        const student_idx = req.params.student_idx;
        const { student_num, student_name, student_ph, student_email, student_address } = req.body;

        const student = await studentRepository.getBystudentIdx(student_idx);
        if (!student) {
            return res.status(404).json({ message: `student_idx(${student_idx}) not found` });
        }
        if (student.student_idx !== student_idx) {
            return res.sendStatus(403);
        }

        const updated = await studentRepository.update(
            student_idx,
            student_num,
            student_name,
            student_ph,
            student_email,
            student_address
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student', error: error.message });
    }
}

export async function DeleteStudent(req, res, next) {
    try {
        const student_idx = req.params.student_idx;

        const student = await studentRepository.getBystudentIdx(student_idx);
        if (!student) {
            return res.status(404).json({ message: `student_idx(${student_idx}) not found` });
        }

        await studentRepository.remove(student_idx);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete student', error: error.message });
    }
}
