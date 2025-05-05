
import { RequestStatuses } from "../enums";
import { Student } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";

export default class StudentController {
    public static async sendInformation(req: Request, res) {
        const studentData: Student = req.body
        if (!studentData) {
            return res.status(RequestStatuses.BadRequest).json();
        }
        await prisma.student.createStudent(studentData)

        return res.status(RequestStatuses.Accepted).json();
    }

    public static async getInformation(req: Request, res) {
        const studentId: number = Number(req.query.studentId)
        if (!studentId) {
            return res.status(RequestStatuses.BadRequest).json();
        }

        const student: Student = await prisma.student.findStudentById(studentId)

        if (!student) {
            return res.status(RequestStatuses.NotFound).json();
        }
        return res.status(RequestStatuses.OK).json(student);
    }
}