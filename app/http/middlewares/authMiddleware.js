const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next)=>{
    const token  = req.cookies.jwt_token;
    if(token){
        jwt.verify(token, process.env.SECRET_JWT_key,(err,decodedToken)=>{
            if(err){
                res.redirect('/login')
            }
            else{
                //here decoded token is stored in decodedToken variable
                console.log(decodedToken);
                if(decodedToken.role === true){
                    next()
                }
                else{
                    console.log("Its not admin");
                    res.redirect('/login')
                }
                
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

const userAuth = (req,res,next)=>{
    const token  = req.cookies.jwt_token;
    if(token){
        jwt.verify(token, process.env.SECRET_JWT_key,(err,decodedToken)=>{
            if(err){
                res.redirect('/login')
            }
            else{
                //here decoded token is stored in decodedToken variable
                console.log(decodedToken);
                if(decodedToken.role === false){
                    next()
                }
                else{
                    console.log("Its not user ");
                    res.redirect('/login')
                }
                
            }
        })
    }
    else{
        res.redirect('/login')
    }
}
module.exports = {adminAuth,userAuth}