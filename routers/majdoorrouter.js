const router=require('express').Router()
const mjregc=require('../controllers/mjregcontroller')

router.get('/',mjregc.regform)
router.post('/',mjregc.regformvalue)
router.get('/mlogin',mjregc.mlogin)
router.post('/mlogin',mjregc.mloginvalue)
router.get('/Majdoor_Dashboard',mjregc.mdashboard)
router.get('/logout',mjregc.logout)
router.get('/details',)





module.exports=router