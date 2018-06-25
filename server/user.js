const express = require('express');
const utility = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const _filter = {'pwd': 0, '__v': 0};

/**
 * 校验登陆状态
 */
Router.get('/info', function (req, res) {
    const {user_id} = req.cookies;
    if (!user_id) {
        return res.json({code: 1})
    }
    User.findOne({_id: user_id}, _filter, function (err, doc) {
        if (doc) {
            return res.json({code: 0, data: doc})
        } else {
            return res.json({code: 1})
        }
    });
});

Router.get('/list', function (req, res) {
    const query = req.query;
    User.find(query, function (err, doc) {
        return res.json({code:0,data:doc});
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
            // return res.json({code: 1, msg: '用户名重复了'})
        }
    });

    User.create({user, pwd: preparePwd(pwd), type},_filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '注册出错', data: doc})
        }
        res.cookie('user_id', doc._id);
        return res.json({code: 0, data: doc})
    })

    // const UserModel = new User({user, pwd: preparePwd(pwd), type});
    //
    // UserModel.save(function (e,d) {
    //     if (e) {
    //         return res.json({code: 1, msg: '注册出错', data: d})
    //     }
    //     res.cookie('user_id', d._id);
    //     return res.json({code: 0})
    // })
});

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: preparePwd(pwd)}, _filter, function (err, doc) {
        if (doc) {
            res.cookie('user_id', doc._id);
            return res.json({code: 0, data: doc})
        } else {
            return res.json({code: 1, msg: '用户名或密码不正确'})
        }
    });
});

Router.post('/update', function (req, res) {
    const user_id = req.cookies.user_id;

    if (!user_id) {
        return res.json({code: 1});
    }

    User.findByIdAndUpdate(user_id, req.body, function (e, d) {
        if (!e) {
            const data = Object.assign({}, {
                user: d.user,
                type: d.type,
            }, req.body);
            return res.json({code: 0,data:data})
        }
        return res.json({code: 1, msg: '更新失败'})
    })
});

function preparePwd(pwd) {
    const saly = 'this-a_react!/for@caixian$of?7517520~';

    return utility.md5(utility.md5(pwd + saly));
}

module.exports = Router;