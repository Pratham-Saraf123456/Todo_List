const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoComp = new Schema({
    desc : {
        type : String,
        require : true
    },
    userId:{
        type : Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('CompleteList',todoComp);