
import { Router } from 'express';
import SupervisorController from '../controllers/SupervisorController';
import { universityRouter } from './UniversityRouter';
import { reportRouter } from './ReportRouter';

const router = Router();

router.use('/university', universityRouter);
router.use('/report', reportRouter);

router.get('/', SupervisorController.getSupervisorInformation);
router.post('/login', SupervisorController.login);
router.post('/:id', SupervisorController.uploadSample)
router.get('/:id', SupervisorController.isTemplateLoaded)

export { router as supervisorRouter };