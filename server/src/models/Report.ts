import { Prisma, University } from "@prisma/client";
import prisma from "../db";
import { Report } from "../interfaces";

const extension = Prisma.defineExtension({
    name: 'ReportModel',
    model: {
        report: {
            async createReport(University: University) {
                const Practices = await prisma.practice.getPractices(University.id)
                
                const r = await prisma.report.create({
                    data:{
                        University:{
                            connect:{
                                id: University.id
                            }
                        },
                        Practices:{
                            connect: Practices.map(pr => ({id: pr.id}))
                        }
                    }
                });
                return r.id
            },

            async getReports(universityId: string){
                return await prisma.report.findMany({
                    where:{
                        university_id: universityId
                    },
                    include: {
                        Practices: true,
                        University: true
                    }
                });
            },
            async getReport(reportId: string){
                return await prisma.report.findFirst({
                    where:{
                        id: reportId
                    },
                    include: {
                        Practices: true,
                        University: true
                    }
                });
            },

            async deleteReport(reportId: string){
                return await prisma.report.delete({
                    where:{
                        id: reportId
                    }
                })
            }

        }
    }
});

export { extension as ReportExt };