const { connectToTenantDB } = require("../config/tenantDb");
const { Tenant } = require("../models/tenant.model");
const tenantMiddleware = async (req, res, next) => {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId) return res.status(400).json({ error: "Missing Tenant ID" });
    const tenantDetails = await Tenant.findOne({ where: {id: tenantId}})
    try {
        if (tenantDetails) {
            req.tenantDB = await connectToTenantDB(tenantDetails.id, tenantDetails.name);
            next();
        } else {
            return res.status(400).json({ error: "Tenant is not registered" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error connecting to tenant database" });
    }
};

module.exports = tenantMiddleware;
