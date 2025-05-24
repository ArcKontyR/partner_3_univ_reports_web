import { Prisma } from "@prisma/client";
import prisma from "../db";
import { Student } from "../interfaces";


const extension = Prisma.defineExtension({
    name: 'StudentModel',
    model: {
        student: {
            async createStudent(studentInfo: Student) {
                const { User, course, group } = studentInfo;
                const { name, surname, patronymic, email } = User
                await prisma.student.create({
                    data: {
                        course,
                        group,
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

            async findStudentById(id: string) {
                return await prisma.student.findFirstOrThrow({
                    where: {
                        id
                    },
                    include: {
                        User: true
                    }
                });
            },

        }
    }
});

export { extension as StudentExt };