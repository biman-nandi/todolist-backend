import mongoose, { Schema } from 'mongoose'

export const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: String,
  about: String,
  isCompleted: {type: Boolean, default: false},
  completedAt: {type: Date, default: null},
  date: {type: Date, default: Date.now},
  time: {type: String}
})

export const Tasks = mongoose.model('Tasks', taskSchema)