// const majdoorreg = require('../models/majdoorreg')
const mjreg = require('../models/majdoorreg')
exports.details = (req, res) => {
    res.render('/majdoormdetails.ejs')
}

exports.regform = (req, res) => {
    res.render("majdoor/regform.ejs", { message:''})
}

exports.regformvalue = async (req, res) => {
    const { us, mn, pass } = req.body
    const record= await mjreg.findOne({ username: us ,phone_no:mn})
    //console.log(record)
    if (record == null) {
        const record = new mjreg({ username: us, phone_no: mn, password: pass })
        record.save()
        res.render("majdoor/regform.ejs",{message:'successfully register'})

    } else {
        res.render('majdoor/regform.ejs', { message: 'Already Registered'})
    }
}


exports.mlogin = (req, res) => {
    res.render('majdoor/mlogin.ejs', { message: '' })
}
exports.mdashboard = (req, res) => {
    res.render('majdoor/Majdoor_Dashbord.ejs')
}
exports.mloginvalue = async (req, res) => {
    const { us, mn, pass } = req.body
    const record = await mjreg.findOne({ username: us })
    console.log(record)
    if (record !== null) {
        if (record.phone_no == mn) {
            req.session.isAuth = true
            res.redirect('/majdoor/Majdoor_Dashboard')
        } else {
            res.render('majdoor/mlogin.ejs', { message: 'Wrong Credentials' })
        }

    } else {
        res.render('majdoor/mlogin.ejs', { message: 'Wrong Credentials' })
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/majdoor/mlogin')
}


exports.md=async(req,res)=>{
    const record=await mjreg.find()
    console.log(record)
    res.render('majdoor/majdoordata.ejs',{record})
}
//Eror aayi thi
// exports.mdetails=async(req,res)=>{
//     //const username = req.session.username
//     const record=await mjreg.find()
//     console.log(record)
//    // res.render('majdoor/majdoordata.ejs',{record})
// }


exports.deletemajdoor=async(req,res)=>{
    try{
    const id=req.params.id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send('Invalid ID format');
      }
    
    await mjreg.findByIdAndDelete(id)
    // const currentPath = req.originalUrl.replace(/\/deletemajdoor\/[0-9a-fA-F]{24}/, ''); // Remove the ID part
    // res.redirect(currentPath);
   res.redirect('/admin/Md')
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

exports.availablemajdoor=(req,res)=>{
    res.render('majdoor/availablemajdoor.ejs')
}
