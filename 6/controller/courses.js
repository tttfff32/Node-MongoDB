
const Courses = require("../data/Courses.json");
const express = require('express');
const router = express.Router();

app.get('/Courses', (req, res) => {
    res.send(`${JSON.stringify(Courses)}`);
});

app.get('/Courses/:coursesId', (req, res) => {
    const id = Number(req.params.coursesId);
    const Cours = Courses.find(cours => cours.Id === id);
    res.send(`${JSON.stringify(Cours)}`);
});

module.exports = router;