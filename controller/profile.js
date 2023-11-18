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
  const cookie = req.cookies;
  try{
    if(auth.login){
    const user = await usersTable.findOne({where: {username}});
     return res.status(200).json({
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({message: 'Internal server error'})
  }
}


exports.updateProfile = async(req,res)=>{
  const {name,username,email,password} = req.body;
  
}