require("module-alias/register");

const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");

const router = require("./routes");
const { env } = require("./library/functions");

config(); 

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( router);

// ✅ Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 400).json({
    message: error.message || "Something went wrong!",
    validation: error.validation,
  });
});

// ✅ Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(env("MONGO_URL"));
    console.log("✅ MongoDB connected");

    const PORT = env("API_PORT") || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
