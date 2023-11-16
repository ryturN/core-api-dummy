const { Op } = require("sequelize");
const { projectsTable } = require("../table");


const searchProject = async (data) => {
    const { project_name, project_id } = data;
    const result = await projectsTable.findOne({
        where: {
            [Op.or]: [
                { project_name: project_name }
            ]
        }
    });
    return result;
}