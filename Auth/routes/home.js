const express = require('express');
const getHome = require('../controllers/homeController');
const home = express.Router();

home.get('/',getHome)

module.exports = home;