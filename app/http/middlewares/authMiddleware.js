const jwt = require('jsonwebtoken')
const auth = (req, res, next)=>{
    const token  = req.cookies.jwt_token;
    if(token){
        jwt.verify(token, process.env.SECRET_JWT_key0)
    }
    else{

    }
}