const mongoose=require('mongoose')

const majschema=mongoose.Schema({
    username:String,
    lastName:String,
    gender:String,
    phone_no:Number,
    password:String,
    skills:String,
    location:String,
    address:String,
    image:{type:String,default:'default.png'}
})

module.exports=mongoose.model('majdoorreg',majschema)