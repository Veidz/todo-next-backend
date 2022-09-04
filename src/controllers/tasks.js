const TaskModel = require('../models/tasks');

class TaskController {
  async create(req, res) {
    try {
      const task = new TaskModel(req.body);
      const response = await task.save();
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const response = await TaskModel.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const response = await TaskModel.find({
        macaddres: req.body.macaddres,
      }).sort('when');
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TaskController;
