
import { RequestStatuses } from "../enums";
import { Report, University } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";
import SupervisorService from "../services/SupervisorService";
import path from "node:path";
import { readdirSync, statSync } from "node:fs";

export default class ReportController {
    public static async createReport(req: Request, res) {

        const unId: string = req.body.id.toString()
        const university: University = await prisma.university.findUniversityById(unId) as University;

        const relativeSamplePath = '/template' + university.sample_path
        const absoluteSampleDir = path.join(__dirname, `../../${relativeSamplePath}`);

        const files = readdirSync(absoluteSampleDir);
        const pattern = /^template\..+$/i;
        const sampleFileName = files.filter(file => {
            const filePath = path.join(absoluteSampleDir, file);
            return statSync(filePath).isFile() && pattern.test(file);
        })[0];
        const absoluteSamplePath = path.join(__dirname, `../../${relativeSamplePath}/${sampleFileName}`);
        const ext = sampleFileName.split('.').pop();
        console.log(absoluteSamplePath)

        await SupervisorService.createReport(relativeSamplePath, absoluteSamplePath, ext, university)
    }

    public static async getReportsInformation(req: Request, res) {
        const unId: string = req.body.id.toString()
        if (!unId) {
            return res.status(RequestStatuses.BadRequest).json();
        }
        const reports: Report[] = await prisma.report.getReports(unId)
        if (!reports) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(reports);
    }
}