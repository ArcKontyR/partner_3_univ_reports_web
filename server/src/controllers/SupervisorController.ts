
import { RequestStatuses } from "../enums";
import { Supervisor } from "../interfaces";
import prisma from "../db";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { University } from "@prisma/client";
import path from "node:path";
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { existsSync } from "node:fs";

export default class SupervisorController {

    public static async isTemplateLoaded(req: Request, res) {
        const unId: string = req.params.id.toString()
        const university: University = await prisma.university.findUniversityById(unId) as University;
        const samplePath = path.join(__dirname, `../../template/${university.sample_path}/template.docx`);
        return res.status(RequestStatuses.OK).json(existsSync(samplePath))
    }

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
        if (!university) {
            return res.status(RequestStatuses.NotFound).json("Университет не найден");
        }
        await prisma.university.updateKeys(unId, keys)
        const file: UploadedFile = req.files.file as UploadedFile;
        const sample_path = '/template' + university.sample_path
        const uploadSamplePath = path.join(__dirname, `../../${sample_path}/template.docx`);

        file.mv(uploadSamplePath, (err) => {
            if (err) {
                return res.status(RequestStatuses.InternalServerError).json(err);
            }

            res.status(RequestStatuses.Accepted).json({
                message: 'Файл загружен',
            });
        });
    }

    public static async login (req: Request, res) {
        const { login, password } = req.body;

        const sv = await prisma.supervisor.findUnique({ where: { login } });
        if (!sv || !(await bcrypt.compare(password, sv.password))) {
            return res.status(RequestStatuses.Unauthorized).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: sv.id }, "your-secret-key", { expiresIn: '1h' });

        res.json({ token });
    };
}