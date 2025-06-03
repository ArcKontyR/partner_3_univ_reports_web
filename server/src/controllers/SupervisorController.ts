
import { RequestStatuses } from "../enums";
import { Supervisor, } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { University } from "@prisma/client";
import path from "node:path";

export default class SupervisorController {
    public static async getSupervisorInformation(req: Request, res) {
        const supervisors: Supervisor[] = await prisma.supervisor.getSupervisors()

        if (!supervisors) {
            return res.status(RequestStatuses.NotFound).json();
        }

        return res.status(RequestStatuses.OK).json(supervisors);
    }

    public static async uploadSample(req: Request, res) {
        if (!req.files || !req.files.file) {
            return res.status(RequestStatuses.BadRequest).json({ message: 'Файл не был загружен' });
        }
        console.log(req.params)
        const unId: string = req.params.id.toString()
        const keys: string[] = JSON.parse(req.body.keys);
        const university: University = await prisma.university.findUniversityById(unId) as University;
        if (!university){
            return res.status(RequestStatuses.NotFound).json("Университет не найден");
        }
        await prisma.university.updateKeys(unId, keys)
        const file: UploadedFile = req.files.file as UploadedFile;
        const sample_path = '/template' + university.sample_path
        const ext = file.name.split('.').pop()
        const uploadSamplePath = path.join(__dirname, `../../${sample_path}/template.${ext}`);

        file.mv(uploadSamplePath, (err) => {
            if (err) {
                return res.status(RequestStatuses.InternalServerError).json(err);
            }

            res.status(RequestStatuses.Accepted).json({
                message: 'Файл загружен',
            });
        });
    }
}