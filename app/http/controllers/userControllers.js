const user = require('../../models/user')

function userControllers(){
    return {
        userDash(req,res){
            res.render('user/dash', {layout: 'layout/adminlayout'})
        }
    }
}
module.exports = userControllers