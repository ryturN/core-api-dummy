const sequelize = require('sequelize');

const projects_settings = {
    project_id: {
        type: sequelize.STRING,
        primaryKey: true
    },
    project_name: {
        type: sequelize.STRING
    },
    project_description: {
        type: sequelize.STRING
    },
    id_consumer: {
        type: sequelize.STRING
    },
    nama_consumer: {
        type: sequelize.STRING
    },
    deadline: {
        type: sequelize.DATE
    },
    project_category: {
        type: sequelize.STRING
    }
};

const active_projects_settings = {
    project_id: {
        type: sequelize.STRING,
        primaryKey: true
    },
    project_name: {
        type: sequelize.STRING
    },
    project_description: {
        type: sequelize.STRING
    },
    id_consumer: {
        type: sequelize.STRING
    },
    nama_consumer: {
        type: sequelize.STRING
    },
    deadline: {
        type: sequelize.DATE
    },
    project_fee: {
        type: sequelize.INTEGER
    },
    project_category: {
        type: sequelize.STRING
    }
};

const finished_projects_settings = {
    project_id: {
        type: sequelize.STRING,
        primaryKey: true
    },
    project_name: {
        type: sequelize.STRING
    },
    project_description: {
        type: sequelize.STRING
    },
    id_consumer: {
        type: sequelize.STRING
    },
    nama_consumer: {
        type: sequelize.STRING
    },
    deadline: {
        type: sequelize.DATE
    },
    project_fee: {
        type: sequelize.INTEGER
    },
    project_category: {
        type: sequelize.STRING
    },
    project_experience: {
        type: sequelize.INTEGER
    },
    project_points: {
        type: sequelize.INTEGER
    },
    id_invoice: {
        type: sequelize.STRING
    }
};

const offer_projects_settings = {
    project_id: {
        type: sequelize.STRING,
        primaryKey: true
    },
    project_name: {
        type: sequelize.STRING
    },
    project_description: {
        type: sequelize.STRING
    },
    id_consumer: {
        type: sequelize.STRING
    },
    nama_consumer: {
        type: sequelize.STRING
    },
    finished: {
        type: sequelize.DATE
    },
    project_fee: {
        type: sequelize.INTEGER
    },
    project_category: {
        type: sequelize.STRING
    },
    project_experience: {
        type: sequelize.INTEGER
    },
    project_points: {
        type: sequelize.INTEGER
    }
};

module.exports = {
    projects_settings,
    finished_projects_settings,
    offer_projects_settings,
    active_projects_settings
};

