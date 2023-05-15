import SQ from 'sequelize';
import { Sequelize } from '../db/database.js';
import { Student } from './student.js';

const DataTypes = SQ.DataTypes;

export const Score = Sequelize.define(
    'score',
    {
        score_idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        student_num: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        score_java: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        score_python: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        score_c: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        total: {
            type: DataTypes.INTEGER,
        },
        avg: {
            type: DataTypes.FLOAT,
        },
        createdAt: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Score.belongsTo(Student); // 학생과의 관계를 설정합니다.

const INCLUDE_STUDENT = {
    attributes: [
        'score_java',
        'score_python',
        'score_c',
        'total',
        'avg',
        'createdAt',
        [Sequelize.col('student.student_num'), 'student_num'],
        [Sequelize.col('student.student_name'), 'student_name'],
        [Sequelize.col('student.student_ph'), 'student_ph'],
        [Sequelize.col('student.student_email'), 'student_email'],
        [Sequelize.col('student.student_address'), 'student_address'],
    ],
    include: {
        model: Student,
        attributes: [],
    },
};

const ORDER_DESC = {
    order: [['createdAt', 'DESC']],
};

export async function getAllScores() {
    return Score.findAll({
        include: Student
    });
}

export async function getScoresByStudentIdx(student_idx) {
    try {
        const scores = await Score.findAll({
            where: { student_idx },
            include: [Student],
        });
        return scores;
    } catch (error) {
        throw new Error(`학생 번호(${student_idx})에 대한 점수 조회를 실패했습니다.`);
    }
}

export async function create(student_num, score_java, score_python, score_c, total, avg) {
    const score = await Score.create({
        student_num,
        score_java,
        score_python,
        score_c,
        total,
        avg,
    });
    return score;
}

export async function update(score_idx, student_num, score_java, score_python, score_c, total, avg) {
    const score = await Score.findByPk(score_idx);
    if (!score) {
        throw new Error(`score_idx(${score_idx})에 해당하는 점수를 찾을 수 없습니다.`);
    }

    score.student_num = student_num;
    score.score_java = score_java;
    score.score_python = score_python;
    score.score_c = score_c;
    score.total = total;
    score.avg = avg;

    await score.save();

    return score;
}

export async function destroy(score_idx) {
    const score = await Score.findByPk(score_idx);
    if (!score) {
        throw new Error(`score_idx(${score_idx})에 해당하는 점수를 찾을 수 없습니다.`);
    }

    await score.destroy();
}

export async function getByScoreIdx(score_idx) {
        const score = await Score.findByPk(score_idx, {
            include: [Student],
        });
        return score;
};