import { Prisma } from "@prisma/client";
import prisma from "../db";
import { Supervisor } from "../interfaces";


const extension = Prisma.defineExtension({
    name: 'SupervisorModel',
    model: {
        supervisor: {
            async createSupervisor(supervisorInfo: Supervisor) {
                const { User, job_title } = supervisorInfo;
                const { name, surname, patronymic, email } = User
                await prisma.supervisor.create({
                    data: {
                        job_title,
                        login: "",
                        password: "",
                        User: {
                            create: {
                                name,
                                patronymic,
                                surname,
                                email
                            }
                        }
                    }
                });
            },

            async findSupervisorById(id: string) {
                return await prisma.supervisor.findFirstOrThrow({
                    where: {
                        id
                    },
                    include: {
                        User: true
                    }
                });
            },

            async getSupervisors() {
                return await prisma.supervisor.findMany({
                    include: {
                        User: true
                    }
                });
            },

        }
    }
});

export { extension as SupervisorExt };