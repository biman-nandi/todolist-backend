import express from "express"
import cors from "cors"
import { taskRouter } from "./routes/tasks.routes.js"

export const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('hi')
})

app.use('/api', taskRouter)