const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const user  = require('../../models/user');


async function getData(id){
    const usersin = await user.findById(id).select('userName useEmail isAdmin') 
    const {userPass, ...others} = usersin._doc
    return others;
}
const  adminAuth =  (req, res, next)=>{
    
        const token  = req.cookies.jwt_token;
        if(token){
            jwt.verify(token, process.env.SECRET_JWT_key, async (err,decodedToken)=>{
                
                if(err){
                    res.redirect('/login')
                    req.currentUser = null
                }
                else{
                    
                    
                    if(decodedToken.role === true){
                        const data = await getData(decodedToken.id)
                        req.currentUser = data
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
        jwt.verify(token, process.env.SECRET_JWT_key, async (err,decodedToken)=>{
            if(err){
                res.redirect('/login')
            }
            else{
                //here decoded token is stored in decodedToken variable
                
                
                
                if(decodedToken.role === false){
                    const data = await getData(decodedToken.id)
                    req.currentUser = data
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