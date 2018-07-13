const express = require('express');
const userRoute = require('./user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const models = require('./model');
const Chat = models.getModel('chat');
const cors = require("cors");
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const corsOptions = {
    credentials: true,
};

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        const {from, to, msg} = data;
        const chat_id = [from, to].sort().join('_');
        if (msg) {
            Chat.create({chat_id, from, to, content: msg}, function (err, doc) {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })
        }
    })
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRoute);
app.use(function (req,res,next) {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    return res.sendFile(path.resolve('build/index.html'));
});
app.use('/',express.static(path.resolve('build')));
server.listen(9093, function () {
    console.log('node app start at port 9093')
});