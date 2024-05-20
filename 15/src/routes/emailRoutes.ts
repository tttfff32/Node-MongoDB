import { Router } from 'express';
import { ValidateEmailController } from '../controllers/ValidateEmailController';
import { configureMulter } from '../middlwares/multerConfig';

const router = Router();
const validateEmailController = new ValidateEmailController();

router.post('/validate-emails', configureMulter(), (req, res) => validateEmailController.validateEmails(req, res));

export default router;
