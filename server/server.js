const express = require('express');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/learn';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
    console.log('mongo connect success');
});

const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:false}
}));

// User.create({
//     user:'jms',
//     age:10
// },function (error,result) {
//     if(!error) {
//         console.log(result);
//     }else{
//         console.log(error);
//     }
// });

// User.remove({age:18},function (error,doc) {
//     if(error) {
//         console.log(error)
//     }else{
//         console.log(doc);
//     }
// });

// User.update({user:'qucaixian'},{'$set':{age:18}},function (error,doc) {
//     if(!error) {
//         console.log(doc)
//     }else{
//         console.log(error)
//     }
// });

// User.findOne({user:'qucaixian'},function (error,doc) {
//     if(!error) {
//         console.log(doc);
//     }else{
//         console.log(error);
//     }
// });

// User.find({user:'qucaixian'},function (error,doc) {
//     if(!error) {
//         console.log(doc);
//     }else{
//         console.log(error);
//     }
// });

const app = express();

app.get('/data',function (req,res) {
    User.find({},function (error,doc) {
        res.json(doc);
    })
});

app.delete('/data',function (req,res) {
    User.delete({name:'qucaixian'},function (error,doc) {
        if(error) {
            console.log(error)
        }else{
            res.json(doc);
        }
    })
});

app.listen(9093,function () {
    console.log('node app start at port 9093')
});