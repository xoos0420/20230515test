import SQ from 'sequelize';
import { Sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const Student = Sequelize.define(
    'student',
    {
        student_idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        student_num: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        student_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        student_ph: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        student_email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        student_address: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false,
        },
    },
    { timestamps: false }
);

export async function getBystudentIdx(student_idx) {
    return Student.findByPk(student_idx);
}

export async function getAllBystudent_idx(student_idx) {
    return Student.findAll({
        where: {
            student_idx: student_idx
        }
    });
}

export async function getAll() {
    return Student.findAll();
}

export async function create(student_num, student_name, student_ph, student_email, student_address) {
    return Student.create({ student_num, student_name, student_ph, student_email, student_address })
        .then((data) => {
            return data;
        });
}

export async function update(student_idx, student_num, student_name, student_ph, student_email, student_address) {
    const student = await Student.findByPk(student_idx);
    if (!student) {
        throw new Error(`student_idx(${student_idx})에 해당하는 학생을 찾을 수 없습니다.`);
    }

    student.student_num = student_num;
    student.student_name = student_name;
    student.student_ph = student_ph;
    student.student_email = student_email;
    student.student_address = student_address;

    await student.save();

    return student;
}

export async function remove(student_idx) {
    const student = await Student.findByPk(student_idx);
    if (!student) {
        throw new Error(`student_idx(${student_idx})에 해당하는 학생을 찾을 수 없습니다.`);
    }

    await student.destroy();
}