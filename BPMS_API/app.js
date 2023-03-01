const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const bodyParser = require('body-parser');

dotenv.config();

databaseConnect().catch((err) => console.log(err));
app.use(
  cors({
    origin: '*',
  })
);
async function databaseConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//Global Error Handler
app.use((error, req, res, next) => {
  if (!res.headersSent) {
    res.status(error.statusCode || 500);
    res.json({
      result: 'error',
      code: error.statusCode || 500,
      desc: error.message,
    });
  }
});

module.exports = app;
