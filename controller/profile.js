const {LocalStorage} = require('node-localstorage')
const db = require('../dbconfig/index')
localStorage = new LocalStorage('./scratch')
const auth = require('./auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// Tables
const usersTable = require('../models/tables/usersTable');
const freelancerTable = require('../models/tables/freelancerTable');
const skillsTables = require('../models/tables/skills')

// Functions
const {createUser,findUser,updateUser} = require('../models/functions/usersFunction');
const {createFreelancer,updateFreelancer,findFreelancer} = require('../models/functions/freelancerFunction');
const createSkills = require('../models/functions/createSkills')

exports.profileUsers = async(req,res)=>{
  const { username } = req.params;
  const verifyToken = req.body.token;
  try {
    const user = await usersTable.findOne({ where: { username } }) 
    const freelancer = await freelancerTable.findOne({where: {username}});
    
    if (!verifyToken) {

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
      if(!user || !freelancer){
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
      const verifyCode = req.body.token;
      jwt.verify(verifyCode, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(404).json({
            status: 'fail',
            message: 'unauthorized!'
          });
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
    const {fullName,password,telephoneNumber,nationalId} = req.body;
    const verifyCode = req.body.token
    
    jwt.verify(verifyCode, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.render('index');
      }
      const username = decoded.username
      const userConsumer = await usersTable.findOne({ where: { username } })
      const userFreelancer = await freelancerTable.findOne({ where: { username } })

     const usernameCheck = await usersTable.findAll({where : {username}})

  

     if(usernameCheck.lenghth > 0){
      return res.status(401).json({
        status: 'fail',
        message: 'username already taken!'
      });
    }
      if(userConsumer){
        const hashedPassword = await bcrypt.hashSync(password,10)
        usersTable.update({fullName,password:hashedPassword,telephoneNumber,nationalId},
          {where: {username}});
           res.status(200).json({
            status:'success',
            message: 'update success!'
          })
      }
      if(userFreelancer){
        const hashedPassword = await bcrypt.hashSync(password,10)
        freelancerTable.update({fullName,password:hashedPassword,telephoneNumber,nationalId},
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

  exports.addSkill = async(req,res)=>{
    try {
      const cookie = await req.cookies;
      const skills = req.body.skills
      const verifyToken = req.body.token;

    jwt.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.redirect('/');
      }
      const username = decoded.username
      const freelancer = await freelancerTable.findOne({where:{username}})
      const getId = freelancer.freelancer_id
      console.log(getId)
      if(!freelancer){
        return res.status(404).json({
          status: 'fail',
          message: 'u are not allowed!'
        })
      }  
      createSkills(getId,skills)
      res.status(202).json({
        status: 'success',
          message: 'Skill Successfully Add!',
          data: {
            skill: skills,
            id : getId
          }
        })
    })
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error'
    });
  
  }
}

exports.getSkills = async(req,res)=>{
  try{
    const verifyToken= req.body.token
    jwt.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.redirect('/');
      }
      const username = decoded.username
      const freelancer = await freelancerTable.findOne({where:{username}})
      if(!freelancer){
        return res.status(402).json({
          status: 'fail',
          message: 'unauthorized!',
          data: {
            data: null
          }
        })
      }
      const freelancerId = freelancer.freelancer_id
      const getSkill = await skillsTables.findAll({attributes: ['freelancerId','skills'],where:{freelancerId}})
      if(getSkill){
        return res.status(202)
        .json({
          status:'success',
          message: 'successfully get skills!',
          data:{
            getSkill
          }
        })
      }
    })
  }catch(err){
    return res.status(500).json({
      status:'fail',
      message: 'Internal server error'
    })
  }
}