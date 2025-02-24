const express = require("express");
const tenantRoutes = require("./routes/tenant.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());

app.use("/api/tenants", tenantRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
