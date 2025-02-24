const { connectToTenantDB } = require("../config/tenantDb");

const tenantMiddleware = async (req, res, next) => {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId) return res.status(400).json({ error: "Missing Tenant ID" });

    try {
        req.tenantDB = await connectToTenantDB(tenantId);
        next();
    } catch (error) {
        res.status(500).json({ error: "Error connecting to tenant database" });
    }
};

module.exports = tenantMiddleware;
