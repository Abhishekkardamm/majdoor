const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const upload=require('../helpers/multer')
const handlesub=require('../helpers/handlesub')
const maj=require('../controllers/mjregcontroller')
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
       return next();
    } else {
       res.redirect('/login'); // Redirect to login if not authenticated
    }
 };
 
 // Route for user details
 router.get('/contactdetails/:id', isAuthenticated, regc.contactdetails);


router.get('/',regc.loginpage)
router.get('/register',regc.registerform)
router.post('/register',regc.signup)
router.get(`/emailactivation/:id`,isAuthenticated,regc.emailactivation)
router.post('/',regc.logincheck)
router.get('/logout',regc.logout)
router.get('/profiles',regc.userprofiles)
router.get('/profileupdate',regc.updateform)
router.post('/profileupdate',upload.single('img'),regc.profileupdate)
router.get('/contactdetails/:id',regc.contactdetails)
router.get('/forgot',regc.forgotform)
router.post('/forgot',regc.forgotsendlink)
router.get('/forgotchangepasswordform/:id',regc.forgotpasswordchangeform)
router.post('/forgotchangepasswordform/:id',regc.forgotpasswordchangeform)
router.get("/index",regc.indexpage)
router.get('/logAs',regc.loginpagex)
router.get('/dashboard',regc.dashboard)
router.get('/Majdoor_Dashbord',regc.Majdoor_Dashbord)
router.get('/availablemajdoor',maj.availablemajdoor)
router.post('/profiles',regc.findskills)
router.get('/smajdoor/:id',maj.smajdoor)
router.get('/confirmation',regc.confirmed)
router.post('/smajdoor/:id',regc.confirmedm)
router.get('/similiarmajdoor/:skills',maj.similiarmajdoor)
router.get('/customerdetails',regc.customerdetails)


module.exports=router