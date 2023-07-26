require("express-async-errors")
const customAPIError = require("../errors/custom-error")
const User = require("../models/user")

const signup = async (req, res) => {
    const userexist = await User.findOne({ email: req.body.email })
    if (!userexist) {
        const phoneexist = await User.findOne({ mobile: req.body.mobile })
        if (!phoneexist) {
            const user = await User.create(req.body)
                    const token = user.createJWT()
                    res.status(200).send({ user, token, success: true, status: 200 })
        } else {
            res.status(403).send({ msg: "Phone Number already exists", success: false, status: 403 })
        }
    } else {
        res.status(403).send({ msg: "User already exists", success: false, status: 403 })
    }

}

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new customAPIError("User not found", 404)
    }
    const passwordCorrect = user.comparePassword(password)
    if (!passwordCorrect) {
        throw new customAPIError("Incorrect Password", 401)
    }
    const token = user.createJWT()
    res.status(200).send({ user, token, success: true,status:200 })
}

const getAllUser = async (req, res) => {
    const users = await User.find()
    res.status(200).send({ users, count: users.length, success: true })
}

module.exports = {
    signup,
    signin,
    getAllUser
}