const express = require('express');
const userRoute = require('./user');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use('/user', userRoute);
app.listen(9093, function () {
    console.log('node app start at port 9093')
});