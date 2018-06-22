const express = require('express');
const utility = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');


Router.get('/info', function (req, res) {
    return res.json({code: 1})
});

Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc);
    })
});

/**
 * 清空数据
 */
Router.get('/deleteAll', function (req, res) {
    User.remove({}, function (err, doc) {
        return res.json(doc);
    })
});

/**
 * 用户注册
 */
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复了'})
        }
    });

    User.create({user, pwd: preparePwd(pwd), type}, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '注册出错', data: doc})
        }
        return res.json({code: 0})
    })
});

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: preparePwd(pwd)}, function (err, doc) {
        if (doc) {
            return res.json({code: 0, data: doc})
        } else {
            return res.json({code: 1, msg: '用户名或密码不正确'})
        }
    });
});

function preparePwd(pwd) {
    const saly = 'this-a_react!/for@caixian$of?7517520~';

    return utility.md5(utility.md5(pwd + saly));
}

module.exports = Router;