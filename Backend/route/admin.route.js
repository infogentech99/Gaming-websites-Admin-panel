import express from 'express';
import { assign, deleteUser, login, updateUser} from '../controller/admin.controller.js';
const router = express.Router();

router.put('/assign-leader',assign);
router.put("/update-user/:id",updateUser);
router.post('/login',login);
router.delete("/delete-user/:id",deleteUser);

export default router;