const express = require('express');
const app = express();
const port = 8000;

const courses = require('./controller/courses');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
