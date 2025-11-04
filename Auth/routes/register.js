const express = require('express');
const { getRegisterPage, postRegisterPage } = require('../controllers/registerHomeController');

const register = express.Router();

register.get("/host/register",getRegisterPage);
register.post("/host/register",postRegisterPage);

module.exports = register;