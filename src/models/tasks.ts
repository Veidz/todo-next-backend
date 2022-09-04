import { Schema, model } from 'mongoose'

const TasksSchema = new Schema({
  macaddress: { type: String, required: true },
  type: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  when: { type: Date, required: true },
  done: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() }
})

export default model('Tasks', TasksSchema)
