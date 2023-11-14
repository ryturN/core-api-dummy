const sequelize = require('sequelize');

const projects_model = sequelize.define('projects', {
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
    deadline: {
        type: sequelize.DATE
    },
    exp: {
        type: sequelize.INTEGER,
        defaultValue: 10
    }
});

