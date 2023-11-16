const express = require('express');
const { newProjectHandler, searchProjectsHandler, deleteProjectsHandler } = require('../controller/projects');

const projects_api = express.Router()

.post('/new', newProjectHandler)
.post('/search', searchProjectsHandler)
.post('/delete', deleteProjectsHandler)

module.exports = projects_api;