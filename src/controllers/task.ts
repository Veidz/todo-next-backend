import { Request, Response } from 'express'
import {
  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear
} from 'date-fns'

import TaskModel from '../models/task'
import { Controller } from '../protocols'

const currentDate: Date = new Date()

class TaskController implements Controller {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const task = await TaskModel.create(req.body)
      return res.status(201).json(task)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      return res.status(200).json(updatedTask)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async findAll (req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await TaskModel.find({
        macaddress: req.params.macaddress
      }).sort({ when: 1 })
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    try {
      const task = await TaskModel.findById(req.params.id)
      if (!task) return res.status(404).json({ error: 'Task not found' })
      return res.status(200).json(task)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.deleteOne({ _id: req.params.id })
      if (!response.deletedCount) return res.status(404).json({ error: 'Task not found' })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async done (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.findByIdAndUpdate(
        { _id: req.params.id },
        { done: req.params.done },
        { new: true }
      )
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async late (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.find({
        $and: [
          { when: { $lt: currentDate } },
          { macaddress: req.params.macaddress }
        ]
      })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async today (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.find({
        $and: [
          { when: { $gte: startOfDay(currentDate), $lt: endOfDay(currentDate) } },
          { macaddress: req.params.macaddress }
        ]
      }).sort({ when: 1 })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async week (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.find({
        $and: [
          { when: { $gte: startOfWeek(currentDate), $lt: endOfWeek(currentDate) } },
          { macaddress: req.params.macaddress }
        ]
      }).sort({ when: 1 })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async month (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.find({
        $and: [
          { when: { $gte: startOfMonth(currentDate), $lt: endOfMonth(currentDate) } },
          { macaddress: req.params.macaddress }
        ]
      }).sort({ when: 1 })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async year (req: Request, res: Response): Promise<Response> {
    try {
      const response = await TaskModel.find({
        $and: [
          { when: { $gte: startOfYear(currentDate), $lt: endOfYear(currentDate) } },
          { macaddress: req.params.macaddress }
        ]
      }).sort({ when: 1 })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default new TaskController()
