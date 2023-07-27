const mongoose = require('mongoose');

var incomeSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:25,
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
    },
    date:{
        type:Date,
        required:true,
    },
    mode:{
        type:String,
        required:true,
    },
    userName:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"user name not defined"]
    }
},{timestamps:true});

module.exports = mongoose.model('Income', incomeSchema);