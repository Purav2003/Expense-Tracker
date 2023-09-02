require("express-async-errors")
const User = require("../models/user")
const ContactUs = require("../models/contactUs")
const sendEmail = require("./emailctrl")
// const multer = require("multer")
// const storage = multer.memoryStorage()
// const upload = multer({ storage })

const signup = async (req, res) => {
    const { numberError, passwordError, emailError } = req.user
    if (numberError && passwordError && emailError) {
        const userexist = await User.findOne({ email: req.body.email })
        if (!userexist) {
            const phoneexist = await User.findOne({ mobile: req.body.mobile })
            if (!phoneexist) {
                const user = await User.create(req.body)
                const token = user.createJWT()
                const data = {
                    to: req.body.email,
                    text: `Hey ${req.body.name}`,
                    subject: "Welcome to Expense Tracker",
                    html: "<h3>Congrulations you have successfully registered to Expense Tracker</h3>"
                }
                sendEmail(data)
                res.send({ user, token, success: true, status: 200 })
            } else {
                res.send({ msg: "Phone Number already exists", success: false, status: 403 })
            }
        } else {
            res.send({ msg: "User already exists", success: false, status: 403 })
        }
    } else {
        if (!numberError) {
            res.send({ msg: "Enter Valid Number", success: false, status: 403 })
        } else if (!emailError) {
            res.send({ msg: "Enter Valid Email", success: false, status: 403 })
        }
        else if (!passwordError) {
            res.send({ msg: "Enter Valid Password", success: false, status: 403 })
        }
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        res.send({ msg: "User not found", success: false, status: 404 })
    } else {
        const passwordCorrect = await user.comparePassword(password)
        if (!passwordCorrect) {
            res.send({ msg: "Incorrect Password", success: false, status: 401 })
        } else {
            const token = user.createJWT()
            res.send({ user, name: user.name, token, success: true, status: 200 })
        }
    }
}

const getAllUser = async (req, res) => {
    const users = await User.find()
    res.send({ users, count: users.length, success: true })
}

const profile = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send({ user,success: true, status: 200 })
}

const changePassword = async (req, res) => {
    const id = req.params.id
    const { oldPassword, newPassword } = req.body
    let passwordValidation = /^(?=.*bablu\d)(?=.*bablu[a-z])(?=.*bablu[A-Z])(?=.*bablu[^a-zA-Z0-9]).{8,1024}$/.test(newPassword)
    const user = await User.findById(id)
    if (await user.comparePassword(oldPassword)) {
        if (!passwordValidation) {
            res.send({ msg: "Entered Password is not strong", success: false, status: 403 })
        } else {
            user.password = newPassword
            await user.save()
            res.send({ msg: "Password Changed Successfully", success: true, status: 200 })
        }
    } else {
        res.send({ msg: "Old Password is Incorrect", success: false, status: 401 })
    }
}

const forgetPasswordMailConfirmation = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        res.send({ msg: "User does not exist", success: false, status: 404 })
    } else {
        const data = {
            to: email,
            text: `Hey ${user.name}`,
            subject: "Forget Password",
            html: `<h3>You can change your password by clicking on the given link<a href="http://localhost:5173/forget-password">Click Here</a></h3>`
        }
        sendEmail(data)
        res.send({ email: email, msg: "Check your mail", success: true, status: 200 })
    }
}

const forgetPassword = async (req, res) => {
    const { email, newPassword } = req.body
    const user = await User.findOne({ email: email })
    let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(newPassword)
    if (await user.comparePassword(newPassword)) {
        res.send({ msg: "The password is same as old password", success: false, status: 402 })
    }
    if (!passwordValidation) {
        res.send({ msg: "Entered Password is not strong", success: false, status: 403 })
    } else {
        user.password = newPassword
        await user.save()
        res.send({ msg: "Password Changed Successfully", success: true, status: 200 })
    }
}

const editProfile = async (req, res) => {
    const { numberError, emailError } = req.user
    if (numberError && emailError) {
        const id = req.params.id
        let { email, mobile } = req.body
        const user = await User.findById(id)
        var emailExist
        var phoneExist
        if (email.includes("*bablu")) {
            email = email.split("*bablu")[0]
            if (user.email === email) {
                res.send({ msg: "Email is same as previous one", success: false, status: 409 })
            } else {
                emailExist = await User.findOne({ email: email })
            }
        } else {
            emailExist = false
        }
        if (mobile.includes("*bablu")) {
            mobile = mobile.split("*bablu")[0]
            if (user.mobile === mobile) {
                res.send({ msg: "Mobile Number is same as previous one", success: false, status: 409 })
            } else {
                phoneExist = await User.findOne({ mobile: mobile })
            }
        } else {
            phoneExist = false
        }
        if (!emailExist) {
            if (!phoneExist) {
                await User.findByIdAndUpdate(id, { email: email, mobile: mobile })
                const data = {
                    to: email,
                    text: `Hey ${req.body.name}`,
                    subject: "Profile Edited Successfully",
                    html: `<h3>View your profile changes by clicking here <a href="http://localhost:5173/profile"> Click Here</a></h3>`
                }
                sendEmail(data)
                res.send({ msg: "Profile Updated Successfully", success: true, status: 200 })
            } else {
                res.send({ msg: "Phone Number already exists", success: false, status: 409 })
            }
        } else {
            res.send({ msg: "Email already exists", success: false, status: 409 })
        }
    } else {
        if (!numberError) {
            res.send({ msg: "Enter Valid Number", success: false, status: 403 })
        } else if (!emailError) {
            res.send({ msg: "Enter Valid Email", success: false, status: 403 })
        }
    }
}

const addCategory = async (req, res) => {
    const id = req.params.id
    await User.findByIdAndUpdate(id, { categories: req.body }, { new: true, runValidators: true })
    res.send({ msg: "Categories added successfully", success: true, status: 200 })
}

// const uploadImage = async (req, res) => {
//     const id = req.params.id
//     const user = await User.findById(id)
//     upload.single('image')(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.send({ msg: 'File upload error' ,success:false,status:400});
//         } else if (err) {
//             return res.send({ msg: 'Internal server error',success:false,status:500 });
//         }
//         const image = {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//         };
//         user.profileImage = image
//         await user.save();
//         res.send({msg:"Image uploaded successfully",success:true,status:200})
//     })
// }

const contactUs = async (req,res)=>{
    const {name,email,mobile,query} = req.body
    const createdBy = req.params.id
    const contactus = await ContactUs.create({name,email,mobile,query,createdBy})
    const data = {
        to: email,
        text: `Your response has been submitted`,
        subject: "Ticket Raised",
        html: "<h3>Your Ticket has be successfully delivered to out support team they will try to solve your problem as soon as possible</h3>"
    }
    sendEmail(data)
    res.send({contactus, success:true,status:200})
}

const deleteAccount = async (req,res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.send({msg:"Account deleted successfully",success:true,status:200})
}

const logout = (req, res) => {
        if (req.headers.authorization) {
            req.headers.authorization = '';
        }
        res.send({ msg: "Log Out Successful", success: true, status: 200 })
    }

    module.exports = {
        signup,
        signin,
        getAllUser,
        profile,
        changePassword,
        forgetPasswordMailConfirmation,
        forgetPassword,
        editProfile,
        addCategory,
        contactUs,
        deleteAccount,
        logout
    }