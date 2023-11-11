const express = require('express');
const model_admin = require('../models/admin');
const model_consumer = require('../models/consumer');


const controlpanel_api = express.Router()

.get('/data/consumer', async (req, res) => {
    const result = await model_consumer.findAll();
    const data = {
        consumer: result
    };
    res.render('control/data_consumer', { data });
})

module.exports = controlpanel_api;