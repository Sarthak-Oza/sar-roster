require("dotenv").config();
const cors = require("cors");

const express = require("express");
const studentRouter = require("./routes/students");

const app = express();
app.use(cors()); // when try to access API from other domain

app.use(express.json());

app.use("/api/students", studentRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
