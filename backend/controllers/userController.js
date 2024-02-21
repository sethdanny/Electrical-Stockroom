import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

const UserModel = db.users;

export const register  = asyncHandler(
	async (req, res) => {
		const {firstName, lastName, email, password } =req.body;
		if (!firstName || !lastName || !email || !password) {
			res.status(400);
			throw new Error('Please fill in all required fields');
		}
		if (password.length < 6) {
			res.status(400);
			throw new Error('password must be up to 6 characters');
		}

		const userExists = await UserModel.findOne({where: {email}});
		if (userExists) {
			res.status(400);
			throw new Error('User with email already exists');
		}

		const newUser = await UserModel.create({
			firstName,
			lastName,
			email,
			password
		});
		if (newUser) {
			res.status(201).json({
				success: true,
				newUser,
				message: 'User registered successfully.'
			});
		} else {
			res.status(400);
			throw new Error('Invalid User data');
		}
	});


export const login = asyncHandler(
	((req, res) => {
		res.status(200).json({ message: 'Login successful', user: req.user });
	})
)

export const logout = asyncHandler(
	((req, res) => {
		req.logout(() => res.status(200).json({ message: 'Logout successful' }));
	})
)

export const getUser = asyncHandler(
	async (req, res) => {
		const userId = req.params.id;
		const user = await UserModel.findByPk(userId);
		if (!user) {
			res.status(400);
			throw new Error('User not found');
		}

		if (user) {
			const userData = {
				id: user.userId,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				
			}
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