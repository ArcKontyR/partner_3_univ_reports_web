
import { Router } from 'express';
import PracticeController from '../controllers/PracticeController';

const router = Router();

router.post('/', PracticeController.sendPracticeInformation);
router.get('/', PracticeController.getPracticeInformation);

export { router as practiceRouter };