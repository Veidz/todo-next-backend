const { isPast } = require('date-fns');

const TaskModel = require('../models/tasks');

const TaskValidation = async (req, res, next) => {
  const requiredFields = ['macaddress', 'type', 'title', 'description', 'when'];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  if (isPast(new Date(req.body.when))) {
    return res.status(400).json({ error: 'Date cannot be in the past' });
  }

  let taskDateExists;
  if (req.params.id) {
    taskDateExists = await TaskModel.findOne({
      $and: [
        { _id: { $ne: req.params.id } },
        { when: new Date(req.body.when) },
        { macaddress: req.body.macaddress },
      ],
    });
  } else {
    taskDateExists = await TaskModel.findOne({
      $and: [
        { when: new Date(req.body.when) },
        { macaddress: req.body.macaddress },
      ],
    });
  }

  if (taskDateExists) {
    return res.status(400).json({ error: 'There is already a task for that day and time' });
  }

  return next();
};

module.exports = TaskValidation;
