import { Prisma } from "@prisma/client";
import prisma from "../db";
import { University } from "../interfaces";
import { transliterate } from "transliteration";


const extension = Prisma.defineExtension({
    name: 'UniversityModel',
    model: {
        university: {
            async createUniversity(university: University) {
                const { title, address, contact_number } = university;
                const abbr = title.split(" ").map(word => word[0]).join("").toLowerCase();
                const sample_path = `/${transliterate(abbr).slice(0,7)}`
                await prisma.university.create({
                    data: {
                        abbreviation: abbr.toUpperCase(),
                        title,
                        address,
                        contact_number,
                        sample_path
                    }
                });
            },

            async findUniversityById(id: string) {
                return await prisma.university.findFirstOrThrow({
                    where: {
                        id
                    },
                    include: {
                        Direction: true
                    }
                });
            },

            async getUniversities(){
                return await prisma.university.findMany({
                    include: {
                        Direction: true
                    }
                });
            }

        }
    }
});

export { extension as UniversityExt };