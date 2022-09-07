import { Request, Response, NextFunction } from 'express'
import { isPast } from 'date-fns'

import TaskModel from '../models/task'

const TaskValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const requiredFields = ['macaddress', 'type', 'title', 'description', 'when']

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` })
    }
  }

  let taskDateExists: boolean
  if (req.params.id) {
    taskDateExists = await TaskModel.findOne({
      $and: [
        { _id: { $ne: req.params.id } },
        { when: new Date(req.body.when) },
        { macaddress: req.body.macaddress }
      ]
    })
  } else {
    if (isPast(new Date(req.body.when))) {
      return res.status(400).json({ error: 'Date cannot be in the past' })
    }
    taskDateExists = await TaskModel.findOne({
      $and: [
        { when: new Date(req.body.when) },
        { macaddress: req.body.macaddress }
      ]
    })
  }

  if (taskDateExists) {
    return res.status(400).json({ error: 'There is already a task for that day and time' })
  }

  return next()
}

export { TaskValidation }
