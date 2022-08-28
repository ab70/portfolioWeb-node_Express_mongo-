const adminControllers = require('../app/http/controllers/adminControllers')
const uploads = require('../app/http/middlewares/uploads')
const authControllers = require('../app/http/controllers/authControllers')
const userControllers = require('../app/http/controllers/userControllers')

//middleware import
const {adminAuth,userAuth} = require('../app/http/middlewares/authMiddleware')

function initRoute(app){
	app.get('/',(req,res)=>{
		res.render('home')
	}),
	app.get('/admin', adminAuth, adminControllers().dashboard)
	app.get('/addShowcase', adminControllers().newShow)
	app.post('/addShowcase', uploads.single('project_img'),adminControllers().projectPost)
	app.get('/addEducation', adminControllers().educationForm)
	app.post('/addEducation', adminControllers().educationPost)
	app.get('/addExperience', adminControllers().experience)
	app.post('/addExperience', adminControllers().experiencePost)
	app.get('/addSkillLanguage',adminControllers().skillLanguage)
	app.post('/postSkill',adminControllers().postSkill)
	app.post('/postLanguage',adminControllers().postLanguage)
	app.get(['/login','/registration'], authControllers().loginRegPage)
	app.post('/registration', authControllers().userRegistration)
	app.post('/login',authControllers().userLogin)
	app.get('/user',userAuth ,userControllers().userDash)
	
}

module.exports = initRoute