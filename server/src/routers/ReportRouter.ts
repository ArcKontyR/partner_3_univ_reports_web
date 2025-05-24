
import { Router } from 'express';
import ReportController from '../controllers/ReportController';

const router = Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getReportsInformation);

export { router as reportRouter };