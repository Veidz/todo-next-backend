const router = require('express').Router();
const TaskController = require('../controllers/task');

const taskController = new TaskController();

router.post('/', taskController.create);
