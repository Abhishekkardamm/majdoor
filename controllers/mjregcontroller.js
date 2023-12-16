const mjreg=require('../models/majdoorreg')

exports.regform=(req,res)=>{
    res.render("majdoor/regform.ejs",{message:''})
}
exports.regformvalue=async(req,res)=>{
    const{us,mn,pass}=req.body
    const record=await mjreg.findOne({username:us})
    //console.log(record)
    if(record==null){
        const record=new mjreg({username:us,phone_no:mn,password:pass})
        record.save()
        
    }else{
        res.render('majdoor/regform.ejs',{message:'Already Registered'})
    }
}


exports.mlogin=(req,res)=>{
    res.render('majdoor/mlogin.ejs',{message:''})
}
exports.mdashboard=(req,res)=>{
    res.render('majdoor/Majdoor_Dashbord.ejs')
}
exports.mloginvalue=async(req,res)=>{
    const{us,mn,pass}=req.body
    const record= await mjreg.findOne({username:us})
    if(record!==null){
        res.redirect('/majdoor/Majdoor_Dashboard')
    }else{
        res.render('majdoor/mlogin.ejs',{message:'Wrong Credentials'})
    }
}