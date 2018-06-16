const express = require('express');

const Router = express.Router();
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/learn';
mongoose.connect(DB_URL);

Router.get('/info',function (req,res) {
    return res.json({code:1})
});


module.exports = Router;