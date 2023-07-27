const signupValidation = async (req,res,next)=>{
    const {email,mobile,password} = req.body
    console.log(email,mobile,password);
    let numberError = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)

    let passwordError = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(password)

    let emailError = /^[a-z]+[a-z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)

    req.user = {
        numberError,passwordError,emailError
    }
    next()
}

module.exports = signupValidation