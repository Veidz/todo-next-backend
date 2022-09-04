const express = require('express');

const taskRoute = require('../routes/task');

const app = express();
app.use(express.json());
app.use('/task', taskRoute);

module.exports = app;
