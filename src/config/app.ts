import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import taskRouter from '../routes/task'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database().catch((error) => console.log(error))
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private async database (): Promise<void> {
    await mongoose.connect('mongodb://localhost:27017/todo-next')
  }

  private routes (): void {
    this.express.use('/task', taskRouter)
  }
}

export default new App().express
