const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/learn';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongoose connect success');
});

const models = {
    user: {
        'user': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        'avatar': {'type': String},
        'desc': {'type': String},
        'title': {'type': String},
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
        'chat_id': {'type': String, 'require': true},
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'content': {'type': String, 'require': true, 'default': null},
        'create_time': {'type': Number, 'require': true, 'default': Date.now},
        'is_read': {'type': Boolean, 'default': false}
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
};