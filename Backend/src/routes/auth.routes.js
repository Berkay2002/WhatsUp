import express from 'express';
import { loginUser } from '../controllers/auth.controller.js'; // Adjust path as necessary

const router = express.Router();

router.post('/login', loginUser);

export default router;
