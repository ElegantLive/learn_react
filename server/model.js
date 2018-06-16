const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/learn';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
    console.log('mongoose connect success');
});
