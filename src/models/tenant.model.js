const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const mainDB = new Sequelize(
    process.env.MAIN_DB_NAME,
    process.env.MAIN_DB_USER,
    process.env.MAIN_DB_PASSWORD,
    {
        host: process.env.MAIN_DB_HOST,
        dialect: process.env.MAIN_DB_DIALECT,
        logging: false,
    }
);

const Tenant = mainDB.define("Tenant", {
    id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    dbName: { type: DataTypes.STRING, unique: true, allowNull: false },
});

mainDB.sync(); // Create Tenant Table

module.exports = { Tenant, mainDB };
