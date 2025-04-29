import prisma from "../db";
import { Prisma } from "../generated/prisma/client";
import { StudentInfo } from "../interfaces";


const extention = Prisma.defineExtension({
    name: 'StudentModel',
    model: {
        student: {
            async createStudent(studentInfo: StudentInfo) {
                const { User, course, group } = studentInfo;
                const {name, surname, patronymic} = User
                await prisma.student.create({
                    data: {
                        course,
                        group,
                        User: {
                            create: {
                                name,
                                patronymic,
                                surname,
                            }
                        }
                    }
                });
            },
            
            async findStudentById(id: number) {
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

export { extention as StudentExt };