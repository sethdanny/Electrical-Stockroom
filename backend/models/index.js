import { DataTypes, Sequelize } from "sequelize";
import { dbConfig } from '../config/database.js';
import { userModel } from "./user.js";

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
        } 
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = userModel(sequelize, DataTypes);

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table sync successfully");
  })
  .catch((err) => {
    console.log("Error occured while syncing the table", err);
  });

export default db;