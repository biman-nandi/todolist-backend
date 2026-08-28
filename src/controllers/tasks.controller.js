import { Tasks } from "../models/task.model.js"

const addTask = async (req, res) => {
  try {
    const {title, category, about, isCompleted, date} = req.body

    const newTask = new Tasks({title, category, about, isCompleted, date})

    await newTask.save()
    return res.status(201).json({
      success: true,
      message: 'Task added successfully',
      task: newTask
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

const getTask = async (req, res) => {
  try {
    const tasks = await Tasks.find({})

    return res.status(200).json({
      success: true,
      data: tasks
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const deleteTask = async (req, res) => {
  try {
    const {id} = req.params
    const task = await Tasks.deleteOne({_id: id})

    if (task.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "task not found"
      })
    }

    return res.status(200).json({
      success: true,
      data: "Task deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateTask = async (req, res) => {
  try {
    const {id} = req.params
    const {isCompleted} = req.body

    await Tasks.updateOne(
      {_id: id},
      {$set: {isCompleted}}
    )

    return res.status(200).json({
      success: true,
      message: "task updated"
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export {addTask, getTask, deleteTask, updateTask }