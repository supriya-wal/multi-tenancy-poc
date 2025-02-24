const express = require("express");
const { Tenant, mainDB } = require("../models/tenant.model");
const { connectToTenantDB } = require("../config/tenantDb");

const router = express.Router();

// 🏗️ Create New Tenant
router.post("/", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Tenant name is required" });

    try {
        const dbName = `tenant_${name}_${Date.now()}`;
        const tenant = await Tenant.create({ name, dbName });

        await connectToTenantDB(tenant.id); // Create new tenant DB

        res.status(201).json({ message: "Tenant created", tenant });
    } catch (error) {
        res.status(500).json({ error: "Error creating tenant" });
    }
});

module.exports = router;
