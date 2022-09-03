const blog = require('../../models/blog')
const user = require('../../models/user')
const jwt = require('jsonwebtoken')

function blogControllers(){
    return{ 
        blogPage(req,res){
            res.render('user/blog', {layout: 'layout/adminlayout'})
        },
        //post blog
        async postBlog(req,res){
            
            const blogs  = new blog({
                title: req.body.blog_title,
                slug:  req.body.blog_title,
                blogimage: req.file.filename,
                author : req.currentUser._id,
                blogBody : req.body.comments,
            })
            console.log(blogs);
            
            
        }
    }
}

module.exports = blogControllers