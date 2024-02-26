import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';


const userModel = (sequelize) => {
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
			allowNull: false   
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		verificationToken: {
			type: DataTypes.STRING
		}
	});

	User.beforeCreate(async (user) => {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
		user.isVerified = false;
	});

	User.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	return User;
};

export default userModel;