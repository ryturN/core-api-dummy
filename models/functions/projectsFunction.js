const { Op } = require("sequelize");
const db = require("../../dbconfig/index");
const projectsTable = require("../tables/projectsTable");
const { nanoid } = require("nanoid");

// ---------------------------------------------------
const newProject = async (data) => {
    const { project_name, project_desc, user_id, deadline } = data;
    if(user_id === "") {
        return false;
    }

    // Checking if user is already post a project or not.
    const result = await projectsTable.findOne({
        where: {
            user_id: user_id
        }
    });
    if(result){
        return false;
    };
    // Make a new project data
    const newData = {
        project_id: 'projects_'+nanoid(16),
        project_name: project_name,
        project_desc: project_desc,
        user_id: user_id,
        deadline: deadline
    };
    projectsTable.create(newData);
    return true;
};

const deleteProject = async (data) => {
    const { user_id, project_id } = data;
    const isDataExist = await projectsTable.findOne({
        where: {
            [Op.or] : [
                {user_id: user_id},
                {project_id: project_id}
            ]
        }
    });
    if(!isDataExist) {
        return false;
    }
    projectsTable.destroy({
        where: {
            [Op.or]: [
                {user_id: user_id},
                {project_id: project_id}
            ]
        }
    });
    return true;
};

const searchProjects = async (settings) => {
    const result = await projectsTable.findAll();
    return result
}

module.exports = {
    newProject,
    deleteProject,
    searchProjects
}
