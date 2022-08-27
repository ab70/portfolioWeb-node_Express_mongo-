const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    workTitle : {type: String, required: true},
    institute : {type: String, required: true},
    startYear : {type: Number, required: true},
    endYear   : {type: Number, required: true},
    workDesc  : {type: String, required: true}
})

const experience = mongoose.model("Experience",experienceSchema)

module.exports = experience