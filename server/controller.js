const Test = require("./model")

const postData = async (req,res)=>{
    console.log(req.body)
    const test = await Test.create(req.body)
    res.status(200).send({test,success:true})
}

module.exports = postData