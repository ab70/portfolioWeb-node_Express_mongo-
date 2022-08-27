const user = require('../../models/user')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')


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
        
    }
}
module.exports = authControllers