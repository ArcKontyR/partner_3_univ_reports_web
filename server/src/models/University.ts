import { Prisma } from "@prisma/client";
import prisma from "../db";
import { University } from "../interfaces";
import { transliterate } from "transliteration";


const extension = Prisma.defineExtension({
    name: 'UniversityModel',
    model: {
        university: {
            async createUniversity(university: University) {
                const { abbreviation, title, address, contact_number } = university;
                const sample_path = transliterate(abbreviation).toLowerCase();
                await prisma.university.create({
                    data: {
                        abbreviation,
                        title,
                        address,
                        contact_number,
                        sample_path
                    }
                });
            },

            async findUniversityById(id: number) {
                return await prisma.university.findFirstOrThrow({
                    where: {
                        id
                    },
                    include: {
                        Direction: true,
                        Report: true
                    }
                });
            },

            async getUniversities(){
                return await prisma.university.findMany({
                    include: {
                        Direction: true,
                        Report: true
                    }
                });
            }

        }
    }
});

export { extension as UniversityExt };