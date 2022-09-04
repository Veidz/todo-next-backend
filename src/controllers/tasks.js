/* eslint-disable max-len */
const {
  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear,
} = require('date-fns');
const TasksModel = require('../models/tasks');

const currentDate = new Date();

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
        macaddress: req.params.macaddress,
      }).sort({ when: 1 });
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

  async late(req, res) {
    try {
      const response = await TasksModel.find({
        $and: [
          { when: { $lt: currentDate } },
          { macaddress: req.params.macaddress },
        ],
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async today(req, res) {
    try {
      const response = await TasksModel.find({
        $and: [
          { when: { $gte: startOfDay(currentDate), $lt: endOfDay(currentDate) } },
          { macaddress: req.params.macaddress },
        ],
      }).sort({ when: 1 });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async week(req, res) {
    try {
      const response = await TasksModel.find({
        $and: [
          { when: { $gte: startOfWeek(currentDate), $lt: endOfWeek(currentDate) } },
          { macaddress: req.params.macaddress },
        ],
      }).sort({ when: 1 });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async month(req, res) {
    try {
      const response = await TasksModel.find({
        $and: [
          { when: { $gte: startOfMonth(currentDate), $lt: endOfMonth(currentDate) } },
          { macaddress: req.params.macaddress },
        ],
      }).sort({ when: 1 });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async year(req, res) {
    try {
      const response = await TasksModel.find({
        $and: [
          { when: { $gte: startOfYear(currentDate), $lt: endOfYear(currentDate) } },
          { macaddress: req.params.macaddress },
        ],
      }).sort({ when: 1 });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TasksController;
