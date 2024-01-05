const mongoose=require('mongoose')


const conSchema=mongoose.Schema({
    email:String,
    fullName:String,
    Gender:String,
    StreetNumber:String,
    pincode:Number,
    state:String,
    Dob:Date,
    //role:{type:String,default:'users'},
    CreateDate:{type:Date,default:new Date()},
    status:{type:String,default:'suspended'},
    img:{type:String,default:'default.png'},
    desc:String,
    contact:Number,
    address:String,
    role:{type:String,default:'Public'}
})



module.exports=mongoose.model('conf',conSchema)