const router=require('express').Router()
const mjregc=require('../controllers/mjregcontroller')

router.get('/',mjregc.regform)
router.post('/',mjregc.regformvalue)
router.get('/mlogin',mjregc.mlogin)
router.post('/mlogin',mjregc.mloginvalue)
router.get('/Majdoor_Dashboard',mjregc.mdashboard)




module.exports=router