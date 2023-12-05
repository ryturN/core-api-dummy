const { newProject, deleteProject, searchProjectsAll, searchProjectsFilter, updateProjects } = require ("../models/functions/projectsFunction");
const usersTable = require('../models/tables/usersTable')
const freelancerTable = require('../models/tables/freelancerTable')
const jwt = require('jsonwebtoken')
const projectsTable = require('../models/tables/projectsTable')

// CREATE READ UPDATE DELETE FOR PROJECTS TABLE
exports.newProjectHandler = async (req, res) => {
    try {
        const cookie = await req.cookies;
        if (!cookie.verifyToken) {
          return res.status(402).json({
            status: 'fail',
            message: 'unauthorized!'
          });
        }
        const token = cookie.verifyToken
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
              return res.redirect('/');
            }
            const username = decoded.username
            const user = await usersTable.findOne({where: {username}})
            if(!user){
                return res.status(404).json({
                    status: 'fail',
                    message: 'u cannot access this!'
                })
            }
            if(user){
                const isBodyDefined = Object.values(req.body).every(value => typeof value !== "undefined");
                if(!isBodyDefined) {
                    return res
                    .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"})
                }
                const { project_name, project_desc, deadline, project_category } = req.body;

                if(!project_name || !project_desc || !deadline || !project_category) {
                    return res
                    .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"})
                }
                const data = {
                    project_name: project_name,
                    project_desc: project_desc,
                    user_id: user.consumerId,
                    deadline: deadline,
                    project_category: project_category
                };
                
                const result = await newProject(data);
                if(!result){
                    return res
                    .status(400).json({status: "failed", message: "You are already posted a project, you can only post 1 project each!"});
                }else{
                    return res
                    .status(200).json({status: "success", message: "Success create a new project!", data: data});
                }
            }
        })
}catch(error){
    res.status(401).json({
      status: 'fail',
      message: error})
} 
}

exports.searchProjectsHandler =  async (req, res) => {
    const {by, value} = req.query;
    // Check if query is undefined!
    if(typeof by == "undefined") {
        return res
        .status(404).json({status: "failed", message: "You need to specify the filter!"})
    }

    if(by == "all"){
        const result = await searchProjectsAll();
        return res
        .status(200).json({status: "success", message: "Here's all the data!", data: result});
    }

    if(by == "project_name") {
        if(typeof value == "undefined" || !value) {
            return res
            .status(404).json({status: "failed", message: `You need to specify the value of the ${by}`});
        }

        const result = await searchProjectsFilter(by, value);
        return res
        .status(200).json({status: "success", message: "Here's the filtered data", data: result})
    }

    return res
    .status(404).json({status: "failed", message: "You need to specify filter data correctly!"});
}

exports.deleteProjectsHandler = async (req, res) => {
    const { project_id, user_id } = req.body;
    if(project_id == "" || user_id == "" || typeof project_id == "undefined" || typeof user_id == "undefined") {
        return res
        .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"});
    };
    const data = {
        project_id: project_id,
        user_id: user_id
    };
    const isProjectDeleted = await deleteProject(data);
    if(!isProjectDeleted) {
        return res
        .status(404)
        .json({status: "failed", message: "There's an error to delete the project, either it's project id or user's id", data: data});
    }
    return res
    .status(200).json({status: "success", message: "Deleting the project data is succeeded!", data: data});
}

exports.updateProjectsHandler = async (req, res) => {
    const { project_id, project_name, project_desc, deadline, project_category } = req.body;
    if(project_id == "" || typeof project_id == "undefined") {
        return res
        .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"});
    };
    const result = await projectsTable.findOne({where: {project_id}});
    if(!result) {
        return res
        .status(404).json({status: "failed", message: "There's no project with that id!"});
    }
    if(result.project_name == project_name ||result.project_desc == project_desc || result.project_category === project_category) {
        return res
        .status(404).json({status: "failed", message: "There's nothing to be updated in the body data!"});
    }
    await projectsTable.update({
        project_name,
        project_desc,
        deadline,
        project_category,
    },{where:{project_id}})
    return res.status(200).json({
        status : 'success',
        message: 'success update project!'
    })
}

exports.getAllProject = async (req,res) =>{
    try {
            const project = await projectsTable.findAll({attributes:["project_id","user_id","project_name","project_desc","deadline","project_category"]});
            if(project){
                return res.status(200)
                .json({
                    status: 'success',
                    message: 'success get all project',
                    result: {
                        project
                    }
                })
            }
    } catch (error) {
        if(error){
            return res.status(500).json({
                status: 'fail',
                message: 'Internal server error'
              });
        }
    }
}
// HANDLER FOR ACTIVE PROJECTS