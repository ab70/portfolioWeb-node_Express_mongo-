const adminControllers = require('../app/http/controllers/adminControllers')
const uploads = require('../app/http/middlewares/uploads')
const authControllers = require('../app/http/controllers/authControllers')
const userControllers = require('../app/http/controllers/userControllers')
const blogControllers = require('../app/http/controllers/blogControllers')

//middleware import
const {adminAuth,userAuth} = require('../app/http/middlewares/authMiddleware')

function initRoute(app){
	//Views: 
	app.get('/', adminControllers().home)
	app.post('/contact', adminControllers().sendEmail)
	

	//admin::get
	app.get('/admin', adminAuth, adminControllers().dashboard)
	app.get('/addShowcase', adminAuth, adminControllers().newShow)
	app.get('/addEducation', adminControllers().educationForm)
	app.get('/addExperience', adminControllers().experience)
	app.get('/addSkillLanguage',adminControllers().skillLanguage)
	

	//admin::post
	app.post('/addShowcase', uploads.single('project_img'),adminControllers().projectPost)
	app.post('/addEducation', adminControllers().educationPost)
	app.post('/addExperience', adminControllers().experiencePost)
	app.post('/postSkill',adminControllers().postSkill)
	app.post('/postLanguage',adminControllers().postLanguage)

	//Auth::type
	app.get(['/login','/registration'], authControllers().loginRegPage)
	app.post('/registration', authControllers().userRegistration)
	app.post('/login',authControllers().userLogin)

	//user
	app.get('/user',userAuth, userControllers().userDash)
	app.get('/ublog',userAuth, blogControllers().blogPage)
	app.post('/ublog', userAuth, uploads.single('blog_img'), blogControllers().postBlog)
	
}

module.exports = initRoute