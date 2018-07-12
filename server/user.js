const express = require('express');
const utility = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = {'pwd': 0, '__v': 0};

/**
 * 校验登陆状态
 */
Router.get('/info', function (req, res) {
    // const {user_id} = req.cookies;
    // if (!user_id) {
    //     return res.json({code: 1})
    // }
    const {user_id} = req.query;
    User.findOne({_id: user_id}, _filter, function (err, doc) {
        if (doc) {
            return res.json({code: 0, data: doc})
        } else {
            return res.json({code: 1})
        }
    });
});

Router.get('/list', function (req, res) {
    const _search = (req.query) ? req.query : {};
    User.find(_search, function (err, doc) {
        return res.json({code: 0, data: doc});
    })
});

/**
 * 清空数据
 */
// Router.get('/deleteAll', function (req, res) {
//     User.remove({}, function (err, doc) {
//         return res.json(doc);
//     })
// });

/**
 * 用户注册
 */
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复了'})
        }
    });

    User.create({user, pwd: preparePwd(pwd), type}, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '注册出错', data: doc})
        }
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
    const user_id = req.body.user_id;

    if (!user_id) {
        return res.json({code: 1});
    }

    User.findByIdAndUpdate(user_id, req.body, function (e, d) {
        if (!e) {
            const data = Object.assign({}, {
                user: d.user,
                type: d.type,
            }, req.body);
            return res.json({code: 0, data: data})
        }
        return res.json({code: 1, msg: '更新失败'})
    })
});

Router.get('/getmsglist', function (req, res) {
    const from_id = req.query.user_id;
    if (!from_id) {
        return res.json({code: 1});
    }
    User.find({}, function (err, userdoc) {
        if (!err) {
            let user = {};
            userdoc.forEach(v => {
                user[v._id] = {name: v.user, avatar: v.avatar}
            });
            Chat.find({'$or': [{from: from_id}, {to: from_id}]}, function (err, doc) {
                if (!err) {
                    return res.json({code: 0, data: doc, user: user})
                }
            })
        }
    });
});

Router.get('/chat/clear', function (req, res) {
    Chat.remove({}, function (err, doc) {
        return res.json(doc);
    })
});

Router.post('/readmsg', function (req, res) {
    const {from, to} = req.body;

    Chat.update(
        {from, to, is_read: false},
        {'$set': {is_read: true}},
        {'multi': true},
        function (err, doc) {
            if (!err) {
                return res.json({code: 0, num: doc.nModified})
            }
            return res.json({code: 1})
        });

});

function preparePwd(pwd) {
    const saly = 'this-a_react!/for@caixian$of?7517520~';

    return utility.md5(utility.md5(pwd + saly));
}

module.exports = Router;