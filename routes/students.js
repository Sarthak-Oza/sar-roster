const express = require("express");

const Router = express.Router();
// const { studentsDB } = require("../db");
const { rosterDB } = require("../db");

const {
   postMiddleware,
   putMiddleware,
   deleteMiddleware,
} = require("../middleware");

// get a student
Router.get("/id/:userId", (req, res) => {
   const { userId } = req.params;

   const student = rosterDB.getOneStudent(userId);

   student
      ? res.send(student)
      : res.status(404).json({ error: "Student not found" });
});

// get all students
Router.get("/", (req, res) => {
   return res.send(rosterDB);
});

// create a student
//app.post("/api/students", express.json(), (req, res)
Router.post("/", postMiddleware, async (req, res) => {
   const { name, location } = req.body;

   res.send(await rosterDB.addStudent({ name, location }));
});

// update a student
Router.put("/:id", putMiddleware, async (req, res) => {
   const { id } = req.params;
   const { name, location } = req.body;
   const updatedStudent = await rosterDB.updateStudent({ id, name, location });

   updatedStudent
      ? res.send(updatedStudent)
      : res.status(404).json({ error: "Student not found" });
});

// delete a student
// /api/students/:name/location/:location
Router.delete("/:id", deleteMiddleware, (req, res) => {
   const id = req.params.id;

   rosterDB.deleteStudent(id)
      ? res.status(204).json({ message: "Student deleted" })
      : res.status(404).json({ error: "Student not found" });

   //    return res.redirect("/exampleURL");
});

module.exports = Router;
