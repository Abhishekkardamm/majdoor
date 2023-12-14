const Reg = require('../models/reg')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

exports.loginpage = (req, res) => {
    try {
        res.render('login.ejs', { message: '' })
    } catch (error) {
        console.log(error.message)
    }
}

exports.registerform = (req, res) => {
    try {
        res.render('reg.ejs', { message: '' })
    } catch (error) {
        console.log(error.message)
    }
}

exports.signup = async (req, res) => {
    try {
        const { email, pass } = req.body
        const convertedpass = await bcrypt.hash(pass, 10)
        const logincheck = await Reg.findOne({ email: email })
        if (logincheck == null) {
            const record = new Reg({ email: email, password: convertedpass })
            record.save()



            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "srai88723@gmail.com",
                    pass: "dhiu rwta pzuu qffj",
                },
            });
            //console.log('connected to SMTP server')
            const info = await transporter.sendMail({
                from: 'srai88723@gmail.com', // sender address
                to: record.email, // list of receivers
                subject: "Verification Mail from project", // Subject line
                text: "Please click below to verify", // plain text body
                html: `<a href=http://localhost:5000/emailactivation/${record.id}>Activation Link</a>`, // html body
            });
            res.render('reg.ejs', { message: 'Activation Link is sent to your Registered Email' })
        } else {
            res.render('reg.ejs', { message: 'Email is already registered' })
        }
    } catch (error) {
        console.log(error.message)
    }
}


exports.emailactivation = async (req, res) => {
    try {
        const id = req.params.id
        await Reg.findByIdAndUpdate(id, { status: 'active' })
        res.render('emailverify.ejs')
    } catch (error) {
        console.log(error.message)
    }
}

exports.logincheck = async (req, res) => {
    try {
        const { us, pass } = req.body
        const record = await Reg.findOne({ email: us })
        //console.log(record)
        if (record != null) {
            const passwordcheck = await bcrypt.compare(pass, record.password)
            if (passwordcheck) {
                req.session.username = us
                req.session.userid = record.id
                req.session.isAuth = true
                req.session.role = record.role
                if (record.email == 'govind@gmail.com' || record.email == 'srai88723@gmail.com') {
                    res.redirect('/dashboard')
                } else {
                    res.redirect('/profiles')
                }
            } else {
                res.render('login.ejs', { message: 'Wrong Password' })
            }

        } else {
            res.render('login.ejs', { message: 'Wrong Username' })
        }
    } catch (error) {
        console.log(error.message)
    }
}

exports.dashboard = (req, res) => {
    try {
        const username = req.session.username
        res.render("dashboard.ejs", { username })
    } catch (error) {
        console.log(error.message)
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}

exports.adminusers = async (req, res) => {
    try {
        const username = req.session.username
        const record = await Reg.find()
        console.log(record)
        res.render('admin/users.ejs', { username, record })
    } catch (error) {
        console.log(error.message)
    }
}

exports.userprofiles = async (req, res) => {
    try {
        const username = req.session.username
        const record = await Reg.find()
        res.render('userprofile.ejs', { username, record })
    } catch (error) {
        console.log(error.message)
    }
}

exports.updateform = async (req, res) => {
    try {
        const username = req.session.username
        const record = await Reg.findOne({ email: username })
        console.log(record)
        res.render('updateform.ejs', { username, record })
    } catch (error) {
        console.log(error.message)
    }

}

exports.profileupdate = async (req, res) => {
    const { fname, lname, gender, about, add, mobile } = req.body
    const id = req.session.userid
    if (req.file) {
        const filename = req.file.filename
        await Reg.findByIdAndUpdate(id, { firstName: fname, LastName: lname, gender: gender, img: filename, desc: about, add, mobile })

    } else {
        await Reg.findByIdAndUpdate(id, { firstName: fname, LastName: lname, gender: gender, desc: about, address: add, mobile: mobile })
    }
    res.redirect('profileupdate')

}

exports.statusupdate = async (req, res) => {
    const id = req.params.id
    const record = await Reg.findById(id)
    let newstatus = null
    if (record.status == null) {
        newstatus = 'active'
    } else {
        newstatus = 'suspended'
    }
    await Reg.findByIdAndUpdate(id, { status: newstatus })
    res.redirect('/admin/users')
}

exports.contactdetails = async (req, res) => {
    const id = req.params.id
    const record = await Reg.findById(id)
    res.render('contactdetails.ejs', { username: req.session.username, record })
}

exports.forgotform = (req, res) => {
    res.render('forgotform.ejs', { message: '' })
}

exports.forgotsendlink = async (req, res) => {
    const { us } = req.body
    const record = await Reg.findOne({ email: us })
    if (record == null) {
        res.render('forgotform.ejs', { message: 'Email Not found' })
    } else {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "srai88723@gmail.com",
                pass: "dhiu rwta pzuu qffj",
            },
        });
        console.log('connected to SMTP server')
        const info = await transporter.sendMail({
            from: 'srai88723@gmail.com', // sender address
            to: us, // list of receivers
            subject: "Password Change", // Subject line
            text: "Please click below to genreate new password", // plain text body
            html: `<a href=http://localhost:5000/forgotchangepasswordform/${record.id}>Click  Link to generate new paasword</a>`, // html body
        });
        console.log('email send')
        res.render('forgotform.ejs', { message: 'Link has been sent to your registered Email' })
    }
}


exports.forgotpasswordchangeform = (req, res) => {
    res.render('forgotpasswordform.ejs', { message: '' })
}

exports.forgotpasswordchangeform = async (req, res) => {
    const id = req.params.id
    const { npass, cpass } = req.body
    if (npass = cpass) {
        const convertedpass = await bcrypt.hash(npass, 10)
        await Reg.findByIdAndUpdate(id, { password: convertedpass })
        res.render('forgotmessage.ejs')
    } else {
        res.render('forgotpasswordform.ejs', { message: 'Password Not Match' })
    }
}



exports.indexpage = (req, res) => {
    res.render("index.ejs")
}

exports.loginpagex=(req,res)=>{
    res.render('LogAs.ejs')
}
exports.Majdoor_Dashbord=(req,res)=>{
    res.render('Majdoor_Dashbord.ejs')
}