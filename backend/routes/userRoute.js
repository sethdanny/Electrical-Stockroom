import express from 'express';
import { getUsers, register } from '../controllers/userController.js';
import '../strategies/local-strategy.js';
import passport from 'passport';
import authProtect from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.status(200).json({ message: 'Login successful', user: req.user });
});
router.get('/getUsers',  authProtect, getUsers);

export default router;