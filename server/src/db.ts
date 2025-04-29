import { PrismaClient } from './generated/prisma/client';
import { StudentExt } from './models/Student';

const prismaClientSingleton = () => {
    return new PrismaClient()
        .$extends(StudentExt);
};

declare global {
    // eslint-disable-next-line no-var
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
globalThis.prismaGlobal = prisma;

export default prisma;