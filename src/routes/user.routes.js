const express = require("express");
const tenantMiddleware = require("../middleware/tenant.middleware");
const defineUserModel = require("../models/user.model");

const router = express.Router();

// ✅ Add User to Tenant DB
router.post("/", tenantMiddleware, async (req, res) => {
    const User = defineUserModel(req.tenantDB);
    await req.tenantDB.sync(); // Ensure table exists

    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and Email required" });

    try {
        const newUser = await User.create({ name, email });
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

module.exports = router;
