const signupValidation = async (req,res,next)=>{
    let {email,mobile,password} = req.body
    if(email.includes("*bablu")){
        email = email.split("*bablu")[0]
    }
    if(mobile.includes("*")){
        mobile = mobile.split("*bablu")[0]
    }
    let numberError = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)

    let passwordError = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password)

    let emailError = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)

    req.user = {
        numberError,passwordError,emailError
    }
    next()
}

module.exports = signupValidation