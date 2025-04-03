import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import { setupSwagger } from "./src/docs/swagger.js";
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

// Setup Swagger
setupSwagger(app);

// Sync Database
sequelize
  .sync()
  .then(() => console.log("Database synced!"))
  .catch((error) => console.error("Error syncing database:", error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
