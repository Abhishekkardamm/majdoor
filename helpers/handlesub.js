function handlesub(req,res,next){
    if(req.session.role=='private'){
        next()
    }else{
        res.render('subscriptionmessage.ejs')
    }
}

module.exports=handlesub