const express = require('express');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');


Router.get('/info', function (req, res) {
    // User.find({},function (err,doc) {
    //     return res.json(doc);
    // })
    return res.json({code: 1})
});

Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc);
    })
});

Router.post('/register', function (req, res) {
    console.log(req.body.data);
    const {user, pwd, type} = req.body.data;

    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复了'})
        }
    });

    User.create({user, pwd, type}, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '注册出错'})
        }
        return res.json({code: 0})
    })
});

module.exports = Router;