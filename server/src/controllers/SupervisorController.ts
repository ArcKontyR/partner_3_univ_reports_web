
import { RequestStatuses } from "../enums";
import { Student, Supervisor, University } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";

export default class SupervisorController {
    
    public static async sendUniversityInformation(req: Request, res) {
        const universityData: University = req.body
        if (!universityData) {
            return res.status(RequestStatuses.BadRequest).json();
        }
        await prisma.university.createUniversity(universityData)

        return res.status(RequestStatuses.Accepted).json();
    }

    public static async getUniversitiesInformation(req: Request, res) {
        const universities: University[] = await prisma.university.getUniversities()
        console.log(await prisma.university.getUniversities())
        if (!universities) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(universities);
    }

    public static async getUniversityInformation(req: Request, res) {
        const universityId: number = Number(req.query.universityId)

        if (!universityId) {
            return res.status(RequestStatuses.BadRequest).json();
        }

        const universities: University[] = await prisma.university.getUniversities()

        if (!universities) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(universities.filter(university => university.id == universityId));
    }

    public static async getSupervisorInformation(req: Request, res) {
        const supervisors: Supervisor[] = await prisma.supervisor.getSupervisors()

        if (!supervisors) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(supervisors);
    }
}