const jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) =>{

    const token = req.header("auth-token") 
    
    if(!token){
        res.status(401).send({err:"authenticate using valid token"})
    }
    try{
        const data = jwt.verify(token, process.env.JWT_Secret)
        // console.log({data})
        req.user = data
        // console.log({datauser:data})
        next();
    }catch (err) {
        console.log({ err })
        return res.status(500).json({ err: err.message })
    }
    
}
module.exports = fetchUser