import dotenv from "dotenv"

// Load environment variables FIRST before any other imports
dotenv.config()

import express from "express"
import cors from "cors"
import BountyRoute from "./routes/BountyRoute"
import SubmissionRoute from "./routes/SubmissionRoute"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))

// Use unified bounty routes
app.use("/bounties", BountyRoute)
app.use("/submissions", SubmissionRoute)

app.listen(8001, () => {
    console.log("Server started on port 8001")
})