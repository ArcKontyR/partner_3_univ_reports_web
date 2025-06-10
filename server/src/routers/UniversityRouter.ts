
import { Router } from 'express';
import UniversityController from '../controllers/UniversityController';

const router = Router();

router.post('/', UniversityController.sendUniversityInformation);
router.get('/', UniversityController.getUniversitiesInformation);
router.patch('/', UniversityController.updateUniversityInformation);
router.get('/:universityId', UniversityController.getUniversityInformation);

export { router as universityRouter };