import { Prisma } from "@prisma/client";
import prisma from "../db";
import { Practice, Report } from "../interfaces";

const extension = Prisma.defineExtension({
    name: 'PracticeModel',
    model: {
        practice: {
            async createPractice(practice: Practice) {
                const { type, Direction, Deadlines, Student, Supervisor, University } = practice;
                await prisma.practice.create({
                    data: {
                        type,
                        University: {
                            connect: {
                                id: University.id
                            }
                        },
                        Direction: {
                            connect: {
                                id: Direction.id
                            }
                        },
                        Deadlines: {
                            create: {
                                start: new Date(Deadlines.start),
                                end: new Date(Deadlines.end)
                            }
                        },
                        Student: {
                            create: {
                                course: Student.course,
                                group: Student.group,
                                User: {
                                    create: {
                                        email: Student.User.email,
                                        name: Student.User.name,
                                        surname: Student.User.surname,
                                        patronymic: Student.User.patronymic
                                    }
                                }
                            }
                        },
                        Supervisor: {
                            connect: {
                                id: Supervisor.id
                            }
                        }
                    }
                });
            },

            async getPractices(universityId: string) {
                return await prisma.practice.findMany({
                    where: {
                        university_id: universityId
                    },
                    include: {
                        University: true,
                        Deadlines: true,
                        Direction: true,
                        Report: true,
                        Student: {
                            include: {
                                User: true
                            }
                        },
                        Supervisor: {
                            include: {
                                User: true
                            }
                        }
                    }
                });
            }

        }
    }
});

export { extension as PracticeExt };