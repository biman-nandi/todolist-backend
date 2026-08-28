import dotenv from "dotenv"
dotenv.config({
  path: './.env',
  quiet: true
})

import { app } from './app.js'
import connectDB from "./db/db.js"

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  })