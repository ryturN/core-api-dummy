const express = require('express');
const model_admin = require('../models/admin');
const model_consumer = require('../models/consumer');

const default_exp = 50;
let exp;
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

.get('/test/signin', (req, res) => {
    // const {user, options} = req.query;
    const data = {
        qty_exp: exp || default_exp
    };
    res.render('control/tester/signin', {data});
})

.post('/test/signin', (req, res) => {
    const {qty_exp} = req.body;
    exp = qty_exp;
    res.redirect('/control/test/signin');
})

module.exports = controlpanel_api;