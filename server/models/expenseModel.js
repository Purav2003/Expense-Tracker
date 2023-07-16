const mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
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
},{timestamps:true});

module.exports = mongoose.model('Expense', expenseSchema);