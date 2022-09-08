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
                slug:  req.body.blog_title.replace(/ /g, "-").toLowerCase(),
                blogimage: req.file.filename,
                author : req.currentUser._id,
                blogBody : req.body.comments,
            })
            try{
                const newBlog = await blogs.save()
                if(newBlog){
                    res.json({message: "Blog saved"})
                    res.redirect('/ubog')
                }
            }
            catch(err){
                res.json({message: "Cant enter Blog"})
            }
            
            
        }
    }
}

module.exports = blogControllers