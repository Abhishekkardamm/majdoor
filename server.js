const express=require('express')
const app=express();

require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const userrouter=require('./routers/userrouter')
const adminrouter=require('./routers/adminrouter')
const mongoose=require('mongoose')
const session=require('express-session')

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_Name}`)

app.use(session({
    secret:process.env.key,
    resave:false,
    saveUninitialized:false
}))
app.use('/admin',adminrouter)
app.use(userrouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log(`Server is Running on Port${process.env.PORT}`)})