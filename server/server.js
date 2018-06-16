const express = require('express');
const userRoute = require('./user');

const app = express();
app.use('/user',userRoute);

// const User = mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:false}
// }));

app.listen(9093,function () {
    console.log('node app start at port 9093')
});