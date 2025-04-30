import { PrismaClient } from '@prisma/client';
import { StudentExt } from './models/Student';

const prismaClientSingleton = () => {
    return new PrismaClient()
        .$extends(StudentExt);
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
globalThis.prismaGlobal = prisma;

export default prisma;