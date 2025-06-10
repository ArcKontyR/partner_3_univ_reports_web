
import { RequestStatuses } from "../enums";
import { University } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";

export default class UniversityController {

    public static async updateUniversityInformation(req: Request, res) {
        const universityData: University = req.body
        if (!universityData) {
            return res.status(RequestStatuses.BadRequest).json();
        }
        await prisma.university.updateUniversity(universityData)

        return res.status(RequestStatuses.OK).json();
    }

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
        if (!universities) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(universities);
    }

    public static async getUniversityInformation(req: Request, res) {
        const universityId: string = req.query.universityId.toString()

        if (!universityId) {
            return res.status(RequestStatuses.BadRequest).json();
        }

        const universities: University[] = await prisma.university.getUniversities()

        if (!universities) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(universities.filter(university => university.id == universityId));
    }
}