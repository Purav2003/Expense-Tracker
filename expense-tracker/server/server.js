const express = require('express');
require("dotenv").config()
const cors = require('cors');
const Test = require("./model")
const testroute = require("./route")
const connectDB = require('./connectdb');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/expresstracker",testroute)

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL
const start = async ()=>{
  await connectDB(mongo_url)
  app.listen(port, ()=>{
      console.log(`Server is listening on PORT: ${port}`);
  })
}

start()