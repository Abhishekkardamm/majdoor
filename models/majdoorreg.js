const mongoose=require('mongoose')

const majschema=mongoose.Schema({
    username:String,
    phone_no:Number,
    password:String,
    skills:String,
    location:String,
    image:{type:String,default:'default.png'}
})

module.exports=mongoose.model('majdoorreg',majschema)