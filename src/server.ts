import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import UserRouter from "./modules/user/user.route";

 


// Error Handler
 

dotenv.config();

const app: Application = express();

 
// Middlewares
// =======================

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Health Check
// =======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ERP Backend API Running Successfully 🚀",
  });
});

 
// API Routes
// =======================
app.use("/api/users", UserRouter);



// 404 Route
// =======================

app.use((req , res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =======================
// Global Error Handler
// =======================

// app.use(errorHandler);

// =======================
// Database Connection
// =======================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect MongoDB");
    console.error(error);
  }
};

startServer();