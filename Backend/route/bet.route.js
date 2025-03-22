import express from 'express';
import { betPlace } from '../controller/bet.controller';

const router = express.Router();

router.post('//place-bet',betPlace);

export default router;