const {LocalStorage} = require('node-localstorage')
const db = require('../dbconfig/index')
localStorage = new LocalStorage('./scratch')
const auth = require('./auth')

// Tables
const usersTable = require('../models/tables/usersTable');
const freelancerTable = require('../models/tables/freelancerTable');

// Functions
const {createUser,findUser,updateUser} = require('../models/functions/usersFunction');
const {createFreelancer,updateFreelancer,findFreelancer} = require('../models/functions/freelancerFunction');

exports.profileUsers = async(req,res)=>{
  const { username } = req.params;
  const cookie = await req.cookies;
  try {
    const user = await usersTable.findOne({ where: { username } }) 
    const freelancer = await freelancerTable.findOne({where: {username}});
    
    if (!cookie.verifyToken) {

      return res.status(404).json({
        status: 'fail',
        message: 'unauthorized!'
      });   
    }
      if(user){
       return res.status(200).json({
          name: user.fullName,
          username: user.username,
          email: user.email,
          specialPoint : user.specialPoint,
          level: user.level,
          role: 'consumer'
        });
      }
      if(freelancer){
      return res.status(200).json({
          name : freelancer.fullName,
          username: freelancer.username,
          email: freelancer.email,
          EXP: freelancer.experiencePoint,
          level: freelancer.level,
          role: 'freelancer'
        });
      }
      if(!user && !freelancer){
       return res.status(404).json({ message: 'User tidak ditemukan!' });
      }
    } catch (error) {
      console.error(error); 
     return res.status(500).json({ 
        status: 'fail',
        message: 'Internal server error' });
    }
  };
  
  exports.profiles = async(req,res)=>{
    try {
      const cookie = await req.cookies;
      
      if (!cookie.verifyToken) {
        return res.status(402).json({
          status: 'fail',
          message: 'unauthorized!'
        });
      }
  
      const token = cookie.verifyToken;
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res.render('index');
        }
  
        const username = decoded.username
        const userConsumer = await usersTable.findOne({ where: { username } })
        const userFreelancer = await freelancerTable.findOne({ where: { username } })
  
        if (userConsumer) {
          return res.json({
            name: userConsumer.fullName,
            username: userConsumer.username,
            email: userConsumer.email,
            role: 'consumer'
          });
        }
  
        if (userFreelancer) {
          return res.json({
            name: userFreelancer.fullName,
            username: userFreelancer.username,
            email: userFreelancer.email,
            role: 'freelancer'
          });
        }
  
        // If no response has been sent, send a 404 response
        res.status(404).json({ message: 'User tidak ditemukan!' });
      });
  
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error'
      });
    }
  };


exports.updateProfile = async(req,res)=>{
  try {
    const {fullName,email,password,telephoneNumber,nationalId} = req.body;
    const cookie = await req.cookies;
    
    if (!cookie.verifyToken) {
      return res.status(402).json({
        status: 'fail',
        message: 'unauthorized!'
      });
    }

    const token = cookie.verifyToken;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.render('index');
      }
      const username = decoded.username
      const userConsumer = await usersTable.findOne({ where: { username } })
      const userFreelancer = await freelancerTable.findOne({ where: { username } })

     const usernameCheck = await usersTable.findAll({where : {username}})

    if(userConsumer){
      if(fullName == userConsumer.fullName && email == userConsumer.email && password == userConsumer.password(bcrypt.compareSync(password, userConsumer.password)) && telephoneNumber == userConsumer.telephoneNumber && nationalId == userConsumer.nationalId){
        return res.status(401).json({
          status: 'fail',
          message: 'nothing change!'
        })
      }
    }
    if(userConsumer){
      if(fullName == userFreelancer.fullName && email == userFreelancer.email && password == userFreelancer.password(bcrypt.compareSync(password, userFreelancer.password)) && telephoneNumber == userFreelancer.telephoneNumber && nationalId == userFreelancer.nationalId){
        return res.status(401).json({
          status: 'fail',
          message: 'nothing change!'
        })
      }
    }

     if(usernameCheck.lenghth > 0){
      return res.status(401).json({
        status: 'fail',
        message: 'username already taken!'
      });
    }
      if(userConsumer){
        const hashedPassword = await bcrypt.hashSync(password,10)
        const convertTelephone = parseInt(telephoneNumber)
        usersTable.update({fullName,email,password:hashedPassword,telephoneNumber,nationalId},
          {where: {username}});
           res.status(200).json({
            status:'success',
            message: 'update success!'
          })
      }
      if(userFreelancer){
        const hashedPassword = await bcrypt.hashSync(password,10)
        freelancerTable.update({fullName,email,password:hashedPassword,telephoneNumber,nationalId},
          {where:{username}}
          );
           res.status(200).json({
            status:'success',
            message: 'update success!'
          })
      }
  })
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error'
      });
    }
  };
