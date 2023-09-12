const express = require('express');
const cors = require('cors'); 

const app = express();
const router = require('./src/routers/router');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router); 

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});

module.exports = app; 