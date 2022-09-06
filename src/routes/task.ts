import { Router } from 'express'

import TaskController from '../controllers/task'
import { TaskValidation } from '../middlewars/task-validation'

const taskRouter = Router()

taskRouter.post('/', TaskValidation, TaskController.create)

taskRouter.get('/:id', TaskController.findOne)
taskRouter.put('/:id', TaskValidation, TaskController.update)
taskRouter.put('/:id/:done', TaskController.done)
taskRouter.delete('/:id', TaskController.delete)

taskRouter.get('/filter/all/:macaddress', TaskController.findAll)
taskRouter.get('/filter/late/:macaddress', TaskController.late)
taskRouter.get('/filter/today/:macaddress', TaskController.today)
taskRouter.get('/filter/week/:macaddress', TaskController.week)
taskRouter.get('/filter/month/:macaddress', TaskController.month)
taskRouter.get('/filter/year/:macaddress', TaskController.year)

export default taskRouter
