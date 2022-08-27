const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userName : {type: String, required: true},
    useEmail: {type: String, unique: true, required: true},
    userPass: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
},{timestamps: true})

const user = mongoose.model("User", UserSchema)
module.exports = user