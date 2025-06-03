
import { Router } from 'express';
import ReportController from '../controllers/ReportController';

const router = Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getReportsInformation);
router.get('/files/:univAbbr/:reportId', ReportController.getReportDocument)
router.delete('/:reportId', ReportController.deleteReport)

export { router as reportRouter };