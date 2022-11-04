const user = require('../../models/user')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const cookieParser = require('cookie-parser')


function authControllers(){
    return{
        //Login Registration Page(GET)
        loginRegPage(req,res){
            res.render('regLogin', {layout: 'layout/layout'})
        } ,

        //User registration -JWT (POST)
        async userRegistration(req,res){
            const newUser = new user({
                userName : req.body.name,
                useEmail: req.body.email,
                userPass: CryptoJS.AES.encrypt(req.body.pass, process.env.SECRET_JWT_key),
                
            })
            try{
                const postUser = await newUser.save()
                res.json({status: 200})
            }
            catch(err){
                res.json({status: '401'})
            }
        },

        //login via JWT POST
        async userLogin(req,res){
            try{
                const findUser = await user.findOne({
                    useEmail: req.body.lemail
                })
                if(findUser){
                    const hasedPass = CryptoJS.AES.decrypt(findUser.userPass,process.env.SECRET_JWT_key).toString(CryptoJS.enc.Utf8)
                    
                    if ( hasedPass !== req.body.lpass) {
                        
                        res.json({status: 401, message: "Wrong Credential"})
                    }
                    if(hasedPass == req.body.lpass){
                        console.log('now pass matched');
                        const token = jwt.sign({id: findUser._id, role: findUser.isAdmin},process.env.SECRET_JWT_key,{expiresIn:'1h'})
                        // const {userPass, ...others} = findUser._doc
                        // req.currentUser = others
                        // console.log(req.currentUser);
                        if(findUser.isAdmin == true){
                            var rUrl = '/admin'
                        }
                        else{
                            var rUrl = '/user'
                        }
                        res.cookie('jwt_token',token).json({status:200, url: rUrl, message: 'Login Successfuil'})
                        
                    }
                    
                }
                if(!findUser){
                    res.json({message: "No user found"})
                    
                }
            }
            catch(err){
                res.json({status: 400, message: err})
            }
           
        }
        
    }
}
module.exports = authControllers