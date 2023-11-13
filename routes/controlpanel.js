const express = require('express');
const model_admin = require('../models/admin');
const model_consumer = require('../models/consumer');


const controlpanel_api = express.Router()

.get('/data/consumer', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        const result = await model_consumer.findAll();
        const data = {
            consumer: result
        };
        res.status(200).json({ status: "success", message: "Data successfully received!", data: result})
    }else{
        const result = await model_consumer.findOne({
            where: {
                email: email
            }
        });
        res.status(200).json({ status: "success", message: "Data successfully received!", data: result})
    };
})


module.exports = controlpanel_api;