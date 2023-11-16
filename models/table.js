const db = require('../dbconfig/index');
const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const { freelancers } = require('./freelancerModel');
const { fotoUrl } = require('./fotoModel');
const { userModel } = require ('./usersModel');
const { projects_settings, active_projects_settings, finished_projects_settings, offer_projects_settings } = require('./projects');


const freelancerTable= db.define('freelancer',freelancers,
{
    freezeTableName: true
});

const foto= db.define('fotoDb',fotoUrl,
{
    freezeTableName: true
});

const Users = db.define('users',userModel,
{
    freezeTableName: true,
});

const projectsTable = db.define('projects', projects_settings,{
    freezeTableName: true
})

const activeProjectsTable = db.define('active_projects', active_projects_settings, {
    freezeTableName: true
})

const finishedProjectsTable = db.define('finished_projects', finished_projects_settings, {
    freezeTableName: true
})

const offerProjectsTable = db.define('offer_projects', offer_projects_settings, {
    freezeTableName: true
});

db.sync(); 

module.exports = {
    freelancerTable,
    foto,
    Users,
    projectsTable,
    activeProjectsTable,
    finishedProjectsTable,
    offerProjectsTable
}