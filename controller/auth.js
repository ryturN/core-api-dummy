const {LocalStorage} = require('node-localstorage')

const db = require('../dbconfig/index');
localStorage = new LocalStorage('./scratch');

const dotenv= require('dotenv');
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid') 
const { Op } = require('sequelize');
dotenv.config();

// Tables
const usersTable = require('../models/tables/usersTable');
const freelancerTable = require('../models/tables/freelancerTable');

// Functions
const {createUser,findUser, usernameConsumer, emailConsumer} = require('../models/functions/usersFunction');
const {createFreelancer,updateFreelancer,findFreelancer, usernameFreelancer, emailFreelancer} = require('../models/functions/freelancerFunction');
const createRecords  = require('../models/functions/createRecords');
const  {mailOptions,transporter}  = require('../middleware/email');




//login 
exports.login = async(req,res)=>{
  try{
    const {username, email,password,options}=req.body

    const user = await findUser(username,password);
    const freelancer = await findFreelancer(username,password)




    //checking if Consumer 
    if(user){
      const ID = user.consumerId
      const role = "consumer"
      console.log(role)
      console.log(ID)
      createRecords(ID,role)
      const token = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
      .status(201).setHeader('Content-Type', 'application/json')
      //sending data to FE
      .json({
        status: "success",
        message: "",
        data: {
          fullName: user.name,
          username: user.username,
          email: user.email,
          role: "consumer",
          point: user.specialPoint,
          level: user.level,
          token: token
        }
      });  
    }
    //checking if Freelancer

    if(freelancer){
        const ID = freelancer.freelancer_id
        const role = "freelancer"
        const token = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
        createRecords(ID,role)

        .status(201).setHeader('Content-Type', 'application/json') 
        // sending the data to the FE
        .json({
          fullName: freelancer.name,
          username: freelancer.username,
          email: freelancer.email,
          role : "freelancer",
          EXP: freelancer.experiencePoint,
          level: freelancer.level, 
          token: token
        });  
      }
      // if wrong username / password
    res.status(402).json({
      status: 'fail',
      message: 'password / username salah'})
      
  }catch(error){
    res.status(401).json({
      status: 'fail',
      message: error})
} 


}
//verify is the code same or not
exports.verify = async (req,res) => {
  try{
  const {userVerificationCode,email} = req.body
  const saveData = req.body.saveData
  await jwt.verify(saveData, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
  if(err){
    return res.status(404)
    .json({
      status: 'fail',
      message: err
    })
  }
  const dataStorage = decoded.dataStorage
  const verificationCode = decoded.verificationCode
  const parsedVerificationCode = parseInt(verificationCode);
  const parsedUserVerificationCode = parseInt(userVerificationCode);
  if(email !== dataStorage.email){
    return res.status(402).json({
      status: 'fail',
      message: 'email tidak sama!'
    })
  }
  if(parsedUserVerificationCode === parsedVerificationCode){
    if(dataStorage.options == "consumer"){
      const consumerId = 'consumer_'+nanoid(20)
      createUser(
        consumerId,
        dataStorage.fullName,
        dataStorage.username,
        dataStorage.email,
        dataStorage.password,
        )
        return res.status(201).json({
          status: 'sucess',
          message: 'register successfully!',
          data:{
            fullName: dataStorage.fullName,
            username: dataStorage.username,
            email: dataStorage.email,
            role: "consumer",
          }
        })
      }
      if(dataStorage.options == "freelancer"){
        const freelancer_id = 'freelancer_'+nanoid(20)
        createFreelancer(
          freelancer_id,
          dataStorage.fullName,
          dataStorage.username,
          dataStorage.email,
          dataStorage.password
          )
          return res.status(201).json({
            status: 'success',
            message: 'register successfully',
            data:{
              fullName: dataStorage.fullName,
              username: dataStorage.username,
              email : dataStorage.email,
              role: "freelancer",
            }
          });

        }
      }
        return res.json({
          status: 'fail',
          message: 'your verification Code does not match!'})
        })
      }catch(err){
        return res.status(500)
        .json({
          status: 'fail',
          message: 'internal status error' + err
        })
      }
    }
        

        exports.register = async (req,res)=>{
          try{
          const {fullName,username ,email,password,options}= req.body
          const dataStorage = {
            fullName : req.body.fullName,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            options: req.body.options
          }; //save what user input into "data storage"
          const verificationCode = Math.floor(10000 + Math.random() * 90000); //for verification code
          const saveData = await jwt.sign({ dataStorage,verificationCode }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '120s'}); //save data storage and verification code into jwt with name "save data"
          const usernameCheck = await usernameConsumer(username) //checking username Users
          const usernameCheckF = await usernameFreelancer(username)
          const emailCheck= await emailConsumer(email) //then if username is not taken , then checking email if already taken then status fail
          const emailCheckF= await emailFreelancer(email) //if username is not taken , then checking email is already taken or not , if taken then status fail

      if(options == 'consumer'){ //if options "consumer"
        if (usernameCheck.length > 0 || usernameCheckF.length > 0) { //checking username if already taken then status fail
          return res.status(401).json({
            status: 'fail',
            message: 'username already taken!' 
          });
        }
        if(emailCheck.length > 0 || emailCheckF.length > 0){
          return res.status(401).json({
            status: 'fail',
            message: 'email already taken!'
          })
        }

      }
      if(options == 'freelancer'){ //if option "consumer"
        if (usernameCheckF.length > 0 || usernameCheck.length > 0) { //checking username if already taken then status fail
          return res.status(401).json({ 
            status: 'fail',
            message: 'username already taken!'
          });
        }
        if(emailCheckF.length > 0 || emailCheck.length > 0){
          return res.status(401).json({
            status: 'fail',
            message: 'email already taken!'
          })
        }
      }

      // sending to mailOptions Function
       transporter.sendMail(await mailOptions(email,username,verificationCode),  (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({
            status: 'fail',
            message: 'Error sending email'});
          throw error;
          }
        return console.log("Message sent: %s", info.messageId);
      });
        return res.status(202).json({
          status: 'success',
          message: '',
          data:{
            username: username,
            code : verificationCode,
            role: options,
            token: saveData
          }
  
  
  
        
        }); 
  }catch(err){
    res.status(505).json({
      status: 'fail',
      message: err
    })
  }
  }

