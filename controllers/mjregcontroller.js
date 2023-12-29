// const majdoorreg = require('../models/majdoorreg')
const mjreg = require('../models/majdoorreg')
const re=require('../models/reg')
exports.details = (req, res) => {
    res.render('/majdoormdetails.ejs')
}

exports.regform = (req, res) => {
    res.render("majdoor/regform.ejs", { message:''})
}

exports.regformvalue = async (req, res) => {
    const filename=req.file.filename
    const { us, mn, pass,skills,location } = req.body
    const record= await mjreg.findOne({ username: us ,phone_no:mn})
    //console.log(record)
    if (record == null) {
        const record = new mjreg({ username: us, phone_no: mn, password: pass,skills:skills,location:location,image:filename })
        record.save()
        res.render("majdoor/regform.ejs",{message:'successfully register'})

    } else {
        res.render('majdoor/regform.ejs', { message: 'Already Registered'})
    }
}


exports.mlogin = (req, res) => {
    res.render('majdoor/mlogin.ejs', { message: '' })
}
exports.mdashboard = async(req, res) => {
    const record=await re.find()
   const username = req.session.username
   
    res.render('majdoor/Majdoor_Dashbord.ejs',{record,username})
}
exports.mloginvalue = async (req, res) => {
    const { us, mn, pass } = req.body
    const record = await mjreg.findOne({ username: us })
    console.log(record)
    if (record !== null) {
        if (record.phone_no == mn) {
            req.session.isAuth = true;
            req.session.username=record.username
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

 exports.availablemajdoor=async(req,res)=>{
    const record=await mjreg.find()
     res.render('majdoor/availablemajdoor.ejs',{record})
 }
 exports.smajdoor=async(req,res)=>{
    const id=req.params.id
    const record=await mjreg.findById(id)
    res.render('confirmation_page.ejs',{record})
}
exports.majdoorprofile=async(req,res)=>{

   const id=req.session.id
   //console.log('Session:', req.session)
   //console.log(id)
   const record=await mjreg.find()
   console.log(record)
   res.render('majdoor/majdoorprofile.ejs',{record})
   
}  

exports.similiarmajdoor=async(req,res)=>{
    // const record= await mjreg.find({ skills: { $in: skills } });

    
    
    // res.render('majdoor/similiarmajdoor.ejs',{record})
    try {
        const skill = req.params.skills;
        const record = await mjreg.find({ skills: skill });
    
        res.render('majdoor/similiarmajdoor.ejs', { record, skill });
      } catch (error) {
        console.error('Error fetching similar professionals:', error);
        res.status(500).send('Internal Server Error');
      }
}
   




