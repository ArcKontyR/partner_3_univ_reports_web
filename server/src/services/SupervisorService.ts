import { copyFile, existsSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { Report, University } from "../interfaces";
import prisma from "../db";
import path from "node:path";
import puppeteer from "puppeteer";
import ReportService from "./ReportService";

export default class SupervisorService {
    public static async createReport(university: University) {
        const addedReportId = await prisma.report.createReport(university);
        const selectObject = ReportService.buildPrismaSelect(university.Keys);
        
        if (Object.keys(selectObject).length === 0){
            return false
        }

        const reportData = await prisma.report.findFirst({
            where: {
                id: addedReportId
            },
            select: selectObject,
        }) as unknown as Report;

        const relativeSamplePath = '/template' + university.sample_path
        const absoluteSampleDir = path.join(__dirname, `../../${relativeSamplePath}`);

        const files = readdirSync(absoluteSampleDir);
        const pattern = /^template\..+$/i;
        const sampleFileName = files.filter(file => {
            const filePath = path.join(absoluteSampleDir, file);
            return statSync(filePath).isFile() && pattern.test(file);
        })[0];
        const absoluteSamplePath = path.join(__dirname, `../../${relativeSamplePath}/${sampleFileName}`);
        let ext = sampleFileName.split('.').pop();

        console.log(absoluteSamplePath);
        const absoluteReportPath = path.join(__dirname, `../../${relativeSamplePath}/${addedReportId}.pdf`)
        if (ext === "docx" || ext === "doc") {
            const html = await ReportService.generateHtml(reportData, university.Keys, absoluteSamplePath)
            await SupervisorService.convertHtmlToPdf(html, absoluteReportPath)
        } else {
            copyFile(absoluteSamplePath, absoluteReportPath, () => { console.log(`Report added to ${absoluteReportPath}`) })
        }

        return true
    }

    public static async deleteReport(reportId: string, univAbbr: string) {
        const relativeSamplePath = '/template' + univAbbr
        const absoluteSampleDir = path.join(__dirname, `../../${relativeSamplePath}`);

        const files = readdirSync(absoluteSampleDir);
        const pattern = /^template\..+$/i;
        const sampleFileName = files.filter(file => {
            const filePath = path.join(absoluteSampleDir, file);
            return statSync(filePath).isFile() && pattern.test(file);
        })[0];
        const absoluteSamplePath = path.join(__dirname, `../../${relativeSamplePath}/${sampleFileName}`);
        console.log(absoluteSamplePath)
        console.log(relativeSamplePath);

        const absoluteReportPath = path.join(__dirname, `../../${relativeSamplePath}/${reportId}.pdf`)
        console.log(absoluteReportPath)
        if (existsSync(absoluteReportPath)) {
            unlinkSync(absoluteReportPath)
        }
    }

    private static async convertHtmlToPdf(html, reportPath) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(html, {
                waitUntil: "networkidle0"
            });

            await page.pdf({
                path: reportPath,
                format: "A4",
                margin: {
                    top: "20mm",
                    right: "20mm",
                    bottom: "20mm",
                    left: "20mm"
                }
            });

            await browser.close();

        } catch (error) {
            console.error('Conversion error:', error);
        }
    }
}