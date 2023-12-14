const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const upload=require('../helpers/multer')
const handlesub=require('../helpers/handlesub')


router.get('/',regc.loginpage)
router.get('/register',regc.registerform)
router.post('/register',regc.signup)
router.get(`/emailactivation/:id`,regc.emailactivation)
router.post('/',regc.logincheck)
router.get('/logout',regc.logout)
router.get('/profiles',regc.userprofiles)
router.get('/profileupdate',regc.updateform)
router.post('/profileupdate',upload.single('img'),regc.profileupdate)
router.get('/contactdetails/:id',handlesub,regc.contactdetails)
router.get('/forgot',regc.forgotform)
router.post('/forgot',regc.forgotsendlink)
router.get('/forgotchangepasswordform/:id',regc.forgotpasswordchangeform)
router.post('/forgotchangepasswordform/:id',regc.forgotpasswordchangeform)
router.get("/index",regc.indexpage)
router.get('/logAs',regc.loginpagex)
router.get('/dashboard',regc.dashboard)
router.get('/Majdoor_Dashbord',regc.Majdoor_Dashbord)


module.exports=router