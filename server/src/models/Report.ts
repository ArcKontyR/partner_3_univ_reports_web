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
            }

        }
    }
});

export { extension as ReportExt };