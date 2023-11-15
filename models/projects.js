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
    nama_consumer: {
        type: sequelize.STRING
    },
    deadline: {
        type: sequelize.DATE
    },
    project_category: {
        type: sequelize.STRING
    }
});

projects_model.sync().then(() => {
    console.log(`Table: Projects Model is synced!`);
})

const active_projects_model = sequelize.define('active_projects', {
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
});

active_projects_model.sync().then(() => {
    console.log(`Table: Active Projects Model is synced!`);
})

const finished_projects_model = sequelize.define('finished_projects', {
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
});

finished_projects_model.sync().then(() => {
    console.log(`Table: Finished Projects Model is synced!`);
})

const offer_projects_model = sequelize.define('offer_projects', {
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
});

offer_projects_model.sync().then(() => {
    console.log(`Table: Offer Projects Model is synced!`);
})

module.exports = {
    projects_model,
    finished_projects_model,
    offer_projects_model,
    active_projects_model
};

