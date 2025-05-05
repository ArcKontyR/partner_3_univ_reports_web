
import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();

router.post('/', StudentController.sendInformation);
router.get('/:studentId', StudentController.getInformation);

export { router as studentRouter };