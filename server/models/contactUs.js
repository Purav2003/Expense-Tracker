const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var contactusSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    query:{
        type:String,
        required:true
    },
    // createdBy:{
    //     type:Mongoo,
    //     ref:"User"
    // }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('ContactUs', contactusSchema);