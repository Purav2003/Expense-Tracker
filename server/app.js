require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connectDB")
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler")
const auth = require("./routes/user")
const session = require('express-session');
const income = require("./routes/income")
const expense = require("./routes/expense")
const dashboard = require("./routes/dashboard")
const settings = require("./routes/settings")
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.set("trust proxy",1)
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api/v1/auth",auth)
app.use("/api/v1/income",income)
app.use("/api/v1/expense",expense)
app.use("/api/v1/dashboard",dashboard)
app.use("/api/v1/settings",settings)
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