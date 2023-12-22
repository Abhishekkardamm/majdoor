const mongoose=require('mongoose')

const majschema=mongoose.Schema({
    username:String,
    phone_no:Number,
    password:String,
    skills:String,
    location:String
})

module.exports=mongoose.model('majdoorreg',majschema)