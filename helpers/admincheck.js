function admincheck(req,res,next){
    if(req.session.username=='srai88723@gmnail.com'){
    next()
    }else{
        res.render('You are not allowed to see this')
    }
}

module.exports=admincheck