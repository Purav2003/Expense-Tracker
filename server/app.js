require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connectDB")
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler")
const cors = require("cors")
const testroute = require("./routes/test")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use("/api/v1/expresstracker",testroute)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL
const start = async ()=>{
    await connectDB(mongo_url)
    app.listen(port, ()=>{
        console.log(`Server is listening on PORT: ${port}`);
    })
}

start()