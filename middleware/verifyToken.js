const jwt = require('jsonwebtoken');
// Tables
const freelancerTable = require('../models/tables/freelancerTable');
const usersTable = require('../models/tables/usersTable');
const projectsTable = require('../models/tables/projectsTable');



exports.verificationToken = async (req, res) => {
  const cookie = await req.cookies;
  

    if (!cookie.verifyToken) {

      return res.render('index');
    }
    const token = cookie.verifyToken;
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.render('index');
      }
      const username = decoded.username
      const userConsumer = await usersTable.findOne({where: {username}})
      const userFreelancer = await freelancerTable.findOne({where: {username}})
      // const project = await projectsTable.findAll({attributes:["user_id","project_name","project_desc","deadline","project_category"]});
      if(userConsumer){
        res.json({
              status: 'success',
              message: '',
              dataUsers:{
                name : userConsumer.fullName,
                username: userConsumer.username,
                email: userConsumer.email,
                role: 'consumer'
              }
            });
        }
        if(userFreelancer){
            res.json({
                status: 'success',
                message: '',
                dataUsers:{
                  name: userFreelancer.fullName,
                  username: userFreelancer.username,
                  email: userFreelancer.email,
                  role: 'freelancer'
                },
              })
        }
    });
};