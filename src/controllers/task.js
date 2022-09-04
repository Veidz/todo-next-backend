const TaskModel = require('../models/task');

class TaskController {
  constructor(taskModel = new TaskModel()) {
    this.taskModel = taskModel;
  }

  async create(req, res) {
    try {
      const task = this.taskModel(req.body);
      const response = await task.save();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = TaskController;
