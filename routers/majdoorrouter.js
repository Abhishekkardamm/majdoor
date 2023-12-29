const router=require('express').Router()
const mjregc=require('../controllers/mjregcontroller')
const upload=require('../helpers/multer')
function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.render('majdoor/majdoorprofile.ejs')
    }
}

module.exports=handlelogin

router.get('/',mjregc.regform)
router.post('/',upload.single('img'),mjregc.regformvalue)
router.get('/mlogin',mjregc.mlogin)
router.post('/mlogin',mjregc.mloginvalue)
router.get('/Majdoor_Dashboard',mjregc.mdashboard)
router.get('/logout',mjregc.logout)
router.get('/tables',handlelogin,mjregc.majdoorprofile)
//router.get('/deletemajdoor/:id',mjregc.deletemajdoor)





module.exports=router