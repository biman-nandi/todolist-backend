import { Tasks } from "../models/task.model.js"

const addTask = async (req, res) => {
  try {
    let {title, category, about, isCompleted, date, time} = req.body

      const hour = Number(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: 'Asia/Kolkata',
          hour: "2-digit",
          hour12: false
        }).format(now)
      )

      time ??= `${String((hour + 1) % 24).padStart(2, "0")}:00`


    const newTask = new Tasks({title, category, about, isCompleted, date, time})

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
    const {title, category, about, date, time} = req.body

    await Tasks.updateOne(
      {_id: id},
      {$set: {title, about, category, date, time}}
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

const updateState = async (req, res) => {
  try {
    const {id} = req.params
    const {isCompleted} = req.body
    const currDate = new Date().toISOString()

    await Tasks.updateOne(
      {_id: id},
      {$set: {isCompleted, currDate}}
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

export {addTask, getTask, deleteTask, updateState, updateTask }