
import { RequestStatuses } from "../enums";
import { Report, University } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";
import SupervisorService from "../services/SupervisorService";
import path from "node:path";

export default class ReportController {
    
    public static async createReport(req: Request, res) {
        const unId: string = req.body.id.toString()
        const university: University = await prisma.university.findUniversityById(unId) as University;
        if (!university){
            return res.status(RequestStatuses.NotFound).json()
        }

        await SupervisorService.createReport(university)
        return res.status(RequestStatuses.Created).json()
    }

    public static async getReportsInformation(req: Request, res) {
        const unId: string = req.query.id.toString()
        if (!unId) {
            return res.status(RequestStatuses.BadRequest).json();
        }
        const reports: Report[] = await prisma.report.getReports(unId)
        if (!reports) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(reports);
    }

    public static async getReportDocument(req: Request, res) {
        const universityFolder = req.params.univAbbr.toString();
        const reportId = req.params.reportId.toString();
        const filePath = path.join(__dirname, `../../template/${universityFolder}/${reportId}.pdf`);
        console.log(reportId)
        console.log(filePath)
        if (!filePath){
            return res.status(RequestStatuses.NotFound).send('File not found');
        }
        
        return res.sendFile(filePath);
    }

    public static async deleteReport(req: Request, res) {
        const reportId = req.params.reportId.toString();
        const report = await prisma.report.getReport(reportId);
        await SupervisorService.deleteReport(reportId, report.University.sample_path);
        await prisma.report.deleteReport(reportId);
        return res.status(RequestStatuses.OK).json();
    }
}