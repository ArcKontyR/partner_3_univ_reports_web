import { copyFile } from "node:fs";
import { Report, University } from "../interfaces";
import prisma from "../db";
import path from "node:path";


export default class SupervisorService{
    public static async createReport(relativePath: string, absolutePath: string, fileExtension: string, university: University){
        const addedReportId = await prisma.report.createReport(university);
        console.log(relativePath);
        console.log(absolutePath);
        const absoluteReportPath = path.join(__dirname, `../../${relativePath}/${addedReportId}.${fileExtension}`)
        console.log(absoluteReportPath)
        return copyFile(absolutePath, absoluteReportPath, () => {console.log(`Report added to ${absoluteReportPath}`)})
    }
}