import { Router } from 'express';
import { handleCopilotChat } from '../controllers/copilot.controller.js';

const router = Router();

router.post('/copilot', handleCopilotChat);

export default router;
