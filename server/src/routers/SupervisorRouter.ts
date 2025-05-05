
import { Router } from 'express';
import SupervisorController from '../controllers/SupervisorController';

const router = Router();

router.post('/university', SupervisorController.sendUniversityInformation);
router.get('/university', SupervisorController.getUniversitiesInformation);
router.get('/university/:universityId', SupervisorController.getUniversityInformation);

router.get('/', SupervisorController.getSupervisorInformation);

export { router as supervisorRouter };