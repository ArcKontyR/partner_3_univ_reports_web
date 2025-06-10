import { Prisma } from "@prisma/client";
import prisma from "../db";
import { University } from "../interfaces";
import { transliterate } from "transliteration";


const extension = Prisma.defineExtension({
    name: 'UniversityModel',
    model: {
        university: {
            async updateUniversity(university: University) {
                const { id, title, address, contact_number } = university;
                await prisma.university.update({
                    where:{
                        id
                    },
                    data: {
                        title,
                        address,
                        contact_number
                    }
                });
            },

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

            async updateKeys(univId: string, keys: string[] ) {
                await prisma.university.update({
                    where:{
                        id: univId
                    },
                    data:{
                        Keys:{
                            deleteMany: {},
                            createMany: {
                                data: keys.map(key => ({ value: key })),
                            }
                        }
                    }
                });
            },

            async findUniversityById(id: string) {
                return await prisma.university.findFirstOrThrow({
                    where: {
                        id
                    },
                    include: {
                        Direction: true,
                        Keys: true
                    }
                });
            },

            async getUniversities(){
                return await prisma.university.findMany({
                    include: {
                        Direction: true,
                        Keys: true
                    }
                });
            }

        }
    }
});

export { extension as UniversityExt };