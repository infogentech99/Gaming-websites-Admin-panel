import express from 'express';
import { assign, deleteUser, updateUser} from '../controller/admin.controller.js';
// import { authenticateToken, protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/assign-leader',assign);
router.put("/update-user/:id",updateUser);
router.delete("/delete-user/:id",deleteUser);


// router.get('/getPost', getPost);
// router.get('/getOwnPost',authenticateToken, getOwnPost);
// router.get('/delete/:id',authenticateToken, deletePost);
// router.post('/edit/:id',protectRoute,updatePost);


export default router;