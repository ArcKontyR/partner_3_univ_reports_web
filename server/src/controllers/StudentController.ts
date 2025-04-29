
import { RequestStatuses } from "../enums";
import { StudentInfo } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";

export default class StudentController {
    public static async sendInformation(req: Request , res) {
        const studentData: StudentInfo = req.body
        if (!studentData){
            return res.status(RequestStatuses.BadRequest).json();
        }
        await prisma.student.createStudent(studentData)

        return res.status(RequestStatuses.Accepted).json();
    }

    public static async getInformation(req: Request, res) {
        const studentId: number = Number(req.params.studentId)
        if (!studentId){
            return res.status(RequestStatuses.BadRequest).json();
        }
        
        const student: StudentInfo = await prisma.student.findStudentById(studentId)

        if (!student){
            return res.status(RequestStatuses.NotFound).json();
        }
        return res.status(RequestStatuses.Accepted).json(student);
    }
}