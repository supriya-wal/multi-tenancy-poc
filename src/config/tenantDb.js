const { Sequelize } = require("sequelize");
const tenants = {}; // Store tenant connections
const { Client } = require("pg");

const connectToTenantDB = async (tenantId, tenantName) => {
    console.log(tenants, tenants[tenantId], tenantName)
    if (tenants[tenantId]) {
        return tenants[tenantId]; // Return existing DB connection
    }
    // check whether the DB exist or not in localhost - TODO
    // if db not exist -> create a new db with tenantId in sequelize - TODO
    const dbName = `tenant_${tenantName}_${tenantId}`
    await checkAndCreateDatabase(dbName);

    const tenantDB = new Sequelize(dbName, process.env.MAIN_DB_USER, process.env.MAIN_DB_PASSWORD, {
        host: "localhost",
        dialect: "postgres",
        logging: true,
    });
    try {
        await tenantDB.authenticate();
        console.log(`✅ Connected to Tenant DB: ${dbName}`);
        tenants[tenantId] = tenantDB;
        return tenantDB;
    } catch (error) {
        console.error("❌ Tenant DB Connection Error:", error);
        throw error;
    }
};
const checkAndCreateDatabase = async(dbName) => {
    const client = new Client({
        user: process.env.MAIN_DB_USER,
        password: process.env.MAIN_DB_PASSWORD,
        host: "localhost",
        port: 5432,
        database: "postgres",
    });
    try {
        await client.connect();
        console.log(`connected to tenant data base`)
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
        if (res.rowCount === 0) {
            console.log(`⚠️ Database ${dbName} does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`✅ Database ${dbName} created successfully.`);
        } else {
            console.log(`✅ Database ${dbName} already exists.`);
        }
    } catch(error) {
        console.error("Error checking/creating database:", error);
    }
}
module.exports = { connectToTenantDB };
