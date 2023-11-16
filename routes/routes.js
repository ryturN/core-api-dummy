const express = require ('express')
const auth = require('../controller/auth.js')
const verify = require('../middleware/verifyToken.js');
const profile  = require('../controller/profile.js');

const router = express.Router()

// AUTHENTICATION ROUTES
.post('/register',auth.register)
.post('/verify',auth.verify)
.post('/login', auth.login)
.get('/profile/:username?',profile.profileUsers)
.get('/profile',profile.profiles)

.get('/register',(req,res)=>{
    res.render('register')
})

.get('/verify',(req,res)=>{
    res.render('verify')
})

.get('/logout',(req,res)=>{
    res.clearCookie('verifyToken');
    res.json({
        message: 'See You Later Nerd'})
})
 
.get('/',(req,res)=>{
    const cookie = req.cookies;
    if(!cookie['verifyToken']){
        res.render('index')
    }
    if (cookie['verifyToken']){
        return res.redirect('/home')
    }
})

.get('/home',verify.verificationToken,(req,res)=>{
    const user = req.user;
    res.render('home',{user})
})

.get('/dashboard',(req,res)=>{
    const cookie = req.cookies;
    if(!cookie['verifyToken']){
        return res.redirect('/')
    }
    const data = {
        admin:true
    };
    res.render('home/dashboard',{data});
})

.get('/profile')

module.exports =router;