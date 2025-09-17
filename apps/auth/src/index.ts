import express from "express"

const PORT = 8000

const app  = express()
app.use(express.json())

app.listen(PORT,() =>{
    console.log(`Server Running on PORT ${PORT}`)
})