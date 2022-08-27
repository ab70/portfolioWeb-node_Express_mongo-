const mongoose = require('mongoose')
const workSkillSchema = new mongoose.Schema({
    skillName : {type : String, unique: true, required: true},
    skillLevel : {type: Number, min:0, max:100, required: true}
})

const languageSkillSchema = new mongoose.Schema({
    languageName: {type: String, unique: true, required: true},
    languageLevel : {type: Number, min:0, max:100, required: true}
})

const workSkill = mongoose.model("WorkSkill",workSkillSchema)
const languageSkill = mongoose.model("LanguageSkill", languageSkillSchema)

module.exports = {workSkill,languageSkill}
