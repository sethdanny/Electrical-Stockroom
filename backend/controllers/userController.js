import asyncHandler from 'express-async-handler';
import db from '../models/index.js';
import transporter from '../helpers/emailVerification.js';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';


const User = db.User;
const PORT = process.env.port;

export const register  = asyncHandler(
	async (req, res) => {
		const {firstName, lastName, email, password } =req.body;
		const verificationToken = uuidv4();
		if (!firstName || !lastName || !email || !password) {
			res.status(400);
			throw new Error('Please fill in all required fields');
		}
		if (password.length < 6) {
			res.status(400);
			throw new Error('password must be up to 6 characters');
		}

		const userExists = await User.findOne({where: {email}});
		if (userExists) {
			res.status(400);
			throw new Error('User with email already exists');
		}

		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password,
			verificationToken
		});

		const verificationLink = `http://localhost:${PORT}/api/users/verify/${verificationToken}`;
		await transporter.sendMail({
			from: process.env.MY_EMAIL,
      		to: email,
      		subject: 'Verify Your Email',
      		text: `Click the following link to verify your email: ${verificationLink}`
		});
		if (newUser) {
			res.status(201).json({
				success: true,
				newUser,
				message: 'Registration successful. Check your email for verification.'
			});
		} else {
			res.status(400);
			throw new Error('Invalid User data');
		}
	});

export const verifyUser = asyncHandler(
	async (req, res) => {
		const {token} = req.params;

		const user = await User.findOne({verificationToken : token});

		if (!user) {
			res.status(404);
			throw new Error('Invalid verification token');
		}
		if (user) {
			user.isVerified = true;
			user.verificationToken = undefined;
			await user.save();
			await new Promise(resolve => setTimeout(resolve, 1000)); 
			const verifiedUser = await User.findOne({ where: { id: user.id } });
			if (verifiedUser.isVerified) {
				res.json({ 
					verifiedUser,
					message: 'Email verification successful. You can now log in.' });
			}
	 } else {
			res.status(500);
			throw new Error('Internal Server Error');
		}	
	}
);

export const login = asyncHandler(
	((req, res) => {
		res.status(200).json({ message: 'Login successful', user: req.user });
	})
);

export const logout = asyncHandler(
	((req, res) => {
		req.logout(() => res.status(200).json({ message: 'Logout successful' }));
	})
);

export const getUser = asyncHandler(
	async (req, res) => {
		const userId = req.params.id;
		const user = await User.findByPk(userId);
		if (!user) {
			res.status(400);
			throw new Error('User not found');
		}

		if (user) {
			const userData = {
				id: user.userId,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			};
			res.status(200).json(userData);
		} else {
			throw new Error('Internal Server Error');
		}
	}
);

export const getUsers = asyncHandler(
	async (req, res) => {
		res.status(200).json({message: 'all users'});
	}
);