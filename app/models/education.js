const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    startyear : { type: Number , required: true }, //getFullYear() use while input
    endyear : { type: Number , required: true }, //getFullYear() use while input
    cgpa : {type: Number, min:0 , max:5},
    institute: {type: String, required: true},
    location: {type: String , required: true}
})

const eduSchema = mongoose.model('Education',educationSchema)
module.exports = eduSchema