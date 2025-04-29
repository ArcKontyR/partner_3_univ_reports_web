
import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();

router.post('/new', StudentController.sendInformation);
router.get('/', StudentController.getInformation);

export { router as studentRouter };