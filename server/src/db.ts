import { PrismaClient } from '@prisma/client';
import { StudentExt } from './models/Student';
import { UniversityExt } from './models/University';
import { SupervisorExt } from './models/Supervisors';
import { ReportExt } from './models/Report';
import { PracticeExt } from './models/Practice';

const prismaClientSingleton = () => {
    return new PrismaClient()
        .$extends(StudentExt)
        .$extends(UniversityExt)
        .$extends(SupervisorExt)
        .$extends(ReportExt)
        .$extends(PracticeExt);
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
globalThis.prismaGlobal = prisma;

export default prisma;