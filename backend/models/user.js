import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';


export const userModel = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: () => uuidv4(),
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Please enter a valid email'
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			unique: true,   
		}
	});

	User.beforeCreate(async (user) => {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	});

	return User;
};

export default userModel;
