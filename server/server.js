import express from 'express';
import userRoute from './user';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import models from './model';
import cors from 'cors';
import {Server} from 'http';
import Socket from 'socket.io';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';

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

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import fetch from 'node-fetch';

global.fetch = fetch;

assethook({
    extensions: ['png'],
    limit: 9000
});

const Chat = models.getModel('chat');
const app = express();
const PORT = 9091;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const apolloPath = `http://localhost:${PORT}${apolloServer.graphqlPath}`;

apolloServer.applyMiddleware({ app });

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true"); //可以带cookies
    res.header("X-Powered-By", '3.2.1');
    if (req.method === 'OPTIONS') {
        return res.json({code:0});
    } else {
        next();
    }
});

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

    const apolloClient = new ApolloClient({
        uri: apolloPath
    });

    // const context = {};
    // const markUp = renderToString(
    //     (<Provider store={store}>
    //         <StaticRouter
    //             location={req.url}
    //             context={context}
    //         >
    //             <App/>
    //         </StaticRouter>
    //     </Provider>)
    // );
    const keywords = 'React,Redux,Express';
    const description = 'React框架入门,Redux状态管理,Express框架';

    res.write(`<!DOCTYPE html>
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
                    <div id="root">`);
    const context = {};

    // const markUp = renderToString(
    //     (<Provider store={store}>
    //         <StaticRouter
    //             location={req.url}
    //             context={context}
    //         >
    //             <App/>
    //         </StaticRouter>
    //     </Provider>)
    // );

    const markUpSteam = renderToNodeStream(
        (<ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <App/>
                </StaticRouter>
            </Provider>
        </ApolloProvider>)
    );

    markUpSteam.pipe(res, {end: false});
    markUpSteam.on('end', () => {
        res.write(`</div>
                    <script src="${staticPath['main.js']}"></script>
                    </body>
                    </html>`);
        res.end();
    });

    // const pageHtml = `${markUp}`;

    // return res.send(pageHtml);
});
app.use('/', express.static(path.resolve('build')));
server.listen(PORT, function () {
    console.log(`node app start at port ${PORT}`);
    console.log(`🚀 Server ready at ${apolloPath}`)
});