import { Router } from 'express';
import multer from 'multer';
import { uploadPolicy } from '../controllers/policy.controller.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post(
  '/upload',
  upload.single('file'),
  uploadPolicy
);

export default router;