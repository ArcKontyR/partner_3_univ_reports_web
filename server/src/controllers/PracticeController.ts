
import { RequestStatuses } from "../enums";
import { Practice } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";

export default class PracticeController {
    public static async sendPracticeInformation(req: Request, res) {
        const practiceData: Practice = req.body
        console.log(JSON.stringify(practiceData))
        if (!practiceData) {
            return res.status(RequestStatuses.BadRequest).json();
        }
        await prisma.practice.createPractice(practiceData)

        return res.status(RequestStatuses.Accepted).json();
    }

    public static async getPracticeInformation(req: Request, res) {
        const unId: string = req.body.id.toString()
        if (!unId){
            return res.status(RequestStatuses.BadRequest).json();
        }
        const practices: Practice[] = await prisma.practice.getPractices(unId)
        if (!practices) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(practices);
    }
}