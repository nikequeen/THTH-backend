require("dotenv").config();

const express = require("express");

const cors = require('cors');

const router = require("./src/routes/router")

const app = express();


app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");

})
app.use(cors)
app.use(express.json());
app.use(express.static("uploads"));


router(app);

