const { newProject, deleteProject, searchProjectsAll, searchProjectsFilter } = require("../models/functions/projectsFunction");

exports.newProjectHandler = async (req, res) => {
    const { project_name, project_desc, user_id, deadline } = req.body;
    if(project_name == "" || project_desc == "" || user_id == "" || deadline == "" || typeof project_name == "undefined" || typeof project_desc == "undefined" || typeof user_id == "undefined" || typeof deadline == "undefined") {
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
