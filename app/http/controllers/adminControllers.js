const path = require('path');
const projects = require('../../models/project')
const education = require('../../models/education')
const experience = require('../../models/experience')
const {workSkill,languageSkill} = require('../../models/skillLanguage')
const user = require('../../models/user')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const nodemailer = require('nodemailer')

function adminControllers(){
    return{
        
        dashboard(req,res){
            res.render('admin/dashboard', {layout: 'layout/adminlayout'})
        },
        newShow(req,res){
            res.render('admin/newShow',{layout: 'layout/adminlayout'})
        },
        async home(req,res){
            const alleducation  = await education.find().sort({startyear: -1})
            const allworkSkills = await workSkill.find()
            const allExp  = await experience.find()
            res.render('home', {layout: 'layout/layout', edu : alleducation, workSkills: allworkSkills, exp: allExp})
        },
        //post projects
        async projectPost(req,res){
            const newProject = new projects({
                project_name : req.body.project_name,
                git_link     : req.body.git_link ,
                live_link    : req.body.live_link,
                project_img  : req.file.filename
            })
            try{
                const saveProject = await newProject.save()
                console.log('product saved');
            }
            catch(err){
                console.log(err);
            }
        },

        //education post form get (admin)
        educationForm(req,res){
            res.render('admin/newEdu',{layout: 'layout/adminlayout'})
        },

        //education post form post (admin)
        async educationPost(req,res){
            const newEducation = new education({
                title:     req.body.degree_title,
                startyear: req.body.startYear,
                endyear :  req.body.endYear,
                cgpa :     req.body.cgpa,
                institute: req.body.institute,
                location:  req.body.location,
            })
            console.log(newEducation);
            try{
                const newEdu = await newEducation.save()
                

            }
            catch(err){
                console.log('Failed to store data');
            }
        },

        // experience form get 
        experience(req,res){
            res.render("admin/newExperience",{layout: 'layout/adminlayout'})
        },

        // experience 
        async experiencePost(req,res){
            const newExperience = new experience({
                workTitle : req.body.work_title,
                institute : req.body.institute,
                startYear : req.body.startYear,
                endYear   : req.body.endYear,
                workDesc  : req.body.description
            })
            try{
                const postExperience = await newExperience.save()
            }
            catch(err){
                console.log('Experience posting error');
            }
        },
        // get skill & language form
        skillLanguage(req,res){
            res.render('admin/skillLanguage',{layout: 'layout/adminlayout'})
        },

        //post skill
        async postSkill(req,res){
            const newSkill = new workSkill({
                skillName : req.body.skillName,
                skillLevel : req.body.skillLevel
            })
            try{
                const skillpost  = await newSkill.save()
            }
            catch(err){
                console.log(err);
            }
        },
        // post language
        async postLanguage(req,res){
            const newLang = new languageSkill({
                languageName: req.body.langName,
                languageLevel : req.body.langSkillPercentage 
            })
            try{
                const langpost  =  await newLang.save()
            }
            catch(err){
                console.log(err);
            }
        },

        //send email (contact form)
        async sendEmail(req,res){
            try{
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.mailer_email,
                        pass: process.env.mailer_pass
                    }
                })
                
                let mailbody = {
                    from : req.body.email,
                    to : 'nurulabrar2369@gmail.com',
                    subject : `Portfolio website mail sent by ${req.body.email} , subject: ${req.body.subject} `,
                    text : req.body.comments

                }
                transporter.sendMail(mailbody, (err)=>{
                    if (err) {
                        console.log(err);
                    }
                    else{
                        console.log('email sent!!!');
                        res.redirect('/#contact')
                    }
                })

            }
            catch(err){
                console.log(err);

            }
        }

               
        
    }
}

module.exports = adminControllers