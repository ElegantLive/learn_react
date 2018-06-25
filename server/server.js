const express = require('express');
const userRoute = require('./user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const cors = require("cors");
//
// const corsOptions = {
//     origin: [
//         'http://localhost:3000',
//     ],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

const app = express();
// app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRoute);
app.listen(9093, function () {
    console.log('node app start at port 9093')
});