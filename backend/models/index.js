import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/database.js';
import userModel from './user.js';
import  productModel from './product.js';

const sequelize = new Sequelize(
	dbConfig.DB,
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle
		}
	}
);

const User = userModel(sequelize);
const Product = productModel(sequelize, User);

export async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log('connected to the mysql database');
	} catch (error) {
		console.error(error);
	} 
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Product = Product;

try {
	await db.sequelize.sync({ alter: true });
	console.log('Tables synchronized successfully');
} catch (error) {
	console.log('Error occurred while syncing the tables', error);
}

export default db;