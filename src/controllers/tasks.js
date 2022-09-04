const TasksModel = require('../models/tasks');

class TasksController {
  async create(req, res) {
    try {
      const task = new TasksModel(req.body);
      const response = await task.save();
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const response = await TasksModel.findByIdAndUpdate(
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
      const response = await TasksModel.find({
        macaddres: req.body.macaddres,
      }).sort('when');
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findOne(req, res) {
    try {
      const response = await TasksModel.findById(req.params.id);
      if (!response) return res.status(404).json({ error: 'Task not found' });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await TasksModel.deleteOne({ _id: req.params.id });
      if (!response.n) return res.status(404).json({ error: 'Task not found' });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async done(req, res) {
    try {
      const response = await TasksModel.findByIdAndUpdate(
        { _id: req.params.id },
        { done: req.params.done },
        { new: true },
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TasksController;
