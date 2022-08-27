const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    project_name : {type: String, required: true},
    git_link     : {type: String, required:true},
    live_link    : {type: String, required: false},
    project_img  : {type: String, required: true}
},{timestamps: true})

const proSchema = mongoose.model("Project",projectSchema)
module.exports = proSchema