const blog = require('../../models/blog')

const jwt = require('jsonwebtoken')

function blogControllers(){
    return{ 
        blogPage(req,res){
            res.render('user/blog', {layout: 'layout/adminlayout'})
        },
        //post blog
        postBlog(req,res){
            const token  = req.cookies.jwt_token;
            jwt.verify(token, process.env.SECRET_JWT_key,(err,decodedToken)=>{
                if(err){
                    res.redirect('/login')
                }
                else{
                    const newBlog  = new blog({
                        title: req.body.blogTitle,
                        slug: req.body.slug,
                        blogimage: req.file.filename,
                        author : decodedToken.id,
                        blogBody : req.body.blogtext,
                    })
                    const postBlog = newBlog.save()
                    if(postBlog){
                        res.json({status: 200, message: 'Inserted sucsessfuly'})
                    }
                    else{
                        
                    }

                }
            })
        }
    }
}