import { Router } from "express";
import { addTask, deleteTask, getTask, updateState, updateTask } from "../controllers/tasks.controller.js";

const taskRouter = Router()

taskRouter.post('/', addTask)
taskRouter.get('/', getTask)
taskRouter.delete('/:id', deleteTask)
taskRouter.patch('/:id', updateState)
taskRouter.put('/:id', updateTask)

export {taskRouter}