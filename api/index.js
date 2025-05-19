require("module-alias/register");

const express = require("express");
const router = require("./routes");
const { config } = require("dotenv");
const { env } = require("./library/functions");
const mongoose = require("mongoose");

const cors = require("cors");
config();

const app = express();

app.use(cors());

// ✅ Multer-based routes must be registered *before* body parsers
app.use(router);

// ✅ Proper body parsers (after multer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 400).send({
    message: error.message || "Something went wrong!",
    validation: error.validation,
  });
});

app.listen(env("API_PORT"), async () => {
  console.log(`Started server at http://localhost:${env("API_PORT")}`);
  await mongoose.connect(env("MONGO_URL"));
  console.log("MongoDB connected");
});
