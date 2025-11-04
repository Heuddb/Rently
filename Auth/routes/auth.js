const express = require('express');
const {getAuth, postAuth, postLogout, getSignup, postSignup }= require('../controllers/authController');

const auth = express.Router();

auth.get('/login', getAuth);
auth.get('/sign-up', getSignup);
auth.post('/sign-up', postSignup);
auth.post('/login', postAuth);
auth.post('/logout',postLogout)
module.exports = auth;