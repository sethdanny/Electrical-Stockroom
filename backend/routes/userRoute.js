import express from 'express';
import { getUsers, login, logout, register } from '../controllers/userController.js';
import '../strategies/local-strategy.js';
import passport from 'passport';
import authProtect from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.get('/logout', authProtect, logout);
router.get('/getUsers',  authProtect, getUsers);

export default router;