const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({
  path: "./config/config.env"
});

//connecting to MongoDB
connectDB();

// bringing route instance
const transactions = require("./routes/transactions");

const app = express(); //initializing express app

// body parser middleware to read incoming post requests
app.use(express.json());

//morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//getting port
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
