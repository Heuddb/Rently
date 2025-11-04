const express = require('express');
const getMyHome = require('../controllers/myHomeController');

const myHome = express.Router();

myHome.get('/host/myHomes',getMyHome)

module.exports = myHome;