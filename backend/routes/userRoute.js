import express from 'express';
import { getUser, getUsers, login, logout, register, verifyUser } from '../controllers/userController.js';
import '../strategies/local-strategy.js';
import passport from 'passport';
import authProtect from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify/:token', verifyUser);
router.post('/login', passport.authenticate('local'), login);
router.get('/logout', authProtect, logout);
router.get('/:id', /*authProtect,*/ getUser);
router.get('/getUsers',  authProtect, getUsers);

export default router;