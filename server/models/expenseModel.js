const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
// const {Types: {Long}} = mongoose;

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
    },
    date:{
        type:Date,
        required:true,
    },
    mode:{
        type:String,
        required:true,
    },
    To:{
        type:String,
        required:true
    },
    category:{
        type:String,
        requires:true
    },
    createdBy:{
        type:String,
        required:[true,"User not identified"]
    }
},{timestamps:true});

module.exports = mongoose.model('Expense', expenseSchema);