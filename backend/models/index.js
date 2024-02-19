import { Sequelize } from "sequelize";
import { dbConfig } from '../config/database.js';
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
)

export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('connected to the mysql database;')
    } catch (error) {
        console.error(error);
        } finally {
            await sequelize.close();
        }
}
