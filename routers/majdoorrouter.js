const router=require('express').Router()
const mjregc=require('../controllers/mjregcontroller')
const upload=require('../helpers/multer')
// function handlelogin(req,res,next){
//     if(req.session.isAuth){
//         next()
//     }else{
//         res.render('majdoor/majdoorprofile.ejs')
//     }
// }

// module.exports=handlelogin

router.get('/',mjregc.regform)
router.post('/',upload.single('imgage'),mjregc.regformvalue)
router.get('/mlogin',mjregc.mlogin)
router.post('/mlogin',mjregc.mloginvalue)
router.get('/Majdoor_Dashboard',mjregc.mdashboard)
//router.post('/Majdoor_Dashboard/:id',mjregc.confirmbooking)
router.get('/logout',mjregc.logout)
router.get('/tables',mjregc.majdoorprofile)
router.get('/mprofileupdate',mjregc.updateform)
router.post('/mprofileupdate',upload.single('image'),mjregc.updation)
router.get('/deletebooking/:id',mjregc.deletebooking)
router.get('/confirmbooking/:id',mjregc.confirmbooking)
//router.get('/deletemajdoor/:id',mjregc.deletemajdoor)





module.exports=router