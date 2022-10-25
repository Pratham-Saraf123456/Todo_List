const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoComp = new Schema({
    desc : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('CompleteList',todoComp);