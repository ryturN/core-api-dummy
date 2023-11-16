const { newProject, deleteProject, searchProjects } = require("../models/functions/projectsFunction");

exports.newProjectHandler = async (req, res) => {
    if(typeof req.body == "undefined") {
        return res
        .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"});
    }
    const { project_name, project_desc, user_id, deadline } = req.body;
    if(project_name == "" || project_desc == "" || user_id == "" || deadline == "") {
        return res
        .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"})
    }
    const data = {
        project_name: project_name,
        project_desc: project_desc,
        user_id: user_id,
        deadline: deadline
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

exports.searchProjectsHandler =  async (req, res) => {
    // Listing all the projects available
    const { all, user_id } = req.body;
    if(all) {
        const result = await searchProjects();
        return res
        .status(200).json({status: "success", message: "Here's all the projects data", data: result})
    }

    // Listing all the projects available based on user's id
    if(user_id) {
        const result = await searchProjects();
        return res
        .status(200).json({status: "success", message: "Here's all the projects data", data: result})
    }

}

exports.deleteProjectsHandler = async (req, res) => {
    if(typeof req.body === "undefined") {
        return res
        .status(404).json({status: "failed", message: "There's nothing to be requested in the body data!"});
    }

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
