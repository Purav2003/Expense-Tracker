require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connectDB")
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler")
const expense = require("./routes/expense")
const auth = require("./routes/auth")
const mongoose = require("mongoose")

//extra security
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const ratelimiter = require("express-rate-limit")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.set("trust proxy",1)
app.use(express.json());
app.use(ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use("/api/v1/",expense)
app.use("/api/v1/auth",auth)


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