import { Schema, model } from 'mongoose'
import { Task } from '../protocols'

const TaskSchema = new Schema<Task>({
  macaddress: { type: String, required: true },
  type: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  when: { type: Date, required: true },
  done: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() }
})

export default model('Task', TaskSchema)
