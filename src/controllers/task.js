const TaskModel = require('../models/task');

class TaskController {
  async create(req, res) {
    try {
      const task = new TaskModel(req.body);
      const response = await task.save();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TaskController;
