import express from 'express';

import {newUser, allUsers, loginUser, updateUser, logoutUser, deleteUserAccount} from '../controllers/user_auth.js'
import { authenticateToken } from '../middlewares/authmiddleware.js';



const router = express.Router();


//
router.get('/users',authenticateToken,allUsers)

router.post('/signup', newUser)

router.post('/login', loginUser)

router.patch('/update',authenticateToken, updateUser)

router.get('/logout',authenticateToken, logoutUser)

router.delete('/delete', authenticateToken, deleteUserAccount)


export default router;