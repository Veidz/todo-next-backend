import { Router } from 'express'

import TasksController from '../controllers/tasks'
import { TasksValidation } from '../middlewars/tasks-validation'

const tasksRouter = Router()

tasksRouter.post('/', TasksValidation, TasksController.create)

tasksRouter.get('/:id', TasksController.findOne)
tasksRouter.put('/:id', TasksValidation, TasksController.update)
tasksRouter.put('/:id/:done', TasksController.done)
tasksRouter.delete('/:id', TasksController.delete)

tasksRouter.get('/filter/all/:macaddress', TasksController.findAll)
tasksRouter.get('/filter/late/:macaddress', TasksController.late)
tasksRouter.get('/filter/today/:macaddress', TasksController.today)
tasksRouter.get('/filter/week/:macaddress', TasksController.week)
tasksRouter.get('/filter/month/:macaddress', TasksController.month)
tasksRouter.get('/filter/year/:macaddress', TasksController.year)

export default tasksRouter
