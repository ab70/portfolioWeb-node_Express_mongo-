//import packages
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const mongoose =  require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

//dot env config
dotenv.config()

//cookie parser
app.use(cookieParser())

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
	console.log(`Listening to the port ${PORT}`);
})
//connection mongoose
try{
	const connection = mongoose.connect(process.env.Mongoose_Link,{useNewUrlParser: true, useUnifiedTopology: true})
	if(connection){
		console.log("Database connected");
	}
}
catch(err){
	console.log(err);
}




//set statics and layouts
app.use(expressLayout)
app.use(express.static(path.join(__dirname,'public/assets/')))


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('views',path.join(__dirname,'/resources/views'))
app.set('layout',path.join(__dirname,'/resources/views/layout/layout'))
app.set('view engine','ejs')

require('./routes/web')(app)
