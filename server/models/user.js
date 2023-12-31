const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const findOrCreate = require('mongoose-findorcreate');

var userSchema = new mongoose.Schema({
    googleId:{
        type:String
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide valid email"
        ],
        unique: true,
    },
    mobile: {
        type: String,
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/]
    },
    password: {
        type: String,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
    currency: {
        type:String,
        default:'INR'
    },
    categories:{
        type:Array,
        default:["Food","Clothes","Groceries","Petrol"]
    },
    // profileImage:{
    //     data: Buffer,
    //     contentType: String,
    // }
}, { timestamps: true });

userSchema.plugin(findOrCreate);

userSchema.pre("save", async function () {
    if(this.password){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

userSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compare(userPassword, this.password)
}

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET)
}

module.exports = mongoose.model('User', userSchema);