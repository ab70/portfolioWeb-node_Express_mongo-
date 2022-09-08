const mongoose  = require('mongoose')
// const UserSchema = require('../models/user')
const blogSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true},
    slug: {type :String, required:true},
    blogimage: { type: String, required: true},
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    blogBody : { type: String, required :true},
},{timestamps: true})


const blogSchemaa = mongoose.model("Blog", blogSchema)
module.exports = blogSchemaa