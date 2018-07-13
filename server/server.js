import express from 'express';
import userRoute from './user';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import models from './model';
import cors from 'cors';
import {Server} from 'http';
import Socket from 'socket.io';
import path from 'path';

import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';

import React from 'react';
import {renderToString, renderToNodeStream} from 'react-dom/server';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import App from '../src/app';
import reducers from '../src/reducer';
import staticPath from '../build/asset-manifest';

assethook({
    extensions:['png'],
    limit: 9000
});

const Chat = models.getModel('chat');
const app = express();

const server = Server(app);
const io = Socket(server);

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
/**
 * 拦截请求，返回服务器缓存的dom
 */
app.use(function (req, res, next) {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }

    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ));

    const context = {};

    const markUp = renderToString(
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App/>
            </StaticRouter>
        </Provider>)
    );

    const keywords = 'React,Redux,Express';
    const description = 'React框架入门,Redux状态管理,Express框架';

    const pageHtml = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                            <meta name="theme-color" content="#000000">
                            <meta name="keywords" content="${keywords}">
                            <meta name="description" content="${description}">
                            <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
                            <link rel="stylesheet" href="${staticPath['main.css']}">
                            <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
                            <title>React App</title>
                          </head>
                          <body>
                            <noscript>
                              You need to enable JavaScript to run this app.
                            </noscript>
                            <div id="root">${markUp}</div>
                            <script src="${staticPath['main.js']}"></script>
                          </body>
                        </html>`;

    return res.send(pageHtml);
});
app.use('/', express.static(path.resolve('build')));
server.listen(9093, function () {
    console.log('node app start at port 9093')
});