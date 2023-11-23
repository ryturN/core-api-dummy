const express = require('express');
const { adminLoginHandler, adminLoginView } = require('../controller/controlpanel');

const controlpanel_api = express.Router()

.get('/login', adminLoginView)
.post('/login', adminLoginHandler)

.get('/data/projects', (req, res) => {
    return res
    .render('control/data/projects/projects')
})

.get('/data/projects/edit', async (req, res) => {
    const data = {
        id: 'test'
    };
    return res
    .render('control/data/projects/projects_edit', {data});
})



.get('/data/user', (req, res) => {
    return res
    .render('control/data/user/user');
})


// UI

.get('/ui/freelancer/home', (req, res) => {
    return res
    .render('control/ui/freelancer/home');
})

.get('/ui/freelancer/projects', (req, res) => {
    return res
    .render('control/ui/freelancer/projects');
})

.get('/ui/user/projects', (req, res) => {
    return res
    .render('control/ui/user/projects')
})

.get('/*', (req, res) => {
    res.json({message: "test"})
})



module.exports = controlpanel_api;