const mongoose=require('mongoose')


const regSchema=mongoose.Schema({
    email:String,
    password:String,
    firstName:String,
    LastName:String,
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
    mobile:Number,
    address:String,
    role:{type:String,default:'Public'}
})



module.exports=mongoose.model('reg',regSchema)