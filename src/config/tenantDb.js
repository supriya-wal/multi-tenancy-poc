const { Sequelize } = require("sequelize");
const tenants = {}; // Store tenant connections

const connectToTenantDB = async (tenantId) => {
    console.log("111111", tenants, tenants[tenantId] )
    if (tenants[tenantId]) {
        console.log("111111")
        return tenants[tenantId]; // Return existing DB connection
    }
    // check whether the DB exist or not in localhost - TODO
    // if db not exist -> create a new db with tenantId in sequelize - TODO



    const tenantDB = new Sequelize(`tenant_${tenantId}`, "postgres", "postgres", {
        host: "localhost",
        dialect: "postgres",
        logging: false,
    });
console.log("tenantDB", tenantDB)
    try {
        await tenantDB.authenticate();
        console.log(`✅ Connected to Tenant DB: tenant_${tenantId}`);
        tenants[tenantId] = tenantDB;
        return tenantDB;
    } catch (error) {
        console.error("❌ Tenant DB Connection Error:", error);
        throw error;
    }
};

module.exports = { connectToTenantDB };
