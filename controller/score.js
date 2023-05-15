import * as scoreRepository from '../data/score.js';

export async function GetScoreAll(req, res, next) {
    try {
        const scores = await scoreRepository.getAllScores();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve scores', error: error.message });
    }
}

export async function CreateScore(req, res, next) {
    try {
        const { student_num, score_java, score_python, score_c } = req.body;
        const total = score_java + score_python + score_c;
        const avg = total / 3;

        const score = await scoreRepository.create(student_num, score_java, score_python, score_c, total, avg);
        res.status(201).json(score);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create score', error: error.message });
    }
}

export async function UpdateScore(req, res, next) {
    try {
        const score_idx = req.params.score_idx;
        const { student_num, score_java, score_python, score_c } = req.body;
        const total = score_java + score_python + score_c;
        const avg = total / 3;

        const score = await scoreRepository.getByScoreIdx(score_idx);
        if (!score) {
            return res.status(404).json({ message: `score_idx(${score_idx}) not found` });
        }

        const updated = await scoreRepository.update(score_idx, student_num, score_java, score_python, score_c, total, avg);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update score', error: error.message });
    }
}

export async function DeleteScore(req, res, next) {
    try {
        const score_idx = req.params.score_idx;

        const score = await scoreRepository.getByScoreIdx(score_idx);
        if (!score) {
            return res.status(404).json({ message: `score_idx(${score_idx}) not found` });
        }

        await scoreRepository.destroy(score_idx);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete score', error: error.message });
    }
}
