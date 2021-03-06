require("dotenv").config();
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compress all HTTP responses
app.use(compression());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (Req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.use("/api", require("./API/index.js"));
let server = app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");
  } catch (error) {
    console.error(
      "Connection to Database could not be established. Reason=>\n",
      error
    );
    await mongoose.disconnect();
    server.close(() => {
      console.log("Due to Database connection error, Server Closed!");
    });
  }
});
