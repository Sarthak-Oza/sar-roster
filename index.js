require("dotenv").config();
const cors = require("cors");

const express = require("express");
const studentRouter = require("./routes/students");

const app = express();
app.use(cors()); // when try to access API from other domain

app.use(express.json());

app.use("/api/students", studentRouter);

app.listen(3000, () => console.log("Listening on port 3000"));