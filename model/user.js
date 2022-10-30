const mongoose = require('mongoose');
const todoList = require('./todoList');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});


module.exports = mongoose.model('User',userSchema);