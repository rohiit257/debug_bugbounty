import express from "express"
import router from "./routes/AuthRoute"
import cors from 'cors'

const PORT = 8000

const app  = express()
app.use(express.json())

app.use(
    cors({
      origin: 'http://localhost:3000',
    
    })
  );

app.use('/api/auth', router)
app.use('/api/auth/health', router)

app.listen(PORT,() =>{
    console.log(`🚀 Auth server running on http://localhost:${PORT}`)
    console.log(`📡 SIWE endpoint: http://localhost:${PORT}/api/auth/siwe`)
})