const Worker = require("../data/Workers.json");

app.get('/Worker/:workerId', (req, res) => {
    const id = Number(req.params.workerId);
    const worker = Worker.find(work => work.Id === id);
    res.send(`${JSON.stringify(worker)}`);
})

app.get('/Workers/query', (req, res) => {
    const Job = req.query.Job;
    const Job_result = Worker.filter(work => work.Job === Job);
    res.send(`${JSON.stringify(Job_result)}`);
})


    