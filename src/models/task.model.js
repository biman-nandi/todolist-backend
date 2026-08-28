import mongoose, { Schema } from 'mongoose'

export const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: String,
  about: String,
  isCompleted: {type: Boolean, default: false},
  date: {type: Date, default: Date.now()}
})

export const Tasks = mongoose.model('Tasks', taskSchema)