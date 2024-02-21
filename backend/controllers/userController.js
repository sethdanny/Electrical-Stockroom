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

export const getUsers = asyncHandler(
	async (req, res) => {
		res.status(200).json({message: 'all users'});
	}
);