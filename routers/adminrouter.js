const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const admincheck=require('../helpers/admincheck')
const m=require('../controllers/mjregcontroller')

function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/')
    }
}


router.get('/dashboard',handlelogin,admincheck,regc.dashboard)
router.get('/users',regc.adminusers)
router.get('/statusupdate',regc.statusupdate)
router.get('/Md',m.md)
router.get('/deletemajdoor/:id',m.deletemajdoor)

// router.get('/mdetails',m.mdetails)

module.exports=router