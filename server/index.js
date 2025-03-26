const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const statsRoutes = require("./routes/statsRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/departments", departmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
